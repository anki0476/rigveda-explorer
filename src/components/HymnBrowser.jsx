import React, { useState, useEffect, lazy, Suspense } from 'react';
import { createPortal } from 'react-dom';
import hymnsData from '../data/hymns_expanded.json';
// ✅ IMPORT complete data at top level (not dynamically)
import hymnsComplete from '../data/hymns_complete.json';
import BookLoadingAnimation from './BookLoadingAnimation';
import AudioPlayer from './AudioPlayer';
import RishiWelcome from './RishiWelcome';
import { getHymnUrl } from '../config/audioConfig';

const HymnBrowser = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMandala, setSelectedMandala] = useState('all');
  const [selectedDeity, setSelectedDeity] = useState('all');
  const [selectedHymn, setSelectedHymn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hymns, setHymns] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [completeVersesData, setCompleteVersesData] = useState(hymnsComplete); // ✅ Cache complete data
  const [isLoadingVerses, setIsLoadingVerses] = useState(false);
  const [showOnlyWithAudio, setShowOnlyWithAudio] = useState(false);

  // ✅ FIXED: Load verses from pre-imported data (no dynamic import)
  const loadCompleteVerses = (hymnId) => {
    setIsLoadingVerses(true);
    
    try {
      // Data is already loaded at component start
      const completeHymn = completeVersesData.hymns.find(h => h.id === hymnId);
      
      setTimeout(() => setIsLoadingVerses(false), 300); // Brief delay for UX
      
      return completeHymn?.content || null;
    } catch (error) {
      console.error('Error accessing complete verses:', error);
      setIsLoadingVerses(false);
      return null;
    }
  };

  // ⚡ Load hymns WITHOUT artificial delay
  useEffect(() => {
    setIsLoading(true);
    requestAnimationFrame(() => {
      setHymns(hymnsData.hymns);
      setIsLoading(false);
    });
  }, []);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(9);
  }, [searchQuery, selectedMandala, selectedDeity, showOnlyWithAudio]);

  // Get unique mandalas and deities
  const mandalas = [...new Set(hymns.map(h => h.mandala))].sort((a, b) => a - b);
  const deities = [...new Set(hymns.map(h => h.deity).filter(d => d))].sort();

  // Filter hymns
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
    const matchesAudio = !showOnlyWithAudio || getHymnUrl(hymn.id);
    
    return matchesSearch && matchesMandala && matchesDeity && matchesAudio;
  });

  const visibleHymns = filteredHymns.slice(0, visibleCount);
  const hasMore = visibleCount < filteredHymns.length;
  const loadMore = () => setVisibleCount(prev => Math.min(prev + 9, filteredHymns.length));

  // ✅ Optimized hymn click handler
  const handleHymnClick = (hymn) => {
    // Get complete content immediately (no async delay)
    const completeContent = loadCompleteVerses(hymn.id);
    
    setSelectedHymn({
      ...hymn,
      completeContent: completeContent
    });
  };

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

  // Modal Component
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
          {/* ✅ Loading overlay only shows briefly */}
          {isLoadingVerses && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(250, 245, 230, 0.95)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '1rem',
              gap: '1rem'
            }}>
              <BookLoadingAnimation size="small" text="Loading Sanskrit verses..." />
              <p style={{ 
                color: 'var(--color-ink-light)', 
                fontSize: '0.875rem',
                textAlign: 'center',
                maxWidth: '300px'
              }}>
                Loading verses...
              </p>
            </div>
          )}

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
                lineHeight: 1,
                zIndex: 10
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

            {/* AUDIO PLAYER */}
            {getHymnUrl(selectedHymn.id) && (
              <AudioPlayer 
                hymnId={selectedHymn.id}
                hymnTitle={selectedHymn.translation?.title || `Hymn ${selectedHymn.id}`}
                audioUrl={getHymnUrl(selectedHymn.id)}
              />
            )}

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

            {/* ✅ HYMN VERSES: Display immediately */}
            {selectedHymn.completeContent && selectedHymn.completeContent.translation && selectedHymn.completeContent.translation.length > 0 ? (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontFamily: 'var(--font-family-header)', 
                  color: 'var(--color-ink)', 
                  marginBottom: '0.75rem' 
                }}>
                  📜 Complete Hymn Verses
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {selectedHymn.completeContent.translation.map((translation, index) => (
                    <div 
                      key={index} 
                      style={{ 
                        padding: '1rem', 
                        backgroundColor: 'var(--color-parchment-dark)', 
                        borderRadius: '0.5rem', 
                        border: '2px solid var(--color-gold)',
                        borderLeft: '4px solid var(--color-saffron)'
                      }}
                    >
                      {/* Verse Number Badge */}
                      <div style={{ marginBottom: '0.75rem' }}>
                        <span style={{ 
                          backgroundColor: 'var(--color-saffron)', 
                          color: 'white',
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '0.375rem', 
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          fontFamily: 'var(--font-family-header)'
                        }}>
                          Verse {index + 1}
                        </span>
                      </div>
                      
                      {/* Sanskrit (Devanagari) */}
                      {selectedHymn.completeContent.sanskrit && selectedHymn.completeContent.sanskrit[index] && (
                        <div style={{ marginBottom: '0.75rem' }}>
                          <p style={{ 
                            fontSize: '0.75rem', 
                            fontWeight: 'bold', 
                            color: 'var(--color-saffron)', 
                            marginBottom: '0.25rem',
                            fontFamily: 'var(--font-family-header)'
                          }}>
                            Sanskrit (Devanagari):
                          </p>
                          <p style={{ 
                            fontSize: '1.125rem', 
                            lineHeight: 1.75, 
                            color: 'var(--color-ink)', 
                            fontFamily: 'serif'
                          }}>
                            {selectedHymn.completeContent.sanskrit[index]}
                          </p>
                        </div>
                      )}
                      
                      {/* Transliteration (IAST) */}
                      {selectedHymn.completeContent.transliteration && selectedHymn.completeContent.transliteration[index] && (
                        <div style={{ marginBottom: '0.75rem' }}>
                          <p style={{ 
                            fontSize: '0.75rem', 
                            fontWeight: 'bold', 
                            color: 'var(--color-saffron)', 
                            marginBottom: '0.25rem',
                            fontFamily: 'var(--font-family-header)'
                          }}>
                            Transliteration (IAST):
                          </p>
                          <p style={{ 
                            lineHeight: 1.75, 
                            fontStyle: 'italic', 
                            color: 'var(--color-ink)',
                            fontFamily: 'var(--font-family-body)'
                          }}>
                            {selectedHymn.completeContent.transliteration[index]}
                          </p>
                        </div>
                      )}
                      
                      {/* English Translation */}
                      <div>
                        <p style={{ 
                          fontSize: '0.75rem', 
                          fontWeight: 'bold', 
                          color: 'var(--color-saffron)', 
                          marginBottom: '0.25rem',
                          fontFamily: 'var(--font-family-header)'
                        }}>
                          Translation (Griffith):
                        </p>
                        <p style={{ 
                          lineHeight: 1.75, 
                          color: 'var(--color-ink)',
                          fontFamily: 'var(--font-family-body)'
                        }}>
                          "{translation}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Attribution Footer */}
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '0.75rem', 
                  backgroundColor: 'rgba(212, 175, 55, 0.1)', 
                  borderRadius: '0.375rem',
                  border: '1px solid var(--color-gold)'
                }}>
                  <p style={{ 
                    fontSize: '0.75rem', 
                    color: 'var(--color-ink)', 
                    fontFamily: 'var(--font-family-body)'
                  }}>
                    <strong>Source:</strong> VedaWeb Project (University of Cologne) • 
                    <strong> Sanskrit:</strong> Eichler • 
                    <strong> Transliteration:</strong> Van Nooten & Holland • 
                    <strong> Translation:</strong> R.T.H. Griffith
                  </p>
                </div>
              </div>
            ) : selectedHymn.translation?.verses && selectedHymn.translation.verses.length > 0 && (
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
                  {selectedHymn.translation.verses.map((verse, idx) => (
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
    <>
      <RishiWelcome
        image="/images/rishi-mascot-hymns.png"
        dialogue="Welcome to the Hymn Browser! Dive deep into the sacred verses of the RigVeda. Listen, read, and explore the ancient wisdom through interactive hymns!"
        storageKey="hymnBrowserWelcome"
      />
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
          <div>
            <input
              type="text"
              placeholder="Search by title, deity, rishi, or theme..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-[--color-gold]/30 bg-[--color-parchment-light] text-[--color-ink] font-[family:--font-family-body] focus:outline-none focus:border-[--color-gold]"
            />
          </div>

          <div className="flex flex-wrap gap-4">
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

            <button
              onClick={() => setShowOnlyWithAudio(!showOnlyWithAudio)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-300
                font-[family:--font-family-body] text-sm font-semibold cursor-pointer
                ${showOnlyWithAudio 
                  ? 'bg-[--color-saffron] border-[--color-gold] text-white shadow-lg scale-105' 
                  : 'bg-[--color-parchment-light] border-[--color-gold]/30 text-[--color-ink] hover:border-[--color-gold]'
                }
              `}
            >
              <span className="text-lg">🎵</span>
              <span>Audio Only</span>
            </button>

            <div className="flex items-center px-4 py-2 bg-[--color-parchment-dark] rounded-lg">
              <span className="text-[--color-ink-light] font-[family:--font-family-body] text-sm">
                {filteredHymns.length} hymn{filteredHymns.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>
        </div>

        {/* Hymn Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {visibleHymns.map((hymn, index) => (
            <div
              key={index}
              onClick={() => handleHymnClick(hymn)}
              className="bg-[--color-parchment-light] p-6 rounded-lg border-2 border-[--color-gold]/30 hover:border-[--color-gold] transition-all cursor-pointer hover:shadow-lg"
            >
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

              <p className="text-sm text-[--color-ink-light] font-[family:--font-family-body] mb-3 line-clamp-3">
                {hymn.translation?.summary || hymn.significance}
              </p>

              <div className="flex items-center gap-4 text-xs text-[--color-ink-light] flex-wrap">
                <span>📜 {hymn.verses} verses</span>
                {hymn.rishi && <span className="line-clamp-1">✍️ {hymn.rishi}</span>}
                {getHymnUrl(hymn.id) && (
                  <span className="bg-[--color-saffron]/20 px-2 py-1 rounded text-[--color-saffron] font-semibold">
                    🎵 Audio
                  </span>
                )}
              </div>
            </div>
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
              <span className="font-bold tracking-wide">LOAD MORE HYMNS</span>
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
              Showing {visibleHymns.length} of {filteredHymns.length} hymns
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredHymns.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-[--color-ink-light] font-[family:--font-family-body]">
              No hymns found matching your criteria
            </p>
          </div>
        )}

        <Modal />
      </div>

      {/* Explore Complete Rigveda Section */}
      {/* ... rest of your component */}
    </>
  );
};

export default HymnBrowser;
