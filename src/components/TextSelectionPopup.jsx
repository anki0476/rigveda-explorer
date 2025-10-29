import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Sparkles, BookOpen, Globe, Copy, Check, ChevronDown } from 'lucide-react';

const TextSelectionPopup = () => {
  const navigate = useNavigate();
  const [selectedText, setSelectedText] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  
  // Language options with emojis
  const languages = [
    { code: 'hi', name: 'Hindi', emoji: '🇮🇳', script: 'Devanagari' },
    { code: 'mr', name: 'Marathi', emoji: '🇮🇳', script: 'Devanagari' },
    { code: 'gu', name: 'Gujarati', emoji: '🇮🇳', script: 'Gujarati' },
    { code: 'ta', name: 'Tamil', emoji: '🇮🇳', script: 'Tamil' },
    { code: 'kn', name: 'Kannada', emoji: '🇮🇳', script: 'Kannada' },
    { code: 'te', name: 'Telugu', emoji: '🇮🇳', script: 'Telugu' },
    { code: 'en', name: 'English', emoji: '🇬🇧', script: 'Latin' },
    { code: 'sa', name: 'Sanskrit', emoji: '🕉️', script: 'Devanagari' },
  ];
  
  const handleAskRishi = () => {
    sessionStorage.setItem('rishiPrefilledMessage', selectedText);
    navigate('/ask-rishi');
    setIsVisible(false);
  };

  const handleDefine = () => {
    sessionStorage.setItem('rishiPrefilledMessage', `Define and explain: "${selectedText}"`);
    navigate('/ask-rishi');
    setIsVisible(false);
  };

  const handleTranslate = (targetLanguage) => {
    // Check if it looks like Sanskrit/Devanagari
    const isSanskrit = /[\u0900-\u097F]/.test(selectedText);
    
    let message = '';
    if (isSanskrit) {
      message = `Translate this Sanskrit/Devanagari text to ${targetLanguage.name}: "${selectedText}"`;
    } else {
      message = `Translate "${selectedText}" to ${targetLanguage.name} (${targetLanguage.script} script) and also provide the meaning`;
    }
    
    sessionStorage.setItem('rishiPrefilledMessage', message);
    navigate('/ask-rishi');
    setIsVisible(false);
    setShowLanguageMenu(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selectedText);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsVisible(false);
      }, 1000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection.toString().trim();

      if (text.length > 3) {
        try {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          
          setSelectedText(text);
          setPosition({
            x: rect.left + rect.width / 2,
            y: rect.top + window.scrollY - 70
          });
          setIsVisible(true);
          setCopied(false);
          setShowLanguageMenu(false);
        } catch (e) {
          setIsVisible(false);
        }
      } else {
        setIsVisible(false);
        setShowLanguageMenu(false);
      }
    };

    const handleMouseUp = (e) => {
      if (e.target.closest('.text-selection-popup')) return;
      setTimeout(handleSelection, 10);
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);

    const handleClickOutside = (e) => {
      if (isVisible && !e.target.closest('.text-selection-popup')) {
        setIsVisible(false);
        setShowLanguageMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="text-selection-popup"
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translateX(-50%)',
          zIndex: 99999,
          animation: 'popIn 0.2s ease-out',
        }}
      >
        <div 
          className="flex items-center gap-1 p-1 rounded-full shadow-2xl border-2"
          style={{
            backgroundColor: 'rgba(245, 230, 211, 0.98)',
            borderColor: '#D4AF37',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Ask Rishi - Primary Action */}
          <button
            onClick={handleAskRishi}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full font-semibold text-xs transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: '#FF6B35',
              color: 'white',
            }}
            title="Ask Rishi AI"
          >
            <Sparkles size={14} />
            <span>Ask Rishi</span>
          </button>

          {/* Divider */}
          <div style={{ width: '1px', height: '24px', backgroundColor: '#D4AF37', opacity: 0.3 }} />

          {/* Define */}
          <button
            onClick={handleDefine}
            className="p-2 rounded-full transition-all duration-200 hover:scale-110"
            style={{
              color: '#D4AF37',
            }}
            title="Define & Explain"
          >
            <BookOpen size={16} />
          </button>

          {/* Translate with Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center gap-1 p-2 rounded-full transition-all duration-200 hover:scale-110"
              style={{
                color: '#D4AF37',
              }}
              title="Translate"
            >
              <Globe size={16} />
              <ChevronDown size={12} />
            </button>

            {/* Language Dropdown Menu */}
            {showLanguageMenu && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop: '8px',
                  backgroundColor: 'rgba(245, 230, 211, 0.98)',
                  border: '2px solid #D4AF37',
                  borderRadius: '12px',
                  padding: '8px',
                  minWidth: '180px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  backdropFilter: 'blur(10px)',
                  zIndex: 100000,
                  animation: 'slideDown 0.2s ease-out',
                }}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleTranslate(lang)}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-left text-sm transition-all duration-150"
                    style={{
                      color: '#2C1810',
                      backgroundColor: 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>{lang.emoji}</span>
                    <span style={{ fontWeight: '500' }}>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Copy */}
          <button
            onClick={handleCopy}
            className="p-2 rounded-full transition-all duration-200 hover:scale-110"
            style={{
              color: copied ? '#10B981' : '#D4AF37',
            }}
            title={copied ? 'Copied!' : 'Copy Text'}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(10px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default TextSelectionPopup;
