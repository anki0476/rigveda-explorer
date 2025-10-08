import React, { useState } from 'react';
import { useAmbientAudio } from '../context/AmbientAudioContext';
import { Volume2, VolumeX, Music, X } from 'lucide-react';

const AmbientAudioToggle = () => {
  const {
    isPlaying,
    volume,
    currentTrack,
    isEnabled,
    togglePlay,
    changeVolume,
    stop,
    enable,
    disable,
  } = useAmbientAudio();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showEnablePrompt, setShowEnablePrompt] = useState(true);

  // First-time enable prompt
  if (!isEnabled && showEnablePrompt) {
    return (
      <div className="fixed bottom-4 right-4 z-40 w-80">
        <div className="bg-[var(--color-parchment)] border-2 border-[var(--color-gold)]/50 rounded-xl shadow-2xl p-4">
          <button
            onClick={() => setShowEnablePrompt(false)}
            className="absolute top-2 right-2 p-1 hover:bg-[var(--color-gold)]/10 rounded transition-colors"
          >
            <X size={16} className="text-[var(--color-ink-light)]" />
          </button>
          
          <div className="flex items-start gap-3 mb-3">
            <Music size={24} className="text-[var(--color-gold)] flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-semibold text-[var(--color-ink)] mb-1">
                Ambient Sacred Chants
              </h4>
              <p className="text-xs text-[var(--color-ink-light)] leading-relaxed">
                Enhance your journey with gentle Vedic hymns playing softly in the background
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                enable();
                setShowEnablePrompt(false);
              }}
              className="flex-1 px-3 py-2 bg-[var(--color-gold)] text-[var(--color-ink)] 
                       rounded-lg text-sm font-semibold hover:bg-[var(--color-gold)]/90 
                       transition-colors"
            >
              Enable Audio
            </button>
            <button
              onClick={() => setShowEnablePrompt(false)}
              className="px-3 py-2 border border-[var(--color-gold)]/30 text-[var(--color-ink-light)] 
                       rounded-lg text-sm hover:bg-[var(--color-gold)]/5 transition-colors"
            >
              Not Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isEnabled) return null;

  // Minimized state
  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 px-4 py-3 
                   bg-[var(--color-parchment)] border-2 border-[var(--color-gold)]/50 
                   rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
      >
        <Music size={20} className="text-[var(--color-gold)]" />
        {isPlaying && (
          <div className="flex gap-1">
            <div className="w-0.5 h-4 bg-[var(--color-gold)] animate-pulse" />
            <div className="w-0.5 h-4 bg-[var(--color-gold)] animate-pulse" style={{ animationDelay: '0.15s' }} />
            <div className="w-0.5 h-4 bg-[var(--color-gold)] animate-pulse" style={{ animationDelay: '0.3s' }} />
          </div>
        )}
      </button>
    );
  }

  // Expanded state
  return (
    <div className="fixed bottom-4 right-4 z-40 w-72">
      <div className="bg-[var(--color-parchment)] border-2 border-[var(--color-gold)]/50 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3 bg-[var(--color-gold)]/10 border-b border-[var(--color-gold)]/30">
          <div className="flex items-center gap-2">
            <Music size={18} className="text-[var(--color-gold)]" />
            <span className="text-sm font-semibold text-[var(--color-ink)]">Ambient Audio</span>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className="p-1 hover:bg-[var(--color-gold)]/20 rounded transition-colors"
          >
            <X size={18} className="text-[var(--color-ink)]" />
          </button>
        </div>

        {/* Current Track */}
        {currentTrack && (
          <div className="p-3 border-b border-[var(--color-gold)]/20">
            <div className="text-xs text-[var(--color-ink-light)] mb-1">Now Playing</div>
            <div className="text-sm font-medium text-[var(--color-ink)]">{currentTrack.name}</div>
            <div className="text-xs text-[var(--color-ink-light)] mt-1">Looping continuously</div>
          </div>
        )}

        {/* Controls */}
        <div className="p-4 space-y-3">
          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            disabled={!currentTrack}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 
                     bg-[var(--color-gold)] hover:bg-[var(--color-gold)]/90 
                     rounded-lg font-semibold text-[var(--color-ink)] 
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPlaying ? (
              <>
                <VolumeX size={18} />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Volume2 size={18} />
                <span>Play</span>
              </>
            )}
          </button>

          {/* Volume Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[var(--color-ink-light)]">
              <span>Volume</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => changeVolume(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-[var(--color-gold)]/20 rounded-lg appearance-none cursor-pointer
                         [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 
                         [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--color-gold)]
                         [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
            />
          </div>

          {/* Stop & Disable */}
          <div className="flex gap-2">
            <button
              onClick={stop}
              className="flex-1 px-3 py-2 border border-[var(--color-gold)]/30 text-[var(--color-ink-light)] 
                       rounded-lg text-sm hover:bg-[var(--color-gold)]/5 transition-colors"
            >
              Stop
            </button>
            <button
              onClick={disable}
              className="flex-1 px-3 py-2 border border-[var(--color-gold)]/30 text-[var(--color-ink-light)] 
                       rounded-lg text-sm hover:bg-[var(--color-gold)]/5 transition-colors"
            >
              Disable
            </button>
          </div>
        </div>

        {/* Info Footer */}
        <div className="p-3 bg-[var(--color-parchment-dark)] border-t border-[var(--color-gold)]/20">
          <p className="text-xs text-[var(--color-ink-light)] text-center">
            🎵 For detailed hymn study, visit <span className="text-[var(--color-gold)] font-semibold">Hymn Browser</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AmbientAudioToggle;
