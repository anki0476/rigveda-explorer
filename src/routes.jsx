import { createBrowserRouter } from 'react-router-dom';
import BookLayout from './components/Layout/BookLayout';
import FlipBook from './components/Layout/FlipBook';


// ==================== PLACEHOLDER COMPONENTS ====================

const Home = () => {
  const samplePages = [
    // Cover page
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="text-8xl mb-8 text-[--color-saffron]">
        ॐ
      </div>
      <h1 className="text-5xl font-[family:--font-family-header] text-[--color-gold] mb-4">
        ऋग्वेद
      </h1>
      <p className="text-xl text-[--color-ink-light] font-[family:--font-family-body]">
        The Sacred Hymns
      </p>
      <div className="mt-8 text-sm text-[--color-ink-light] italic">
        Click or drag to turn pages →
      </div>
    </div>,

    // Page 1 - Welcome
    <div className="h-full flex flex-col justify-center px-4">
      <h2 className="text-3xl font-[family:--font-family-header] text-[--color-ink] mb-6 border-b-2 border-[--color-gold]/30 pb-3">
        Welcome, Seeker of Knowledge
      </h2>
      <p className="text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed mb-4">
        The Rigveda is the oldest of the four Vedas, composed between 1500-1200 BCE. 
        It contains 10,552 verses organized into 10 Mandalas (books).
      </p>
      <p className="text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed">
        Each Mandala is dedicated to different deities and cosmic principles, 
        preserving the spiritual wisdom of ancient India.
      </p>
    </div>,

    // Page 2 - The Ten Mandalas
    <div className="h-full flex flex-col justify-center px-4">
      <h2 className="text-3xl font-[family:--font-family-header] text-[--color-ink] mb-6 border-b-2 border-[--color-gold]/30 pb-3">
        The Ten Mandalas
      </h2>
      <ul className="space-y-3 text-[--color-ink-light] font-[family:--font-family-body]">
        <li className="flex items-start gap-2">
          <span className="text-[--color-gold] font-bold">I.</span>
          <span>Mandala 1 - 191 hymns to various deities</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[--color-gold] font-bold">II-VII.</span>
          <span>Family Books - Composed by specific rishi families</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[--color-gold] font-bold">VIII.</span>
          <span>Soma rituals and offerings</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[--color-gold] font-bold">IX.</span>
          <span>Soma Pavamana - Purification hymns</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[--color-gold] font-bold">X.</span>
          <span>Philosophical and cosmological hymns</span>
        </li>
      </ul>
    </div>,

    // Page 3 - First Hymn
    <div className="h-full flex flex-col justify-center border-ornate corner-ornate px-4">
      <h2 className="text-2xl font-[family:--font-family-sanskrit] text-[--color-saffron] mb-4 text-center">
        अग्निमीळे पुरोहितम्
      </h2>
      <p className="text-center text-[--color-ink] font-[family:--font-family-body] mb-2">
        "I praise Agni, the chosen priest,"
      </p>
      <p className="text-center text-[--color-ink] font-[family:--font-family-body] mb-6">
        "God, minister of sacrifice"
      </p>
      <div className="text-center mt-6">
        <p className="text-sm text-[--color-ink-light] italic">
          — Rigveda 1.1.1
        </p>
        <p className="text-xs text-[--color-ink-light] mt-2">
          The opening verse of the Rigveda
        </p>
      </div>
    </div>
  ];

  return (
    <BookLayout pageNumber="1">
      <FlipBook pages={samplePages} />
    </BookLayout>
  );
};


const DeityNetwork = () => (
  <BookLayout pageNumber="2">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-[family:--font-family-header] text-[--color-ink] mb-6 border-b-2 border-[--color-gold]/30 pb-4">
        🕸️ Deity Network
      </h1>
      <p className="text-lg text-[--color-ink-light] font-[family:--font-family-body] mb-8">
        Interactive network visualization showing relationships between deities, rishis, and hymns across all 10 Mandalas.
      </p>
      <div className="bg-[--color-parchment-dark] p-8 rounded-lg text-center">
        <p className="text-[--color-saffron] font-[family:--font-family-header] text-xl">
          🚧 Coming Soon - Day 3
        </p>
        <p className="text-sm text-[--color-ink-light] mt-4">
          D3.js force-directed graph with filters and interactive tooltips
        </p>
      </div>
    </div>
  </BookLayout>
);

