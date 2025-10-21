import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import fireAnimation from '../../assets/animations/fire-animation.json';
import fireSound from '../../assets/sounds/fire-ignition.mp3'; // ← Import the sound

const FireLoading = ({ playSound = true }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Play fire sound effect when component mounts
    if (playSound && audioRef.current) {
      console.log('🔊 Attempting to play sound...');
      audioRef.current.volume = 0.4; // 40% volume
      
      // Attempt to play
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('✅ Sound playing successfully!');
          })
          .catch(err => {
            console.error('❌ Audio play failed:', err);
            console.log('💡 This usually means user interaction is required first');
          });
      }
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [playSound]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-orange-900 via-red-900 to-black">
      {/* Fire Animation */}
      <div className="w-150 h-140 mb-8">
        <Lottie
          animationData={fireAnimation}
          loop={true}
          autoplay={true}
        />
      </div>

      {/* Loading Text */}
      <h2 
        style={{ 
          fontSize: '3rem',
          fontFamily: 'serif',
          fontWeight: 'bold',
          color: '#FED7AA',
          marginTop: '3rem',
          marginBottom: '1rem',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}
      >
        Invoking Agni Dev...
      </h2>

      <p className="text-2xl text-orange-200/80 italic mb-8">
      ॐ अग्नये नमः 🔥
      </p>

      {/* Animated Progress Dots */}
      <div className="flex gap-3">
        <span className="w-4 h-4 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
        <span className="w-4 h-4 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
        <span className="w-4 h-4 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
      </div>

      {/* Audio Element - Import the sound file */}
      <audio
        ref={audioRef}
        src={fireSound}
        preload="auto"
      />
    </div>
  );
};

export default FireLoading;
