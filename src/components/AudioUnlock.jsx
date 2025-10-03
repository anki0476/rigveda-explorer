import React, { useState } from 'react';

const AudioUnlock = ({ onUnlock }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleUnlock = () => {
    // Unlock audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContext.resume().then(() => {
      setIsVisible(false);
      onUnlock();
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[--color-ink]/95 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-8 p-8 max-w-md text-center">
        {/* Om Symbol */}
        <div className="text-8xl text-[--color-gold] animate-pulse">
          ॐ
        </div>

        {/* Welcome Text */}
        <div className="space-y-4">
          <h2 className="text-3xl font-[family:--font-family-header] text-[--color-gold]">
            Welcome to Project-RV
          </h2>
          <p className="text-lg text-[--color-parchment-light] font-[family:--font-family-body]">
            Enable audio for the complete immersive experience
          </p>
        </div>

        {/* Start Button */}
        <button
          onClick={handleUnlock}
          className="group relative px-12 py-5 bg-gradient-to-r from-[--color-gold] to-[--color-saffron] text-[--color-ink] font-[family:--font-family-header] text-xl rounded-lg shadow-2xl hover:shadow-[0_0_30px_rgba(244,196,48,0.6)] transition-all duration-300 transform hover:scale-105"
        >
          <span className="relative z-10">Begin Journey</span>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-lg transition-opacity" />
        </button>

        <p className="text-xs text-[--color-parchment-light]/50 italic">
          Click to enable sound effects and immersive audio
        </p>
      </div>
    </div>
  );
};

export default AudioUnlock;
