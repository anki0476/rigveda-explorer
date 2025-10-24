// src/contexts/BGMContext.jsx
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
  const [currentBGMType, setCurrentBGMType] = useState('main'); // Track which BGM is playing
  const mainBGMTimeRef = useRef(0); // ⭐ Use ref instead of state for immediate updates
    // BGM URLs - hardcoded for reliability
    const BGM_URLS = {
      main: 'https://res.cloudinary.com/dn35jzjjc/video/upload/v1761317273/bgm-main_k2stul.mp3',
      games: 'https://res.cloudinary.com/dn35jzjjc/video/upload/v1761317000/bgm-games_azhn3z.mp3'
    };
  

  // Initialize main BGM on load
  useEffect(() => {
    if (!audioRef.current) {
      console.log('🎵 Initializing Main BGM audio');
      audioRef.current = new Audio(BGM_URLS.main);
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

  // Save preferences
  useEffect(() => {
    localStorage.setItem('bgmEnabled', JSON.stringify(bgmEnabled));
    console.log('🎵 BGM State:', { bgmEnabled, hasUserInteracted });
  }, [bgmEnabled, hasUserInteracted]);

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

  const toggleGamesBGM = () => {
    console.log('🔄 toggleGamesBGM called');
    setGamesBGMEnabled(!gamesBGMEnabled);
  };

  const toggleSoundEffects = () => {
    setSoundEffectsEnabled(!soundEffectsEnabled);
  };

  const switchBGM = (type) => {
    if (!audioRef.current || currentBGMType === type) return;

    console.log(`🔄 Switching BGM from ${currentBGMType} to ${type}`);
    
    const wasPlaying = !audioRef.current.paused;

    // ⭐ SAVE main BGM time to ref BEFORE switching
    if (currentBGMType === 'main') {
      mainBGMTimeRef.current = audioRef.current.currentTime;
      console.log(`💾 Saved main BGM time: ${mainBGMTimeRef.current.toFixed(2)}s`);
    }

    // Pause current
    audioRef.current.pause();
    
    // Change source
    const newUrl = BGM_URLS[type];
    console.log(`🎵 New BGM URL: ${newUrl}`);
    
    if (newUrl) {
      audioRef.current.src = newUrl;
      audioRef.current.load();
      
      setCurrentBGMType(type);

      // ⭐ Restore time after a tiny delay to ensure audio is ready
      if (type === 'main' && mainBGMTimeRef.current > 0) {
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.currentTime = mainBGMTimeRef.current;
            console.log(`⏱️ Restored main BGM to ${mainBGMTimeRef.current.toFixed(2)}s`);
          }
        }, 100); // Small delay to let audio load
      }

      const shouldPlayMain = type === 'main' && bgmEnabled && hasUserInteracted;
      const shouldPlayGames = type === 'games' && bgmEnabled && gamesBGMEnabled && hasUserInteracted;

      console.log(`🎮 Should play? Main: ${shouldPlayMain}, Games: ${shouldPlayGames}`);

      if (wasPlaying && (shouldPlayMain || shouldPlayGames)) {
        console.log(`▶️ Playing ${type} BGM...`);
        // Delay play slightly to ensure currentTime is set first
        setTimeout(() => {
          audioRef.current.play().catch(err => console.log('BGM switch play failed:', err));
        }, 150);
      } else {
        console.log(`⏸️ Not playing ${type} BGM. Conditions not met.`);
      }
    }
  };

  return (
    <BGMContext.Provider value={{ 
      bgmEnabled, 
      toggleBGM,
      gamesBGMEnabled,
      toggleGamesBGM,
      soundEffectsEnabled, 
      toggleSoundEffects,
      playBGM,
      switchBGM, // ⭐ NEW: Export BGM switcher
      audioRef,
      currentBGMType // ⭐ NEW: Export current BGM type
    }}>
      {children}
    </BGMContext.Provider>
  );
};
