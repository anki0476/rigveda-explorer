import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import EnhancedHome from './components/EnhancedHome';
import DeityNetwork from './components/DeityNetwork';
import StoryMode from './components/Games/StoryMode';
import GamesHub from './components/Games/GamesHub';
import DeityCollector from './components/DeityCollector/DeityCollector';
import NotificationContainer from './components/Games/NotificationContainer';

// Import the intro components
import VideoIntro from './components/VideoIntro';
import AudioUnlock from './components/AudioUnlock';

// 🎆 IMPORT CLICK SPARKS HOOK
import { useClickSparks } from './hooks/useClickSparks';

function App() {
  // 🎆 CALL CLICK SPARKS HOOK HERE!
  useClickSparks();
  
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
    <div className="app-container">
      {/* Show video intro on first visit */}
      {showVideo && <VideoIntro onComplete={handleVideoComplete} />}

      {/* Show audio unlock after video */}
      {showAudioUnlock && <AudioUnlock onUnlock={handleAudioUnlock} />}

      {/* Main app */}
      {!showVideo && !showAudioUnlock && (
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
            <Navigation />
            
            {/* NOTIFICATION SYSTEM */}
            <NotificationContainer />
            
            <Routes>
              <Route path="/" element={<EnhancedHome />} />
              <Route path="/network" element={<DeityNetwork />} />
              <Route path="/games" element={<GamesHub />} />
              <Route path="/story" element={<StoryMode />} />
              <Route path="/collector" element={<DeityCollector />} />
            </Routes>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
