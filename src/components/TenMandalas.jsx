import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import BookLoadingAnimation from './BookLoadingAnimation';  // ← ADDED

// Mandala data based on metadata.json
const mandalasData = [
  {
    number: 1,
    suktas: 191,
    verses: 2006,
    description: "Longest mandala. Hymns to various deities, especially Indra and Agni. Composed by multiple families of rishis.",
    character: "Diverse authorship, varied themes, includes some of most famous hymns (1.1, 1.32, 1.154, 1.164)",
    famousHymns: [
      { ref: "1.1", title: "Invocation to Agni", note: "Opening hymn of entire Rig Veda" },
      { ref: "1.32", title: "Indra Slays Vritra", note: "Most famous Indra myth" },
      { ref: "1.154", title: "Vishnu's Three Strides", note: "Cosmic measurement" },
      { ref: "1.164", title: "The Riddle Hymn", note: "Deepest philosophical questions" }
    ]
  },
  {
    number: 2,
    suktas: 43,
    verses: 429,
    description: "Family mandala of the Gritsamadas. Dedicated primarily to Agni and Indra.",
    character: "Oldest core material. Consistent style. Known for powerful Indra hymns.",
    famousHymns: [
      { ref: "2.12", title: "Who Is Indra?", note: "Definitive description of Indra's power" },
      { ref: "2.33", title: "Prayer to Rudra", note: "Principal hymn to Rudra" }
    ]
  },
  {
    number: 3,
    suktas: 62,
    verses: 617,
    description: "Family mandala of the Vishvamitras. Contains the Gayatri Mantra (3.62.10).",
    character: "Most sacred mandala due to Gayatri. Balanced coverage of deities.",
    famousHymns: [
      { ref: "3.62.10", title: "The Gayatri Mantra", note: "THE most sacred verse in Hinduism" }
    ]
  },
  {
    number: 4,
    suktas: 58,
    verses: 589,
    description: "Family mandala of the Vamadevas. Hymns to Agni, Indra, and the Ribhus (divine craftsmen).",
    character: "Notable for Ribhu hymns. Technical and priestly focus.",
    famousHymns: []
  },
  {
    number: 5,
    suktas: 87,
    verses: 727,
    description: "Family mandala of the Atris. Diverse deities, strong nature hymns.",
    character: "Balanced, includes beautiful hymns to Ushas, Parjanya, Heaven and Earth.",
    famousHymns: [
      { ref: "5.83", title: "Hymn to Parjanya (Rain)", note: "Beautiful nature hymn" }
    ]
  },
  {
    number: 6,
    suktas: 75,
    verses: 765,
    description: "Family mandala of the Bharadvajas. Primarily Agni and Indra.",
    character: "Liturgical focus. Ritual precision.",
    famousHymns: []
  },
  {
    number: 7,
    suktas: 104,
    verses: 841,
    description: "Family mandala of the Vasisthas. Considered the most beautiful for poetry and philosophy.",
    character: "Most refined poetry. Famous Varuna hymns (7.86). Peak of Vedic composition.",
    famousHymns: [
      { ref: "7.86", title: "Varuna's Forgiveness", note: "Most moving prayer for forgiveness" }
    ]
  },
  {
    number: 8,
    suktas: 103,
    verses: 1716,
    description: "Mixed authorship. Many Soma hymns and Indra-Soma pairs.",
    character: "Soma-centric. Some of latest material. Long hymns.",
    famousHymns: []
  },
  {
    number: 9,
    suktas: 114,
    verses: 1108,
    description: "Entirely dedicated to Soma Pavamana (purifying Soma).",
    character: "Unique single-deity mandala. Repetitive but hypnotic. Ritual focus.",
    famousHymns: []
  },
  {
    number: 10,
    suktas: 191,
    verses: 1754,
    description: "Longest mandala with most diverse content. Philosophical hymns, dialogues, cosmological speculation.",
    character: "Latest material. Most philosophically mature. Includes Nasadiya Sukta, Purusha Sukta, dialogue hymns.",
    famousHymns: [
      { ref: "10.129", title: "Nasadiya Sukta (Creation Hymn)", note: "Most famous philosophical hymn" },
      { ref: "10.34", title: "The Gambler's Lament", note: "Remarkably modern psychology" },
      { ref: "10.125", title: "Goddess Speech Speaks", note: "Powerful feminist statement" }
    ]
  }
];

