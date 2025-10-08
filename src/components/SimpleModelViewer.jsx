import React from 'react';

const SimpleModelViewer = ({ modelUrl }) => {
  return (
    <div className="w-full h-[500px] bg-gradient-to-br from-[--color-parchment-light] to-[--color-parchment-dark] rounded-xl border-2 border-[--color-gold] flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[--color-gold] rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      {/* Book illustration using CSS */}
      <div className="relative z-10 animate-float">
        <div className="relative w-64 h-80">
          {/* Book cover */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-700 via-orange-800 to-amber-900 rounded-r-lg shadow-2xl transform perspective-1000 rotate-y-10">
            {/* Golden border */}
            <div className="absolute inset-2 border-4 border-[--color-gold] rounded-r-lg"></div>
            
            {/* Om symbol */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-[--color-gold] animate-pulse">
              ॐ
            </div>
            
            {/* Title */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <div className="text-[--color-gold] font-[family:--font-family-header] text-xl mb-2">
                ऋग्वेद
              </div>
              <div className="text-[--color-gold] font-[family:--font-family-body] text-sm">
                Rigveda
              </div>
            </div>
          </div>
          
          {/* Book spine */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-amber-900 to-amber-700 rounded-l-lg shadow-lg"></div>
          
          {/* Book pages */}
          <div className="absolute right-0 top-2 bottom-2 w-2 bg-white shadow-inner"></div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-[--color-ink-light] text-sm font-[family:--font-family-body]">
        Sacred Rigveda Text
      </div>
    </div>
  );
};

export default SimpleModelViewer;
