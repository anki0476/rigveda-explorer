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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-orange-900 via-red-900 to-black overflow-hidden">
      {/* Texts stacked above flame */}
      <div className="flex flex-col items-center gap-1 mb-3">
        {/* Hindi text - Bold */}
        <span
          style={{
            fontFamily: 'serif',
            fontWeight: 700,
            fontSize: '2rem',
            color: '#FED7AA',
            textShadow: '0 1px 8px #a75513'
          }}
        >
          अग्नि देव का आह्वान
        </span>
        {/* Sanskrit text - Thinner */}
        <span
          style={{
            fontFamily: 'serif',
            fontWeight: 400,
            fontSize: '1.6rem',
            color: '#FED7AA',
            textShadow: '0 1px 8px #a75513'
          }}
        >
          ॐ अग्नये नमः
        </span>
      </div>

      {/* Flame Centered - with proper spacing */}
      <div className="flex items-center justify-center flex-1">
        <div className="w-[500px] h-[500px]">
          <Lottie animationData={fireAnimation} loop={true} autoplay={true} />
        </div>
      </div>

      {/* Bottom loading text and dots - more space from flame */}
      <div className="flex flex-col items-center mt-8 mb-6">
        <h2
          style={{
            fontSize: '1.8rem',
            fontFamily: 'serif',
            fontWeight: 'bold',
            color: '#FED7AA',
            marginBottom: '0.5rem'
          }}
        >
          Invoking Agni Dev...
        </h2>
        <div className="flex gap-3">
          <span className="w-4 h-4 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
          <span className="w-4 h-4 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          <span className="w-4 h-4 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>

      {/* Sound */}
      <audio
        ref={audioRef}
        src={fireSound}
        preload="auto"
      />
    </div>
  );
};

export default FireLoading;
