import React, { useState } from 'react';

const RigvedaBook3DCSS = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!isOpen) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
      const y = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      setRotation({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const toggleBook = () => {
    setIsOpen(!isOpen);
    if (onOpen && !isOpen) {
      setTimeout(() => onOpen(), 1000);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#2C1810] via-[#3D2517] to-[#1A0F0A] flex items-center justify-center overflow-hidden">
      {/* Ambient particles */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[--color-gold]"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Book Container */}
      <div
        className="relative cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={toggleBook}
        style={{
          perspective: '2000px',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Book Wrapper */}
        <div
          className="relative transition-transform duration-500 ease-out"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d',
            width: '400px',
            height: '550px'
          }}
        >
          {/* Book Cover (Front) */}
          <div
            className={`absolute inset-0 rounded-lg shadow-2xl transition-all duration-1000 ${
              isOpen ? 'rotate-y-[-180deg]' : ''
            }`}
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'left center',
              backfaceVisibility: 'hidden'
            }}
          >
            {/* Leather Texture Background */}
            <div
              className="absolute inset-0 rounded-lg"
              style={{
                background: `
                  linear-gradient(135deg, #5C3317 0%, #4A2511 50%, #5C3317 100%),
                  repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)
                `,
                boxShadow: `
                  inset 0 0 50px rgba(0, 0, 0, 0.5),
                  0 20px 60px rgba(0, 0, 0, 0.7),
                  0 10px 30px rgba(0, 0, 0, 0.5)
                `
              }}
            />

            {/* Golden Border */}
            <div className="absolute inset-4 rounded-md border-4 border-[--color-gold] opacity-80" />

            {/* Decorative Corner Elements */}
            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
              <div
                key={corner}
                className={`absolute w-12 h-12 ${
                  corner.includes('top') ? 'top-6' : 'bottom-6'
                } ${corner.includes('left') ? 'left-6' : 'right-6'}`}
              >
                <div className="w-full h-full border-[--color-gold] opacity-70"
                  style={{
                    borderWidth: corner.includes('top') && corner.includes('left') ? '3px 0 0 3px' :
                                 corner.includes('top') && corner.includes('right') ? '3px 3px 0 0' :
                                 corner.includes('bottom') && corner.includes('left') ? '0 0 3px 3px' :
                                 '0 3px 3px 0'
                  }}
                />
              </div>
            ))}

            {/* Central Om Symbol */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div
                  className="text-9xl font-bold text-[--color-gold] mb-6"
                  style={{
                    textShadow: `
                      0 0 20px rgba(212, 175, 55, 0.8),
                      0 0 40px rgba(212, 175, 55, 0.5),
                      0 4px 8px rgba(0, 0, 0, 0.8)
                    `,
                    filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.6))'
                  }}
                >
                  ॐ
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="absolute bottom-20 left-0 right-0 text-center">
              <h1
                className="text-4xl font-[family:--font-family-header] text-[--color-gold] tracking-widest"
                style={{
                  textShadow: `
                    0 0 10px rgba(212, 175, 55, 0.6),
                    0 2px 4px rgba(0, 0, 0, 0.8)
                  `
                }}
              >
                RIG VEDA
              </h1>
              <div className="mt-2 text-sm text-[--color-gold] opacity-70 tracking-wide">
                ऋग्वेद
              </div>
            </div>

            {/* Decorative Flames */}
            {[30, 50, 70].map((top, idx) => (
              <React.Fragment key={idx}>
                <div
                  className="absolute w-6 h-8 opacity-60"
                  style={{
                    left: '20px',
                    top: `${top}%`,
                    background: 'linear-gradient(to top, #D4AF37, transparent)',
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    filter: 'blur(1px)'
                  }}
                />
                <div
                  className="absolute w-6 h-8 opacity-60"
                  style={{
                    right: '20px',
                    top: `${top}%`,
                    background: 'linear-gradient(to top, #D4AF37, transparent)',
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    filter: 'blur(1px)'
                  }}
                />
              </React.Fragment>
            ))}

            {/* Book Spine Effect */}
            <div
              className="absolute left-0 top-0 bottom-0 w-8 rounded-l-lg"
              style={{
                background: 'linear-gradient(to right, #3D2517, #5C3317)',
                boxShadow: 'inset 2px 0 10px rgba(0, 0, 0, 0.5)'
              }}
            />
          </div>

          {/* Left Page (when open) */}
          {isOpen && (
            <>
              <div
                className="absolute inset-0 rounded-lg bg-[#F5E6D3] shadow-2xl animate-page-left"
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'left center',
                  transform: 'translateX(-102%) rotateY(-20deg)',
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(0,0,0,0.05) 30px, rgba(0,0,0,0.05) 31px)'
                }}
              >
                <div className="p-12 text-[--color-ink] font-[family:--font-family-body]">
                  <h3 className="text-2xl font-bold mb-4 text-[--color-gold]">Navigate to:</h3>
                  <ul className="space-y-3 text-lg">
                    <li>• Home</li>
                    <li>• Deity Network</li>
                    <li>• Rig Veda Online</li>
                    <li>• Hymns</li>
                    <li>• Star Map</li>
                  </ul>
                </div>
              </div>

              {/* Right Page (when open) */}
              <div
                className="absolute inset-0 rounded-lg bg-[#F5E6D3] shadow-2xl animate-page-right"
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'right center',
                  transform: 'translateX(102%) rotateY(20deg)',
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(0,0,0,0.05) 30px, rgba(0,0,0,0.05) 31px)'
                }}
              >
                <div className="p-12 text-[--color-ink] font-[family:--font-family-body]">
                  <h3 className="text-2xl font-bold mb-4 text-[--color-gold]">More Features:</h3>
                  <ul className="space-y-3 text-lg">
                    <li>• Ten Mandalas</li>
                    <li>• Surprise Me!</li>
                    <li>• Ask the Rishi</li>
                    <li>• About</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-[--color-gold] font-[family:--font-family-body] text-xl mb-3">
          {isOpen ? '✨ Click to close the book' : '🖱️ Hover to rotate • Click to open'}
        </p>
        {!isOpen && (
          <p className="text-[--color-gold] opacity-70 text-sm animate-pulse">
            Begin your journey into the Rigveda
          </p>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.7;
          }
        }

        @keyframes page-left {
          from {
            transform: translateX(0) rotateY(0deg);
          }
          to {
            transform: translateX(-102%) rotateY(-20deg);
          }
        }

        @keyframes page-right {
          from {
            transform: translateX(0) rotateY(0deg);
          }
          to {
            transform: translateX(102%) rotateY(20deg);
          }
        }

        .rotate-y-[-180deg] {
          transform: rotateY(-180deg);
        }

        .animate-page-left {
          animation: page-left 1s ease-out forwards;
        }

        .animate-page-right {
          animation: page-right 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default RigvedaBook3DCSS;
