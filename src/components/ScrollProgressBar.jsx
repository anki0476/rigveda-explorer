import React, { useState, useEffect, useRef } from 'react';

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef(null);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel previous animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use requestAnimationFrame for smooth updates
      rafRef.current = requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
        
        // Only update if scroll changed significantly (reduces rerenders)
        if (Math.abs(currentScroll - lastScrollRef.current) > 5) {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;
          setScrollProgress(progress);
          lastScrollRef.current = currentScroll;
        }
      });
    };

    // Initial calculation
    handleScroll();

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        zIndex: 999999,
        backgroundColor: 'rgba(218, 165, 32, 0.1)',
        pointerEvents: 'none'
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #DAA520 0%, #FF8C00 50%, #DAA520 100%)',
          boxShadow: '0 0 8px rgba(218, 165, 32, 0.6)',
          transform: 'translateZ(0)', // GPU acceleration
          willChange: 'width',
          transition: 'width 0.05s linear'
        }}
      />
    </div>
  );
};

export default ScrollProgressBar;
