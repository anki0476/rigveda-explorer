import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Header from './components/Header';
import EnhancedHome from './components/EnhancedHome';
import DeityNetwork from './components/DeityNetwork';
import StoryMode from './components/Games/StoryMode';
import GamesHub from './components/Games/GamesHub';
import DeityCollector from './components/DeityCollector/DeityCollector';
import NotificationContainer from './components/Games/NotificationContainer';

// Import the intro components
import VideoIntro from './components/VideoIntro';
import AudioUnlock from './components/AudioUnlock';

function App() {
  const [introComplete, setIntroComplete] = useState(() => {
    const completed = sessionStorage.getItem('introComplete');
    console.log('🔍 Checking introComplete:', completed);
    return completed === 'true';
  });

  const [showVideo, setShowVideo] = useState(!introComplete);
  const [showAudioUnlock, setShowAudioUnlock] = useState(false);

  useEffect(() => {
    console.log('📊 State:', { introComplete, showVideo, showAudioUnlock });
  }, [introComplete, showVideo, showAudioUnlock]);

  const handleVideoComplete = () => {
    console.log('🎬 Video complete, showing AudioUnlock');
    setShowVideo(false);
    setShowAudioUnlock(true);
  };

  const handleAudioUnlock = () => {
    console.log('🔓 Audio unlocked, entering main app');
    sessionStorage.setItem('introComplete', 'true');
    setShowAudioUnlock(false);
    setIntroComplete(true);
  };

  return (
    <Router>
      {/* Show video intro on first visit */}
      {showVideo && <VideoIntro onComplete={handleVideoComplete} />}
      
      {/* Show audio unlock after video */}
      {showAudioUnlock && <AudioUnlock onUnlock={handleAudioUnlock} />}
      
      {/* Main app */}
      {!showVideo && !showAudioUnlock && (
        <div className="min-h-screen relative">
          {/* NOTIFICATION SYSTEM */}
          <NotificationContainer />
          
          <Navigation />
          <Header />
          
          <main className="relative z-10">
            <Routes>
              <Route path="/" element={<EnhancedHome />} />
              <Route path="/deity-network" element={<DeityNetwork />} />
              <Route path="/games" element={<GamesHub />} />
              <Route path="/games/story" element={<StoryMode />} />
              <Route path="/games/collection" element={<DeityCollector />} />
            </Routes>
          </main>
        </div>
      )}
    </Router>
  );
}

export default App;