const RigVedaOn = () => (
  <BookLayout pageNumber="3">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-[family:--font-family-header] text-[--color-ink] mb-6 border-b-2 border-[--color-gold]/30 pb-4">
        📚 Rig Veda On...
      </h1>
      <p className="text-lg text-[--color-ink-light] font-[family:--font-family-body] mb-8">
        Explore various life topics through the wisdom of the Rigveda
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          '🧠 Mind & Consciousness',
          '💪 Physical Health',
          '🧘 Mental Wellbeing',
          '🎯 Purpose & Dharma',
          '🌿 Nature & Environment',
          '⚖️ Ethics & Righteousness',
          '🤝 Relationships',
          '🌌 Death & Existence',
          '⚡ Energy & Transformation',
          '💰 Success & Prosperity'
        ].map((topic, index) => (
          <div key={index} className="p-4 bg-[--color-parchment-dark] rounded-lg border border-[--color-gold]/20 hover:border-[--color-gold]/50 transition-all cursor-pointer">
            <p className="text-[--color-ink] font-[family:--font-family-body]">{topic}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-[--color-parchment-dark] p-6 rounded-lg text-center">
        <p className="text-[--color-saffron] font-[family:--font-family-header]">
          🚧 Coming Soon - Day 4
        </p>
      </div>
    </div>
  </BookLayout>
);

const SurpriseMe = () => (
  <BookLayout pageNumber="4">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-[family:--font-family-header] text-[--color-ink] mb-6 border-b-2 border-[--color-gold]/30 pb-4 inline-block">
        ✨ Surprise Me!
      </h1>
      <p className="text-lg text-[--color-ink-light] font-[family:--font-family-body] mb-8">
        Discover random fascinating facts, hidden connections, and linguistic gems from the Rigveda
      </p>
      <div className="bg-[--color-parchment-dark] p-12 rounded-lg border-4 border-double border-[--color-gold]/40">
        <div className="text-6xl mb-6">🎲</div>
        <p className="text-2xl text-[--color-saffron] font-[family:--font-family-header] mb-4">
          Random Curiosity Generator
        </p>
        <button className="mt-6 px-8 py-4 bg-[--color-gold] text-[--color-ink] font-[family:--font-family-header] rounded-lg hover:bg-[--color-saffron] transition-all shadow-lg text-lg">
          Generate Random Fact
        </button>
      </div>
      <div className="mt-8 bg-[--color-parchment-dark] p-6 rounded-lg">
        <p className="text-[--color-saffron] font-[family:--font-family-header]">
          🚧 Coming Soon - Day 4
        </p>
      </div>
    </div>
  </BookLayout>
);

const AskRishi = () => (
  <BookLayout pageNumber="5">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-[family:--font-family-header] text-[--color-ink] mb-6 border-b-2 border-[--color-gold]/30 pb-4">
        💬 Ask the Rishi
      </h1>
      <p className="text-lg text-[--color-ink-light] font-[family:--font-family-body] mb-8">
        AI-powered chatbot to answer your questions about the Rigveda with specific verse citations
      </p>
      <div className="bg-[--color-parchment-dark] p-8 rounded-lg border-2 border-[--color-gold]/30 min-h-[400px] flex flex-col">
        <div className="flex-1 mb-4 p-4 bg-[--color-parchment-light] rounded-lg">
          <p className="text-[--color-ink-light] italic text-center py-12">
            Chat interface will appear here...
          </p>
        </div>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Ask about the Rigveda..." 
            className="flex-1 px-4 py-3 rounded-lg border-2 border-[--color-gold]/30 bg-[--color-parchment-light] text-[--color-ink] font-[family:--font-family-body]"
            disabled
          />
          <button className="px-6 py-3 bg-[--color-gold] text-[--color-ink] font-[family:--font-family-header] rounded-lg">
            Send
          </button>
        </div>
      </div>
      <div className="mt-6 bg-[--color-parchment-dark] p-6 rounded-lg text-center">
        <p className="text-[--color-saffron] font-[family:--font-family-header]">
          🚧 Coming Soon - Day 4
        </p>
      </div>
    </div>
  </BookLayout>
);

const Mandalas = () => (
  <BookLayout pageNumber="6">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-[family:--font-family-header] text-[--color-ink] mb-6 border-b-2 border-[--color-gold]/30 pb-4">
        📖 The Ten Mandalas
      </h1>
      <p className="text-lg text-[--color-ink-light] font-[family:--font-family-body] mb-8">
        Browse all 10 Mandalas with Sanskrit texts, translations, and search functionality
      </p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <div key={num} className="aspect-square bg-[--color-parchment-dark] rounded-lg border-2 border-[--color-gold]/30 flex flex-col items-center justify-center hover:border-[--color-gold] transition-all cursor-pointer">
            <p className="text-4xl font-[family:--font-family-header] text-[--color-gold] mb-2">
              {num}
            </p>
            <p className="text-sm text-[--color-ink-light]">Mandala</p>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-[--color-parchment-dark] p-6 rounded-lg text-center">
        <p className="text-[--color-saffron] font-[family:--font-family-header]">
          🚧 Coming Soon - Day 5
        </p>
      </div>
    </div>
  </BookLayout>
);

const About = () => (
  <BookLayout pageNumber="7">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-[family:--font-family-header] text-[--color-ink] mb-6 border-b-2 border-[--color-gold]/30 pb-4">
        ℹ️ About
      </h1>
      <div className="space-y-6 text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed">
        <div>
          <h2 className="text-2xl font-[family:--font-family-header] text-[--color-ink] mb-3">
            What is the Rigveda?
          </h2>
          <p>
            The Rigveda is the oldest of the four Vedas and one of the oldest religious texts in the world, 
            composed in Vedic Sanskrit between 1500-1200 BCE. It consists of 10,552 verses organized into 
            10 Mandalas (books), primarily hymns praising various deities.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-[family:--font-family-header] text-[--color-ink] mb-3">
            About This Project
          </h2>
          <p>
            Rigveda Explorer is an immersive web experience designed to make ancient Vedic wisdom accessible 
            through modern technology. Built with React, Tailwind CSS, and AI integrations, it offers 
            interactive visualizations, thematic explorations, and intelligent search capabilities.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-[family:--font-family-header] text-[--color-ink] mb-3">
            Credits & Sources
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Rigveda texts from public domain translations</li>
            <li>Built for #RigVedaHack competition</li>
            <li>Developed with React, Vite, Tailwind CSS v4</li>
            <li>Typography: Cinzel, Lora, Noto Sans Devanagari</li>
          </ul>
        </div>
      </div>
    </div>
  </BookLayout>
);

// ==================== ROUTER CONFIGURATION ====================

export const router = createBrowserRouter([
  { 
    path: '/', 
    element: <Home /> 
  },
  { 
    path: '/deity-network', 
    element: <DeityNetwork /> 
  },
  { 
    path: '/rigveda-on', 
    element: <RigVedaOn /> 
  },
  { 
    path: '/rigveda-on/:topic', 
    element: <RigVedaOn /> 
  },
  { 
    path: '/surprise-me', 
    element: <SurpriseMe /> 
  },
  { 
    path: '/ask-rishi', 
    element: <AskRishi /> 
  },
  { 
    path: '/mandalas', 
    element: <Mandalas /> 
  },
  { 
    path: '/mandalas/:number', 
    element: <Mandalas /> 
  },
  { 
    path: '/about', 
    element: <About /> 
  },
]);
