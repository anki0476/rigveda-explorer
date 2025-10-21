import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import topics from '../data/topics.json';
import topicContentData from '../data/topicContent.json';

// ReflectionQuestion Component
const ReflectionQuestion = ({ question }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleAskRishi = () => {
    navigate(`/ask-rishi?question=${encodeURIComponent(question)}`);
  };

  return (
    <li 
      className="flex items-start gap-3 relative py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="text-[--color-gold] text-xl flex-shrink-0">💭</span>
      <p className="text-[--color-ink-light] font-[family:--font-family-body] flex-1">
        {question}
      </p>
      
      {/* Hover Button */}
      {isHovered && (
        <button
          onClick={handleAskRishi}
          className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg font-[family:--font-family-header] text-sm transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in-right"
          style={{
            backgroundColor: 'var(--color-gold)',
            color: 'var(--color-ink)',
          }}
        >
          <span className="flex items-center gap-2 whitespace-nowrap">
            <span>🧘</span>
            <span>Ask Rishi AI</span>
          </span>
        </button>
      )}
    </li>
  );
};

const TopicDetail = () => {
  const { topic: topicId } = useParams();
  
  // Get topic metadata
  const topicMeta = topics.topics.find(t => t.id === topicId);
  
  // Get topic content - handle both wrapped and direct structures
  const topicContent = topicContentData.topicContent || topicContentData.topics || topicContentData;
  const content = topicContent[topicId];

  console.log('URL topicId:', topicId);
  console.log('topicContent structure:', Object.keys(topicContentData));
  console.log('Available topic IDs:', Object.keys(topicContent));
  console.log('Looking for content:', content);
  console.log('Found topicMeta:', topicMeta);

  if (!topicMeta || !content) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-4xl font-[family:--font-family-header] text-[--color-ink] mb-4">
          Topic Not Found
        </h1>
        <Link to="/rigveda-on" className="text-[--color-gold] hover:underline">
          ← Back to Topics
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto p-8">
        {/* Back Button */}
        <Link 
          to="/rigveda-on"
          className="inline-flex items-center gap-2 text-[--color-ink-light] hover:text-[--color-ink] font-[family:--font-family-body] mb-6 transition-colors"
        >
          ← Back to Topics
        </Link>

        {/* Header with Gradient */}
        <div 
          className="rounded-xl p-8 mb-8 text-white shadow-xl"
          style={{ background: topicMeta.gradient }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{topicMeta.icon}</span>
            <div>
              <h1 className="text-4xl font-[family:--font-family-header] mb-2">
                {topicMeta.title}
              </h1>
              <p className="text-white/90 text-lg font-[family:--font-family-body]">
                {topicMeta.description}
              </p>
            </div>
          </div>
          <div className="flex gap-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">
              📜 {topicMeta.hymnCount} hymns
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full">
              {topicMeta.difficulty}
            </span>
          </div>
        </div>

        {/* Introduction */}
        {content.introduction && (
          <section className="mb-12">
            <h2 className="text-3xl font-[family:--font-family-header] text-[--color-ink] mb-4 pb-2 border-b-2 border-[--color-gold]/30">
              Introduction
            </h2>
            <div className="bg-[--color-parchment-light] p-6 rounded-lg">
              {content.introduction.opening && (
                <p className="text-xl text-[--color-saffron] font-[family:--font-family-body] italic mb-4">
                  {content.introduction.opening}
                </p>
              )}
              {content.introduction.body && content.introduction.body.map((paragraph, index) => (
                <p key={index} className="text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Key Concepts */}
        {content.keyConcepts && content.keyConcepts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-[family:--font-family-header] text-[--color-ink] mb-6 pb-2 border-b-2 border-[--color-gold]/30">
              Key Concepts
            </h2>
            <div className="grid gap-6">
              {content.keyConcepts.map((concept, index) => (
                <div key={index} className="bg-[--color-parchment-light] p-6 rounded-lg border-l-4 border-[--color-gold]">
                  <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                    <h3 className="text-2xl font-[family:--font-family-header] text-[--color-ink]">
                      {concept.term}
                    </h3>
                    {concept.sanskrit && (
                      <span className="text-xl font-[family:--font-family-sanskrit] text-[--color-saffron]">
                        ({concept.sanskrit})
                      </span>
                    )}
                  </div>
                  <p className="text-[--color-ink] font-[family:--font-family-body] font-semibold mb-2">
                    {concept.definition}
                  </p>
                  <p className="text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed mb-3">
                    {concept.explanation}
                  </p>
                  {concept.modernParallel && (
                    <div className="bg-[--color-parchment-dark] p-3 rounded">
                      <p className="text-sm text-[--color-ink-light] font-[family:--font-family-body]">
                        <strong className="text-[--color-saffron]">Modern parallel:</strong> {concept.modernParallel}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Hymns */}
        {content.hymns && content.hymns.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-[family:--font-family-header] text-[--color-ink] mb-6 pb-2 border-b-2 border-[--color-gold]/30">
              Sacred Hymns
            </h2>
            <div className="space-y-8">
              {content.hymns.map((hymn, index) => (
                <div key={index} className="bg-[--color-parchment-light] p-6 rounded-lg border-2 border-[--color-gold]/30">
                  {/* Hymn Header */}
                  <div className="mb-4 pb-4 border-b border-[--color-gold]/20">
                    <h3 className="text-2xl font-[family:--font-family-header] text-[--color-ink] mb-2">
                      {hymn.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-[--color-ink-light]">
                      <span>📖 Rigveda {hymn.reference}</span>
                      {hymn.deity && <span>🙏 Deity: {hymn.deity}</span>}
                      {hymn.rishi && <span>✍️ Rishi: {hymn.rishi}</span>}
                      {hymn.verses && <span>📜 {hymn.verses} verses</span>}
                    </div>
                  </div>

                  {/* Hymn Excerpt */}
                  {hymn.excerpt && (
                    <div className="bg-[--color-parchment-dark] p-4 rounded-lg mb-4 border-l-4 border-[--color-saffron]">
                      <p className="text-[--color-ink] font-[family:--font-family-body] italic leading-relaxed">
                        "{hymn.excerpt}"
                      </p>
                    </div>
                  )}

                  {/* Context */}
                  {hymn.context && (
                    <div className="mb-4">
                      <h4 className="text-lg font-[family:--font-family-header] text-[--color-ink] mb-2">
                        Context
                      </h4>
                      <p className="text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed">
                        {hymn.context}
                      </p>
                    </div>
                  )}

                  {/* Significance */}
                  {hymn.significance && (
                    <div className="mb-4">
                      <h4 className="text-lg font-[family:--font-family-header] text-[--color-ink] mb-2">
                        Significance
                      </h4>
                      <p className="text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed">
                        {hymn.significance}
                      </p>
                    </div>
                  )}

                  {/* Modern Relevance */}
                  {hymn.modernRelevance && (
                    <div className="bg-[--color-gold]/10 p-4 rounded-lg">
                      <h4 className="text-lg font-[family:--font-family-header] text-[--color-saffron] mb-2">
                        Modern Relevance
                      </h4>
                      <p className="text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed">
                        {hymn.modernRelevance}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Metaphors */}
        {content.metaphors && content.metaphors.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-[family:--font-family-header] text-[--color-ink] mb-6 pb-2 border-b-2 border-[--color-gold]/30">
              Metaphors & Symbolism
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {content.metaphors.map((metaphor, index) => (
                <div key={index} className="bg-[--color-parchment-light] p-5 rounded-lg border border-[--color-gold]/20">
                  <h4 className="text-lg font-[family:--font-family-header] text-[--color-saffron] mb-2">
                    {metaphor.title}
                  </h4>
                  <p className="text-[--color-ink-light] font-[family:--font-family-body] text-sm">
                    {metaphor.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Modern Relevance */}
        {content.modernRelevance && content.modernRelevance.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-[family:--font-family-header] text-[--color-ink] mb-6 pb-2 border-b-2 border-[--color-gold]/30">
              Connections to Modern Fields
            </h2>
            <div className="grid gap-4">
              {content.modernRelevance.map((field, index) => (
                <div key={index} className="bg-[--color-parchment-light] p-5 rounded-lg">
                  <h4 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-2">
                    {field.field}
                  </h4>
                  <p className="text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed">
                    {field.connection}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Discussion Questions - UPDATED WITH INTERACTIVE BUTTONS */}
        {content.suggestedQuestions && content.suggestedQuestions.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-[family:--font-family-header] text-[--color-ink] mb-6 pb-2 border-b-2 border-[--color-gold]/30">
              Questions for Reflection
            </h2>
            <div className="bg-[--color-parchment-light] p-6 rounded-lg">
              <ul className="space-y-4">
                {content.suggestedQuestions.map((question, index) => (
                  <ReflectionQuestion 
                    key={index} 
                    question={question} 
                  />
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Related Topics */}
        {topicMeta.relatedTopics && topicMeta.relatedTopics.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-[family:--font-family-header] text-[--color-ink] mb-4">
              Explore Related Topics
            </h2>
            <div className="flex flex-wrap gap-3">
              {topicMeta.relatedTopics.map((relatedId) => {
                const related = topics.topics.find(t => t.id === relatedId);
                return related ? (
                  <Link
                    key={relatedId}
                    to={`/rigveda-on/${relatedId}`}
                    className="px-4 py-2 rounded-lg font-[family:--font-family-body] text-white hover:scale-105 transition-transform"
                    style={{ background: related.gradient }}
                  >
                    {related.icon} {related.shortTitle || related.title}
                  </Link>
                ) : null;
              })}
            </div>
          </section>
        )}

        {/* Back to Topics */}
        <div className="text-center pt-8 border-t border-[--color-gold]/20">
          <Link
            to="/rigveda-on"
            className="inline-block px-6 py-3 bg-[--color-gold] text-[--color-ink] font-[family:--font-family-header] rounded-lg hover:bg-[--color-saffron] transition-colors"
          >
            ← Back to All Topics
          </Link>
        </div>
      </div>

      {/* Add CSS for fade-in animation */}
      <style>{`
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(-10px) translateY(-50%);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(-50%);
          }
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default TopicDetail;
