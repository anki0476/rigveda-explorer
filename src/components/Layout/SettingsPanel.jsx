import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useBGM } from '../../context/BGMContext';
import { useSoundEffect } from '../../hooks/useSoundEffect';


const SettingsPanel = ({ isOpen, onClose }) => {
  const {
    bgmEnabled,
    toggleBGM,
    gamesBGMEnabled,
    toggleGamesBGM,
    soundEffectsEnabled,
    toggleSoundEffects,
  } = useBGM();


  const playHover = useSoundEffect('/audio/button-hover.mp3');
  const playClick = useSoundEffect('/audio/button-click.mp3');


  if (!isOpen) return null;


  return createPortal(
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
      onClick={onClose}
    >
      {/* ULTRA COMPACT - ALL 4 SECTIONS */}
      <div
        className="relative bg-gradient-to-br from-[#FEF3E2] to-[#F5E6D3] rounded-lg shadow-2xl border-2 border-amber-600 max-w-sm w-full p-2"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'slideDown 0.3s ease-out',
        }}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          onMouseEnter={playHover}
          className="absolute -top-2 -right-2 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-full p-1 hover:scale-110 transition-transform shadow-lg"
        >
          <X size={14} />
        </button>


        {/* ULTRA COMPACT CONTROLS */}
        <div className="space-y-1">
          
          {/* BACKGROUND MUSIC */}
          <div className="flex items-center justify-between py-1 border-b border-amber-300">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">🎵</span>
              <div>
                <h3 className="font-bold text-amber-900 text-xs">Background Music</h3>
                <p className="text-[8px] text-amber-700">Ambient Vedic music</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={bgmEnabled}
                onChange={toggleBGM}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[3px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-amber-600"></div>
            </label>
          </div>


          {/* GAMES MUSIC */}
          <div className="flex items-center justify-between py-1 border-b border-amber-300">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">🎮</span>
              <div>
                <h3 className="font-bold text-amber-900 text-xs">Games Music</h3>
                <p className="text-[8px] text-amber-700">Separate BGM for games</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={gamesBGMEnabled}
                onChange={toggleGamesBGM}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[3px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-amber-600"></div>
            </label>
          </div>


          {/* SOUND EFFECTS */}
          <div className="flex items-center justify-between py-1 border-b border-amber-300">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">🔊</span>
              <div>
                <h3 className="font-bold text-amber-900 text-xs">Sound Effects</h3>
                <p className="text-[8px] text-amber-700">Button clicks & hovers</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={soundEffectsEnabled}
                onChange={toggleSoundEffects}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[3px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-amber-600"></div>
            </label>
          </div>
        </div>


        {/* TINY FOOTER */}
        <p className="text-center text-amber-600 text-[8px] mt-1 italic">
          ✨ Auto-saved
        </p>


        <style jsx>{`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>,
    document.body
  );
};


export default SettingsPanel;
