import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import topics from '../data/topics.json';
import BookLoadingAnimation from './BookLoadingAnimation';
import RishiWelcome from './RishiWelcome';

const TopicGrid = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [topicsList, setTopicsList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setTopicsList(topics.topics);
      setIsLoading(false);
    }, 800);
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-600 text-white';
      case 'intermediate':
        return 'bg-yellow-600 text-white';
      case 'advanced':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const visibleTopics = topicsList.slice(0, visibleCount);
  const hasMore = visibleCount < topicsList.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 9, topicsList.length));
  };

  // Show book animation while loading
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-[family:--font-family-header] text-[--color-ink] mb-4">
            📚 Rig Veda On...
          </h1>
          <p className="text-xl text-[--color-ink-light] font-[family:--font-family-body] max-w-3xl mx-auto">
            Explore profound Vedic wisdom on life's essential topics
          </p>
        </div>
        <BookLoadingAnimation size="medium" text="Opening the ancient texts..." />
      </div>
    );
  }

  return (
    <>
      {/* Rishi Welcome Popup */}
      <RishiWelcome
        image="/images/rishi-mascot-rigveda-on.png"
        dialogue="Get a brand new perspective on Core Life Topics through the lens of RigVeda!!"
        storageKey="rigvedaOnWelcome"
      />

      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-[family:--font-family-header] text-[--color-ink] mb-4">
            📚 Rig Veda On...
          </h1>
          <p className="text-xl text-[--color-ink-light] font-[family:--font-family-body] max-w-3xl mx-auto">
            Explore profound Vedic wisdom on life's essential topics. Each section reveals ancient insights 
            with modern relevance, complete with original Sanskrit verses and contemporary applications.
          </p>
        </div>

        {/* Topic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {visibleTopics.map((topic) => (
            <Link
              key={topic.id}
              to={`/rigveda-on/${topic.id}`}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              style={{ background: topic.gradient }}
            >
              {/* Card Content */}
              <div className="relative p-6 h-full min-h-[220px] flex flex-col justify-between">
                {/* Difficulty Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getDifficultyColor(topic.difficulty)}`}>
                    {topic.difficulty}
                  </span>
                </div>

                {/* Icon */}
                <div className="text-6xl mb-4">
                  {topic.icon}
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-2xl font-[family:--font-family-header] text-white mb-2 drop-shadow-lg">
                    {topic.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/90 font-[family:--font-family-body] text-sm leading-relaxed mb-3">
                    {topic.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-white/80 text-sm">
                    <span className="flex items-center gap-1">
                      📜 {topic.hymnCount} hymns
                    </span>
                    <span className="flex items-center gap-1">
                      🔗 {topic.relatedTopics?.length || 0} related
                    </span>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 pointer-events-none" />
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
            <div className="flex flex-col items-center gap-4 mb-12">
                <button
                    onClick={loadMore}
                    className="group relative px-10 py-4 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 
                             text-white text-lg font-[family:--font-family-header] rounded-full shadow-xl 
                             hover:shadow-2xl hover:from-orange-700 hover:via-orange-600 hover:to-amber-700
                             transform hover:scale-105 transition-all duration-300
                             flex items-center gap-3 border-2 border-white/20"
                >
                    <span className="font-bold tracking-wide">LOAD MORE TOPICS</span>
                    <svg 
                        className="w-5 h-5 transform group-hover:translate-y-1 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <div className="text-center text-[--color-ink] font-[family:--font-family-body] text-base font-semibold">
                    Showing {visibleTopics.length} of {topicsList.length} topics
                </div>
            </div>
        )}


        {/* Info Section */}
        <div className="bg-[--color-parchment-light] p-8 rounded-lg border-2 border-[--color-gold]/40">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-2">📖</div>
              <h4 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-2">
                Original Texts
              </h4>
              <p className="text-[--color-ink-light] font-[family:--font-family-body] text-sm">
                Sanskrit verses with transliterations and English translations
              </p>
            </div>
            
            <div>
              <div className="text-4xl mb-2">🔬</div>
              <h4 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-2">
                Modern Connections
              </h4>
              <p className="text-[--color-ink-light] font-[family:--font-family-body] text-sm">
                Links to contemporary fields like psychology, ecology, and ethics
              </p>
            </div>
            
            <div>
              <div className="text-4xl mb-2">💭</div>
              <h4 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-2">
                Deep Exploration
              </h4>
              <p className="text-[--color-ink-light] font-[family:--font-family-body] text-sm">
                Key concepts, metaphors, and questions for reflection
              </p>
            </div>
          </div>
        </div>

        {/* Keywords Preview */}
        <div className="mt-8 p-6 bg-[--color-parchment-dark] rounded-lg">
          <h3 className="text-lg font-[family:--font-family-header] text-[--color-ink] mb-4 text-center">
            🔍 Explore Concepts Like:
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {topicsList.flatMap(topic => topic.keywords.slice(0, 2)).map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[--color-parchment-light] text-[--color-ink-light] rounded-full text-sm font-[family:--font-family-body] border border-[--color-gold]/20"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopicGrid;
