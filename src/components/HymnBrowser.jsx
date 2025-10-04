import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import hymnsData from '../data/hymns.json';
import BookLoadingAnimation from './BookLoadingAnimation';  // ← ADDED

const HymnBrowser = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMandala, setSelectedMandala] = useState('all');
  const [selectedDeity, setSelectedDeity] = useState('all');
  const [selectedHymn, setSelectedHymn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);  // ← ADDED
  const [hymns, setHymns] = useState([]);  // ← ADDED

  // Load hymns with delay
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setHymns(hymnsData.hymns);
      setIsLoading(false);
    }, 800);
  }, []);

  // Get unique mandalas and deities from loaded hymns
  const mandalas = [...new Set(hymns.map(h => h.mandala))].sort((a, b) => a - b);
  const deities = [...new Set(hymns.map(h => h.deity).filter(d => d))].sort();

  // Filter hymns (use hymns instead of hymnsData.hymns)
  const filteredHymns = hymns.filter(hymn => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      hymn.translation?.title?.toLowerCase().includes(searchLower) ||
      hymn.deity?.toLowerCase().includes(searchLower) ||
      hymn.rishi?.toLowerCase().includes(searchLower) ||
      hymn.translation?.summary?.toLowerCase().includes(searchLower) ||
      hymn.significance?.toLowerCase().includes(searchLower);
    
    const matchesMandala = selectedMandala === 'all' || hymn.mandala === parseInt(selectedMandala);
    const matchesDeity = selectedDeity === 'all' || hymn.deity === selectedDeity;
    
    return matchesSearch && matchesMandala && matchesDeity;
  });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedHymn) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedHymn]);

  // Modal Component using Portal
  const Modal = () => {
    if (!selectedHymn) return null;

    return createPortal(
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          overflow: 'auto'
        }}
        onClick={() => setSelectedHymn(null)}
      >
        <div
          style={{
            backgroundColor: 'var(--color-parchment-light)',
            borderRadius: '1rem',
            maxWidth: '48rem',
            width: '100%',
            maxHeight: '85vh',
            overflow: 'auto',
            position: 'relative',
            border: '4px solid var(--color-gold)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ padding: '2rem' }}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedHymn(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: 'var(--color-saffron)',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                lineHeight: 1
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = 'var(--color-gold)'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'var(--color-saffron)'}
            >
              ×
            </button>

            {/* Hymn Title */}
            <h2 style={{ 
              fontSize: '1.875rem', 
              fontFamily: 'var(--font-family-header)', 
              color: 'var(--color-ink)', 
              marginBottom: '1rem',
              paddingRight: '3rem'
            }}>
              {selectedHymn.translation?.title || `Hymn ${selectedHymn.id}`}
            </h2>

            {/* Metadata */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '0.75rem', 
              marginBottom: '1.5rem' 
            }}>
              <span style={{ 
                backgroundColor: 'rgba(212, 175, 55, 0.2)', 
                padding: '0.5rem 0.75rem', 
                borderRadius: '0.375rem', 
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                📖 Rigveda {selectedHymn.id}
              </span>
              {selectedHymn.deity && (
                <span style={{ 
                  backgroundColor: 'rgba(255, 140, 0, 0.2)', 
                  padding: '0.5rem 0.75rem', 
                  borderRadius: '0.375rem', 
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  🙏 {selectedHymn.deity}
                </span>
              )}
              {selectedHymn.rishi && (
                <span style={{ 
                  backgroundColor: 'rgba(212, 175, 55, 0.2)', 
                  padding: '0.5rem 0.75rem', 
                  borderRadius: '0.375rem', 
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  ✍️ {selectedHymn.rishi}
                </span>
              )}
              <span style={{ 
                backgroundColor: 'rgba(212, 175, 55, 0.2)', 
                padding: '0.5rem 0.75rem', 
                borderRadius: '0.375rem', 
                fontSize: '0.875rem',
                fontWeight: '600'
              }}>
                📜 {selectedHymn.verses} verses
              </span>
              {selectedHymn.meter && (
                <span style={{ 
                  backgroundColor: 'rgba(212, 175, 55, 0.2)', 
                  padding: '0.5rem 0.75rem', 
                  borderRadius: '0.375rem', 
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  🎵 {selectedHymn.meter}
                </span>
              )}
            </div>

            {/* Summary */}
            {selectedHymn.translation?.summary && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontFamily: 'var(--font-family-header)', 
                  color: 'var(--color-ink)', 
                  marginBottom: '0.5rem' 
                }}>
                  Summary
                </h3>
                <p style={{ 
                  color: 'var(--color-ink-light)', 
                  fontFamily: 'var(--font-family-body)', 
                  lineHeight: 1.75 
                }}>
                  {selectedHymn.translation.summary}
                </p>
              </div>
            )}

            {/* Verses */}
            {selectedHymn.translation?.verses && selectedHymn.translation.verses.length > 0 && (
              <div style={{ 
                marginBottom: '1.5rem', 
                padding: '1rem', 
                backgroundColor: 'var(--color-parchment-dark)', 
                borderRadius: '0.5rem', 
                borderLeft: '4px solid var(--color-saffron)' 
              }}>
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontFamily: 'var(--font-family-header)', 
                  color: 'var(--color-ink)', 
                  marginBottom: '0.75rem' 
                }}>
                  Selected Verses
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {selectedHymn.translation.verses.slice(0, 5).map((verse, idx) => (
                    <p key={idx} style={{ 
                      color: 'var(--color-ink)', 
                      fontFamily: 'var(--font-family-body)', 
                      fontStyle: 'italic', 
                      lineHeight: 1.75 
                    }}>
                      "{verse}"
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Context */}
            {selectedHymn.translation?.context && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontFamily: 'var(--font-family-header)', 
                  color: 'var(--color-ink)', 
                  marginBottom: '0.5rem' 
                }}>
                  Context
                </h3>
                <p style={{ 
                  color: 'var(--color-ink-light)', 
                  fontFamily: 'var(--font-family-body)', 
                  lineHeight: 1.75 
                }}>
                  {selectedHymn.translation.context}
                </p>
              </div>
            )}

            {/* Significance */}
            {selectedHymn.significance && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontFamily: 'var(--font-family-header)', 
                  color: 'var(--color-ink)', 
                  marginBottom: '0.5rem' 
                }}>
                  Significance
                </h3>
                <p style={{ 
                  color: 'var(--color-ink-light)', 
                  fontFamily: 'var(--font-family-body)', 
                  lineHeight: 1.75 
                }}>
                  {selectedHymn.significance}
                </p>
              </div>
            )}

            {/* Topics */}
            {selectedHymn.topics && selectedHymn.topics.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontFamily: 'var(--font-family-header)', 
                  color: 'var(--color-ink)', 
                  marginBottom: '0.75rem' 
                }}>
                  Related Topics
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedHymn.topics.map((topic, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: 'rgba(212, 175, 55, 0.2)',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem',
                        color: 'var(--color-ink-light)',
                        textTransform: 'capitalize'
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Modern Application */}
            {selectedHymn.translation?.modernApplication && (
              <div style={{ 
                backgroundColor: 'rgba(212, 175, 55, 0.1)', 
                padding: '1rem', 
                borderRadius: '0.5rem', 
                border: '2px solid rgba(212, 175, 55, 0.3)' 
              }}>
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontFamily: 'var(--font-family-header)', 
                  color: 'var(--color-saffron)', 
                  marginBottom: '0.5rem' 
                }}>
                  Modern Application
                </h3>
                <p style={{ 
                  color: 'var(--color-ink-light)', 
                  fontFamily: 'var(--font-family-body)', 
                  lineHeight: 1.75 
                }}>
                  {selectedHymn.translation.modernApplication}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>,
      document.body
    );
  };

  // ← ADDED: Show book animation while loading
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-[family:--font-family-header] text-[--color-ink] mb-3">
            📜 Hymn Browser
          </h1>
          <p className="text-lg text-[--color-ink-light] font-[family:--font-family-body]">
            Explore sacred verses from the Rig Veda
          </p>
        </div>
        <BookLoadingAnimation size="medium" text="Loading sacred hymns..." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-[family:--font-family-header] text-[--color-ink] mb-3">
          📜 Hymn Browser
        </h1>
        <p className="text-lg text-[--color-ink-light] font-[family:--font-family-body]">
          Explore {hymns.length} sacred hymns from the Rigveda
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div>
          <input
            type="text"
            placeholder="Search by title, deity, rishi, or theme..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-[--color-gold]/30 bg-[--color-parchment-light] text-[--color-ink] font-[family:--font-family-body] focus:outline-none focus:border-[--color-gold]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          {/* Mandala Filter */}
          <select
            value={selectedMandala}
            onChange={(e) => setSelectedMandala(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 border-[--color-gold]/30 bg-[--color-parchment-light] text-[--color-ink] font-[family:--font-family-body] cursor-pointer"
          >
            <option value="all">All Mandalas</option>
            {mandalas.map(m => (
              <option key={m} value={m}>Mandala {m}</option>
            ))}
          </select>

          {/* Deity Filter */}
          <select
            value={selectedDeity}
            onChange={(e) => setSelectedDeity(e.target.value)}
            className="px-4 py-2 rounded-lg border-2 border-[--color-gold]/30 bg-[--color-parchment-light] text-[--color-ink] font-[family:--font-family-body] cursor-pointer"
          >
            <option value="all">All Deities</option>
            {deities.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Results Count */}
          <div className="flex items-center px-4 py-2 bg-[--color-parchment-dark] rounded-lg">
            <span className="text-[--color-ink-light] font-[family:--font-family-body] text-sm">
              {filteredHymns.length} hymn{filteredHymns.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>
      </div>

      {/* Hymn Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHymns.map((hymn, index) => (
          <div
            key={index}
            onClick={() => setSelectedHymn(hymn)}
            className="bg-[--color-parchment-light] p-6 rounded-lg border-2 border-[--color-gold]/30 hover:border-[--color-gold] transition-all cursor-pointer hover:shadow-lg"
          >
            {/* Hymn Header */}
            <div className="mb-4">
              <h3 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-2">
                {hymn.translation?.title || `Hymn ${hymn.id}`}
              </h3>
              <div className="flex items-center gap-2 text-sm text-[--color-ink-light] flex-wrap">
                <span className="bg-[--color-gold]/20 px-2 py-1 rounded">
                  {hymn.id}
                </span>
                {hymn.deity && (
                  <span className="bg-[--color-saffron]/20 px-2 py-1 rounded">
                    {hymn.deity}
                  </span>
                )}
              </div>
            </div>

            {/* Summary */}
            <p className="text-sm text-[--color-ink-light] font-[family:--font-family-body] mb-3 line-clamp-3">
              {hymn.translation?.summary || hymn.significance}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-4 text-xs text-[--color-ink-light]">
              <span>📜 {hymn.verses} verses</span>
              {hymn.rishi && <span className="line-clamp-1">✍️ {hymn.rishi}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredHymns.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-[--color-ink-light] font-[family:--font-family-body]">
            No hymns found matching your criteria
          </p>
        </div>
      )}

      {/* Render Modal */}
      <Modal />
    </div>
  );
};

export default HymnBrowser;
