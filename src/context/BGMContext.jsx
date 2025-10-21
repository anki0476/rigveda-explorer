// src/context/BGMContext.jsx
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const BGMContext = createContext();

export const useBGM = () => {
  const context = useContext(BGMContext);
  if (!context) {
    throw new Error('useBGM must be used within BGMProvider');
  }
  return context;
};

export const BGMProvider = ({ children }) => {
  const [bgmEnabled, setBgmEnabled] = useState(() => {
    const saved = localStorage.getItem('bgmEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // ⭐ NEW: Games BGM state
  const [gamesBGMEnabled, setGamesBGMEnabled] = useState(() => {
    const saved = localStorage.getItem('gamesBGMEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(() => {
    const saved = localStorage.getItem('soundEffectsEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const audioRef = useRef(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    if (!audioRef.current) {
      console.log('🎵 Initializing BGM audio');
      audioRef.current = new Audio('/audio/bgm-main.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('bgmEnabled', JSON.stringify(bgmEnabled));
    console.log('🎵 BGM State:', { bgmEnabled, hasUserInteracted });
  }, [bgmEnabled, hasUserInteracted]);

  // ⭐ NEW: Save games BGM preference
  useEffect(() => {
    localStorage.setItem('gamesBGMEnabled', JSON.stringify(gamesBGMEnabled));
    console.log('🎮 Games BGM State:', { gamesBGMEnabled });
  }, [gamesBGMEnabled]);

  useEffect(() => {
    localStorage.setItem('soundEffectsEnabled', JSON.stringify(soundEffectsEnabled));
  }, [soundEffectsEnabled]);

  const playBGM = async () => {
    console.log('🎵 playBGM called - setting hasUserInteracted to true');
    setHasUserInteracted(true);
    
    if (audioRef.current && bgmEnabled) {
      try {
        console.log('🎵 Attempting to play BGM...');
        await audioRef.current.play();
        console.log('✅ BGM playing successfully!');
      } catch (error) {
        console.error('❌ Error playing BGM:', error);
      }
    }
  };

  const toggleBGM = () => {
    console.log('🔄 toggleBGM called');
    const newState = !bgmEnabled;
    setBgmEnabled(newState);
    
    if (audioRef.current) {
      if (newState && hasUserInteracted) {
        console.log('▶️ Attempting to play BGM...');
        audioRef.current.play().catch(err => console.log('BGM play failed:', err));
      } else {
        console.log('⏸️ Pausing BGM');
        audioRef.current.pause();
      }
    }
  };

  // ⭐ NEW: Toggle games BGM
  const toggleGamesBGM = () => {
    console.log('🔄 toggleGamesBGM called');
    setGamesBGMEnabled(!gamesBGMEnabled);
  };

  const toggleSoundEffects = () => {
    setSoundEffectsEnabled(!soundEffectsEnabled);
  };

  return (
    <BGMContext.Provider value={{ 
      bgmEnabled, 
      toggleBGM,
      gamesBGMEnabled, // ⭐ NEW
      toggleGamesBGM, // ⭐ NEW
      soundEffectsEnabled, 
      toggleSoundEffects,
      playBGM,
      audioRef
    }}>
      {children}
    </BGMContext.Provider>
  );
};
