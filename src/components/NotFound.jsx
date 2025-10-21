import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IndraLightningLeap from '../games/IndraLightningLeap';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Pixelated noise texture overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100' height='100' fill='%23000'/%3E%3Crect x='0' y='0' width='10' height='10' fill='%23fff'/%3E%3Crect x='20' y='10' width='10' height='10' fill='%23fff'/%3E%3Crect x='10' y='20' width='10' height='10' fill='%23fff'/%3E%3C/svg%3E")`,
        backgroundSize: '20px 20px'
      }}></div>

      {/* Game at the top */}
      <div className="mb-8 w-full flex justify-center relative z-10">
        <IndraLightningLeap />
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Main Card - Minecraft style */}
        <div className="bg-gradient-to-br from-stone-700 via-stone-800 to-stone-900 rounded-none shadow-2xl border-4 border-amber-600 p-12 text-center relative" style={{
          boxShadow: '8px 8px 0px rgba(217, 119, 6, 0.5), inset 0 0 20px rgba(0,0,0,0.5)'
        }}>
          
          {/* Corner decorations */}
          <div className="absolute top-2 left-2 w-3 h-3 bg-amber-500 border border-amber-700"></div>
          <div className="absolute top-2 right-2 w-3 h-3 bg-amber-500 border border-amber-700"></div>
          <div className="absolute bottom-2 left-2 w-3 h-3 bg-amber-500 border border-amber-700"></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 bg-amber-500 border border-amber-700"></div>

          {/* Icon */}
          <div className="text-8xl mb-6" style={{ filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.5))' }}>
            ⚠️
          </div>

          {/* Title - Pixelated font style */}
          <h1 className="text-5xl font-bold text-amber-400 mb-4 tracking-wider" style={{
            fontFamily: 'monospace',
            textShadow: '4px 4px 0px rgba(0,0,0,0.8), 2px 2px 0px rgba(217, 119, 6, 0.5)',
            letterSpacing: '0.1em'
          }}>
            ERROR 404
          </h1>

          {/* Subtitle */}
          <p className="text-2xl text-amber-300 font-bold mb-8 tracking-wide" style={{
            fontFamily: 'monospace',
            textShadow: '2px 2px 0px rgba(0,0,0,0.8)'
          }}>
            PATH NOT FOUND
          </p>

          {/* Poetic Message - Minecraft book style */}
          <div className="bg-yellow-100 bg-opacity-10 p-6 rounded-none border-2 border-amber-700 mb-8 backdrop-blur-sm" style={{
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'
          }}>
            <p className="text-base text-amber-200 font-mono leading-relaxed">
              "Like a seeker wandering through ancient texts,<br />
              You've stumbled upon uncharted territory.<br />
              Fear not—the way back is clear."
            </p>
          </div>

          {/* Divider */}
          <div className="h-1 bg-amber-700 my-6 shadow-inner"></div>

          {/* Action Buttons - Minecraft style */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              to="/"
              className="group relative px-8 py-4 bg-gradient-to-b from-amber-600 to-amber-800 text-white font-bold text-lg rounded-none border-4 border-t-amber-400 border-l-amber-400 border-r-amber-900 border-b-amber-900 transition-all active:border-t-amber-900 active:border-l-amber-900 active:border-r-amber-400 active:border-b-amber-400 active:translate-y-1"
              style={{
                fontFamily: 'monospace',
                textShadow: '2px 2px 0px rgba(0,0,0,0.8)',
                boxShadow: '0 4px 0 0 rgba(120, 53, 15, 1)'
              }}
            >
              🏠 RETURN HOME
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="group relative px-8 py-4 bg-gradient-to-b from-gray-500 to-gray-700 text-white font-bold text-lg rounded-none border-4 border-t-gray-300 border-l-gray-300 border-r-gray-900 border-b-gray-900 transition-all active:border-t-gray-900 active:border-l-gray-900 active:border-r-gray-300 active:border-b-gray-300 active:translate-y-1"
              style={{
                fontFamily: 'monospace',
                textShadow: '2px 2px 0px rgba(0,0,0,0.8)',
                boxShadow: '0 4px 0 0 rgba(31, 41, 55, 1)'
              }}
            >
              ← GO BACK
            </button>
          </div>

          {/* Quick Links */}
          <div className="border-t-2 border-amber-700 pt-6">
            <p className="text-sm text-amber-400 font-mono mb-4 font-bold tracking-wider">
              QUICK NAVIGATION:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { to: '/deity-network', icon: '🕸️', text: 'Deity Network' },
                { to: '/hymns', icon: '📜', text: 'Hymns' },
                { to: '/rigveda-online', icon: '📚', text: 'Topics' },
                { to: '/ten-mandalas', icon: '📖', text: 'Mandalas' },
                { to: '/surprise-me', icon: '✨', text: 'Surprise Me' }
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-4 py-2 bg-gradient-to-b from-stone-600 to-stone-800 text-amber-300 rounded-none border-2 border-t-stone-500 border-l-stone-500 border-r-black border-b-black hover:from-stone-500 hover:to-stone-700 transition-all text-sm font-mono font-bold active:translate-y-0.5"
                  style={{
                    textShadow: '1px 1px 0px rgba(0,0,0,0.8)',
                    boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.8)'
                  }}
                >
                  {link.icon} {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Fun Fact - Pixel style */}
        <div className="mt-6 text-center bg-black bg-opacity-50 p-4 rounded-none border-2 border-amber-800">
          <p className="text-sm text-amber-400 font-mono font-bold" style={{
            textShadow: '1px 1px 0px rgba(0,0,0,0.8)'
          }}>
            💡 <strong>DID YOU KNOW?</strong> The Rig Veda contains 10,552 verses across 1,028 hymns!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
