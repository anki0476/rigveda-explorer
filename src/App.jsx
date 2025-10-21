import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Layout/Navigation';
import EnhancedHome from './components/EnhancedHome';
import NotificationContainer from './components/Games/NotificationContainer';
import TourOrchestrator from './components/Tour/TourOrchestrator';

import VideoIntro from './components/VideoIntro';
import AudioUnlock from './components/AudioUnlock';

const DeityNetwork = lazy(() => import('./components/DeityNetwork'));
const StoryMode = lazy(() => import('./components/StoryMode'));
const GamesHub = lazy(() => import('./pages/GamesHub'));
const DeityCollector = lazy(() => import('./components/DeityCollector/DeityCollector'));

import { useClickSparks } from './hooks/useClickSparks';

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
    <div className="text-center">
      <div className="text-4xl animate-pulse mb-4">⚡</div>
      <div className="text-xl text-amber-800 font-serif">Loading...</div>
    </div>
  </div>
);

function App() {
  useClickSparks();
  
  const [introComplete, setIntroComplete] = useState(() => {
    return sessionStorage.getItem('introComplete') === 'true';
  });

  const [showVideo, setShowVideo] = useState(!introComplete);
  const [showAudioUnlock, setShowAudioUnlock] = useState(false);

  const handleVideoComplete = () => {
    setShowVideo(false);
    setShowAudioUnlock(true);
  };

  const handleAudioUnlock = () => {
    sessionStorage.setItem('introComplete', 'true');
    setShowAudioUnlock(false);
    setIntroComplete(true);
  };

  console.log('🎬 App render - introComplete:', introComplete);

  return (
    <>
      {showVideo && <VideoIntro onComplete={handleVideoComplete} />}
      {showAudioUnlock && <AudioUnlock onUnlock={handleAudioUnlock} />}

      {introComplete && (
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
            <Navigation />
            <NotificationContainer />
            
            {/* 🎯 TOUR - Always render on home page */}
            <TourOrchestrator />
            
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<EnhancedHome />} />
                <Route path="/network" element={<DeityNetwork />} />
                <Route path="/games" element={<GamesHub />} />
                <Route path="/story" element={<StoryMode />} />
                <Route path="/collector" element={<DeityCollector />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;
