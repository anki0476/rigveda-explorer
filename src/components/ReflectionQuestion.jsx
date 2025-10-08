import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReflectionQuestion = ({ question }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleAskRishi = () => {
    // Navigate to Ask Rishi with the question as URL parameter
    navigate(`/ask-rishi?question=${encodeURIComponent(question)}`);
  };

  return (
    <div 
      className="relative mb-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-2">
        <span className="text-[--color-gold] text-lg flex-shrink-0">•</span>
        <p className="text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed flex-1">
          {question}
        </p>
      </div>
      
      {/* Hover Button */}
      {isHovered && (
        <button
          onClick={handleAskRishi}
          className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg font-[family:--font-family-header] text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
          style={{
            backgroundColor: 'var(--color-gold)',
            color: 'var(--color-ink)',
            animation: 'fade-in-right 0.3s ease-out'
          }}
        >
          <span className="flex items-center gap-2">
            <span>🧘</span>
            <span>Ask Rishi AI</span>
          </span>
        </button>
      )}
    </div>
  );
};

export default ReflectionQuestion;
