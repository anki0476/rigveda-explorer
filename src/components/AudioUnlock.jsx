import React, { useState, useEffect } from 'react';
import TextType from './TextType';
import { useSoundEffect } from '../hooks/useSoundEffect'; 
import { useBGM } from '../context/BGMContext';
import './AudioUnlock.css'; // ← ADD THIS IMPORT



const AudioUnlock = ({ onUnlock }) => {
  const { playBGM } = useBGM();
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of epic Rigveda moment images
  const rigvedaImages = [
    '/images/rigveda-moments/Indra-Slays-Vritra.png',
    '/images/rigveda-moments/Invocation-of-Agni.png',
    '/images/rigveda-moments/Suryas-Celestial-Journey.png',
    '/images/rigveda-moments/The-Cosmic-Purusha-Sacrifice.png',
    '/images/rigveda-moments/Indra-Frees-the-Sacred-Dawns.png',
    '/images/rigveda-moments/Varuna-Guardian-of-Cosmic-Order.png',
    '/images/rigveda-moments/The-Ashwins-Divine-Miracle.png',
    '/images/rigveda-moments/Soma-The-Divine-Nectar.png'
  ];

  // Auto-rotate slideshow every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % rigvedaImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [rigvedaImages.length]);

  // 🎵 NEW LINES ADDED - Sound effect hooks
  const playHover = useSoundEffect('/audio/button-hover.mp3');
  const playClick = useSoundEffect('/audio/button-click.mp3');




  const handleUnlock = () => {
    playClick();
    playBGM(); 
    console.log('🎵 User clicked Begin Journey - BGM will start when app loads');
    setIsUnlocking(true);
    
    // Optional: Play sound effect
    // const audio = new Audio('/sounds/fire-ignition.mp3');
    // audio.play();
    
    setTimeout(() => {
      if (onUnlock) {
        onUnlock();
      }
    }, 1500);
  };




  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        position: 'relative',
        overflow: 'hidden',
        animation: 'fadeInFromBlack 1s ease-in-out'
      }}
    >
      {/* Epic Slideshow Background */}
      <div className="slideshow-background">
        {rigvedaImages.map((image, index) => (
          <div
            key={index}
            className={`slideshow-image ${index === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="slideshow-overlay" />
      </div>

      <div className="text-center max-w-2x2 px-8" style={{ position: 'relative', zIndex: 2 }}>
        {/* LOGO - REPLACES OM SYMBOL AND TITLE */}
        <div className="logo-container logo-float mb-8">
          <img 
            src="/images/logo.png" 
            alt="RigVeda Odyssey" 
            className="logo-shine w-[750px] h-auto mx-auto"
            onContextMenu={(e) => e.preventDefault()}
            style={{
              animation: 'fade-in 1s ease-out 0.3s forwards',
              opacity: 0,
              pointerEvents: 'none'
            }}
          />
        </div>




        {/* Subtitle */}
        <p 
          className="text-2xl text-amber-700 mb-12 leading-relaxed opacity-0"
          style={{ 
            animation: 'fade-in 1s ease-out 3s forwards'
          }}
        >
          
        </p>




        {/* Button */}
        <button
          onClick={handleUnlock}
          onMouseEnter={playHover} // 🎵 NEW PROP ADDED
          disabled={isUnlocking}
          className="group relative px-12 py-6 bg-gradient-to-r from-amber-600 to-orange-600 text-2xl font-serif rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 active:scale-95 opacity-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          style={{ 
            animation: 'fade-in 1s ease-out 3.5s forwards'
          }}
        >
          <span className={`relative z-10 shiny-button-text ${isUnlocking ? 'disabled' : ''}`}>
            {isUnlocking ? (
              <>
                <span className="inline-block animate-spin mr-2">🔥</span>
                Igniting...
              </>
            ) : (
              'Begin Journey'
            )}
          </span>
        </button>




        {/* Info Text */}
        <p 
          className="mt-8 text-base text-amber-600 italic opacity-0"
          style={{ 
            animation: 'fade-in 1s ease-out 4s forwards'
          }}
        >
          🔊 Enable audio for the complete immersive experience
        </p>




        {/* Decorative Elements */}
        <div 
          className="mt-12 flex justify-center gap-4 text-amber-700/50 opacity-0"
          style={{ 
            animation: 'fade-in 1s ease-out 4.5s forwards'
          }}
        >
          <span className="text-3xl"></span>
          <span className="text-3xl"></span>
          <span className="text-3xl"></span>
        </div>
      </div>




      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInFromBlack {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};




export default AudioUnlock;
