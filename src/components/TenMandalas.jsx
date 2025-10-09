import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, BookOpen, Headphones, Sparkles } from 'lucide-react';
import BookLoadingAnimation from './BookLoadingAnimation';
import PodcastPlayer from './PodcastPlayer';

// Mandala data with ALL famous hymns added
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
    famousHymns: [
      { ref: "4.26", title: "The Ribhus - Divine Craftsmen", note: "Unique hymn to artisan gods who earned immortality" },
      { ref: "4.42", title: "Universal Prayer", note: "Invocation to all gods together" }
    ]
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
    famousHymns: [
      { ref: "6.9", title: "Indra's Cosmic Power", note: "Celebrated description of Indra's might" },
      { ref: "6.75", title: "Weapons of War", note: "Prayer for victory and divine weapons" }
    ]
  },
  {
    number: 7,
    suktas: 104,
    verses: 841,
    description: "Family mandala of the Vasisthas. Considered the most beautiful for poetry and philosophy.",
    character: "Most refined poetry. Famous Varuna hymns (7.86). Peak of Vedic composition.",
    famousHymns: [
      { ref: "7.86", title: "Varuna's Forgiveness", note: "Most moving prayer for forgiveness" },
      { ref: "7.103", title: "The Frogs", note: "Unique nature hymn comparing priests to frogs in rain" }
    ]
  },
  {
    number: 8,
    suktas: 103,
    verses: 1716,
    description: "Mixed authorship. Many Soma hymns and Indra-Soma pairs.",
    character: "Soma-centric. Some of latest material. Long hymns.",
    famousHymns: [
      { ref: "8.48", title: "Soma Praise", note: "Ecstatic description of Soma's effects" },
      { ref: "8.91", title: "The Apala Hymn", note: "Rare hymn by female poet Apala" }
    ]
  },
  {
    number: 9,
    suktas: 114,
    verses: 1108,
    description: "Entirely dedicated to Soma Pavamana (purifying Soma).",
    character: "Unique single-deity mandala. Repetitive but hypnotic. Ritual focus.",
    famousHymns: [
      { ref: "9.113", title: "Where Immortality Dwells", note: "Beautiful description of heaven" },
      { ref: "9.1", title: "Soma's Purification", note: "Opening hymn - filter metaphor" }
    ]
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
      { ref: "10.125", title: "Devi Sukta (Goddess Speech)", note: "Powerful feminist statement" },
      { ref: "10.90", title: "Purusha Sukta", note: "Cosmic Person creation myth" }
    ]
  }
];

// Modal Component
const MandalaModal = ({ mandala, onClose, onListenPodcast }) => {
  if (!mandala) return null;
  
  const [activeTab, setActiveTab] = useState('overview');

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition"
          >
            <X size={24} />
          </button>
          <h2 className="text-3xl font-bold mb-2">Mandala {mandala.number}</h2>
          <div className="flex gap-4 text-sm opacity-90">
            <span>📜 {mandala.suktas} Suktas</span>
            <span>✨ {mandala.verses} Verses</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-orange-200 bg-white/50">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 px-6 py-3 font-semibold transition ${
              activeTab === 'overview'
                ? 'border-b-2 border-orange-500 text-orange-600'
                : 'text-gray-600 hover:text-orange-600'
            }`}
          >
            <BookOpen className="inline mr-2" size={18} />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('hymns')}
            className={`flex-1 px-6 py-3 font-semibold transition ${
              activeTab === 'hymns'
                ? 'border-b-2 border-orange-500 text-orange-600'
                : 'text-gray-600 hover:text-orange-600'
            }`}
          >
            <Sparkles className="inline mr-2" size={18} />
            Famous Hymns
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{mandala.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Character</h3>
                <p className="text-gray-700 leading-relaxed">{mandala.character}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-orange-100 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-orange-600">{mandala.suktas}</div>
                  <div className="text-sm text-gray-600">Suktas</div>
                </div>
                <div className="bg-red-100 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-red-600">{mandala.verses}</div>
                  <div className="text-sm text-gray-600">Verses</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hymns' && (
            <div className="space-y-3">
              {mandala.famousHymns && mandala.famousHymns.length > 0 ? (
                mandala.famousHymns.map((hymn, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4 border-l-4 border-orange-500 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-mono text-orange-600 mb-1">{hymn.ref}</div>
                        <div className="font-semibold text-gray-800 mb-1">{hymn.title}</div>
                        <div className="text-sm text-gray-600">{hymn.note}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No famous hymns data available for this mandala.</p>
              )}
            </div>
          )}
        </div>

        {/* Footer - Podcast Button */}
        <div className="border-t border-orange-200 bg-white/80 p-6">
          <button
            onClick={() => onListenPodcast(mandala)}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:from-orange-600 hover:to-red-600 transition shadow-lg hover:shadow-xl"
          >
            <Headphones size={24} />
            Listen to Podcast Episode
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

// Main Component
const TenMandalas = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMandala, setSelectedMandala] = useState(null);
  const [showPodcast, setShowPodcast] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleMandalaClick = (mandala) => {
    setSelectedMandala(mandala);
  };

  const handleListenPodcast = (mandala) => {
    setSelectedMandala(mandala);
    setShowPodcast(true);
  };

  const handleClosePodcast = () => {
    setShowPodcast(false);
  };

  if (isLoading) {
    return <BookLoadingAnimation />;
  }

  // Show podcast player if activated
  if (showPodcast && selectedMandala) {
    return <PodcastPlayer mandalaNumber={selectedMandala.number} onClose={handleClosePodcast} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-4">
            The Ten Mandalas
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Browse all 10 Mandalas with Sanskrit texts, translations, and podcast episodes
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Click any mandala to explore its content
          </p>
        </div>

        {/* Mandala Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mandalasData.map((mandala) => (
            <div
              key={mandala.number}
              onClick={() => handleMandalaClick(mandala)}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-orange-200 hover:border-orange-400 hover:scale-105"
            >
              {/* Mandala Number Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {mandala.number}
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Suktas</div>
                  <div className="text-xl font-bold text-orange-600">{mandala.suktas}</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                {mandala.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-orange-100">
                <span>📜 {mandala.verses} verses</span>
                <span className="text-orange-600 font-semibold">Explore →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-orange-100 rounded-full px-6 py-3 text-sm text-orange-800">
            <Headphones className="inline mr-2" size={16} />
            Each Mandala has an exclusive podcast episode!
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedMandala && !showPodcast && (
        <MandalaModal
          mandala={selectedMandala}
          onClose={() => setSelectedMandala(null)}
          onListenPodcast={handleListenPodcast}
        />
      )}
    </div>
  );
};

export default TenMandalas;