// Modal Component using Portal
const MandalaModal = ({ mandala, onClose }) => {
  if (!mandala) return null;

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
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'var(--color-parchment-light)',
          borderRadius: '1rem',
          maxWidth: '48rem',
          width: '100%',
          maxHeight: '90vh',
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
            onClick={onClose}
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

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem', paddingRight: '2rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontFamily: 'var(--font-family-header)', 
              color: 'var(--color-ink)', 
              marginBottom: '0.5rem' 
            }}>
              📖 Mandala {mandala.number}
            </h2>
            <div style={{ 
              fontSize: '1.125rem', 
              color: 'var(--color-ink-light)',
              fontFamily: 'var(--font-family-body)'
            }}>
              {mandala.suktas} Suktas • {mandala.verses} Verses
            </div>
          </div>

          {/* Stats Bar */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '1rem', 
            marginBottom: '2rem' 
          }}>
            <div style={{ 
              backgroundColor: 'var(--color-parchment-dark)', 
              padding: '1rem', 
              borderRadius: '0.5rem', 
              textAlign: 'center' 
            }}>
              <div style={{ 
                fontSize: '1.875rem', 
                fontFamily: 'var(--font-family-header)', 
                color: 'var(--color-saffron)' 
              }}>
                {mandala.suktas}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-light)' }}>Suktas</div>
            </div>
            <div style={{ 
              backgroundColor: 'var(--color-parchment-dark)', 
              padding: '1rem', 
              borderRadius: '0.5rem', 
              textAlign: 'center' 
            }}>
              <div style={{ 
                fontSize: '1.875rem', 
                fontFamily: 'var(--font-family-header)', 
                color: 'var(--color-saffron)' 
              }}>
                {mandala.verses}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-light)' }}>Verses</div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontFamily: 'var(--font-family-header)', 
              color: 'var(--color-ink)', 
              marginBottom: '0.75rem' 
            }}>
              Description
            </h3>
            <p style={{ 
              color: 'var(--color-ink-light)', 
              fontFamily: 'var(--font-family-body)', 
              lineHeight: 1.75,
              fontSize: '1rem'
            }}>
              {mandala.description}
            </p>
          </div>

          {/* Character */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontFamily: 'var(--font-family-header)', 
              color: 'var(--color-ink)', 
              marginBottom: '0.75rem' 
            }}>
              Character
            </h3>
            <p style={{ 
              color: 'var(--color-ink-light)', 
              fontFamily: 'var(--font-family-body)', 
              lineHeight: 1.75,
              fontSize: '1rem'
            }}>
              {mandala.character}
            </p>
          </div>

          {/* Famous Hymns */}
          {mandala.famousHymns.length > 0 && (
            <div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontFamily: 'var(--font-family-header)', 
                color: 'var(--color-ink)', 
                marginBottom: '1rem' 
              }}>
                Famous Hymns
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {mandala.famousHymns.map((hymn, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'var(--color-parchment-dark)',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      borderLeft: '4px solid var(--color-saffron)'
                    }}
                  >
                    <div style={{ 
                      fontWeight: 'bold', 
                      color: 'var(--color-ink)', 
                      marginBottom: '0.25rem',
                      fontFamily: 'var(--font-family-header)'
                    }}>
                      {hymn.ref} • {hymn.title}
                    </div>
                    <div style={{ 
                      fontSize: '0.875rem', 
                      color: 'var(--color-ink-light)', 
                      fontStyle: 'italic',
                      fontFamily: 'var(--font-family-body)'
                    }}>
                      {hymn.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

const TenMandalas = () => {
  const [selectedMandala, setSelectedMandala] = useState(null);
  const [isLoading, setIsLoading] = useState(true);  // ← ADDED

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedMandala) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedMandala]);

  // ← ADDED: Show book animation while loading
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-[family:--font-family-header] text-[--color-ink] mb-3">
            📖 The Ten Mandalas
          </h1>
          <p className="text-lg text-[--color-ink-light] font-[family:--font-family-body]">
            Browse all 10 Mandalas with Sanskrit texts and translations
          </p>
        </div>
        <BookLoadingAnimation size="medium" text="Opening the Ten Mandalas..." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-[family:--font-family-header] text-[--color-ink] mb-3">
          📖 The Ten Mandalas
        </h1>
        <p className="text-lg text-[--color-ink-light] font-[family:--font-family-body]">
          Browse all 10 Mandalas with Sanskrit texts, translations, and search functionality
        </p>
      </div>

      {/* Grid of Mandala Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {mandalasData.map((mandala) => (
          <div
            key={mandala.number}
            onClick={() => setSelectedMandala(mandala)}
            className="bg-[--color-parchment-light] border-2 border-[--color-gold]/30 rounded-lg p-8 text-center cursor-pointer transition-all hover:border-[--color-gold] hover:shadow-lg hover:-translate-y-1"
          >
            <div className="text-5xl font-bold text-[--color-ink] mb-2 font-[family:--font-family-header]">
              {mandala.number}
            </div>
            <div className="text-sm text-[--color-ink-light] font-[family:--font-family-body]">
              Mandala
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedMandala && (
        <MandalaModal
          mandala={selectedMandala}
          onClose={() => setSelectedMandala(null)}
        />
      )}
    </div>
  );
};

export default TenMandalas;
