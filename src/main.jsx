import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.jsx'
import FireLoading from './components/Loading/FireLoading'
import AudioUnlock from './components/AudioUnlock'
import VideoIntro from './components/VideoIntro'
import ScrollProgressBar from './components/ScrollProgressBar'

// NEW GAME SYSTEM IMPORTS
import GameNotifications from './components/GameNotifications'
import { GameProvider } from './context/GameContext'
import { NotificationProvider } from './context/NotificationContext'

import { AnimatePresence } from 'framer-motion'
import './index.css'

function App() {
  const [showVideo, setShowVideo] = useState(true);
  const [showAudioUnlock, setShowAudioUnlock] = useState(false);
  
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [unlockFadeOut, setUnlockFadeOut] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingFadeOut, setLoadingFadeOut] = useState(false);

  const handleVideoComplete = () => {
    console.log('🎬 Video + black screen complete, showing AudioUnlock');
    setShowVideo(false);
    setShowAudioUnlock(true);
  };

  const handleAudioUnlock = () => {
    console.log('🔥 AudioUnlock button clicked!');
    setUnlockFadeOut(true);
    
    setTimeout(() => {
      console.log('🔄 Transitioning to FireLoading');
      setAudioUnlocked(true);
      setShowLoading(true);
      setIsLoading(true);
    }, 600);
  };

  useEffect(() => {
    if (!isLoading) return;

    console.log('⏳ FireLoading started');
    const minLoadTime = 3000;
    const startTime = Date.now();

    const checkLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);

      setTimeout(() => {
        console.log('✨ FireLoading complete');
        setLoadingFadeOut(true);
        setTimeout(() => {
          console.log('🏠 Showing main app');
          setIsLoading(false);
          setShowLoading(false);
        }, 600);
      }, remainingTime);
    };

    if (document.readyState === 'complete') {
      checkLoad();
    } else {
      window.addEventListener('load', checkLoad);
      return () => window.removeEventListener('load', checkLoad);
    }
  }, [isLoading]);

  return (
    <NotificationProvider>
      <GameProvider>
        {/* 🎬 VIDEO INTRO (includes black screen hold) */}
        {showVideo && <VideoIntro onComplete={handleVideoComplete} />}

        {/* 📊 Scroll Progress Bar & Game Notifications */}
        {audioUnlocked && !isLoading && (
          <>
            <ScrollProgressBar />
            <GameNotifications />
          </>
        )}

        <AnimatePresence mode="wait">
          {/* 🎵 AUDIO UNLOCK */}
          {showAudioUnlock && !audioUnlocked && (
            <div 
              key="unlock"
              style={{
                transition: 'opacity 600ms ease-out',
                opacity: unlockFadeOut ? 0 : 1,
                pointerEvents: unlockFadeOut ? 'none' : 'auto'
              }}
            >
              <AudioUnlock onUnlock={handleAudioUnlock} />
            </div>
          )}

          {/* 🔥 FIRE LOADING */}
          {audioUnlocked && showLoading && isLoading && (
            <div 
              key="loading"
              style={{
                transition: 'opacity 600ms ease-out',
                opacity: loadingFadeOut ? 0 : 1
              }}
            >
              <FireLoading playSound={true} />
            </div>
          )}
          
          {/* 🏠 MAIN APP */}
          {audioUnlocked && !isLoading && (
            <div 
              key="app"
              className="animate-fade-in-smooth relative"
            >
              <RouterProvider router={router} />
            </div>
          )}
        </AnimatePresence>
      </GameProvider>
    </NotificationProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
