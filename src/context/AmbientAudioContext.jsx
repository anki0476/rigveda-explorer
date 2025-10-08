import React, { createContext, useContext, useState, useRef } from 'react';

const AmbientAudioContext = createContext();

export const useAmbientAudio = () => {
  const context = useContext(AmbientAudioContext);
  if (!context) {
    // Safe fallback if context not available
    return {
      isPlaying: false,
      volume: 0.2,
      currentTrack: null,
      isEnabled: false,
      playAmbient: () => {},
      togglePlay: () => {},
      changeVolume: () => {},
      stop: () => {},
      enable: () => {},
      disable: () => {},
    };
  }
  return context;
};

export const AmbientAudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);

  // Simplified ambient tracks
  const ambientTracks = {
    home: { id: '1.1', file: '/audio/hymns/1.1.mp3', name: 'Agni Invocation' },
    story: { id: '10.129', file: '/audio/hymns/10.129.mp3', name: 'Creation Hymn' },
    meditation: { id: '3.62.10', file: '/audio/hymns/3.62.10.mp3', name: 'Gayatri Mantra' },
  };

  const playAmbient = (context = 'home') => {
    if (!isEnabled) return;
    
    const track = ambientTracks[context] || ambientTracks.home;
    setCurrentTrack(track);
    
    if (audioRef.current) {
      audioRef.current.src = track.file;
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log('Audio autoplay prevented:', err));
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error('Audio play failed:', err));
    }
  };

  const changeVolume = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const enable = () => setIsEnabled(true);
  
  const disable = () => {
    stop();
    setIsEnabled(false);
  };

  const value = {
    audioRef,
    isPlaying,
    volume,
    currentTrack,
    isEnabled,
    playAmbient,
    togglePlay,
    changeVolume,
    stop,
    enable,
    disable,
  };

  return (
    <AmbientAudioContext.Provider value={value}>
      <audio ref={audioRef} />
      {children}
    </AmbientAudioContext.Provider>
  );
};
