import React from 'react';
import { Link } from 'react-router-dom';
import metadata from '../data/metadata.json';
import deities from '../data/deities.json';
import topics from '../data/topics.json';
import hymns from '../data/hymns.json';

const EnhancedHome = () => {
  const features = [
    {
      id: 1,
      title: 'Deity Network',
      icon: '🕸️',
      description: 'Explore interactive relationships between 26 Vedic deities through a dynamic force-directed graph.',
      path: '/deity-network',
      gradient: 'from-purple-500 to-pink-500',
      stats: `${deities.deities.length} Deities`
    },
    {
      id: 2,
      title: 'Life Topics',
      icon: '📚',
      description: 'Discover ancient wisdom on modern topics: mind, health, ethics, nature, relationships, and more.',
      path: '/rigveda-on',
      gradient: 'from-blue-500 to-cyan-500',
      stats: `${topics.topics.length} Topics`
    },
    {
      id: 3,
      title: 'Hymn Browser',
      icon: '📜',
      description: 'Search and explore 30+ sacred hymns with full translations, context, and modern relevance.',
      path: '/hymns',
      gradient: 'from-amber-500 to-orange-500',
      stats: `${hymns.hymns.length}+ Hymns`
    },
    {
      id: 4,
      title: 'Surprise Me',
      icon: '✨',
      description: 'Get random fascinating facts about linguistics, mythology, philosophy, and cross-cultural connections.',
      path: '/surprise-me',
      gradient: 'from-green-500 to-emerald-500',
      stats: '40 Facts'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* OM Symbol */}
          <div className="text-9xl mb-6 animate-fade-in">
            ॐ
          </div>
          
          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl font-[family:--font-family-header] text-[--color-ink] mb-4">
            [ऋग्वेद]
          </h1>
          <h2 className="text-3xl md:text-4xl font-[family:--font-family-header] text-[--color-gold] mb-6">
            Rigveda Explorer
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-[--color-ink-light] font-[family:--font-family-body] mb-8 leading-relaxed">
            Journey through the world's oldest sacred texts with interactive visualizations, 
            deep explorations, and ancient wisdom for modern life.
          </p>

          {/* ========== NEW: TIMELINE PREVIEW SECTION ========== */}
          <div className="my-12 p-8 bg-gradient-to-br from-amber-100 via-orange-100 to-amber-100 rounded-2xl border-4 border-amber-600 shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-5xl">⏳</span>
              <h3 className="text-3xl font-[family:--font-family-header] text-amber-900">
                Rigveda Timeline
              </h3>
            </div>
            
            <p className="text-lg text-amber-800 mb-6 font-[family:--font-family-body]">
              Journey through 3,500+ years of Vedic tradition - from ancient composition to modern preservation
            </p>

            {/* Timeline Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 text-center border-2 border-amber-400 shadow-md">
                <div className="text-2xl md:text-3xl font-bold text-amber-900 mb-1">~1500 BCE</div>
                <div className="text-xs text-amber-600">Composition Begins</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center border-2 border-orange-400 shadow-md">
                <div className="text-2xl md:text-3xl font-bold text-orange-900 mb-1">~300</div>
                <div className="text-xs text-orange-600">Years of Composition</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center border-2 border-amber-400 shadow-md">
                <div className="text-2xl md:text-3xl font-bold text-amber-900 mb-1">~2000</div>
                <div className="text-xs text-amber-600">Years Oral Only</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center border-2 border-orange-400 shadow-md">
                <div className="text-2xl md:text-3xl font-bold text-orange-900 mb-1">3500+</div>
                <div className="text-xs text-orange-600">Years Old Today</div>
              </div>
            </div>

            {/* Timeline Preview - Mini Timeline */}
            <div className="bg-white rounded-xl p-6 mb-4 border-2 border-amber-300">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📜</span>
                  <div>
                    <div className="font-bold text-amber-900">1500-1200 BCE</div>
                    <div className="text-sm text-amber-700">Rigveda Composition Period</div>
                  </div>
                </div>
                <div className="text-3xl">→</div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔬</span>
                  <div>
                    <div className="font-bold text-orange-900">1900-Present</div>
                    <div className="text-sm text-orange-700">Modern Era</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-amber-600 text-center">
                8 major periods spanning ancient India to the digital age
              </p>
            </div>

            {/* CTA to Full Timeline */}
            <Link 
              to="/timeline"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-[family:--font-family-header] text-base transition-all transform hover:scale-105 shadow-lg"
            >
              Explore Full Timeline →
            </Link>
          </div>
          {/* ========== END TIMELINE PREVIEW SECTION ========== */}

          {/* CTA Button */}
          <Link 
            to="/deity-network"
            className="inline-block bg-[--color-gold] hover:bg-[--color-saffron] text-[--color-ink] px-8 py-4 rounded-lg font-[family:--font-family-header] text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Begin Your Journey →
          </Link>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 px-4 bg-[--color-parchment-dark]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4">
            <div className="text-4xl font-[family:--font-family-header] text-[--color-saffron] mb-2">
              {metadata.structure.totalMandalas || 10}
            </div>
            <div className="text-sm text-[--color-ink-light]">Mandalas</div>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl font-[family:--font-family-header] text-[--color-saffron] mb-2">
              {(metadata.structure.totalVerses || 10552).toLocaleString()}
            </div>
            <div className="text-sm text-[--color-ink-light]">Verses</div>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl font-[family:--font-family-header] text-[--color-saffron] mb-2">
              {deities.deities.length}
            </div>
            <div className="text-sm text-[--color-ink-light]">Deities</div>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl font-[family:--font-family-header] text-[--color-saffron] mb-2">
              {topics.topics.length}
            </div>
            <div className="text-sm text-[--color-ink-light]">Life Topics</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-[family:--font-family-header] text-[--color-ink] text-center mb-12">
            Explore the Rigveda
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <Link
                key={feature.id}
                to={feature.path}
                className="group bg-[--color-parchment-light] rounded-lg border-2 border-[--color-gold]/30 hover:border-[--color-gold] transition-all p-6 hover:shadow-xl transform hover:-translate-y-1"
              >
                {/* Icon & Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl">{feature.icon}</div>
                  <div>
                    <h3 className="text-2xl font-[family:--font-family-header] text-[--color-ink] group-hover:text-[--color-gold] transition-colors">
                      {feature.title}
                    </h3>
                    <div className="text-sm text-[--color-saffron] font-semibold">
                      {feature.stats}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Arrow */}
                <div className="text-[--color-gold] font-semibold group-hover:translate-x-2 transition-transform inline-block">
                  Explore →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What is Rigveda Section */}
      <section className="py-16 px-4 bg-[--color-parchment-dark]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-[family:--font-family-header] text-[--color-ink] mb-6 text-center">
            What is the Rigveda?
          </h2>
          <div className="space-y-4 text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed">
            <p>
              The Rigveda is the oldest of the four Vedas and one of the oldest religious texts in the world, 
              composed in Vedic Sanskrit between 1500-1200 BCE. It consists of 10,552 verses organized into 
              10 Mandalas (books).
            </p>
            <p>
              These hymns represent humanity's earliest philosophical inquiries into the nature of existence, 
              consciousness, morality, and the cosmos. They blend poetry, ritual, philosophy, and science in 
              ways that continue to inspire scholars, spiritual seekers, and scientists today.
            </p>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-[family:--font-family-header] text-[--color-ink] text-center mb-12">
            More to Explore
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Ask the Rishi */}
            <Link
              to="/ask-rishi"
              className="bg-[--color-parchment-light] rounded-lg border-2 border-[--color-gold]/30 hover:border-[--color-gold] p-6 text-center transition-all hover:shadow-lg"
            >
              <div className="text-4xl mb-3">💬</div>
              <h3 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-2">
                Ask the Rishi
              </h3>
              <p className="text-sm text-[--color-ink-light]">
                AI-powered Q&A
              </p>
              <div className="mt-3 text-xs text-[--color-saffron]">Coming Soon</div>
            </Link>

            {/* Ten Mandalas */}
            <Link
              to="/mandalas"
              className="bg-[--color-parchment-light] rounded-lg border-2 border-[--color-gold]/30 hover:border-[--color-gold] p-6 text-center transition-all hover:shadow-lg"
            >
              <div className="text-4xl mb-3">📖</div>
              <h3 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-2">
                Ten Mandalas
              </h3>
              <p className="text-sm text-[--color-ink-light]">
                Browse all books
              </p>
              <div className="mt-3 text-xs text-[--color-saffron]">Coming Soon</div>
            </Link>

            {/* About */}
            <Link
              to="/about"
              className="bg-[--color-parchment-light] rounded-lg border-2 border-[--color-gold]/30 hover:border-[--color-gold] p-6 text-center transition-all hover:shadow-lg"
            >
              <div className="text-4xl mb-3">ℹ️</div>
              <h3 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-2">
                About
              </h3>
              <p className="text-sm text-[--color-ink-light]">
                Project details
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Quote */}
      <section className="py-12 px-4 bg-[--color-parchment-dark] border-t-4 border-[--color-gold]/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-4">ॐ</div>
          <p className="text-xl text-[--color-ink] font-[family:--font-family-body] italic mb-2">
            "Truth is one, the wise call it by many names"
          </p>
          <p className="text-sm text-[--color-ink-light]">
            — Rigveda 1.164.46
          </p>
        </div>
      </section>
    </div>
  );
};

export default EnhancedHome;
