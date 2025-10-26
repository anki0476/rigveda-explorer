import React from 'react';
import CountUp from './CountUp';
import LogoLoop from './LogoLoop';
import metadata from '../data/metadata.json';
import deities from '../data/deities.json';
import topics from '../data/topics.json';
import hymns from '../data/hymns.json';
import facts from '../data/surpriseFacts.json';
import connections from '../data/connections.json';
import { 
  Podcast, 
  Trophy, 
  MessageCircle, 
  Network, 
  BookText, 
  Star, 
  Lightbulb, 
  Volume2, 
  Users, 
  Sparkles, 
  Book, 
  Search,
  Clock
} from 'lucide-react';

const About = () => {
  // Technology logos - only what we actually use
  const techLogos = [
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
      alt: 'React',
      title: 'React 19',
      href: 'https://react.dev',
      height: 40
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
      alt: 'JavaScript',
      title: 'JavaScript ES6+',
      href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      height: 40
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
      alt: 'Python',
      title: 'Python',
      href: 'https://www.python.org',
      height: 40
    },
    {
      src: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg',
      alt: 'Gemini',
      title: 'Google Gemini AI',
      href: 'https://gemini.google.com',
      height: 40
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
      alt: 'CSS',
      title: 'CSS3',
      href: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
      height: 40
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
      alt: 'HTML',
      title: 'HTML5',
      href: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
      height: 40
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
      alt: 'VS Code',
      title: 'Visual Studio Code',
      href: 'https://code.visualstudio.com',
      height: 40
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
      alt: 'Tailwind CSS',
      title: 'Tailwind CSS v4',
      href: 'https://tailwindcss.com',
      height: 40
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/d3js/d3js-original.svg',
      alt: 'D3.js',
      title: 'D3.js v7',
      href: 'https://d3js.org',
      height: 40
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg',
      alt: 'Vite',
      title: 'Vite',
      href: 'https://vitejs.dev',
      height: 40
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactrouter/reactrouter-original.svg',
      alt: 'React Router',
      title: 'React Router v7',
      href: 'https://reactrouter.com',
      height: 40
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
      alt: 'ChatGPT',
      title: 'ChatGPT',
      href: 'https://chat.openai.com',
      height: 40
    },
    {
      src: 'https://avatars.githubusercontent.com/u/82983330?s=200&v=4',
      alt: 'DALL-E',
      title: 'DALL-E',
      href: 'https://openai.com/dall-e',
      height: 40
    },
    {
      src: 'https://avatars.githubusercontent.com/u/3979584?s=200&v=4',
      alt: 'Claude',
      title: 'Claude AI',
      href: 'https://www.anthropic.com/claude',
      height: 40
    },
    {
      src: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/perplexity-ai-icon.png',
      alt: 'Perplexity',
      title: 'Perplexity AI',
      href: 'https://www.perplexity.ai',
      height: 40
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Hero Section */}
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="mb-6 flex justify-center">
          <img 
            src="/images/logo-hero.png" 
            alt="RigVeda Odyssey" 
            className="w-[400px] md:w-[500px] h-auto"
            style={{
              filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3))'
            }}
          />
        </div>
        <p className="text-xl text-[--color-ink-light] font-[family:--font-family-body] max-w-3xl mx-auto leading-relaxed">
          An immersive, gamified exploration of humanity's oldest sacred texts through modern web technology
        </p>
      </div>

      {/* Stats Grid - WITH COUNT UP ANIMATION */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-[--color-parchment-light] p-6 rounded-lg border-2 border-[--color-gold]/30 text-center">
          <div className="text-4xl font-[family:--font-family-header] text-[--color-saffron] mb-2">
            <CountUp 
              to={metadata.structure.totalMandalas || 10}
              duration={1.5}
              delay={0}
            />
          </div>
          <div className="text-sm text-[--color-ink-light] font-[family:--font-family-body] uppercase">
            Mandalas
          </div>
        </div>

        <div className="bg-[--color-parchment-light] p-6 rounded-lg border-2 border-[--color-gold]/30 text-center">
          <div className="text-4xl font-[family:--font-family-header] text-[--color-saffron] mb-2">
            <CountUp 
              to={metadata.structure.totalSuktas || 1028}
              duration={2}
              delay={0.2}
              separator=","
            />
          </div>
          <div className="text-sm text-[--color-ink-light] font-[family:--font-family-body] uppercase">
            Suktas (Hymns)
          </div>
        </div>

        <div className="bg-[--color-parchment-light] p-6 rounded-lg border-2 border-[--color-gold]/30 text-center">
          <div className="text-4xl font-[family:--font-family-header] text-[--color-saffron] mb-2">
            <CountUp 
              to={metadata.structure.totalVerses || 10552}
              duration={2.5}
              delay={0.4}
              separator=","
            />
          </div>
          <div className="text-sm text-[--color-ink-light] font-[family:--font-family-body] uppercase">
            Verses
          </div>
        </div>

        <div className="bg-[--color-parchment-light] p-6 rounded-lg border-2 border-[--color-gold]/30 text-center">
          <div className="text-4xl font-[family:--font-family-header] text-[--color-saffron] mb-2">
            <CountUp 
              to={deities.deities.length}
              duration={1.5}
              delay={0.6}
            />
          </div>
          <div className="text-sm text-[--color-ink-light] font-[family:--font-family-body] uppercase">
            Deities
          </div>
        </div>
      </div>

      {/* What is Rigveda Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-[family:--font-family-header] text-[--color-ink] mb-6 pb-2 border-b-2 border-[--color-gold]/30">
          What is the Rigveda?
        </h2>
        <div className="bg-[--color-parchment-light] p-8 rounded-lg space-y-4">
          <p className="text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed">
            The Rigveda is the oldest of the four Vedas and one of the oldest religious texts in the world, 
            composed in Vedic Sanskrit between 1500-1200 BCE. It consists of 10,552 verses organized into 
            10 Mandalas (books), containing approximately 153,000 words of hymns praising various deities 
            and exploring cosmic principles.
          </p>
          <p className="text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed">
            These hymns represent humanity's earliest philosophical inquiries into the nature of existence, 
            consciousness, morality, and the cosmos. They blend poetry, ritual, philosophy, and science in 
            ways that continue to inspire scholars, spiritual seekers, and scientists today.
          </p>
        </div>
      </section>

      {/* About This Project */}
      <section className="mb-12">
        <h2 className="text-3xl font-[family:--font-family-header] text-[--color-ink] mb-6 pb-2 border-b-2 border-[--color-gold]/30">
          About This Project
        </h2>
        <div className="bg-[--color-parchment-light] p-8 rounded-lg space-y-6">
          <p className="text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed">
            Rigveda Odyssey is a web experience that transforms ancient Vedic wisdom 
            into an interactive journey. This project combines scholarly research, AI-powered features, immersive 
            visualizations, and game mechanics to create an unprecedented digital exploration of the world's 
            oldest sacred texts.
          </p>
          <p className="text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed">
            Built by <strong>ANKIT SHRIVASTAVA</strong> with React 19, D3.js, Tailwind CSS v4, and powered by Google Gemini AI, the platform offers 
            20 bilingual AI-generated podcasts, interactive story modes, deity collection games, achievement 
            systems, 3D book viewers, celestial star maps, and comprehensive explorations of Vedic philosophy—all 
            wrapped in an authentic ancient manuscript aesthetic with custom sound design and fluid animations.
          </p>

          {/* Technology Logos Loop */}
          <div className="mt-8">
            <h3 className="text-center text-lg font-[family:--font-family-header] text-[--color-saffron] mb-4">
              Built With
            </h3>
            <LogoLoop
              logos={techLogos}
              speed={50}
              direction="left"
              logoHeight={50}
              gap={48}
              pauseOnHover={true}
              fadeOut={true}
              fadeOutColor="#F5E6D3"
              scaleOnHover={true}
              ariaLabel="Technologies used in this project"
            />
          </div>
        </div>
      </section>

      {/* About Rishi, the Mascot */}
      <section className="mb-12">
         <h2 className="text-3xl font-[family:--font-family-header] text-[--color-ink] mb-6 pb-2 border-b-2 border-[--color-gold]/30">
            About Rishi, the Mascot
         </h2>
         <div className="bg-[--color-parchment-light] p-8 rounded-lg space-y-6 flex flex-col md:flex-row gap-8 items-center">
            <video 
               src="/videos/RishiAbout.mp4"
               width={180}
               height={180}
               className="rounded-full shadow-lg border-2 border-[--color-gold]/30 object-cover mb-6 md:mb-0"
               style={{ background: 'var(--color-parchment-dark)' }}
               controls
               autoPlay
               loop
               muted
               playsInline
               aria-label="About Rishi mascot video"
            />
            <div>
               <p className="text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed text-lg mb-2">
                  <strong>Meet Rishi—your digital guide to the Rigveda Odyssey.</strong>
               </p>
               <p className="text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed">
                  Rishi is inspired by the visionary seers of ancient Vedic India. Known for his insatiable curiosity and wisdom,
                  Rishi was regarded among his peers as both a teacher and a playful explorer—composing hymns, debating philosophy,
                  and discovering the secrets of existence along sacred rivers and forests.
               </p>
               <p className="text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed">
                  As the project mascot, Rishi guides you through every corner of Rigveda Odyssey: explaining concepts, revealing facts,
                  encouraging discovery, and celebrating your achievements. He helped shape the look, feel, and joyful spirit of this
                  digital journey—offering ideas and a sprinkle of ancient magic at every step.
               </p>
               <ul className="mt-4 space-y-3 pl-6 list-disc text-[--color-ink-light] font-[family:--font-family-body]">
                  <li><strong>Wisdom + Play:</strong> Making Vedic mysteries approachable and fun.</li>
                  <li><strong>Curiosity + Clarity:</strong> Helping you learn faster and enjoy the experience.</li>
                  <li><strong>Collaboration:</strong> Working alongside Ankit as a creative companion. (This way Rishi can be considered as the co-founder?!)</li>
               </ul>
               <p className="mt-4 text-[--color-ink-light] font-[family:--font-family-body] italic">
                  Whether you’re an explorer or a seeker, Rishi is always there to make your Rigveda journey vivid and unforgettable!
               </p>
            </div>
         </div>
      </section>



      {/* Features Grid */}
      <section className="mb-12">
        <h2 className="text-3xl font-[family:--font-family-header] text-[--color-ink] mb-6 pb-2 border-b-2 border-[--color-gold]/30">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Mandala Specific Podcasts */}
          <div className="bg-[--color-parchment-light] p-6 rounded-lg border-l-4 border-[--color-saffron]">
            <h3 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-3 flex items-center gap-2">
              <Podcast size={24} className="text-[--color-saffron]" />
              Mandala Specific Podcasts
            </h3>
            <p className="text-[--color-ink-light] font-[family:--font-family-body] text-sm">
              20 immersive podcasts (10 English + 10 Hindi) covering all Mandalas, generated using AI with custom scripts. Each features conversational AI hosts exploring themes, philosophy, and historical context with chapter navigation and transcripts.
            </p>
          </div>

          {/* Gamification System */}
          <div className="bg-[--color-parchment-light] p-6 rounded-lg border-l-4 border-[--color-saffron]">
            <h3 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-3 flex items-center gap-2">
              <Trophy size={24} className="text-[--color-saffron]" />
              Gamification System
            </h3>
            <p className="text-[--color-ink-light] font-[family:--font-family-body] text-sm">
              Complete achievement system with 15 unlockable badges, XP progression, deity collector mini-game with 3D card flips, story mode with branching narratives, and progress tracking across all features. Earn rewards by exploring content!
            </p>
          </div>

          {/* Ask The Rishi AI Assistant */}
          <div className="bg-[--color-parchment-light] p-6 rounded-lg border-l-4 border-[--color-saffron]">
            <h3 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-3 flex items-center gap-2">
              <MessageCircle size={24} className="text-[--color-saffron]" />
              Ask The Rishi AI Assistant
            </h3>
            <p className="text-[--color-ink-light] font-[family:--font-family-body] text-sm">
              Powered by Google Gemini AI, this conversational assistant answers questions about Vedic philosophy, provides verse interpretations, explains Sanskrit terms, and offers personalized wisdom with context-aware responses and markdown formatting.
            </p>
          </div>

          {/* Interactive Deity Network */}
          <div className="bg-[--color-parchment-light] p-6 rounded-lg border-l-4 border-[--color-saffron]">
            <h3 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-3 flex items-center gap-2">
              <Network size={24} className="text-[--color-saffron]" />
              Interactive Deity Network
            </h3>
            <p className="text-[--color-ink-light] font-[family:--font-family-body] text-sm">
              D3.js force-directed graph visualizing {deities.deities.length} deities and {connections.connections.length} relationships. Features dynamic physics, hover tooltips, filtering by domain, zoomable canvas, and detailed deity profiles with mythology, symbols, and associated hymns.
            </p>
          </div>

          {/* Interactive Story Mode */}
          <div className="bg-[--color-parchment-light] p-6 rounded-lg border-l-4 border-[--color-saffron]">
            <h3 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-3 flex items-center gap-2">
              <BookText size={24} className="text-[--color-saffron]" />
              Interactive Story Mode
            </h3>
            <p className="text-[--color-ink-light] font-[family:--font-family-body] text-sm">
              Narrative-driven exploration with branching storylines, player choices affecting outcomes, character-driven plots featuring sages and deities, and beautifully illustrated story cards. Unlock new paths as you progress through Vedic tales.
            </p>
          </div>

          {/* RigVeda Observatory */}
          <div className="bg-[--color-parchment-light] p-6 rounded-lg border-l-4 border-[--color-saffron]">
            <h3 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-3 flex items-center gap-2">
              <Star size={24} className="text-[--color-saffron]" />
              RigVeda Observatory
            </h3>
            <p className="text-[--color-ink-light] font-[family:--font-family-body] text-sm">
              Interactive celestial visualization of 8 Vedic constellations (Nakshatras) with animated stars, constellation mythology, astrological significance, and connections to Rigvedic hymns. Features smooth animations and educational tooltips.
            </p>
          </div>

          {/* Life Topics Explorer */}
          <div className="bg-[--color-parchment-light] p-6 rounded-lg border-l-4 border-[--color-saffron]">
            <h3 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-3 flex items-center gap-2">
              <Lightbulb size={24} className="text-[--color-saffron]" />
              Life Topics Explorer
            </h3>
            <p className="text-[--color-ink-light] font-[family:--font-family-body] text-sm">
              {topics.topics.length} comprehensive explorations connecting modern life challenges to Vedic wisdom—mind, health, ethics, purpose, relationships, and more. Each topic includes Sanskrit concepts, practical applications, relevant hymns, and reflection questions.
            </p>
          </div>

          {/* Audio Experience */}
          <div className="bg-[--color-parchment-light] p-6 rounded-lg border-l-4 border-[--color-saffron]">
            <h3 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-3 flex items-center gap-2">
              <Volume2 size={24} className="text-[--color-saffron]" />
              Audio Experience
            </h3>
            <p className="text-[--color-ink-light] font-[family:--font-family-body] text-sm">
              17 professionally narrated hymn audio files with Sanskrit recitation, ambient Vedic soundscapes with fire crackling and chanting, custom sound effects for interactions (page flips, unlocks), and toggleable background audio throughout the app.
            </p>
          </div>

          {/* Vedic Identity Quiz */}
          <div className="bg-[--color-parchment-light] p-6 rounded-lg border-l-4 border-[--color-saffron]">
            <h3 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-3 flex items-center gap-2">
              <Users size={24} className="text-[--color-saffron]" />
              Vedic Identity Quiz
            </h3>
            <p className="text-[--color-ink-light] font-[family:--font-family-body] text-sm">
              Personality assessment matching users to Vedic archetypes based on philosophical alignment, values, and life approach. Provides detailed profile descriptions, associated deities, recommended practices, and personalized content suggestions.
            </p>
          </div>

          {/* Surprise Facts */}
          <div className="bg-[--color-parchment-light] p-6 rounded-lg border-l-4 border-[--color-saffron]">
            <h3 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-3 flex items-center gap-2">
              <Sparkles size={24} className="text-[--color-saffron]" />
              Surprise Facts
            </h3>
            <p className="text-[--color-ink-light] font-[family:--font-family-body] text-sm">
              Random fact generator with {facts.facts.length} curated discoveries spanning linguistics, mythology, philosophy, science connections, and cross-cultural influences. Features typewriter animation and source citations.
            </p>
          </div>

          {/* RigVeda Timeline */}
          <div className="bg-[--color-parchment-light] p-6 rounded-lg border-l-4 border-[--color-saffron]">
            <h3 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-3 flex items-center gap-2">
              <Clock size={24} className="text-[--color-saffron]" />
              RigVeda Timeline
            </h3>
            <p className="text-[--color-ink-light] font-[family:--font-family-body] text-sm">
              Interactive chronological journey through Vedic history, featuring major periods, key events, cultural developments, and historical context. Smooth scroll animations, hover interactions, and visual period markers create an immersive educational experience.
            </p>
          </div>

          {/* Global Search */}
          <div className="bg-[--color-parchment-light] p-6 rounded-lg border-l-4 border-[--color-saffron]">
            <h3 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-3 flex items-center gap-2">
              <Search size={24} className="text-[--color-saffron]" />
              Global Search
            </h3>
            <p className="text-[--color-ink-light] font-[family:--font-family-body] text-sm">
              Powerful search across all content types—deities, hymns, topics, facts, and Sanskrit terms. Features real-time filtering, typewriter placeholder animations, category-based results, and skeleton loading states.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="mb-12">
        <h2 className="text-3xl font-[family:--font-family-header] text-[--color-ink] mb-6 pb-2 border-b-2 border-[--color-gold]/30">
          Technology Stack
        </h2>
        <div className="bg-[--color-parchment-light] p-8 rounded-lg">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-lg font-[family:--font-family-header] text-[--color-saffron] mb-3">
                Frontend & Core
              </h4>
              <ul className="space-y-2 text-[--color-ink-light] font-[family:--font-family-body] text-sm">
                <li>• React 19.1.1</li>
                <li>• React Router v7.9.3</li>
                <li>• Vite 7.1.7 (build tool)</li>
                <li>• D3.js v7.9.0 (visualizations)</li>
                <li>• Framer Motion v12.23.22</li>
                <li>• GSAP v3.13.0 (animations)</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-[family:--font-family-header] text-[--color-saffron] mb-3">
                Styling & UI
              </h4>
              <ul className="space-y-2 text-[--color-ink-light] font-[family:--font-family-body] text-sm">
                <li>• Tailwind CSS v4.1.14</li>
                <li>• Custom CSS Variables</li>
                <li>• Lottie React v2.4.1</li>
                <li>• Lucide React (icons)</li>
                <li>• Google Fonts (Cinzel, Lora)</li>
                <li>• Noto Sans Devanagari</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-[family:--font-family-header] text-[--color-saffron] mb-3">
                AI & Features
              </h4>
              <ul className="space-y-2 text-[--color-ink-light] font-[family:--font-family-body] text-sm">
                <li>• Google Generative AI SDK</li>
                <li>• Microsoft Speech SDK</li>
                <li>• React Markdown v10.1.0</li>
                <li>• React PageFlip v2.0.3</li>
                <li>• use-sound v5.0.0</li>
                <li>• jsPDF v3.0.3</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Project Stats - WITH COUNT UP ANIMATION */}
      <section className="mb-12">
        <h2 className="text-3xl font-[family:--font-family-header] text-[--color-ink] mb-6 pb-2 border-b-2 border-[--color-gold]/30">
          Project Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[--color-parchment-dark] p-4 rounded-lg text-center">
            <div className="text-2xl font-[family:--font-family-header] text-[--color-gold] mb-1">
              <CountUp 
                to={topics.topics.length}
                duration={1.5}
                delay={0}
              />
            </div>
            <div className="text-xs text-[--color-ink-light]">Life Topics</div>
          </div>

          <div className="bg-[--color-parchment-dark] p-4 rounded-lg text-center">
            <div className="text-2xl font-[family:--font-family-header] text-[--color-gold] mb-1">
              <CountUp 
                to={20}
                duration={1.5}
                delay={0.1}
              />
            </div>
            <div className="text-xs text-[--color-ink-light]">AI Podcasts</div>
          </div>

          <div className="bg-[--color-parchment-dark] p-4 rounded-lg text-center">
            <div className="text-2xl font-[family:--font-family-header] text-[--color-gold] mb-1">
              <CountUp 
                to={facts.facts.length}
                duration={1.5}
                delay={0.2}
              />
            </div>
            <div className="text-xs text-[--color-ink-light]">Surprise Facts</div>
          </div>

          <div className="bg-[--color-parchment-dark] p-4 rounded-lg text-center">
            <div className="text-2xl font-[family:--font-family-header] text-[--color-gold] mb-1">
              <CountUp 
                to={deities.deities.length}
                duration={1.5}
                delay={0.3}
              />
            </div>
            <div className="text-xs text-[--color-ink-light]">Deities Mapped</div>
          </div>

          <div className="bg-[--color-parchment-dark] p-4 rounded-lg text-center">
            <div className="text-2xl font-[family:--font-family-header] text-[--color-gold] mb-1">
              <CountUp 
                to={connections.connections.length}
                duration={1.5}
                delay={0.4}
              />
            </div>
            <div className="text-xs text-[--color-ink-light]">Deity Connections</div>
          </div>

          <div className="bg-[--color-parchment-dark] p-4 rounded-lg text-center">
            <div className="text-2xl font-[family:--font-family-header] text-[--color-gold] mb-1">
              <CountUp 
                to={29}
                duration={1.5}
                delay={0.5}
              />
            </div>
            <div className="text-xs text-[--color-ink-light]">Audio Hymns</div>
          </div>

          <div className="bg-[--color-parchment-dark] p-4 rounded-lg text-center">
            <div className="text-2xl font-[family:--font-family-header] text-[--color-gold] mb-1">
              <CountUp 
                to={15}
                duration={1.5}
                delay={0.6}
              />
              +
            </div>
            <div className="text-xs text-[--color-ink-light]">Achievements</div>
          </div>

          <div className="bg-[--color-parchment-dark] p-4 rounded-lg text-center">
            <div className="text-2xl font-[family:--font-family-header] text-[--color-gold] mb-1">
              <CountUp 
                to={27}
                duration={1.5}
                delay={0.7}
              />
            </div>
            <div className="text-xs text-[--color-ink-light]">Constellations</div>
          </div>
        </div>
      </section>

      {/* Credits */}
      <section className="mb-12">
        <h2 className="text-3xl font-[family:--font-family-header] text-[--color-ink] mb-6 pb-2 border-b-2 border-[--color-gold]/30">
          Credits & Sources
        </h2>
        <div className="bg-[--color-parchment-light] p-8 rounded-lg">
          <div className="mb-6">
            <h3 className="text-lg font-[family:--font-family-header] text-[--color-saffron] mb-3">
              Primary Rigveda Data Sources
            </h3>
            <ul className="space-y-3 text-[--color-ink-light] font-[family:--font-family-body]">
              <li className="flex items-start gap-2">
                <span className="text-[--color-gold]">•</span>
                <span>
                  <strong>Sacred Texts Archive</strong> - Public domain Rigveda translations and texts 
                  (<a href="https://sacred-texts.com/" target="_blank" rel="noopener noreferrer" 
                  className="text-[--color-saffron] hover:underline">sacred-texts.com</a>)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[--color-gold]">•</span>
                <span>
                  <strong>VedaWeb Platform</strong> - University of Cologne's digital research platform for Old Indic texts 
                  with morphological annotations 
                  (<a href="https://vedaweb.uni-koeln.de/" target="_blank" rel="noopener noreferrer" 
                  className="text-[--color-saffron] hover:underline">vedaweb.uni-koeln.de</a>)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[--color-gold]">•</span>
                <span>
                  <strong>Rigveda Analysis WordPress</strong> - Historical and analytical research on Rigvedic civilization, 
                  tribes, and society 
                  (<a href="https://rigvedaanalysis.wordpress.com/" target="_blank" rel="noopener noreferrer" 
                  className="text-[--color-saffron] hover:underline">rigvedaanalysis.wordpress.com</a>)
                </span>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-[family:--font-family-header] text-[--color-saffron] mb-3">
              AI & Technology Credits
            </h3>
            <ul className="space-y-3 text-[--color-ink-light] font-[family:--font-family-body]">
              <li className="flex items-start gap-2">
                <span className="text-[--color-gold]">•</span>
                <span>AI podcasts generated for each mandala with custom-written scripts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[--color-gold]">•</span>
                <span>AI assistant powered by Google Gemini API for contextual responses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[--color-gold]">•</span>
                <span>Deity artwork generated using DALL-E 3 and Claude AI</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[--color-gold]">•</span>
                <span>Content curation assistance from Claude and Perplexity AI</span>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-[family:--font-family-header] text-[--color-saffron] mb-3">
              Audio & Music Credits
            </h3>
            <ul className="space-y-3 text-[--color-ink-light] font-[family:--font-family-body]">
              <li className="flex items-start gap-2">
                <span className="text-[--color-gold]">•</span>
                <span>
                  <strong>Hymns Audio:</strong> Shree Aurobindo Foundation 
                  (<a href="https://sri-aurobindo.co.in/workings/matherials/rigveda/" target="_blank" rel="noopener noreferrer" 
                  className="text-[--color-saffron] hover:underline">sri-aurobindo.co.in</a>)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[--color-gold]">•</span>
                <span>
                  <strong>Main Background Music:</strong> "Valley of Olympus | Ethereal Ancient Ambient Music" by Athena IV
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[--color-gold]">•</span>
                <span>
                  <strong>Games Background Music:</strong> "Medieval Music for Focus & Study | The Wanderer's Quiet Quest" by Forest of Light
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-[family:--font-family-header] text-[--color-saffron] mb-3">
              Design & Development
            </h3>
            <ul className="space-y-3 text-[--color-ink-light] font-[family:--font-family-body]">
              <li className="flex items-start gap-2">
                <span className="text-[--color-gold]">•</span>
                <span>Built for #RigVedaHack 2025 hackathon competition</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[--color-gold]">•</span>
                <span>Typography: Cinzel (headers), Lora (body), Noto Sans Devanagari (Sanskrit)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[--color-gold]">•</span>
                <span>Sound design: Custom non copyright audio effects, Sanskrit hymn recordings, ambient soundscapes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[--color-gold]">•</span>
                <span>Project built, Content research and curation by development team of one person with Nescafe and ideas xD (and Rishi ofcourse how can we forget him!)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center pt-8 border-t border-[--color-gold]/20">
        <div className="text-6xl mb-4">ॐ</div>
        <p className="text-[--color-ink-light] font-[family:--font-family-body] italic">
          "Truth is one, the wise call it by many names"
        </p>
        <p className="text-sm text-[--color-ink-light] mt-2">
          — Rigveda 1.164.46
        </p>
      </div>
    </div>
  );
};

export default About;
