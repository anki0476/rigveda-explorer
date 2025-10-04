import React from 'react';

const AudioUnlock = ({ onUnlock }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-amber-50">
      <div className="text-center max-w-2xl px-8">
        {/* Om Symbol */}
        <div className="text-9xl mb-8 animate-pulse">
          ॐ
        </div>

        {/* Title */}
        <h1 className="text-6xl font-serif font-bold text-amber-900 mb-6">
          Welcome to Project-RV
        </h1>

        {/* Subtitle */}
        <p className="text-2xl text-amber-700 mb-12 leading-relaxed">
          Enable audio for the complete immersive experience
        </p>

        {/* Button */}
        <button
          onClick={onUnlock}
          className="group relative px-12 py-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-2xl font-serif rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 active:scale-95"
        >
          <span className="relative z-10">Begin Journey</span>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>

        {/* Info Text */}
        <p className="mt-8 text-base text-amber-600 italic animate-pulse">
          🔊 Click to enable sound effects and immersive audio
        </p>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center gap-4 text-amber-700/50">
          <span className="text-3xl">🔥</span>
          <span className="text-3xl">📿</span>
          <span className="text-3xl">🕉️</span>
        </div>
      </div>
    </div>
  );
};

export default AudioUnlock;
