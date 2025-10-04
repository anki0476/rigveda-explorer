import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.jsx'
import FireLoading from './components/Loading/FireLoading'
import AudioUnlock from './components/AudioUnlock'
import { AnimatePresence } from 'framer-motion'
import './index.css'

function App() {
  // Always start with locked state - show sequence every time
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [unlockFadeOut, setUnlockFadeOut] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingFadeOut, setLoadingFadeOut] = useState(false);

  // Handle audio unlock with fade transition
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

  // FireLoading timer
  useEffect(() => {
    if (!isLoading) return;

    console.log('⏳ FireLoading started');
    const minLoadTime = 3000; // 3 seconds for sound
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
      <AnimatePresence mode="wait">
        {/* AudioUnlock Screen - ALWAYS shows first */}
        {!audioUnlocked && (
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

        {/* FireLoading Screen - Shows after AudioUnlock */}
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
        
        {/* Main App - Shows after loading complete */}
        {audioUnlocked && !isLoading && (
          <div 
            key="app"
            className="animate-fade-in-smooth"
          >
            <RouterProvider router={router} />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
