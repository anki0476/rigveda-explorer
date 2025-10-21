import React from 'react';
import Lottie from 'lottie-react';
import bookAnimation from '../assets/animations/BookLoadingAnimation.json';

const BookLoadingAnimation = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeMap = {
    small: { width: 80, height: 64 },
    medium: { width: 150, height: 120 },
    large: { width: 200, height: 160 }  // ← Made slightly bigger for better visibility
  };

  const dimensions = sizeMap[size];

  return (
    <div 
      className="loading-container"
      style={{
        position: 'relative',
        minHeight: '400px',
        animation: 'fadeOut 0.5s ease-out forwards',
        animationDelay: '0.3s'  // Starts fading out near end of loading
      }}
    >
      {/* BOLD Blur Background Effect */}
      <div
        className="blur-background"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.35) 0%, rgba(212, 175, 55, 0.2) 40%, rgba(212, 175, 55, 0.08) 70%, transparent 100%)',
          filter: 'blur(60px)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Animated container */}
      <div className="flex flex-col items-center justify-center gap-6 py-16" style={{ position: 'relative', zIndex: 1 }}>
        {/* Lottie Book Animation */}
        <div 
          style={{ 
            width: dimensions.width, 
            height: dimensions.height,
            filter: 'drop-shadow(0 8px 16px rgba(139, 69, 19, 0.3))',
          }}
        >
          <Lottie 
            animationData={bookAnimation} 
            loop={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        
        {/* Loading Text with Bouncing Dots */}
        {text && (
          <div className="text-center space-y-3">
            <p className="text-[--color-ink] font-[family:--font-family-body] text-xl font-semibold">
              {text}
            </p>
            <div className="flex gap-2 justify-center items-center h-6">
              <span 
                className="w-2.5 h-2.5 bg-[--color-gold] rounded-full animate-bounce" 
                style={{ animationDelay: '0ms', animationDuration: '1s' }} 
              />
              <span 
                className="w-2.5 h-2.5 bg-[--color-gold] rounded-full animate-bounce" 
                style={{ animationDelay: '150ms', animationDuration: '1s' }} 
              />
              <span 
                className="w-2.5 h-2.5 bg-[--color-gold] rounded-full animate-bounce" 
                style={{ animationDelay: '300ms', animationDuration: '1s' }} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookLoadingAnimation;
