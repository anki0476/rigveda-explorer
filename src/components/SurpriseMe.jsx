import React, { useState, useEffect } from 'react';
import facts from '../data/surpriseFacts.json';
import BookLoadingAnimation from './BookLoadingAnimation';  // ← ADDED

const SurpriseMe = () => {
  const [currentFact, setCurrentFact] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);  // ← ADDED

  // Get random fact
  const generateRandomFact = (category = 'all') => {
    let filteredFacts = facts.facts;
    
    if (category !== 'all') {
      filteredFacts = facts.facts.filter(fact => fact.category === category);
    }
    
    const randomIndex = Math.floor(Math.random() * filteredFacts.length);
    setCurrentFact(filteredFacts[randomIndex]);
  };

  // Generate first fact on component mount with loading
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      generateRandomFact();
      setIsLoading(false);
    }, 800);
  }, []);

  const categories = [
    { id: 'all', label: 'All Facts', icon: '🎲' },
    { id: 'linguistics', label: 'Linguistics', icon: '📝' },
    { id: 'philosophy', label: 'Philosophy', icon: '🧠' },
    { id: 'mythology', label: 'Mythology', icon: '⚡' },
    { id: 'science', label: 'Science', icon: '🔬' },
    { id: 'connections', label: 'Connections', icon: '🔗' }
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    generateRandomFact(categoryId);
  };

  // ← ADDED: Show book animation while loading
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-4xl font-[family:--font-family-header] text-[--color-ink] mb-4 text-center">
          ✨ Surprise Me!
        </h1>
        <p className="text-lg text-[--color-ink-light] text-center mb-8">
          Discover fascinating facts from the Rigveda
        </p>
        <BookLoadingAnimation size="medium" text="Finding a surprise..." />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-[family:--font-family-header] text-[--color-ink] mb-4 text-center">
        ✨ Surprise Me!
      </h1>
      <p className="text-lg text-[--color-ink-light] text-center mb-8">
        Discover fascinating facts, hidden connections, and linguistic gems from the Rigveda
      </p>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className={`px-4 py-2 rounded-lg font-[family:--font-family-body] transition-all ${
              selectedCategory === cat.id
                ? 'bg-[--color-gold] text-[--color-ink] shadow-lg scale-105'
                : 'bg-[--color-parchment-dark] text-[--color-ink-light] hover:bg-[--color-gold]/30'
            }`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Fact Display Card */}
      {currentFact && (
        <div className="bg-[--color-parchment-light] p-8 rounded-lg border-4 border-double border-[--color-gold]/40 shadow-2xl mb-8">
          {/* Category Badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-[--color-saffron]/20 text-[--color-saffron] rounded-full text-sm font-[family:--font-family-header] uppercase">
              {currentFact.category}
            </span>
            <span className="text-3xl">
              {currentFact.funFactor >= 9 ? '🔥' : currentFact.funFactor >= 7 ? '✨' : '💡'}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-[family:--font-family-header] text-[--color-ink] mb-4">
            {currentFact.title}
          </h2>

          {/* Fact Content */}
          <p className="text-lg text-[--color-ink-light] leading-relaxed mb-6 font-[family:--font-family-body]">
            {currentFact.fact}
          </p>

          {/* Share Text */}
          <div className="bg-[--color-parchment-dark] p-4 rounded-lg border-l-4 border-[--color-gold]">
            <p className="text-sm text-[--color-ink-light] font-[family:--font-family-body] italic">
              📱 Share: "{currentFact.shareText}"
            </p>
          </div>
        </div>
      )}

      {/* Generate Button */}
      <div className="text-center">
        <button
          onClick={() => generateRandomFact(selectedCategory)}
          className="px-8 py-4 bg-[--color-gold] text-[--color-ink] font-[family:--font-family-header] text-xl rounded-lg hover:bg-[--color-saffron] transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          🎲 Generate Another Fact
        </button>
      </div>
    </div>
  );
};

export default SurpriseMe;
