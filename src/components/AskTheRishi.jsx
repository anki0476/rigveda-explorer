import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import jsPDF from 'jspdf';

const AskTheRishi = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('rigveda-chat-history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load chat history:', e);
      }
    }
    return [
      {
        role: 'assistant',
        content: '🙏 Namaste! I am the Rishi, guardian of ancient Rigvedic wisdom. Ask me about the hymns, deities, philosophy, or any verses from the sacred texts. I will answer with specific verse citations.',
        timestamp: new Date().toISOString()
      }
    ];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('rigveda-chat-favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load favorites:', e);
      }
    }
    return [];
  });

  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [smartSuggestions, setSmartSuggestions] = useState([]);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('rigveda-chat-history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('rigveda-chat-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setError('API key not found. Please add VITE_GEMINI_API_KEY to your .env file.');
    }
  }, []);

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const toggleFavorite = (index) => {
    const message = messages[index];
    const favoriteIndex = favorites.findIndex(fav => 
      fav.content === message.content && fav.timestamp === message.timestamp
    );

    if (favoriteIndex >= 0) {
      setFavorites(favorites.filter((_, i) => i !== favoriteIndex));
    } else {
      setFavorites([...favorites, { ...message, originalIndex: index }]);
    }
  };

  const isFavorite = (index) => {
    const message = messages[index];
    return favorites.some(fav => 
      fav.content === message.content && fav.timestamp === message.timestamp
    );
  };

  const generateSmartSuggestions = async (lastResponse) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) return;

    setIsGeneratingSuggestions(true);

    const prompt = `Based on this answer about the Rigveda:

"${lastResponse.substring(0, 500)}..."

Generate exactly 4 follow-up questions that would naturally continue this conversation. The questions should:
- Be specific and engaging
- Explore related concepts or deities
- Ask for deeper explanations or examples
- Reference specific hymns or verses when relevant

Format: Return ONLY the 4 questions, one per line, without numbering or bullets.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        const suggestions = text
          .split('\n')
          .filter(line => line.trim().length > 0)
          .map(line => line.replace(/^[0-9]+[\.\)]\s*/, '').trim())
          .filter(line => line.endsWith('?'))
          .slice(0, 4);
        
        setSmartSuggestions(suggestions);
      }
    } catch (err) {
      console.error('Failed to generate suggestions:', err);
    }

    setIsGeneratingSuggestions(false);
  };

  const exportChatAsPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const maxWidth = pageWidth - (margin * 2);
    let yPosition = margin;

    const cleanText = (text) => {
      return text
        .replace(/[\u{1F600}-\u{1F64F}]/gu, '')
        .replace(/[\u{1F300}-\u{1F5FF}]/gu, '')
        .replace(/[\u{1F680}-\u{1F6FF}]/gu, '')
        .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '')
        .replace(/[\u{2600}-\u{26FF}]/gu, '')
        .replace(/[\u{2700}-\u{27BF}]/gu, '')
        .replace(/[\u{1F900}-\u{1F9FF}]/gu, '')
        .replace(/[\u{1FA00}-\u{1FA6F}]/gu, '')
        .replace(/[^\x00-\x7F]/g, '')
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/#{1,6}\s/g, '')
        .replace(/^[>\-\+\*]\s/gm, '  ')
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        .replace(/`/g, '')
        .replace(/~/g, '')
        .replace(/\s+/g, ' ')
        .replace(/\n\s*\n/g, '\n')
        .trim();
    };

    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Rigveda Chat History', margin, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Exported on: ${new Date().toLocaleString()}`, margin, yPosition);
    yPosition += 8;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('(Note: Sanskrit verses are transliterated to English for PDF compatibility)', margin, yPosition);
    yPosition += 8;

    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 8;

    messages.forEach((message, index) => {
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = margin;
      }

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      const role = message.role === 'user' ? 'You' : 'Rishi';
      doc.text(role, margin, yPosition);
      yPosition += 6;

      if (message.timestamp) {
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.text(new Date(message.timestamp).toLocaleString(), margin, yPosition);
        yPosition += 6;
      }

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const cleanedContent = cleanText(message.content);
      
      if (message.content !== cleanedContent && message.content.length - cleanedContent.length > 100) {
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.text('[Sanskrit text removed for PDF compatibility]', margin, yPosition);
        yPosition += 5;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
      }
      
      const lines = doc.splitTextToSize(cleanedContent, maxWidth);
      
      lines.forEach((line) => {
        if (yPosition > pageHeight - 20) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(line, margin, yPosition);
        yPosition += 5;
      });

      yPosition += 8;

      if (index < messages.length - 1) {
        if (yPosition > pageHeight - 15) {
          doc.addPage();
          yPosition = margin;
        }
        doc.setLineWidth(0.2);
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 8;
      }
    });

    doc.save(`rigveda-chat-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const exportChatAsJSON = () => {
    const data = {
      exportDate: new Date().toISOString(),
      totalMessages: messages.length,
      messages: messages,
      favorites: favorites
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rigveda-chat-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearHistory = () => {
    const confirmed = window.confirm('Are you sure you want to clear all chat history?');
    if (confirmed) {
      const initialMessage = {
        role: 'assistant',
        content: '🙏 Namaste! I am the Rishi, guardian of ancient Rigvedic wisdom. Ask me about the hymns, deities, philosophy, or any verses from the sacred texts. I will answer with specific verse citations.',
        timestamp: new Date().toISOString()
      };
      setMessages([initialMessage]);
      setSmartSuggestions([]);
      localStorage.setItem('rigveda-chat-history', JSON.stringify([initialMessage]));
    }
  };

  const filteredMessages = searchQuery
    ? messages.filter(msg =>
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  const displayMessages = showFavorites ? favorites : filteredMessages;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setError('API key missing. Please check your .env file.');
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userMessage,
      timestamp: new Date().toISOString()
    }]);
    setIsLoading(true);
    setError(null);
    setSmartSuggestions([]);

    const prompt = `You are a learned Rishi (sage) who has mastered the Rigveda, the oldest of the four Vedas. 

Your role:
- Answer questions about Rigvedic hymns, deities, philosophy, and teachings
- Always cite specific hymn references (e.g., "Rigveda 1.1.1" or "Mandala 10, Hymn 129")
- Explain concepts in accessible modern language while maintaining reverence
- Connect ancient wisdom to modern life when appropriate
- Be warm, wise, and patient like a true guru
- Format your response using Markdown for better readability (use **bold**, *italics*, lists, etc.)

User question: ${userMessage}

Provide a thoughtful, well-cited answer as the Rishi:`;

    const modelsToTry = [
      'gemini-2.0-flash',
      'gemini-2.0-flash-exp',
      'gemini-pro',
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-1.0-pro'
    ];

    let success = false;

    for (const modelName of modelsToTry) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: prompt
                }]
              }]
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates[0].content.parts[0].text;
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: text,
            timestamp: new Date().toISOString()
          }]);
          
          generateSmartSuggestions(text);
          
          success = true;
          console.log(`✅ Success with model: ${modelName}`);
          break;
        } else {
          console.log(`❌ Failed with model: ${modelName} - Status: ${response.status}`);
        }
      } catch (err) {
        console.log(`❌ Failed with model: ${modelName} - Error: ${err.message}`);
        continue;
      }
    }

    if (!success) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '🙏 Forgive me, I could not connect to any available Gemini model. Please:\n\n1. Verify your API key is correct\n2. Make sure the Generative AI API is enabled\n3. Try generating a new API key at https://aistudio.google.com/apikey',
        timestamp: new Date().toISOString()
      }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-[family:--font-family-header] text-[--color-ink] mb-2">
          💬 Ask the Rishi
        </h1>
        <p className="text-lg text-[--color-ink-light] font-[family:--font-family-body]">
          AI-powered chatbot to answer your questions about the Rigveda with specific verse citations
        </p>
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            ⚠️ {error}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {messages.length > 1 && (
            <>
              <button
                onClick={clearHistory}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-[family:--font-family-body] border-2 border-red-700"
              >
                🗑️ Clear History
              </button>
              <button
                onClick={exportChatAsPDF}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-[family:--font-family-body] border-2 border-blue-700"
              >
                📄 Export as PDF
              </button>
              <button
                onClick={exportChatAsJSON}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-[family:--font-family-body] border-2 border-green-700"
              >
                📥 Export as JSON
              </button>
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-[family:--font-family-body] font-semibold border-2 ${
                  showFavorites
                    ? 'bg-yellow-500 text-[--color-ink] hover:bg-yellow-600 border-yellow-700'
                    : 'bg-[--color-gold] text-[--color-ink] hover:bg-[--color-saffron] border-[--color-ink]'
                }`}
              >
                {showFavorites ? '💬 All Messages' : `⭐ Favorites (${favorites.length})`}
              </button>
            </>
          )}
        </div>

        {!showFavorites && messages.length > 1 && (
          <div className="mt-4 max-w-md mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Search conversations..."
              className="w-full px-4 py-2 rounded-lg border-2 border-[--color-gold] bg-[--color-parchment-light] text-[--color-ink] font-[family:--font-family-body] focus:outline-none focus:border-[--color-saffron]"
            />
            {searchQuery && (
              <p className="text-sm text-[--color-ink-light] mt-2">
                Found {filteredMessages.length} result(s)
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 max-w-4xl w-full mx-auto flex flex-col bg-[--color-parchment-light] rounded-xl border-2 border-[--color-gold] shadow-lg overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ minHeight: '400px', maxHeight: '600px' }}>
          {displayMessages.length === 0 ? (
            <div className="text-center text-[--color-ink-light] py-12">
              <p className="text-xl mb-2">⭐</p>
              <p>No favorite messages yet!</p>
              <p className="text-sm mt-2">Click the star icon on any message to save it.</p>
            </div>
          ) : (
            displayMessages.map((message, index) => {
              const actualIndex = showFavorites ? message.originalIndex : index;
              return (
                <div
                  key={`${message.timestamp}-${index}`}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 relative ${
                      message.role === 'user'
                        ? 'bg-[--color-saffron] shadow-lg border-2 border-orange-700'
                        : 'bg-[--color-parchment-dark] text-[--color-ink]'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex items-center justify-between mb-2 gap-2">
                        <div className="text-2xl">🙏</div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleFavorite(actualIndex)}
                            className={`px-2 py-1 rounded-md text-sm transition-colors font-semibold border-2 ${
                              isFavorite(actualIndex)
                                ? 'bg-yellow-500 text-[--color-ink] hover:bg-yellow-600 border-yellow-700'
                                : 'bg-gray-300 text-[--color-ink] hover:bg-gray-400 border-gray-500'
                            }`}
                            title={isFavorite(actualIndex) ? 'Remove from favorites' : 'Add to favorites'}
                          >
                            {isFavorite(actualIndex) ? '⭐' : '☆'}
                          </button>
                          <button
                            onClick={() => copyToClipboard(message.content, actualIndex)}
                            className="px-3 py-1 bg-[--color-gold] text-[--color-ink] font-semibold rounded-md text-sm hover:bg-[--color-saffron] transition-colors flex items-center gap-1 border-2 border-[--color-ink]"
                          >
                            {copiedIndex === actualIndex ? (
                              <>
                                <span>✓</span>
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <span>📋</span>
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                    {message.timestamp && (
                      <div className="text-xs mb-2 font-semibold" style={{ color: message.role === 'user' ? '#000' : 'rgba(0,0,0,0.6)' }}>
                        {new Date(message.timestamp).toLocaleString()}
                      </div>
                    )}
                    <div className="font-[family:--font-family-body] leading-relaxed prose prose-sm max-w-none">
                      {message.role === 'assistant' ? (
                        <ReactMarkdown
                          components={{
                            p: ({node, ...props}) => <p className="mb-3" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-bold text-[--color-saffron]" {...props} />,
                            em: ({node, ...props}) => <em className="italic" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc list-inside mb-3 space-y-1" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-3 space-y-1" {...props} />,
                            h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-2 text-[--color-gold]" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-2 text-[--color-gold]" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-2 text-[--color-gold]" {...props} />,
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      ) : (
                        <div className="whitespace-pre-wrap font-bold text-black">{message.content}</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[--color-parchment-dark] rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">🙏</div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[--color-saffron] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-[--color-saffron] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-[--color-saffron] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="border-t-2 border-[--color-gold] p-4 bg-[--color-parchment-dark]">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the Rigveda..."
              className="flex-1 px-4 py-3 rounded-lg border-2 border-[--color-gold] bg-[--color-parchment-light] text-[--color-ink] font-[family:--font-family-body] focus:outline-none transition-all"
              disabled={isLoading || error}
              style={{
                boxShadow: input.trim() && !isLoading && !error 
                  ? '0 0 20px rgba(239, 68, 68, 0.5), 0 0 40px rgba(239, 68, 68, 0.3)' 
                  : 'none',
                borderColor: input.trim() && !isLoading && !error 
                  ? 'rgba(239, 68, 68, 0.8)' 
                  : ''
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim() || error}
              className="px-4 py-3 bg-[--color-saffron] text-white font-[family:--font-family-header] rounded-lg hover:bg-[--color-gold] transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-orange-700 flex items-center justify-center relative overflow-hidden"
              title="Send message"
              style={{
                boxShadow: input.trim() && !isLoading && !error 
                  ? '0 0 20px rgba(239, 68, 68, 0.6), 0 0 40px rgba(239, 68, 68, 0.4)' 
                  : 'none'
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-6 h-6"
                style={{
                  filter: input.trim() && !isLoading && !error 
                    ? 'drop-shadow(0 0 6px rgba(239, 68, 68, 0.8))' 
                    : 'none'
                }}
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-4xl w-full mx-auto mt-6">
        {smartSuggestions.length > 0 && (
          <>
            <p className="text-sm text-[--color-ink-light] text-center mb-3 font-[family:--font-family-body] flex items-center justify-center gap-2">
              <span>💡</span>
              <span>You might also want to ask:</span>
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {smartSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(suggestion)}
                  className="px-4 py-2 bg-gradient-to-r from-[--color-gold] to-[--color-saffron] text-[--color-ink] font-bold rounded-full text-sm hover:shadow-lg hover:scale-105 transition-all border-2 border-[--color-ink] font-[family:--font-family-body]"
                  disabled={isLoading || error}
                  style={{ textShadow: '0.5px 0.5px 1px rgba(255,255,255,0.5)' }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </>
        )}

        {isGeneratingSuggestions && (
          <div className="text-center">
            <p className="text-sm text-[--color-ink-light] font-[family:--font-family-body] animate-pulse">
              💡 Generating smart suggestions...
            </p>
          </div>
        )}

        {smartSuggestions.length === 0 && !isGeneratingSuggestions && (
          <>
            <p className="text-sm text-[--color-ink-light] text-center mb-3 font-[family:--font-family-body]">
              Try asking:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                'What is the Nasadiya Sukta about?',
                'Tell me about Agni in the Rigveda',
                'What does the Rigveda say about dharma?',
                'Explain the Gayatri Mantra'
              ].map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(question)}
                  className="px-4 py-2 bg-[--color-parchment-dark] text-[--color-ink] rounded-full text-sm hover:bg-[--color-gold]/20 transition-colors font-[family:--font-family-body] border-2 border-[--color-gold]"
                  disabled={isLoading || error}
                >
                  {question}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AskTheRishi;
