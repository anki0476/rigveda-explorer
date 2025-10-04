import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Timeline = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  const timelineData = [
    {
      id: 1,
      period: "1500-1200 BCE",
      title: "Rigveda Composition Period",
      description: "The entire Rigveda was composed during this period in Northwestern India (modern-day Punjab and surrounding regions).",
      events: [
        "Family Books (Mandalas 2-7) composed first - the oldest core material",
        "Mandalas 8 and 9 added during middle period",
        "Mandalas 1 and 10 composed last - youngest and most philosophical material",
        "Oral transmission begins with strict memorization techniques"
      ],
      color: "#8B4513",
      icon: "📜",
      worldContext: "Bronze Age - Contemporary with Mycenaean Greece, New Kingdom Egypt, Shang Dynasty China"
    },
    {
      id: 2,
      period: "1200-900 BCE",
      title: "Early Vedic Period",
      description: "Rigveda continues to be transmitted orally with perfect precision. Brahmanical rituals become more elaborate.",
      events: [
        "Development of sophisticated mnemonic techniques",
        "Establishment of guru-shishya (teacher-student) oral tradition",
        "Beginnings of Vedic ritual complexity",
        "Migration and settlement patterns in Gangetic plains"
      ],
      color: "#CD853F",
      icon: "🎓",
      worldContext: "Late Bronze Age collapse in Mediterranean, Iron Age begins"
    },
    {
      id: 3,
      period: "900-600 BCE",
      title: "Later Vedic Period",
      description: "Other Vedas (Yajur, Sama, Atharva) and Brahmanas composed. Rigveda remains the most sacred.",
      events: [
        "Yajurveda and Samaveda compiled (derived from Rigveda)",
        "Atharvaveda composed separately",
        "Brahmanas written - ritual explanation texts",
        "Society becomes more stratified and ritualistic"
      ],
      color: "#DEB887",
      icon: "📚",
      worldContext: "Classical Antiquity begins, Buddha and Mahavira born (~563 BCE)"
    },
    {
      id: 4,
      period: "600-200 BCE",
      title: "Upanishadic Period",
      description: "Philosophical revolution. Upanishads question ritualism and explore deeper spiritual truths rooted in Rigvedic concepts.",
      events: [
        "Major Upanishads composed (Brihadaranyaka, Chandogya, etc.)",
        "Shift from ritual to philosophical inquiry",
        "Concepts of Brahman, Atman, Karma, Moksha developed",
        "Buddhism and Jainism emerge as reform movements"
      ],
      color: "#D2691E",
      icon: "🧘",
      worldContext: "Persian Empire, Greek Classical Period, Confucius in China"
    },
    {
      id: 5,
      period: "200 BCE - 500 CE",
      title: "Epic & Classical Period",
      description: "Rigveda continues oral transmission. Epics written. Sanskrit classical literature flourishes.",
      events: [
        "Mahabharata and Ramayana compiled (quote Rigveda extensively)",
        "Panini's Sanskrit grammar standardizes language",
        "Classical Sanskrit literature (Kalidasa)",
        "Rigveda still transmitted orally with 100% accuracy"
      ],
      color: "#F4A460",
      icon: "✍️",
      worldContext: "Roman Empire, Han Dynasty China, Gupta Golden Age"
    },
    {
      id: 6,
      period: "500-1500 CE",
      title: "Medieval Period",
      description: "Rigveda written down for first time. Commentaries by great scholars. Oral tradition continues alongside written.",
      events: [
        "First written manuscripts created (palm leaf, birch bark)",
        "Sayana's comprehensive commentary (14th century CE)",
        "Multiple recension schools preserve different oral traditions",
        "Rigveda remains central to Hindu ritual and identity"
      ],
      color: "#8B7355",
      icon: "📖",
      worldContext: "Islamic Golden Age, Medieval Europe, Song Dynasty China"
    },
    {
      id: 7,
      period: "1500-1900 CE",
      title: "Early Modern Period",
      description: "Western scholars discover Rigveda. First translations. Indian renaissance of Vedic scholarship.",
      events: [
        "First European translations (Max Müller's 1849-1874 edition)",
        "Comparative philology establishes Indo-European language family",
        "Indian scholars like Dayananda Saraswati revive Vedic study",
        "Rigveda recognized as one of world's oldest religious texts"
      ],
      color: "#C19A6B",
      icon: "🌍",
      worldContext: "Age of Enlightenment, Industrial Revolution, British colonial period"
    },
    {
      id: 8,
      period: "1900-Present",
      title: "Modern Era",
      description: "Scientific study, archaeological discoveries, continued living tradition in India and worldwide.",
      events: [
        "Archaeological evidence of Indus Valley and Vedic cultures",
        "Advanced linguistic and historical analysis",
        "Digital preservation projects",
        "Global Hindu diaspora maintains ritual traditions",
        "UNESCO recognition of oral Vedic tradition (2003)"
      ],
      color: "#B8860B",
      icon: "🔬",
      worldContext: "Modern science, space age, digital revolution, globalization"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4 flex items-center justify-center gap-3">
            <span className="text-5xl">⏳</span>
            Rigveda Timeline
          </h1>
          <p className="text-lg md:text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed">
            Journey through 3,500+ years of Vedic tradition - from ancient composition to modern preservation
          </p>
        </div>

        {/* Timeline Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl p-6 text-center border-4 border-amber-300 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">~1500 BCE</div>
            <div className="text-sm text-amber-600">Composition Begins</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border-4 border-orange-300 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-orange-900 mb-2">~300</div>
            <div className="text-sm text-orange-600">Years of Composition</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border-4 border-amber-300 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">~2000</div>
            <div className="text-sm text-amber-600">Years Oral Only</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border-4 border-orange-300 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-orange-900 mb-2">3500+</div>
            <div className="text-sm text-orange-600">Years Old Today</div>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-600 via-orange-600 to-amber-600 transform md:-translate-x-1/2"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <div
                key={item.id}
                className={`relative flex items-start ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:gap-8`}
              >
                {/* Content card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} ml-16 md:ml-0`}>
                  <div
                    className={`bg-white rounded-2xl p-6 shadow-xl border-4 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl ${
                      selectedPeriod?.id === item.id
                        ? 'border-amber-500 ring-4 ring-amber-200'
                        : 'border-amber-300'
                    }`}
                    style={{ borderLeftColor: item.color, borderLeftWidth: '8px' }}
                    onClick={() => setSelectedPeriod(selectedPeriod?.id === item.id ? null : item)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">{item.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-amber-900">{item.title}</h3>
                        <p className="text-sm font-semibold text-orange-600">{item.period}</p>
                      </div>
                    </div>
                    <p className="text-amber-800 leading-relaxed mb-4">{item.description}</p>
                    
                    {selectedPeriod?.id === item.id && (
                      <div className="mt-4 pt-4 border-t-2 border-amber-200 space-y-4">
                        <div>
                          <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                            <span>🔖</span> Key Events
                          </h4>
                          <ul className="space-y-2">
                            {item.events.map((event, idx) => (
                              <li key={idx} className="text-sm text-amber-700 flex items-start gap-2">
                                <span className="text-orange-500 mt-1">•</span>
                                <span>{event}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border-2 border-amber-200">
                          <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                            <span>🌏</span> World Context
                          </h4>
                          <p className="text-sm text-amber-700">{item.worldContext}</p>
                        </div>
                      </div>
                    )}
                    
                    <button className="mt-4 text-sm text-amber-600 hover:text-amber-800 font-semibold">
                      {selectedPeriod?.id === item.id ? '▲ Show less' : '▼ Show more'}
                    </button>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 -translate-y-0 md:translate-y-0 top-6">
                  <div
                    className="w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-2xl"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.icon}
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Composition Layers Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-2xl p-8 border-4 border-amber-700">
          <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">
            📚 Chronological Layers of Rigveda
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-6 rounded-xl border-2 border-amber-300">
              <div className="text-4xl mb-3 text-center">🏛️</div>
              <h3 className="text-xl font-bold text-amber-900 mb-2 text-center">Oldest Layer</h3>
              <p className="text-sm text-amber-700 mb-3 text-center font-semibold">Mandalas 2-7 (Family Books)</p>
              <p className="text-sm text-amber-600 leading-relaxed">
                Composed ~1500-1200 BCE by specific Rishi families. Contains the most archaic language 
                and consistent style. Focus on nature gods and fire rituals.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-100 to-amber-100 p-6 rounded-xl border-2 border-orange-300">
              <div className="text-4xl mb-3 text-center">📖</div>
              <h3 className="text-xl font-bold text-orange-900 mb-2 text-center">Middle Layer</h3>
              <p className="text-sm text-orange-700 mb-3 text-center font-semibold">Mandalas 8 & 9</p>
              <p className="text-sm text-orange-600 leading-relaxed">
                Mandala 9 entirely dedicated to Soma. Mandala 8 shows mixed authorship and 
                transitional characteristics between old and new styles.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-6 rounded-xl border-2 border-amber-300">
              <div className="text-4xl mb-3 text-center">🌟</div>
              <h3 className="text-xl font-bold text-amber-900 mb-2 text-center">Youngest Layer</h3>
              <p className="text-sm text-amber-700 mb-3 text-center font-semibold">Mandalas 1 & 10</p>
              <p className="text-sm text-amber-600 leading-relaxed">
                Most philosophical and diverse. Mandala 10 contains famous Nasadiya Sukta (Creation Hymn), 
                Purusha Sukta, and other speculative hymns showing advanced thought.
              </p>
            </div>
          </div>
        </div>

        {/* Back Navigation */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
