import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import deitiesData from '../data/deities.json';
import hymnsData from '../data/hymns.json';
import topicsData from '../data/topics.json';
import surpriseData from '../data/surpriseFacts.json';

// Typewriter Component
const TypewriterPlaceholder = () => {
  const words = ['deities...', 'hymns...', 'topics...', 'facts...'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
          setTypingSpeed(100);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
          setTypingSpeed(50);
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
          setTypingSpeed(500);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed, words]);

  return (
    <span className="inline-flex items-baseline">
      <span className="text-[--color-ink-light]">Search&nbsp;</span>
      <span className="text-[--color-ink-light]">
        {currentText}
        <span className="animate-blink">|</span>
      </span>
    </span>
  );
};

// Loading Skeleton Component
const SearchSkeleton = ({ count = 3 }) => {
  return (
    <div className="p-4 space-y-4">
      {[...Array(count)].map((_, idx) => (
        <div 
          key={idx} 
          className="flex items-start gap-3"
          style={{
            animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
            animationDelay: `${idx * 0.15}s`
          }}
        >
          {/* Icon Skeleton */}
          <div 
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'linear-gradient(90deg, rgba(218, 165, 32, 0.1) 25%, rgba(218, 165, 32, 0.25) 50%, rgba(218, 165, 32, 0.1) 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s infinite'
            }}
          />
          
          {/* Text Content Skeleton */}
          <div className="flex-1 space-y-2">
            {/* Title */}
            <div 
              style={{
                width: `${65 + (idx * 12)}%`,
                height: '20px',
                borderRadius: '4px',
                background: 'linear-gradient(90deg, rgba(218, 165, 32, 0.1) 25%, rgba(218, 165, 32, 0.25) 50%, rgba(218, 165, 32, 0.1) 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite'
              }}
            />
            
            {/* Subtitle */}
            <div 
              style={{
                width: '45%',
                height: '16px',
                borderRadius: '4px',
                background: 'linear-gradient(90deg, rgba(218, 165, 32, 0.1) 25%, rgba(218, 165, 32, 0.25) 50%, rgba(218, 165, 32, 0.1) 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite'
              }}
            />
            
            {/* Description lines */}
            <div 
              style={{
                width: '90%',
                height: '14px',
                borderRadius: '4px',
                background: 'linear-gradient(90deg, rgba(218, 165, 32, 0.1) 25%, rgba(218, 165, 32, 0.25) 50%, rgba(218, 165, 32, 0.1) 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite'
              }}
            />
            <div 
              style={{
                width: '65%',
                height: '14px',
                borderRadius: '4px',
                background: 'linear-gradient(90deg, rgba(218, 165, 32, 0.1) 25%, rgba(218, 165, 32, 0.25) 50%, rgba(218, 165, 32, 0.1) 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const updateDropdownPosition = () => {
    if (searchRef.current && isOpen) {
      const rect = searchRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width
      });
    }
  };

  // Highlight matching text function
  const highlightText = (text, query) => {
    if (!query.trim() || !text) return text;
    
    const regex = new RegExp(`(${query.trim()})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      if (part.toLowerCase() === query.toLowerCase()) {
        return (
          <span 
            key={index} 
            style={{ 
              backgroundColor: 'var(--color-gold)',
              color: 'var(--color-ink)',
              fontWeight: 600,
              padding: '0 2px',
              borderRadius: '2px'
            }}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  useEffect(() => {
    updateDropdownPosition();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const handleScroll = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          updateDropdownPosition();
        }
      };

      const handleResize = () => {
        updateDropdownPosition();
      };

      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target) &&
          dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    // Show loading skeleton
    setIsLoading(true);
    setIsOpen(true);

    // Simulate search delay for skeleton animation
    const searchTimer = setTimeout(() => {
      const searchQuery = query.toLowerCase();
      const allResults = [];

      deitiesData.deities.forEach(deity => {
        if (
          deity.name.toLowerCase().includes(searchQuery) ||
          deity.description?.toLowerCase().includes(searchQuery) ||
          deity.domains?.some(d => d.toLowerCase().includes(searchQuery))
        ) {
          allResults.push({
            type: 'deity',
            id: deity.id,
            title: deity.name,
            subtitle: deity.category + ' deity',
            description: deity.description?.substring(0, 80) + '...',
            icon: deity.iconSuggestion || '🕉️',
            path: '/deity-network'
          });
        }
      });

      topicsData.topics.forEach(topic => {
        if (
          topic.title.toLowerCase().includes(searchQuery) ||
          topic.description?.toLowerCase().includes(searchQuery) ||
          topic.keywords?.some(k => k.toLowerCase().includes(searchQuery))
        ) {
          allResults.push({
            type: 'topic',
            id: topic.id,
            title: topic.title,
            subtitle: 'Topic',
            description: topic.summary?.substring(0, 80) + '...',
            icon: topic.icon || '📚',
            path: `/rigveda-on/${topic.id}`
          });
        }
      });

      hymnsData.hymns.forEach(hymn => {
        if (
          hymn.id.toLowerCase().includes(searchQuery) ||
          hymn.translation?.title?.toLowerCase().includes(searchQuery) ||
          hymn.deity?.toLowerCase().includes(searchQuery) ||
          hymn.rishi?.toLowerCase().includes(searchQuery)
        ) {
          allResults.push({
            type: 'hymn',
            id: hymn.id,
            title: hymn.translation?.title || `Hymn ${hymn.id}`,
            subtitle: `${hymn.deity} • ${hymn.verses} verses`,
            description: hymn.translation?.summary?.substring(0, 80) + '...',
            icon: '📜',
            path: '/hymns'
          });
        }
      });

      surpriseData.facts.forEach((fact, idx) => {
        if (
          fact.fact.toLowerCase().includes(searchQuery) ||
          fact.category?.toLowerCase().includes(searchQuery)
        ) {
          allResults.push({
            type: 'fact',
            id: idx,
            title: fact.fact.substring(0, 60) + '...',
            subtitle: 'Surprise Fact',
            description: fact.category,
            icon: '✨',
            path: '/surprise-me'
          });
        }
      });

      setResults(allResults.slice(0, 8));
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(searchTimer);
  }, [query]);

  const handleResultClick = (result) => {
    console.log('🔍 Clicked result:', result.title, '→', result.path);
    setIsOpen(false);
    setQuery('');
    setResults([]);
    setTimeout(() => {
      console.log('🚀 Navigating to:', result.path);
      navigate(result.path);
    }, 100);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Loading Skeleton Portal with Glassmorphism
  const LoadingSkeletonPortal = () => {
    if (!isOpen || !isLoading) return null;

    return createPortal(
      <div 
        ref={dropdownRef}
        style={{
          position: 'fixed',
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          width: `${dropdownPosition.width}px`,
          maxHeight: '400px',
          zIndex: 9998,
          
          // 🔮 GLASSMORPHISM EFFECT
          background: 'rgba(250, 248, 243, 0.75)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          border: '1px solid rgba(218, 165, 32, 0.3)',
          borderRadius: '12px',
          boxShadow: '0 8px 32px 0 rgba(218, 165, 32, 0.2), 0 2px 8px 0 rgba(0, 0, 0, 0.1)',
        }}
      >
        <SearchSkeleton count={3} />
      </div>,
      document.body
    );
  };

  // Results Dropdown Portal with Glassmorphism
  const DropdownPortal = () => {
    if (!isOpen || isLoading || results.length === 0) return null;

    return createPortal(
      <>
        <div 
          ref={dropdownRef}
          className="custom-scrollbar"
          style={{ 
            position: 'fixed',
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`,
            maxHeight: '400px',
            overflowY: 'auto',
            zIndex: 9998,
            
            // 🔮 GLASSMORPHISM EFFECT
            background: 'rgba(250, 248, 243, 0.75)',
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            border: '1px solid rgba(218, 165, 32, 0.3)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px 0 rgba(218, 165, 32, 0.2), 0 2px 8px 0 rgba(0, 0, 0, 0.1)',
            
            overscrollBehavior: 'contain',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {results.map((result, idx) => (
            <div
              key={`${result.type}-${result.id}-${idx}`}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleResultClick(result);
              }}
              style={{
                width: '100%',
                padding: '1rem',
                cursor: 'pointer',
                borderBottom: idx < results.length - 1 ? '1px solid rgba(218, 165, 32, 0.15)' : 'none',
                transition: 'all 0.2s ease',
                borderRadius: idx === 0 ? '12px 12px 0 0' : idx === results.length - 1 ? '0 0 12px 12px' : '0'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(218, 165, 32, 0.12)';
                e.currentTarget.style.backdropFilter = 'blur(20px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.backdropFilter = 'blur(16px)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{result.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ 
                    fontFamily: 'var(--font-family-header)', 
                    color: 'var(--color-ink)', 
                    fontWeight: 600,
                    marginBottom: '0.25rem'
                  }}>
                    {highlightText(result.title, query)}
                  </div>
                  <div style={{ 
                    fontSize: '0.875rem', 
                    color: 'var(--color-ink-light)',
                    fontFamily: 'var(--font-family-body)',
                    marginBottom: '0.25rem'
                  }}>
                    {highlightText(result.subtitle, query)}
                  </div>
                  {result.description && (
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: 'var(--color-ink-light)',
                      fontFamily: 'var(--font-family-body)',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {highlightText(result.description, query)}
                    </div>
                  )}
                </div>
                <div style={{ 
                  color: 'var(--color-gold)', 
                  fontSize: '1.25rem', 
                  flexShrink: 0 
                }}>
                  →
                </div>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </>,
      document.body
    );
  };

  // No Results Portal with Glassmorphism
  const NoResultsPortal = () => {
    if (!isOpen || isLoading || query.length < 2 || results.length > 0) return null;

    return createPortal(
      <div 
        ref={dropdownRef}
        style={{
          position: 'fixed',
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          width: `${dropdownPosition.width}px`,
          zIndex: 9998,
          
          // 🔮 GLASSMORPHISM EFFECT
          background: 'rgba(250, 248, 243, 0.75)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          border: '1px solid rgba(218, 165, 32, 0.3)',
          borderRadius: '12px',
          boxShadow: '0 8px 32px 0 rgba(218, 165, 32, 0.2), 0 2px 8px 0 rgba(0, 0, 0, 0.1)',
          
          padding: '1.5rem',
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔍</div>
        <div style={{ 
          color: 'var(--color-ink)', 
          fontFamily: 'var(--font-family-header)',
          marginBottom: '0.25rem'
        }}>
          No results found
        </div>
        <div style={{ 
          fontSize: '0.875rem', 
          color: 'var(--color-ink-light)',
          fontFamily: 'var(--font-family-body)'
        }}>
          Try searching for deities, topics, or hymns
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <div ref={searchRef} className="relative w-full">
        <div className="relative">
          <Search 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[--color-ink-light] pointer-events-none" 
            size={20} 
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder=""
            className="w-full pl-10 pr-10 py-2 rounded-lg border-2 border-[--color-gold]/30 bg-[--color-parchment-light] text-[--color-ink] font-[family:--font-family-body] focus:outline-none focus:border-[--color-gold] transition-all"
          />
          
          {/* Typewriter Placeholder */}
          {!query && (
            <div className="absolute left-10 top-1/2 -translate-y-1/2 pointer-events-none">
              <TypewriterPlaceholder />
            </div>
          )}

          {query && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[--color-ink-light] hover:text-[--color-ink] transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <LoadingSkeletonPortal />
      <DropdownPortal />
      <NoResultsPortal />
    </>
  );
};

export default GlobalSearch;
