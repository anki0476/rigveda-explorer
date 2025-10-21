import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import topics from '../data/topics.json';
import BookLoadingAnimation from './BookLoadingAnimation';  // ← ADDED

const TopicGrid = () => {
  const [isLoading, setIsLoading] = useState(true);  // ← ADDED
  const [topicsList, setTopicsList] = useState([]);  // ← ADDED

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

  // ← ADDED: Show book animation while loading
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
        {topicsList.map((topic) => (
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
  );
};

export default TopicGrid;
