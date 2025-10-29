import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Network, BookOpen, Scroll, Sparkles, MessageCircleQuestion, BookText, Info, Microscope, Timer, X, BookMarked, Mic, Lightbulb, Heart, Gamepad2, Users, Trophy, ScrollText, Star } from 'lucide-react';
import Navigation from './Layout/Navigation';
import GlobalSearch from './GlobalSearch';
import CountUp from './CountUp';
import metadata from '../data/metadata.json';
import deities from '../data/deities.json';
import topics from '../data/topics.json';
import hymns from '../data/hymns.json';
import TextSelectionPopup from './TextSelectionPopup';

// Animated Journey Item Component
const AnimatedJourneyItem = ({ children, delay = 0, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once: true });
  
  return (
    <motion.div
      ref={ref}
      data-index={index}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
    >
      {children}
    </motion.div>
  );
};

const EnhancedHome = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const bottomSectionRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [bottomCardIndex, setBottomCardIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isBottomIntersecting, setIsBottomIntersecting] = useState(false);
  const [showJourneyModal, setShowJourneyModal] = useState(false);
  const ticking = useRef(false);
  const [rishiText, setRishiText] = useState('');
  const fullRishiText = "I am your guide through the ancient wisdom of the Rigveda. Choose your path, and let us begin this sacred journey together.";


  const journeyOptions = [
    {
      id: 1,
      icon: <BookMarked className="w-5 h-5" />,
      title: "What is the Rigveda?",
      description: "Discover what RigVeda is all about",
      action: () => {
        setShowJourneyModal(false);
        const element = document.querySelector('section.py-16.px-4.bg-\\[--color-parchment-dark\\]');
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    {
      id: 2,
      icon: <Mic className="w-5 h-5" />,
      title: "Ten Mandalas Podcast",
      description: "Explore the Ten Mandalas through a Podcast",
      link: '/mandalas'
    },
    {
      id: 3,
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Interesting Facts",
      description: "Discover fascinating facts about RigVeda",
      link: '/surprise-me'
    },
    {
      id: 4,
      icon: <Heart className="w-5 h-5" />,
      title: "Life Topics",
      description: "Learn about life topics through RigVeda lens",
      link: '/rigveda-on'
    },
    {
      id: 5,
      icon: <Gamepad2 className="w-5 h-5" />,
      title: "Story Mode",
      description: "Play as a character in RigVeda era",
      link: '/games'
    },
    {
      id: 6,
      icon: <Users className="w-5 h-5" />,
      title: "Deity Cards",
      description: "Collect Deity Collectible Cards",
      link: '/games'
    },
    {
      id: 7,
      icon: <Trophy className="w-5 h-5" />,
      title: "My Vedic Identity",
      description: "Discover which deity aligns with you",
      link: '/my-vedic-identity'
    },
    {
      id: 8,
      icon: <ScrollText className="w-5 h-5" />,
      title: "Explore Hymns",
      description: "Browse hymns mentioned in RigVeda",
      link: '/hymns'
    },
    {
      id: 'deity-network',
      icon: <Network size={20} />,
      title: 'DEITY NETWORK',
      description: 'EXPLORE RELATIONSHIPS BETWEEN VEDIC DEITIES',
      link: '/deity-network'
    },
    
    {
      id: 9,
      icon: <Star className="w-5 h-5" />,
      title: "Constellations",
      description: "Explore significance of constellations",
      link: '/rigveda-observatory'
    }
  ];

  const handleJourneyClick = (option) => {
    if (option.action) {
      option.action();
    } else if (option.link) {
      setShowJourneyModal(false);
      navigate(option.link);
    }
  };

  const features = [
    {
      id: 1,
      title: 'Deity Network',
      icon: <Network size={48} />,
      description: 'Explore interactive relationships between 26 Vedic deities through a dynamic force-directed graph.',
      path: '/deity-network',
      stats: `${deities.deities.length} Deities`,
      tourId: 'deity-network-card',
    },
    {
      id: 2,
      title: 'Life Topics',
      icon: <BookOpen size={48} />,
      description: 'Discover ancient wisdom on modern topics: mind, health, ethics, nature, relationships, and more.',
      path: '/rigveda-on',
      stats: `${topics.topics.length} Topics`,
      tourId: 'topics-card',
    },
    {
      id: 3,
      title: 'Hymn Browser',
      icon: <Scroll size={48} />,
      description: 'Search and explore 30+ sacred hymns with full translations, context, and modern relevance.',
      path: '/hymns',
      stats: `${hymns.hymns.length}+ Hymns`,
      tourId: 'hymns-card',
    },
    {
      id: 4,
      title: 'Surprise Me',
      icon: <Sparkles size={48} />,
      description: 'Get random fascinating facts about linguistics, mythology, philosophy, and cross-cultural connections.',
      path: '/surprise-me',
      stats: '40 Facts',
      tourId: 'surprise-card',
    }
  ];

  const bottomFeatures = [
    {
      id: 1,
      title: 'Ask the Rishi',
      icon: <MessageCircleQuestion size={32} />,
      description: 'AI-powered Q&A',
      path: '/ask-rishi',
      badge: '' ,
      tourId: 'ask-rishi-card',
    },
    {
      id: 2,
      title: 'Ten Mandalas',
      icon: <BookText size={32} />,
      description: 'Browse all books',
      path: '/mandalas',
      badge: '' ,
      tourId: 'podcasts-card',
    },
    {
      id: 3,
      title: 'About',
      icon: <Info size={32} />,
      description: 'Project details',
      path: '/about',
      badge: null, 
      tourId: 'about-card',
    }
  ];

  const cardStyle = {
    height: '60vh',
    maxHeight: '500px',
    borderRadius: '12px',
    transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
    willChange: 'transform, opacity'
  };

  const smallCardStyle = {
    height: '280px',
    borderRadius: '12px',
    transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
    willChange: 'transform, opacity'
  };

  useEffect(() => {
    if (showJourneyModal && rishiText.length < fullRishiText.length) {
      const timer = setTimeout(() => {
        setRishiText(fullRishiText.substring(0, rishiText.length + 1));
      }, 30); // 30ms per character
      return () => clearTimeout(timer);
    } else if (!showJourneyModal) {
      setRishiText(''); // Reset when modal closes
    }
  }, [showJourneyModal, rishiText]);
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

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

          if (bottomSectionRef.current) {
            const bottomRect = bottomSectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const totalScrollDistance = viewportHeight * 1.5;

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

  const isBottomFirstVisible = isBottomIntersecting;
  const isBottomSecondVisible = bottomCardIndex >= 1;
  const isBottomThirdVisible = bottomCardIndex >= 2;

  return (
    <>
    <TextSelectionPopup />
      <Navigation />

         {/* Journey Selection Modal with Single Column Layout */}
         <AnimatePresence>
            {showJourneyModal && (
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                  style={{ zIndex: 1000 }}
                  onClick={(e) => {
                     if (e.target === e.currentTarget) {
                        setShowJourneyModal(false);
                     }
                  }}
               >
                  <motion.div 
                     initial={{ scale: 0.9, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0.9, opacity: 0 }}
                     transition={{ duration: 0.3, ease: "easeOut" }}
                     className="relative max-w-4xl w-full max-h-[85vh] bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-2xl ornate-golden-border overflow-hidden flex"
                  >
                     {/* Close Button */}
                     <button
                        onClick={() => setShowJourneyModal(false)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-lg z-10"
                     >
                        <X className="w-6 h-6 text-[--color-ink]" />
                     </button>

                     {/* Rishi Mascot - Left Side */}
                     {/* Rishi Mascot - Left Side */}
                     <div className="hidden md:flex md:w-2/5 bg-gradient-to-b from-amber-100 to-orange-100 p-4 flex-col items-center justify-center border-r-2 border-amber-300 overflow-hidden">
                        <motion.video
                           autoPlay
                           loop
                           muted
                           playsInline
                           className="w-full max-w-[180px] h-auto rounded-lg shadow-lg mb-3"
                           initial={{ scale: 0.8, opacity: 0 }}
                           animate={{ scale: 1, opacity: 1 }}
                           transition={{ delay: 0.2, duration: 0.5 }}
                           style={{
                              filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))'
                           }}
                        >
                           <source src="/images/rishi-mascot.mp4" type="video/mp4" />
                           Your browser does not support the video tag.
                        </motion.video>

                        <motion.div
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.4, duration: 0.5 }}
                           className="text-center px-2"
                        >
                           <h3 className="text-base font-bold text-amber-900 mb-1.5 flex items-center justify-center gap-2" style={{ fontFamily: 'Georgia, Garamond, serif' }}>
                              Greetings, Seeker! <Sparkles className="w-4 h-4 text-amber-600" />
                           </h3>
                           <p className="text-[11px] text-amber-700 leading-snug min-h-[60px]" style={{ fontFamily: "'Press Start 2P', 'Courier New', monospace", fontStyle: 'normal', lineHeight: '1.6' }}>
                              {rishiText}
                              {rishiText.length < fullRishiText.length && <span className="animate-pulse">|</span>}
                           </p>
                        </motion.div>
                     </div>



                     {/* Journey Options - Right Side */}
                     <div className="flex-1 md:w-3/5 flex flex-col">
                        {/* Header */}
                        <div className="p-3 pb-1.5 text-center flex-shrink-0">
                           <div className="mb-1 text-2xl om-symbol">ॐ</div>
                           <h2 className="text-lg font-bold text-[--color-ink] mb-0.5 font-[family:--font-family-header]">
                              Begin Your Journey
                           </h2>
                           <p className="text-[11px] text-[--color-ink-light] mb-1">
                              Choose your path through the ancient wisdom of the Rigveda
                           </p>
                        </div>

                        {/* Journey Options - Single Column List */}
                        <div className="px-4 pb-3 flex-1 overflow-y-auto">
                           {journeyOptions.map((option, index) => (
                              <motion.div
                                 key={option.id}
                                 initial={{ scale: 0.7, opacity: 0 }}
                                 animate={{ scale: 1, opacity: 1 }}
                                 transition={{ duration: 0.2, delay: 0 }}
                              >
                                 <button
                                    onClick={() => handleJourneyClick(option)}
                                    className="w-full text-left p-2 bg-white rounded-lg ornate-golden-border hover:bg-amber-50 hover:scale-[1.02] transition-all duration-300 mb-1.5"
                                    style={{
                                       transition: 'all 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                       e.currentTarget.style.boxShadow = '0 0 25px rgba(251, 191, 36, 0.8), 0 0 50px rgba(251, 191, 36, 0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                       e.currentTarget.style.boxShadow = 'none';
                                    }}
                                 >
                                    <div className="flex items-center gap-2">
                                       <div className="p-1.5 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg text-[--color-gold] flex-shrink-0">
                                          {option.icon}
                                       </div>
                                       <div className="flex-1 min-w-0">
                                          <h3 className="font-bold text-[--color-ink] text-xs font-[family:--font-family-header]">
                                             {option.title}
                                          </h3>
                                          <p className="text-[10px] text-[--color-ink-light] font-[family:--font-family-body] mt-0.5 leading-tight">
                                             {option.description}
                                          </p>
                                       </div>
                                    </div>
                                 </button>
                              </motion.div>
                           ))}
                        </div>
                     </div>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>


      <div className="fixed top-20 left-0 right-0 z-50 flex justify-center px-4">
        <div id="global-search" className="w-full max-w-xl">
          <GlobalSearch />
        </div>
      </div>

      {/* VIDEO HERO */}
      <div className="relative w-full bg-black" style={{ height: '100vh', marginTop: '-80px', paddingTop: '80px' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <div className="mb-6">
            <img 
              src="/images/logo-hero.png" 
              alt="RigVeda Odyssey" 
              onContextMenu={(e) => e.preventDefault()}
              className="w-[300px] md:w-[400px] h-auto mx-auto"
              style={{
                filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.5))',
                animation: 'fadeInScale 1.2s ease-out',
                pointerEvents: 'none'
              }}
            />
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mb-8">
            Journey through the world's oldest sacred texts
          </p>
          
          <button 
              onClick={() => setShowJourneyModal(true)}
              className="relative inline-block bg-transparent border-2 px-8 py-4 rounded-lg font-[family:--font-family-header] text-lg transition-all transform hover:scale-105"
              style={{
                borderColor: '#DAA520',
                color: '#DAA520',
                boxShadow: '0 0 20px rgba(218, 165, 32, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(218, 165, 32, 0.1)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(218, 165, 32, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(218, 165, 32, 0.3)';
              }}
            >
              Begin Your Journey →
            </button>
            
            {/* Golden Sparkles */}
            <div className="sparkle-wrapper">
              <span className="sparkle sparkle-1"></span>
              <span className="sparkle sparkle-2"></span>
              <span className="sparkle sparkle-3"></span>
              <span className="sparkle sparkle-4"></span>
              <span className="sparkle sparkle-5"></span>
              <span className="sparkle sparkle-6"></span>
              <span className="sparkle sparkle-7"></span>
              <span className="sparkle sparkle-8"></span>
            </div>
          

          
          <div className="absolute bottom-10 animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
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
                Rigveda Odyssey
              </h2>
              <div className="ornate-divider"></div>
              <p className="text-xl md:text-2xl text-[--color-ink-light] font-[family:--font-family-body] mb-8 leading-relaxed">
                Journey through the world's oldest sacred texts with interactive visualizations, 
                deep explorations, and ancient wisdom for modern life.
              </p>

              <div className="golden-flourish"></div>
            </div>
          </div>
        </section>

        <div className="ornate-divider ornate-divider-om"></div>

        {/* What is Rigveda Section - MOVED TO TOP */}
        <section className="py-16 px-4 bg-[--color-parchment-dark]">
          <div className="max-w-5xl mx-auto ornate-golden-border">
            <div>
              <h2 className="text-4xl font-[family:--font-family-header] text-[--color-ink] mb-8 text-center">
                What is the Rigveda?
              </h2>
              
              {/* Introduction */}
              <div className="space-y-6 text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed text-lg">
                <p className="text-xl font-semibold text-[--color-ink]">
                  Imagine a collection of songs, prayers, and philosophical musings so ancient that they predate the Bible, the Iliad, and most written languages. Welcome to the Rigveda—humanity's oldest surviving literary work.
                </p>
                
                <p>
                  The Rigveda is the <strong>oldest of the four Vedas</strong> and one of the most ancient religious texts in existence, composed in <strong>Vedic Sanskrit between 1500-1200 BCE</strong>—over 3,500 years ago. It consists of <strong>10,552 verses</strong> organized into <strong>10 Mandalas (books)</strong>, each a treasure trove of wisdom, poetry, and spiritual insight.
                </p>

                {/* What's Inside */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-300 my-8">
                  <h3 className="text-2xl font-[family:--font-family-header] text-[--color-ink] mb-4 flex items-center gap-2">
                    <Scroll className="w-6 h-6 text-[--color-gold]" />
                    What's Inside the Rigveda?
                  </h3>
                  <ul className="space-y-3 text-[--color-ink-light]">
                    <li className="flex items-start gap-3">
                      <span className="text-[--color-saffron] text-xl">•</span>
                      <span><strong>Hymns to Nature Gods:</strong> Praises to Agni (fire), Indra (thunder), Surya (sun), and dozens of other deities representing forces of nature</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[--color-saffron] text-xl">•</span>
                      <span><strong>Philosophical Questions:</strong> Deep inquiries into creation, consciousness, death, and the nature of reality itself</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[--color-saffron] text-xl">•</span>
                      <span><strong>Ritual Instructions:</strong> Detailed procedures for fire sacrifices, ceremonies, and spiritual practices</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[--color-saffron] text-xl">•</span>
                      <span><strong>Social Commentary:</strong> Insights into ancient Indian society, customs, beliefs, and daily life</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[--color-saffron] text-xl">•</span>
                      <span><strong>Mystical Poetry:</strong> Beautiful metaphors, cosmic imagery, and literary artistry that inspired millennia of poets</span>
                    </li>
                  </ul>
                </div>

                {/* Why It Matters */}
                <div>
                  <h3 className="text-2xl font-[family:--font-family-header] text-[--color-ink] mb-4">
                    Why Does the Rigveda Matter Today?
                  </h3>
                  <p>
                    Beyond its age, the Rigveda is <strong>humanity's earliest attempt to answer life's biggest questions</strong>: Where do we come from? What is consciousness? How should we live? What happens after death? These hymns represent our ancestors grappling with the same mysteries we face today—making them timelessly relevant.
                  </p>
                </div>

                {/* Famous Example */}
                <div className="bg-white p-6 rounded-xl border-l-4 border-[--color-gold] shadow-md italic my-8">
                  <p className="text-[--color-ink] mb-2">
                    <strong>The Nasadiya Sukta (Hymn of Creation):</strong>
                  </p>
                  <p className="text-[--color-ink-light]">
                    "Who really knows? Who will here proclaim it? Whence was it produced? Whence is this creation? Perhaps it formed itself, or perhaps it did not—only he who is its overseer in highest heaven knows, or perhaps even he does not know."
                  </p>
                  <p className="text-sm text-[--color-ink-light] mt-3">
                    — Rigveda 10.129 (questioning even the gods' knowledge of creation!)
                  </p>
                </div>

                {/* Cultural Impact */}
                <div>
                  <h3 className="text-2xl font-[family:--font-family-header] text-[--color-ink] mb-4">
                    The Rigveda's Global Influence
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <p className="font-semibold text-[--color-ink] mb-2">🌍 Linguistic Legacy</p>
                      <p className="text-sm">Sanskrit words in the Rigveda influenced dozens of languages across Europe and Asia—from English "father" (Sanskrit: पितृ <em>pitṛ</em>) to "mother" (मातृ <em>mātṛ</em>)</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="font-semibold text-[--color-ink] mb-2">🧘 Spiritual Foundation</p>
                      <p className="text-sm">The philosophical concepts introduced here—karma, dharma, yoga—went on to shape Hinduism, Buddhism, and Jainism</p>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <p className="font-semibold text-[--color-ink] mb-2">🔬 Scientific Curiosity</p>
                      <p className="text-sm">Ancient observations of astronomy, mathematics, and medicine demonstrate sophisticated scientific thinking millennia ago</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="font-semibold text-[--color-ink] mb-2">📜 Literary Masterpiece</p>
                      <p className="text-sm">Recognized by UNESCO as part of humanity's intangible cultural heritage, studied by scholars worldwide</p>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-br from-[--color-gold]/10 to-[--color-saffron]/10 p-8 rounded-2xl border-2 border-[--color-gold]/30 text-center mt-8">
                  <p className="text-xl font-semibold text-[--color-ink] mb-4">
                    Ready to explore the world's oldest wisdom?
                  </p>
                  <p className="text-[--color-ink-light] mb-6">
                    Dive into interactive visualizations, discover fascinating facts, explore deity relationships, and find timeless insights for modern living.
                  </p>
                  <button
                   onClick={() => setShowJourneyModal(true)}
                   className="inline-block px-8 py-3 rounded-lg border-2 transition-all transform hover:scale-105 font-family--font-family-header text-lg shadow-lg"
                   style={{
                     borderColor: '#d4af37',
                     color: '#d4af37',
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.backgroundColor = '#d4af37';
                     e.currentTarget.style.color = '#fff';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.backgroundColor = 'transparent';
                     e.currentTarget.style.color = '#d4af37';
                   }}
                 >
                   START YOUR JOURNEY →
                 </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="ornate-divider ornate-divider-om"></div>

        {/* Quick Stats */}
        <section className="py-8 px-4 bg-[--color-parchment-dark]">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="text-4xl font-[family:--font-family-header] text-[--color-saffron] mb-2">
                <CountUp 
                  to={metadata.structure.totalMandalas || 10}
                  duration={2}
                  delay={0}
                />
              </div>
              <div className="text-sm text-[--color-ink-light]">Mandalas</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl font-[family:--font-family-header] text-[--color-saffron] mb-2">
                <CountUp 
                  to={metadata.structure.totalVerses || 10552}
                  duration={2.5}
                  delay={0.1}
                  separator=","
                />
              </div>
              <div className="text-sm text-[--color-ink-light]">Verses</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl font-[family:--font-family-header] text-[--color-saffron] mb-2">
                <CountUp 
                  to={deities.deities.length}
                  duration={2}
                  delay={0.2}
                />
              </div>
              <div className="text-sm text-[--color-ink-light]">Deities</div>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl font-[family:--font-family-header] text-[--color-saffron] mb-2">
                <CountUp 
                  to={topics.topics.length}
                  duration={2}
                  delay={0.3}
                />
              </div>
              <div className="text-sm text-[--color-ink-light]">Life Topics</div>
            </div>
          </div>
        </section>

        <div className="ornate-divider"></div>

        {/* TOP STACKING CARDS SECTION */}
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
                      id={feature.tourId} 
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

        {/* RigVeda Timeline Section - MOVED TO BOTTOM */}
        <section className="py-16 px-4 bg-[--color-parchment-dark]">
          <div className="max-w-4xl mx-auto">
            <div id="timeline-section" className="double-golden-border bg-gradient-to-br from-amber-100 via-orange-100 to-amber-100 rounded-2xl shadow-2xl p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Timer size={48} className="text-[--color-gold]" />
                <h3 className="text-3xl font-[family:--font-family-header] text-amber-900">Rigveda Timeline</h3>
              </div>
              <p className="text-lg text-amber-800 mb-6 font-[family:--font-family-body] text-center">
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
                    <Scroll size={24} className="text-[--color-gold]" />
                    <div>
                      <div className="font-bold text-amber-900">1500-1200 BCE</div>
                      <div className="text-sm text-amber-700">Rigveda Composition Period</div>
                    </div>
                  </div>
                  <div className="text-3xl">→</div>
                  <div className="flex items-center gap-2">
                    <Microscope size={24} className="text-[--color-gold]" />
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
              <div className="text-center">
                <Link 
                  to="/timeline"
                  className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-[family:--font-family-header] text-base transition-all transform hover:scale-105 shadow-lg"
                >
                  Explore Full Timeline →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="golden-flourish"></div>

        {/* BOTTOM STACKING CARDS SECTION */}
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
                      id={feature.tourId}
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

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default EnhancedHome;



<style jsx>{`
  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes sparkle-fall {
    0% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateY(120px) scale(0);
      opacity: 0;
    }
  }

  .button-sparkle-container {
    position: relative;
  }

  .sparkle-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200px;
    pointer-events: none;
    overflow: visible;
  }

  .sparkle {
    position: absolute;
    top: 20px;
    width: 3px;
    height: 3px;
    background: #FFD700;
    border-radius: 50%;
    box-shadow: 0 0 6px #FFD700, 0 0 10px #DAA520;
    animation: sparkle-fall 3s ease-in infinite;
  }

  .sparkle-1 { left: 15%; animation-delay: 0s; }
  .sparkle-2 { left: 25%; animation-delay: 0.4s; width: 2px; height: 2px; }
  .sparkle-3 { left: 35%; animation-delay: 0.8s; }
  .sparkle-4 { left: 45%; animation-delay: 1.2s; width: 4px; height: 4px; }
  .sparkle-5 { left: 55%; animation-delay: 1.6s; }
  .sparkle-6 { left: 65%; animation-delay: 2s; width: 2px; height: 2px; }
  .sparkle-7 { left: 75%; animation-delay: 2.4s; }
  .sparkle-8 { left: 85%; animation-delay: 2.8s; width: 3px; height: 3px; }
`}</style>
