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
    <div className="min-h-screen bg-[--color-parchment] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Ornate Header with Golden Border */}
        <div className="ornate-golden-border text-center mb-12 bg-[--color-parchment-light]">
          <div className="relative">
            <h1 className="text-5xl md:text-6xl font-[family:--font-family-header] text-[--color-ink] mb-4 flex items-center justify-center gap-3">
              <span className="text-5xl">⏳</span>
              Rigveda Timeline
            </h1>
            <div className="ornate-divider ornate-divider-om my-6"></div>
            <p className="text-lg md:text-xl font-[family:--font-family-body] text-[--color-ink-light] max-w-3xl mx-auto leading-relaxed">
              Journey through 3,500+ years of Vedic tradition - from ancient composition to modern preservation
            </p>
          </div>
        </div>

        {/* Timeline Stats with Manuscript Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="double-golden-border bg-[--color-parchment-light] rounded-xl p-6 text-center">
            <div className="text-3xl md:text-4xl font-[family:--font-family-header] font-bold text-[--color-ink] mb-2">~1500 BCE</div>
            <div className="text-sm font-[family:--font-family-body] text-[--color-gold]">Composition Begins</div>
          </div>
          <div className="double-golden-border bg-[--color-parchment-light] rounded-xl p-6 text-center">
            <div className="text-3xl md:text-4xl font-[family:--font-family-header] font-bold text-[--color-ink] mb-2">~300</div>
            <div className="text-sm font-[family:--font-family-body] text-[--color-saffron]">Years of Composition</div>
          </div>
          <div className="double-golden-border bg-[--color-parchment-light] rounded-xl p-6 text-center">
            <div className="text-3xl md:text-4xl font-[family:--font-family-header] font-bold text-[--color-ink] mb-2">~2000</div>
            <div className="text-sm font-[family:--font-family-body] text-[--color-gold]">Years Oral Only</div>
          </div>
          <div className="double-golden-border bg-[--color-parchment-light] rounded-xl p-6 text-center">
            <div className="text-3xl md:text-4xl font-[family:--font-family-header] font-bold text-[--color-ink] mb-2">3500+</div>
            <div className="text-sm font-[family:--font-family-body] text-[--color-saffron]">Years Old Today</div>
          </div>
        </div>

        {/* Timeline with Manuscript Aesthetic */}
        <div className="relative">
          {/* Ornate Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-2 md:w-3 bg-gradient-to-b from-[--color-gold] via-[--color-saffron] to-[--color-gold] transform md:-translate-x-1/2 shadow-[0_0_25px_rgba(218,165,32,0.5)] border-l-2 border-r-2 border-[--color-gold]"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <div
                key={item.id}
                className={`relative flex items-start ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:gap-8`}
              >
                {/* Content Card with Ornate Border */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} ml-16 md:ml-0`}>
                  <div
                    className={`card-glare-container double-golden-border bg-[--color-parchment-light] rounded-2xl p-6 transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                      selectedPeriod?.id === item.id
                        ? 'ring-4 ring-[--color-gold]/50 shadow-2xl'
                        : 'shadow-xl'
                    }`}
                    onClick={() => setSelectedPeriod(selectedPeriod?.id === item.id ? null : item)}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-[--color-gold]/30">
                      <span className="text-4xl">{item.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-2xl font-[family:--font-family-header] font-bold text-[--color-ink]">
                          {item.title}
                        </h3>
                        <p className="text-sm font-[family:--font-family-header] font-semibold text-[--color-gold]">
                          {item.period}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="font-[family:--font-family-body] text-[--color-ink-light] leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Expanded Content */}
                    {selectedPeriod?.id === item.id && (
                      <div className="mt-4 pt-4 border-t-2 border-[--color-gold]/30 space-y-4 animate-fade-in-smooth">
                        {/* Key Events */}
                        <div className="bg-gradient-to-r from-[--color-parchment] to-[--color-parchment-dark] p-4 rounded-lg border-2 border-[--color-gold]/20">
                          <h4 className="font-[family:--font-family-header] font-bold text-[--color-ink] mb-3 flex items-center gap-2">
                            <span>🔖</span> Key Events
                          </h4>
                          <ul className="space-y-2">
                            {item.events.map((event, idx) => (
                              <li key={idx} className="text-sm font-[family:--font-family-body] text-[--color-ink-light] flex items-start gap-2">
                                <span className="text-[--color-gold] mt-1">◆</span>
                                <span>{event}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* World Context */}
                        <div className="spine-border bg-gradient-to-r from-[--color-parchment-light] to-[--color-parchment] p-4 rounded-lg">
                          <h4 className="font-[family:--font-family-header] font-bold text-[--color-ink] mb-2 flex items-center gap-2">
                            <span>🌏</span> World Context
                          </h4>
                          <p className="text-sm font-[family:--font-family-body] text-[--color-ink-light] italic">
                            {item.worldContext}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Expand Button */}
                    <button className="mt-4 px-4 py-2 text-sm font-[family:--font-family-header] text-[--color-gold] hover:text-[--color-saffron] font-semibold transition-colors border-2 border-[--color-gold] hover:border-[--color-saffron] rounded-lg">
                      {selectedPeriod?.id === item.id ? '▲ Show Less' : '▼ Show More'}
                    </button>
                  </div>
                </div>

                {/* Ornate Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-6 z-10">
                  <div
                    className="w-16 h-16 rounded-full border-4 border-[--color-parchment-light] shadow-2xl flex items-center justify-center text-2xl relative"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.icon}
                    {/* Ornate Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-[--color-gold]/50" style={{ borderStyle: 'double' }}></div>
                  </div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Chronological Layers - Manuscript Style */}
        <div className="mt-16 ornate-golden-border bg-[--color-parchment-light] rounded-2xl shadow-2xl p-8">
          <div className="manuscript-corner manuscript-corner-tl"></div>
          <div className="manuscript-corner manuscript-corner-tr"></div>
          <div className="manuscript-corner manuscript-corner-bl"></div>
          <div className="manuscript-corner manuscript-corner-br"></div>

          <h2 className="text-3xl font-[family:--font-family-header] font-bold text-[--color-ink] mb-2 text-center">
            📚 Chronological Layers of Rigveda
          </h2>
          <div className="ornate-divider mb-6"></div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Oldest Layer */}
            <div className="double-golden-border card-glare-container bg-gradient-to-br from-[--color-parchment-light] to-[--color-parchment] p-6 rounded-xl hover:scale-105 transition-transform">
              <div className="text-4xl mb-3 text-center">🏛️</div>
              <h3 className="text-xl font-[family:--font-family-header] font-bold text-[--color-ink] mb-2 text-center">
                Oldest Layer
              </h3>
              <p className="text-sm font-[family:--font-family-header] text-[--color-gold] mb-3 text-center font-semibold">
                Mandalas 2-7 (Family Books)
              </p>
              <p className="text-sm font-[family:--font-family-body] text-[--color-ink-light] leading-relaxed">
                Composed ~1500-1200 BCE by specific Rishi families. Contains the most archaic language 
                and consistent style. Focus on nature gods and fire rituals.
              </p>
            </div>

            {/* Middle Layer */}
            <div className="double-golden-border card-glare-container bg-gradient-to-br from-[--color-parchment] to-[--color-parchment-light] p-6 rounded-xl hover:scale-105 transition-transform">
              <div className="text-4xl mb-3 text-center">📖</div>
              <h3 className="text-xl font-[family:--font-family-header] font-bold text-[--color-ink] mb-2 text-center">
                Middle Layer
              </h3>
              <p className="text-sm font-[family:--font-family-header] text-[--color-saffron] mb-3 text-center font-semibold">
                Mandalas 8 & 9
              </p>
              <p className="text-sm font-[family:--font-family-body] text-[--color-ink-light] leading-relaxed">
                Mandala 9 entirely dedicated to Soma. Mandala 8 shows mixed authorship and 
                transitional characteristics between old and new styles.
              </p>
            </div>

            {/* Youngest Layer */}
            <div className="double-golden-border card-glare-container bg-gradient-to-br from-[--color-parchment-light] to-[--color-parchment] p-6 rounded-xl hover:scale-105 transition-transform">
              <div className="text-4xl mb-3 text-center">🌟</div>
              <h3 className="text-xl font-[family:--font-family-header] font-bold text-[--color-ink] mb-2 text-center">
                Youngest Layer
              </h3>
              <p className="text-sm font-[family:--font-family-header] text-[--color-gold] mb-3 text-center font-semibold">
                Mandalas 1 & 10
              </p>
              <p className="text-sm font-[family:--font-family-body] text-[--color-ink-light] leading-relaxed">
                Most philosophical and diverse. Mandala 10 contains famous Nasadiya Sukta (Creation Hymn), 
                Purusha Sukta, and other speculative hymns showing advanced thought.
              </p>
            </div>
          </div>
        </div>

        {/* Back Button - Ornate Style */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[--color-gold] to-[--color-saffron] hover:from-[--color-saffron] hover:to-[--color-gold] text-white font-[family:--font-family-header] font-semibold rounded-lg transition-all shadow-lg hover:shadow-2xl hover:scale-105 border-2 border-[--color-gold]"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
