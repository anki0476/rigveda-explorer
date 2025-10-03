import BookLayout from './components/Layout/BookLayout';
import FlipBook from './components/Layout/FlipBook';

function App() {
  // Sample pages for testing the flip effect
  const samplePages = [
    // Page 0 - Cover Page
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
    </div>,

    // Page 4 - About Fire
    <div className="h-full flex flex-col justify-center px-4">
      <h2 className="text-3xl font-[family:--font-family-header] text-[--color-ink] mb-6">
        Agni - The Sacred Fire
      </h2>
      <p className="text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed mb-4">
        Agni is invoked first in the Rigveda as the divine intermediary 
        between humans and gods. As the god of fire, he carries offerings 
        to the celestial realms.
      </p>
      <p className="text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed">
        The Rigveda contains over 200 hymns dedicated to Agni, making him 
        one of the most prominent deities in Vedic literature.
      </p>
      <div className="mt-6 text-center text-4xl text-[--color-vermillion]">
        🔥
      </div>
    </div>,

    // Page 5 - Major Deities
    <div className="h-full flex flex-col justify-center px-4">
      <h2 className="text-3xl font-[family:--font-family-header] text-[--color-ink] mb-6">
        Major Deities
      </h2>
      <div className="space-y-4 text-[--color-ink-light] font-[family:--font-family-body]">
        <div>
          <h3 className="text-lg font-bold text-[--color-saffron]">Indra</h3>
          <p className="text-sm">King of gods, wielder of the thunderbolt</p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-[--color-saffron]">Agni</h3>
          <p className="text-sm">God of fire and divine messenger</p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-[--color-saffron]">Soma</h3>
          <p className="text-sm">Sacred plant deity of immortality</p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-[--color-saffron]">Varuna</h3>
          <p className="text-sm">Keeper of cosmic order and truth</p>
        </div>
      </div>
    </div>
  ];

  return (
    <BookLayout>
      <FlipBook pages={samplePages} />
    </BookLayout>
  );
}

export default App;
