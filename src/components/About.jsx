import React from 'react';
import CountUp from './CountUp';
import LogoLoop from './LogoLoop';
import metadata from '../data/metadata.json';
import deities from '../data/deities.json';
import topics from '../data/topics.json';
import hymns from '../data/hymns.json';
import facts from '../data/surpriseFacts.json';
import connections from '../data/connections.json';

const About = () => {
  // Technology logos - only what we actually use
  const techLogos = [
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
      alt: 'React',
      title: 'React 18',
      href: 'https://react.dev',
      height: 40
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
      alt: 'JavaScript',
      title: 'JavaScript',
      href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
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
      title: 'D3.js',
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
      title: 'React Router v6',
      href: 'https://reactrouter.com',
      height: 40
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="text-8xl mb-6">ॐ</div>
        <h1 className="text-5xl font-[family:--font-family-header] text-[--color-ink] mb-4">
          {metadata.about.title}
        </h1>
        <p className="text-xl text-[--color-ink-light] font-[family:--font-family-body] max-w-3xl mx-auto leading-relaxed">
          {metadata.about.description}
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
            10 Mandalas (books), primarily hymns praising various deities and exploring cosmic principles.
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
            Rigveda Explorer is an immersive web experience designed to make ancient Vedic wisdom accessible 
            through modern technology. This project combines scholarly research, interactive visualizations, 
            and beautiful design to create an engaging journey through the world's oldest sacred texts.
          </p>
          <p className="text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed">
            Built with React, D3.js, and Tailwind CSS v4, it offers interactive network visualizations, 
            thematic explorations of life topics, surprise facts, and comprehensive content on deities, 
            hymns, and philosophical concepts—all presented with an ancient manuscript aesthetic.
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

      {/* Features Grid */}
      <section className="mb-12">
        <h2 className="text-3xl font-[family:--font-family-header] text-[--color-ink] mb-6 pb-2 border-b-2 border-[--color-gold]/30">
          Features
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[--color-parchment-light] p-6 rounded-lg border-l-4 border-[--color-saffron]">
            <h3 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-3 flex items-center gap-2">
              🕸️ Deity Network
            </h3>
            <p className="text-[--color-ink-light] font-[family:--font-family-body] text-sm">
              Interactive D3.js force-directed graph showing relationships between {deities.deities.length} deities, 
              with {connections.connections.length} connections. Explore hover tooltips, filtering, and dynamic physics.
            </p>
          </div>

          <div className="bg-[--color-parchment-light] p-6 rounded-lg border-l-4 border-[--color-saffron]">
            <h3 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-3 flex items-center gap-2">
              📚 Rig Veda On Life Topics
            </h3>
            <p className="text-[--color-ink-light] font-[family:--font-family-body] text-sm">
              {topics.topics.length} comprehensive explorations of modern life topics through Vedic wisdom—mind, 
              health, ethics, nature, relationships, and more with Sanskrit concepts and modern connections.
            </p>
          </div>

          <div className="bg-[--color-parchment-light] p-6 rounded-lg border-l-4 border-[--color-saffron]">
            <h3 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-3 flex items-center gap-2">
              ✨ Surprise Me
            </h3>
            <p className="text-[--color-ink-light] font-[family:--font-family-body] text-sm">
              Random fact generator with {facts.facts.length} curated fascinating facts about linguistics, 
              mythology, philosophy, science, and connections across cultures.
            </p>
          </div>

          <div className="bg-[--color-parchment-light] p-6 rounded-lg border-l-4 border-[--color-saffron]">
            <h3 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-3 flex items-center gap-2">
              🏠 Interactive FlipBook
            </h3>
            <p className="text-[--color-ink-light] font-[family:--font-family-body] text-sm">
              Beautiful page-turning experience introducing the Rigveda structure, with smooth animations 
              and an ancient manuscript aesthetic.
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
                Frontend
              </h4>
              <ul className="space-y-2 text-[--color-ink-light] font-[family:--font-family-body] text-sm">
                <li>• React 18</li>
                <li>• React Router v6</li>
                <li>• Vite</li>
                <li>• D3.js (Force Simulation)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-[family:--font-family-header] text-[--color-saffron] mb-3">
                Styling
              </h4>
              <ul className="space-y-2 text-[--color-ink-light] font-[family:--font-family-body] text-sm">
                <li>• Tailwind CSS v4</li>
                <li>• Custom CSS Variables</li>
                <li>• Google Fonts (Cinzel, Lora)</li>
                <li>• Noto Sans Devanagari</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-[family:--font-family-header] text-[--color-saffron] mb-3">
                Data
              </h4>
              <ul className="space-y-2 text-[--color-ink-light] font-[family:--font-family-body] text-sm">
                <li>• Structured JSON</li>
                <li>• {hymns.hymns.length}+ Hymn entries</li>
                <li>• 66KB+ Content data</li>
                <li>• Curated metadata</li>
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-[--color-parchment-dark] p-4 rounded-lg text-center">
            <div className="text-2xl font-[family:--font-family-header] text-[--color-gold] mb-1">
              <CountUp 
                to={topics.topics.length}
                duration={1.5}
                delay={0}
              />
            </div>
            <div className="text-xs text-[--color-ink-light]">Life Topics Explored</div>
          </div>
          
          <div className="bg-[--color-parchment-dark] p-4 rounded-lg text-center">
            <div className="text-2xl font-[family:--font-family-header] text-[--color-gold] mb-1">
              <CountUp 
                to={hymns.hymns.length}
                duration={1.5}
                delay={0.1}
              />
              +
            </div>
            <div className="text-xs text-[--color-ink-light]">Hymns Referenced</div>
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
                to={66}
                duration={1.5}
                delay={0.5}
              />
              KB+
            </div>
            <div className="text-xs text-[--color-ink-light]">Content Data</div>
          </div>
        </div>
      </section>

      {/* Credits */}
      <section className="mb-12">
        <h2 className="text-3xl font-[family:--font-family-header] text-[--color-ink] mb-6 pb-2 border-b-2 border-[--color-gold]/30">
          Credits & Sources
        </h2>
        <div className="bg-[--color-parchment-light] p-8 rounded-lg">
          <ul className="space-y-3 text-[--color-ink-light] font-[family:--font-family-body]">
            <li className="flex items-start gap-2">
              <span className="text-[--color-gold]">•</span>
              <span>Rigveda texts from public domain translations and scholarly sources</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[--color-gold]">•</span>
              <span>Built for #RigVedaHack 2025 hackathon competition</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[--color-gold]">•</span>
              <span>Developed with React, Vite, Tailwind CSS v4, and D3.js</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[--color-gold]">•</span>
              <span>Typography: Cinzel (headers), Lora (body), Noto Sans Devanagari (Sanskrit)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[--color-gold]">•</span>
              <span>Content research and curation by project team</span>
            </li>
          </ul>
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
