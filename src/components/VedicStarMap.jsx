import React, { useState, useEffect, useRef } from 'react';
import constellationsData from '../data/constellations.json';

const VedicStarMap = () => {
  const [randomStars, setRandomStars] = useState([]);
  const [selectedConstellation, setSelectedConstellation] = useState(null);
  const [showLines, setShowLines] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [shootingStars, setShootingStars] = useState([]);
  const canvasRef = useRef(null);
  const shootingStarIdRef = useRef(0);

  // Generate random stars with depth
  useEffect(() => {
    generateRandomStars();
    startShootingStars();
  }, []);

  const generateRandomStars = () => {
    const stars = [];
    const numStars = 150;
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1.5,
        opacity: Math.random() * 0.4 + 0.7,
        depth: Math.random() * 3 + 1,
      });
    }
    setRandomStars(stars);
  };

  // Shooting star system - EVERY 9 SECONDS
  const startShootingStars = () => {
    const createShootingStar = () => {
      const id = shootingStarIdRef.current++;
      
      // Random starting position
      const startSide = Math.random();
      let startX, startY, angle;
      
      if (startSide < 0.5) {
        // Start from top-left, move to bottom-right
        startX = Math.random() * 30;
        startY = Math.random() * 20;
        angle = 45 + Math.random() * 15;
      } else {
        // Start from top-right, move to bottom-left
        startX = Math.random() * 30 + 70;
        startY = Math.random() * 20;
        angle = -45 - Math.random() * 15;
      }
      
      const newStar = {
        id,
        startX,
        startY,
        angle,
        length: Math.random() * 80 + 60,
        duration: Math.random() * 1.5 + 1.5,
        distance: 800
      };

      setShootingStars(prev => [...prev, newStar]);

      // Remove after animation
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.id !== id));
      }, newStar.duration * 1000);
    };

    // Create shooting stars EVERY 9 SECONDS
    const scheduleNext = () => {
      setTimeout(() => {
        createShootingStar();
        scheduleNext();
      }, 9000); // EXACTLY 9 seconds
    };

    scheduleNext();
  };

  // Handle mouse move for 3D effect
  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  // Scale and center constellation
  const scaleAndCenterConstellation = (constellation) => {
    const stars = constellation.stars;
    
    const xs = stars.map(s => s.x);
    const ys = stars.map(s => s.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    
    const width = maxX - minX;
    const height = maxY - minY;
    
    const targetSize = 60;
    const scale = Math.min(targetSize / (width / 8), targetSize / (height / 5));
    
    const centerX = 50;
    const centerY = 50;
    
    const constellationCenterX = (minX + maxX) / 2;
    const constellationCenterY = (minY + maxY) / 2;
    
    return stars.map(star => ({
      ...star,
      x: centerX + ((star.x - constellationCenterX) * scale / 8),
      y: centerY + ((star.y - constellationCenterY) * scale / 5),
      size: star.size * 1.5,
      depth: 1
    }));
  };

  const morphToConstellation = (constellation) => {
    setShowLines(false);
    
    const scaledStars = scaleAndCenterConstellation(constellation);
    setSelectedConstellation({
      ...constellation,
      stars: scaledStars
    });
    
    setTimeout(() => {
      setShowLines(true);
    }, 1000);
  };

  const resetStars = () => {
    setSelectedConstellation(null);
    setShowLines(false);
    generateRandomStars();
  };

  const getCurrentStars = () => {
    if (selectedConstellation) {
      return selectedConstellation.stars;
    }
    return randomStars;
  };

  const getParallaxOffset = (depth) => {
    const parallaxStrength = 5;
    return {
      x: mousePosition.x * parallaxStrength * depth,
      y: mousePosition.y * parallaxStrength * depth
    };
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-[family:--font-family-header] text-[--color-ink] mb-3">
          ✨ RigVeda Observatory
        </h1>
        <p className="text-lg text-[--color-ink-light] font-[family:--font-family-body]">
          Explore constellations mentioned in the Rigveda • Move your mouse to explore in 3D
        </p>
      </div>

      {/* Star Gazing Window - 3D INTERACTIVE WITH SHOOTING STARS */}
      <div 
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[500px] rounded-xl border-4 border-[--color-gold] overflow-hidden mb-8 shadow-2xl cursor-crosshair transition-transform duration-200 ease-out"
        style={{ 
          background: '#000814',
          boxShadow: 'inset 0 0 100px rgba(0, 8, 20, 0.9), 0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          transform: `perspective(1000px) rotateX(${-mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg) scale(${1 + Math.abs(mousePosition.x * 0.02)})`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* SHOOTING STARS - TRUE DIAGONAL MOVEMENT */}
        {shootingStars.map((star) => {
          // Calculate diagonal movement
          const angleRad = star.angle * Math.PI / 180;
          const moveX = Math.cos(angleRad) * star.distance;
          const moveY = Math.sin(angleRad) * star.distance;
          
          return (
            <div
              key={star.id}
              className="absolute pointer-events-none"
              style={{
                left: `${star.startX}%`,
                top: `${star.startY}%`,
                zIndex: 0
              }}
            >
              {/* Shooting star container that moves */}
              <div
                style={{
                  width: `${star.length}px`,
                  height: '3px',
                  transform: `rotate(${star.angle}deg) translateZ(-20px)`,
                  transformOrigin: 'left center',
                  animation: `shoot-diagonal-${star.id} ${star.duration}s linear forwards`
                }}
              >
                {/* The actual glowing trail */}
                <div
                  className="w-full h-full"
                  style={{
                    background: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 40%, rgba(180, 220, 255, 1) 100%)',
                    boxShadow: '0 0 12px 3px rgba(180, 220, 255, 0.9), 0 0 20px 5px rgba(180, 220, 255, 0.6)',
                    borderRadius: '50%'
                  }}
                />
              </div>
              {/* Inline keyframe for diagonal screen movement */}
              <style>{`
                @keyframes shoot-diagonal-${star.id} {
                  0% {
                    transform: translate(0, 0) rotate(${star.angle}deg) translateZ(-20px);
                    opacity: 0;
                  }
                  10% {
                    opacity: 1;
                  }
                  90% {
                    opacity: 0.9;
                  }
                  100% {
                    transform: translate(${moveX}px, ${moveY}px) rotate(${star.angle}deg) translateZ(-20px);
                    opacity: 0;
                  }
                }
              `}</style>
            </div>
          );
        })}

        {/* Regular Stars - 3D WITH PARALLAX */}
        {getCurrentStars().map((star, idx) => {
          const parallax = getParallaxOffset(star.depth);
          return (
            <div
              key={idx}
              className="absolute transition-all duration-1000 ease-out"
              style={{
                left: `calc(${star.x}% + ${parallax.x}px)`,
                top: `calc(${star.y}% + ${parallax.y}px)`,
                transform: `translate(-50%, -50%) translateZ(${star.depth * 10}px)`,
                transformStyle: 'preserve-3d',
                zIndex: 10
              }}
            >
              {/* Star core */}
              <div
                className="absolute rounded-full bg-white"
                style={{
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  boxShadow: `
                    0 0 ${star.size * 3}px ${star.size * 1.5}px rgba(255, 255, 255, ${star.opacity * 0.8}),
                    0 0 ${star.size * 6}px ${star.size}px rgba(200, 220, 255, ${star.opacity * 0.6}),
                    0 0 ${star.size * 10}px ${star.size * 0.5}px rgba(150, 180, 255, ${star.opacity * 0.4})
                  `,
                  opacity: star.opacity || 1,
                  animation: `twinkle-realistic ${1.5 + Math.random() * 2.5}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
              {/* Star flare */}
              {star.size > 2 && (
                <>
                  <div
                    className="absolute bg-white"
                    style={{
                      width: `${star.size * 5}px`,
                      height: '1px',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      opacity: star.opacity * 0.5,
                      boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, ${star.opacity * 0.6})`,
                      animation: `pulse-flare ${1.5 + Math.random() * 2.5}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                  <div
                    className="absolute bg-white"
                    style={{
                      width: '1px',
                      height: `${star.size * 5}px`,
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      opacity: star.opacity * 0.5,
                      boxShadow: `0 0 ${star.size * 3}px rgba(255, 255, 255, ${star.opacity * 0.6})`,
                      animation: `pulse-flare ${1.5 + Math.random() * 2.5}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                </>
              )}
            </div>
          );
        })}

        {/* Constellation Lines */}
        {selectedConstellation && showLines && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 15 }}>
            {selectedConstellation.stars.map((star, idx) => {
              if (idx < selectedConstellation.stars.length - 1) {
                const nextStar = selectedConstellation.stars[idx + 1];
                const parallax1 = getParallaxOffset(star.depth);
                const parallax2 = getParallaxOffset(nextStar.depth);
                return (
                  <line
                    key={idx}
                    x1={`calc(${star.x}% + ${parallax1.x}px)`}
                    y1={`calc(${star.y}% + ${parallax1.y}px)`}
                    x2={`calc(${nextStar.x}% + ${parallax2.x}px)`}
                    y2={`calc(${nextStar.y}% + ${parallax2.y}px)`}
                    stroke="rgba(255, 215, 0, 0.35)"
                    strokeWidth="1.5"
                    className="animate-fade-in transition-all duration-200"
                    style={{
                      filter: 'drop-shadow(0 0 2px rgba(255, 215, 0, 0.3))'
                    }}
                  />
                );
              }
              return null;
            })}
          </svg>
        )}

        {/* Constellation Name Overlay */}
        {selectedConstellation && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-md px-6 py-3 rounded-full border-2 border-[--color-gold] pointer-events-none" style={{ zIndex: 20 }}>
            <h3 className="text-2xl font-[family:--font-family-header] text-white">
              {selectedConstellation.name} ({selectedConstellation.englishName})
            </h3>
          </div>
        )}

        {/* 3D Hint Indicator */}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-[--color-gold]/30 pointer-events-none" style={{ zIndex: 20 }}>
          <p className="text-white text-sm font-[family:--font-family-body]">
            🖱️ Move mouse to explore in 3D
          </p>
        </div>
      </div>

      {/* Constellation Selector */}
      <div className="mb-8">
        <h2 className="text-2xl font-[family:--font-family-header] text-[--color-ink] mb-4 text-center">
          Select a Constellation
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {constellationsData.constellations.map((constellation) => (
            <button
              key={constellation.id}
              onClick={() => morphToConstellation(constellation)}
              className={`px-6 py-3 rounded-lg font-[family:--font-family-body] font-semibold transition-all transform hover:scale-105 ${
                selectedConstellation?.id === constellation.id
                  ? 'bg-[--color-gold] text-white shadow-lg'
                  : 'bg-[--color-parchment-light] text-[--color-ink] border-2 border-[--color-gold]/30 hover:border-[--color-gold]'
              }`}
            >
              ⭐ {constellation.name}
            </button>
          ))}
          <button
            onClick={resetStars}
            className="px-6 py-3 rounded-lg font-[family:--font-family-body] font-semibold bg-[--color-saffron] text-white border-2 border-[--color-saffron] hover:bg-[--color-saffron]/80 transition-all transform hover:scale-105"
          >
            🔄 Reset
          </button>
        </div>
      </div>

      {/* Details Panel */}
      {selectedConstellation && (
        <div className="bg-[--color-parchment-light] rounded-xl border-4 border-[--color-gold] p-8 shadow-xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-2xl font-[family:--font-family-header] text-[--color-ink] mb-4">
                {selectedConstellation.name} - {selectedConstellation.meaning}
              </h3>
              
              <div className="space-y-3 text-[--color-ink-light] font-[family:--font-family-body]">
                <div>
                  <span className="font-semibold text-[--color-ink]">English Name:</span> {selectedConstellation.englishName}
                </div>
                <div>
                  <span className="font-semibold text-[--color-ink]">Rigveda Reference:</span> {selectedConstellation.rigvedaReference}
                </div>
                <div>
                  <span className="font-semibold text-[--color-ink]">Deity:</span> {selectedConstellation.deity}
                </div>
                <div>
                  <span className="font-semibold text-[--color-ink]">Symbolism:</span> {selectedConstellation.symbolism}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-[family:--font-family-header] text-[--color-ink] mb-3">
                Significance in Rigveda
              </h4>
              <p className="text-[--color-ink-light] font-[family:--font-family-body] leading-relaxed">
                {selectedConstellation.significance}
              </p>

              <div className="mt-4 p-4 bg-[--color-parchment-dark] rounded-lg border-2 border-[--color-gold]/20">
                <p className="text-sm text-[--color-ink-light] font-[family:--font-family-body]">
                  <span className="font-semibold text-[--color-ink]">Modern Equivalent:</span> {selectedConstellation.modernConstellation}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes twinkle-realistic {
          0%, 100% { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          25% { 
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(0.92);
          }
          50% { 
            opacity: 1.1;
            transform: translate(-50%, -50%) scale(1.08);
          }
          75% { 
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(0.96);
          }
        }
        
        @keyframes pulse-flare {
          0%, 100% { 
            opacity: 0.3;
            transform: translate(-50%, -50%) scaleX(1);
          }
          50% { 
            opacity: 0.6;
            transform: translate(-50%, -50%) scaleX(1.2);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-in;
        }
      `}</style>
    </div>
  );
};

export default VedicStarMap;
