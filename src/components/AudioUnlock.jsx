import React, { useState } from 'react';
import TextType from './TextType';

const AudioUnlock = ({ onUnlock }) => {
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleUnlock = () => {
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
        backgroundColor: '#FEF3E2', // Parchment color
        animation: 'fadeInFromBlack 1s ease-in-out'
      }}
    >
      <div className="text-center max-w-2xl px-8">
        {/* Om Symbol */}
        <div className="text-9xl mb-8 animate-pulse sanskrit text-amber-800">
          ॐ
        </div>

        {/* Title with Typewriter Animation */}
        <TextType
          text="Welcome to Project-RV"
          as="h1"
          className="text-6xl font-serif font-bold text-amber-900 mb-6"
          typingSpeed={80}
          initialDelay={300}
          loop={false}
          showCursor={true}
          cursorCharacter="_"
          cursorClassName="text-amber-700"
          cursorBlinkDuration={0.5}
        />

        {/* Subtitle */}
        <p 
          className="text-2xl text-amber-700 mb-12 leading-relaxed opacity-0"
          style={{ 
            animation: 'fade-in 1s ease-out 3s forwards'
          }}
        >
          Enable audio for the complete immersive experience
        </p>

        {/* Button */}
        <button
          onClick={handleUnlock}
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
          🔊 Click to enable sound effects and immersive audio
        </p>

        {/* Decorative Elements */}
        <div 
          className="mt-12 flex justify-center gap-4 text-amber-700/50 opacity-0"
          style={{ 
            animation: 'fade-in 1s ease-out 4.5s forwards'
          }}
        >
          <span className="text-3xl">🔥</span>
          <span className="text-3xl">📿</span>
          <span className="text-3xl">🕉️</span>
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
