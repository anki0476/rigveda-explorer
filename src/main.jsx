import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.jsx'
import FireLoading from './components/Loading/FireLoading'
import AudioUnlock from './components/AudioUnlock'
import { AnimatePresence } from 'framer-motion'
import './index.css'

function App() {
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [unlockFadeOut, setUnlockFadeOut] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingFadeOut, setLoadingFadeOut] = useState(false);

  // Handle audio unlock with fade transition
  const handleAudioUnlock = () => {
    // Start fade out of unlock screen
    setUnlockFadeOut(true);
    
    // After fade completes, show loading screen
    setTimeout(() => {
      setAudioUnlocked(true);
      setShowLoading(true);
      setIsLoading(true);
    }, 600); // Match CSS transition duration
  };

  // Start loading sequence AFTER audio is unlocked
  useEffect(() => {
    if (!isLoading) return;

    const minLoadTime = 2000;
    const startTime = Date.now();

    const checkLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);

      setTimeout(() => {
        setLoadingFadeOut(true);
        setTimeout(() => {
          setIsLoading(false);
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
    <AnimatePresence mode="wait">
      {/* Audio Unlock Screen - FIRST */}
      {!audioUnlocked && (
        <div 
          key="unlock"
          style={{
            transition: 'opacity 600ms ease-out',
            opacity: unlockFadeOut ? 0 : 1
          }}
        >
          <AudioUnlock onUnlock={handleAudioUnlock} />
        </div>
      )}

      {/* Fire Loading Screen - SECOND (fades in after unlock fades out) */}
      {showLoading && isLoading && (
        <div 
          key="loading"
          style={{
            transition: 'opacity 600ms ease-out',
            opacity: loadingFadeOut ? 0 : 1
          }}
        >
          <FireLoading playSound={audioUnlocked} />
        </div>
      )}
      
      {/* Main App - THIRD (fades in after loading fades out) */}
      {audioUnlocked && !isLoading && (
        <div 
          key="app"
          className="animate-fade-in-smooth"
        >
          <RouterProvider router={router} />
        </div>
      )}
    </AnimatePresence>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
