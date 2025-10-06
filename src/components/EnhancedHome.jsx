import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Layout/Navigation';
import GlobalSearch from './GlobalSearch';
import metadata from '../data/metadata.json';
import deities from '../data/deities.json';
import topics from '../data/topics.json';
import hymns from '../data/hymns.json';

const EnhancedHome = () => {
  const sectionRef = useRef(null);
  const bottomSectionRef = useRef(null); // NEW: ref for bottom section
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [bottomCardIndex, setBottomCardIndex] = useState(0); // NEW: state for bottom cards
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isBottomIntersecting, setIsBottomIntersecting] = useState(false); // NEW: state for bottom intersection
  const ticking = useRef(false);

  const features = [
    {
      id: 1,
      title: 'Deity Network',
      icon: '🕸️',
      description: 'Explore interactive relationships between 26 Vedic deities through a dynamic force-directed graph.',
      path: '/deity-network',
      stats: `${deities.deities.length} Deities`
    },
    {
      id: 2,
      title: 'Life Topics',
      icon: '📚',
      description: 'Discover ancient wisdom on modern topics: mind, health, ethics, nature, relationships, and more.',
      path: '/rigveda-on',
      stats: `${topics.topics.length} Topics`
    },
    {
      id: 3,
      title: 'Hymn Browser',
      icon: '📜',
      description: 'Search and explore 30+ sacred hymns with full translations, context, and modern relevance.',
      path: '/hymns',
      stats: `${hymns.hymns.length}+ Hymns`
    },
    {
      id: 4,
      title: 'Surprise Me',
      icon: '✨',
      description: 'Get random fascinating facts about linguistics, mythology, philosophy, and cross-cultural connections.',
      path: '/surprise-me',
      stats: '40 Facts'
    }
  ];

  // NEW: Bottom section features
  const bottomFeatures = [
    {
      id: 1,
      title: 'Ask the Rishi',
      icon: '💬',
      description: 'AI-powered Q&A',
      path: '/ask-rishi',
      badge: ''
    },
    {
      id: 2,
      title: 'Ten Mandalas',
      icon: '📔',
      description: 'Browse all books',
      path: '/mandalas',
      badge: ''
    },
    {
      id: 3,
      title: 'About',
      icon: 'ℹ️',
      description: 'Project details',
      path: '/about',
      badge: null
    }
  ];

  const cardStyle = {
    height: '60vh',
    maxHeight: '500px',
    borderRadius: '12px',
    transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
    willChange: 'transform, opacity'
  };

  // NEW: Smaller card style for bottom section
  const smallCardStyle = {
    height: '280px',
    borderRadius: '12px',
    transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
    willChange: 'transform, opacity'
  };

  useEffect(() => {
    // Top section observer
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    // Bottom section observer
    const bottomObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsBottomIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    if (bottomSectionRef.current) {
      bottomObserver.observe(bottomSectionRef.current);
    }

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // Top section scroll logic
          if (sectionRef.current) {
            const sectionRect = sectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const totalScrollDistance = viewportHeight * 2;

            let progress = 0;
            if (sectionRect.top <= 0) {
              progress = Math.min(1, Math.max(0, Math.abs(sectionRect.top) / totalScrollDistance));
            }

            if (progress >= 0.75) {
              setActiveCardIndex(3);
            } else if (progress >= 0.5) {
              setActiveCardIndex(2);
            } else if (progress >= 0.33) {
              setActiveCardIndex(1);
            } else {
              setActiveCardIndex(0);
            }
          }

          // Bottom section scroll logic
          if (bottomSectionRef.current) {
            const bottomRect = bottomSectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const totalScrollDistance = viewportHeight * 1.5; // Shorter scroll for 3 cards

            let bottomProgress = 0;
            if (bottomRect.top <= 0) {
              bottomProgress = Math.min(1, Math.max(0, Math.abs(bottomRect.top) / totalScrollDistance));
            }

            if (bottomProgress >= 0.66) {
              setBottomCardIndex(2);
            } else if (bottomProgress >= 0.33) {
              setBottomCardIndex(1);
            } else {
              setBottomCardIndex(0);
            }
          }

          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (bottomSectionRef.current) {
        bottomObserver.unobserve(bottomSectionRef.current);
      }
    };
  }, []);

  const isFirstCardVisible = isIntersecting;
  const isSecondCardVisible = activeCardIndex >= 1;
  const isThirdCardVisible = activeCardIndex >= 2;
  const isFourthCardVisible = activeCardIndex >= 3;

  // Bottom cards visibility
  const isBottomFirstVisible = isBottomIntersecting;
  const isBottomSecondVisible = bottomCardIndex >= 1;
  const isBottomThirdVisible = bottomCardIndex >= 2;

  return (
    <>
      <Navigation />

      <div className="fixed top-20 left-0 right-0 z-50 flex justify-center px-4">
        <div className="w-full max-w-xl">
          <GlobalSearch />
        </div>
      </div>

      <div className="min-h-screen w-full">
        {/* Hero Section */}
        <section className="text-center py-16 px-4">
          <div className="max-w-4xl mx-auto ornate-golden-border">
            <div>
              <div className="text-9xl mb-6 animate-fade-in om-symbol">ॐ</div>
              <h1 className="text-5xl md:text-6xl font-[family:--font-family-header] text-[--color-ink] mb-4">
                ऋग्वेद
              </h1>
              <h2 className="text-3xl md:text-4xl font-[family:--font-family-header] text-[--color-gold] mb-6">
                Rigveda Explorer
              </h2>
              <div className="ornate-divider"></div>
              <p className="text-xl md:text-2xl text-[--color-ink-light] font-[family:--font-family-body] mb-8 leading-relaxed">
                Journey through the world's oldest sacred texts with interactive visualizations, 
                deep explorations, and ancient wisdom for modern life.
              </p>

              <div className="my-12 double-golden-border bg-gradient-to-br from-amber-100 via-orange-100 to-amber-100 rounded-2xl shadow-2xl">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-5xl">⏳</span>
                  <h3 className="text-3xl font-[family:--font-family-header] text-amber-900">Rigveda Timeline</h3>
                </div>
                <p className="text-lg text-amber-800 mb-6 font-[family:--font-family-body]">
                  Journey through 3,500+ years of Vedic tradition - from ancient composition to modern preservation
                </p>
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
                <Link 
                  to="/timeline"
                  className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-[family:--font-family-header] text-base transition-all transform hover:scale-105 shadow-lg"
                >
                  Explore Full Timeline →
                </Link>
              </div>

              <div className="golden-flourish"></div>
              <Link 
                to="/deity-network"
                className="inline-block bg-[--color-gold] hover:bg-[--color-saffron] text-[--color-ink] px-8 py-4 rounded-lg font-[family:--font-family-header] text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Begin Your Journey →
              </Link>
            </div>
          </div>
        </section>

        <div className="ornate-divider ornate-divider-om"></div>

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

        <div className="ornate-divider"></div>

        {/* TOP STACKING CARDS SECTION - 4 Cards */}
        <div ref={sectionRef} className="relative w-full" style={{ height: '300vh' }}>
          <section className="w-full h-screen py-10 md:py-16 sticky top-0">
            <div className="w-full h-full flex flex-col px-6 lg:px-8">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-[family:--font-family-header] text-[--color-ink] text-center">
                  Explore the Rigveda
                </h2>
              </div>

              <div className="relative flex-1 max-w-4xl mx-auto w-full">
                {features.map((feature, idx) => {
                  const isVisible = [isFirstCardVisible, isSecondCardVisible, isThirdCardVisible, isFourthCardVisible][idx];
                  const translateY = idx === 0 ? 90 : idx === 1 ? (activeCardIndex === 1 ? 55 : 45) : idx === 2 ? (activeCardIndex === 2 ? 25 : 15) : 0;
                  const scale = idx === 0 ? 0.9 : idx === 1 ? 0.95 : idx === 2 ? 0.98 : 1;

                  return (
                    <Link
                      key={feature.id}
                      to={feature.path}
                      className="absolute inset-0 overflow-hidden shadow-2xl group"
                      style={{
                        ...cardStyle,
                        zIndex: 10 + (idx * 10),
                        transform: `translateY(${isVisible ? translateY : 200}px) scale(${scale})`,
                        opacity: isVisible ? 1 : 0,
                        pointerEvents: isVisible ? 'auto' : 'none'
                      }}
                    >
                      <div className="double-golden-border bg-[--color-parchment-light] h-full flex flex-col justify-center p-6 sm:p-8" style={{ backgroundColor: '#F5E6D3' }}>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-5xl">{feature.icon}</div>
                          <div>
                            <h3 className="text-2xl sm:text-3xl font-[family:--font-family-header] text-[--color-ink] group-hover:text-[--color-gold] transition-colors">
                              {feature.title}
                            </h3>
                            <div className="text-sm text-[--color-saffron] font-semibold">{feature.stats}</div>
                          </div>
                        </div>
                        <p className="text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed mb-4">
                          {feature.description}
                        </p>
                        <div className="text-[--color-gold] font-semibold group-hover:translate-x-2 transition-transform inline-block">
                          Explore →
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        <div className="ornate-divider ornate-divider-om"></div>

        {/* What is Rigveda Section */}
        <section className="py-16 px-4 bg-[--color-parchment-dark]">
          <div className="max-w-4xl mx-auto ornate-golden-border">
            <div>
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
          </div>
        </section>

        <div className="golden-flourish"></div>

        {/* BOTTOM STACKING CARDS SECTION - 3 Cards */}
        <div ref={bottomSectionRef} className="relative w-full" style={{ height: '200vh' }}>
          <section className="w-full h-screen py-10 md:py-16 sticky top-0">
            <div className="w-full h-full flex flex-col px-6 lg:px-8">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-[family:--font-family-header] text-[--color-ink] text-center">
                  More to Explore
                </h2>
              </div>

              <div className="relative flex-1 max-w-4xl mx-auto w-full">
                {bottomFeatures.map((feature, idx) => {
                  const isVisible = [isBottomFirstVisible, isBottomSecondVisible, isBottomThirdVisible][idx];
                  const translateY = idx === 0 ? 60 : idx === 1 ? 30 : 0;
                  const scale = idx === 0 ? 0.92 : idx === 1 ? 0.96 : 1;

                  return (
                    <Link
                      key={feature.id}
                      to={feature.path}
                      className="absolute inset-0 overflow-hidden shadow-2xl group"
                      style={{
                        ...smallCardStyle,
                        zIndex: 10 + (idx * 10),
                        transform: `translateY(${isVisible ? translateY : 150}px) scale(${scale})`,
                        opacity: isVisible ? 1 : 0,
                        pointerEvents: isVisible ? 'auto' : 'none'
                      }}
                    >
                      <div className="double-golden-border bg-[--color-parchment-light] h-full flex flex-col justify-center items-center text-center p-8" style={{ backgroundColor: '#F5E6D3' }}>
                        <div className="text-5xl mb-4">{feature.icon}</div>
                        <h3 className="text-2xl font-[family:--font-family-header] text-[--color-ink] mb-2 group-hover:text-[--color-gold] transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-[--color-ink-light] mb-2">{feature.description}</p>
                        {feature.badge && (
                          <p className="text-sm text-[--color-saffron] font-semibold">{feature.badge}</p>
                        )}
                        {!feature.badge && <div className="h-6"></div>}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        <div className="sanskrit-border"></div>

        {/* Footer Quote Section */}
        <section className="py-12 px-4 bg-[--color-parchment-dark] border-t-4 border-[--color-gold]/30">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-4 om-symbol">ॐ</div>
            <p className="text-xl text-[--color-ink] font-[family:--font-family-body] italic mb-2">
              "Truth is one, the wise call it by many names"
            </p>
            <p className="text-sm text-[--color-ink-light]">— Rigveda 1.164.46</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default EnhancedHome;
