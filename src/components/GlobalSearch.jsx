import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import deitiesData from '../data/deities.json';
import hymnsData from '../data/hymns.json';
import topicsData from '../data/topics.json';
import surpriseData from '../data/surpriseFacts.json';

const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search across all data
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchQuery = query.toLowerCase();
    const allResults = [];

    // Search Deities
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

    // Search Topics
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

    // Search Hymns
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

    // Search Surprise Facts
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

    setResults(allResults.slice(0, 8)); // Limit to 8 results
    setIsOpen(allResults.length > 0);
  }, [query]);

  const handleResultClick = (result) => {
    navigate(result.path);
    setQuery('');
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative">
        <Search 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[--color-ink-light]" 
          size={20} 
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
          placeholder="Search deities, hymns, topics..."
          className="w-full pl-10 pr-10 py-2 rounded-lg border-2 border-[--color-gold]/30 bg-[--color-parchment-light] text-[--color-ink] font-[family:--font-family-body] focus:outline-none focus:border-[--color-gold] transition-all"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[--color-ink-light] hover:text-[--color-ink] transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[--color-parchment-light] border-2 border-[--color-gold] rounded-lg shadow-2xl max-h-96 overflow-y-auto z-50">
          {results.map((result, idx) => (
            <div
              key={`${result.type}-${result.id}`}
              onClick={() => handleResultClick(result)}
              className="p-4 hover:bg-[--color-parchment-dark] cursor-pointer transition-colors border-b border-[--color-gold]/20 last:border-b-0"
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0">{result.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-[family:--font-family-header] text-[--color-ink] font-semibold mb-1">
                    {result.title}
                  </div>
                  <div className="text-sm text-[--color-ink-light] font-[family:--font-family-body] mb-1">
                    {result.subtitle}
                  </div>
                  {result.description && (
                    <div className="text-xs text-[--color-ink-light] font-[family:--font-family-body] line-clamp-2">
                      {result.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[--color-parchment-light] border-2 border-[--color-gold] rounded-lg shadow-2xl p-6 text-center z-50">
          <div className="text-4xl mb-2">🔍</div>
          <div className="text-[--color-ink] font-[family:--font-family-header] mb-1">
            No results found
          </div>
          <div className="text-sm text-[--color-ink-light] font-[family:--font-family-body]">
            Try searching for deities, topics, or hymns
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
