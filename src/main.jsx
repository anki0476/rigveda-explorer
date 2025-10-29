// src/main.jsx
import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.jsx'
import FireLoading from './components/Loading/FireLoading'
import AudioUnlock from './components/AudioUnlock'
import VideoIntro from './components/VideoIntro'
import ScrollProgressBar from './components/ScrollProgressBar'
import TextSelectionPopup from './components/TextSelectionPopup' // ⭐ ADD THIS
import { BGMProvider } from './context/BGMContext'
import { GameProvider } from './context/GameContext'
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
    <>
      {/* 🎬 VIDEO INTRO */}
      {showVideo && <VideoIntro onComplete={handleVideoComplete} />}


      {/* ⭐ SINGLE BGMProvider wrapping everything */}
      <BGMProvider>
        {/* 📊 Scroll Progress Bar */}
        {audioUnlocked && !isLoading && (
          <>
            <ScrollProgressBar />
          </>
        )}


        {/* 🎵 AUDIO UNLOCK */}
        {showAudioUnlock && !audioUnlocked && (
          <AudioUnlock 
            onUnlock={handleAudioUnlock} 
            fadeOut={unlockFadeOut}
          />
        )}


        {/* 🔥 FIRE LOADING */}
        {audioUnlocked && showLoading && isLoading && (
          <FireLoading 
            isLoading={isLoading}
            fadeOut={loadingFadeOut}
          />
        )}


        {/* 🏠 MAIN APP */}
        {audioUnlocked && !isLoading && (
          <GameProvider>
            
            <RouterProvider router={router} />
          </GameProvider>
        )}
      </BGMProvider>
    </>
  );
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
