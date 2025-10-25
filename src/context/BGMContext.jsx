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
      games: 'https://res.cloudinary.com/dn35jzjjc/video/upload/v1761317000/bgm-games_sv3zt9.mp3'
    };
  

  // Initialize main BGM on load
  useEffect(() => {
    if (!audioRef.current) {
      console.log('🎵 Initializing Main BGM audio');
      audioRef.current = new Audio(BGM_URLS.main);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
      audioRef.current.crossOrigin = 'anonymous';
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
    if (currentBGMType === type) return;

    console.log(`🔄 Switching BGM from ${currentBGMType} to ${type}`);

    // ⭐ SAVE main BGM time BEFORE switching
    if (currentBGMType === 'main' && audioRef.current) {
      mainBGMTimeRef.current = audioRef.current.currentTime;
      console.log(`💾 Saved main BGM time: ${mainBGMTimeRef.current.toFixed(2)}s`);
    }

    // ⭐ STOP and DESTROY old audio element
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current.load();
    }

    // ⭐ CREATE NEW audio element with new URL
    const newUrl = BGM_URLS[type];
    console.log(`🎵 Creating new audio element with URL: ${newUrl}`);

    if (newUrl) {
      // Create fresh audio element
      const newAudio = new Audio();
      newAudio.loop = true;
      newAudio.volume = 0.3;
      newAudio.crossOrigin = 'anonymous';
      newAudio.preload = 'auto'; // ⭐ Force preload

      setCurrentBGMType(type);

      // ⭐ WAIT for audio to be ready before playing
      newAudio.addEventListener('canplaythrough', () => {
        console.log(`✅ ${type} BGM ready to play`);
        
        // Restore time for main BGM
        if (type === 'main' && mainBGMTimeRef.current > 0) {
          newAudio.currentTime = mainBGMTimeRef.current;
          console.log(`⏱️ Restored main BGM to ${mainBGMTimeRef.current.toFixed(2)}s`);
        }

        // Determine if we should play
        const shouldPlayMain = type === 'main' && bgmEnabled && hasUserInteracted;
        const shouldPlayGames = type === 'games' && bgmEnabled && gamesBGMEnabled && hasUserInteracted;

        console.log(`🎮 Should play? Main: ${shouldPlayMain}, Games: ${shouldPlayGames}`);

        if (shouldPlayMain || shouldPlayGames) {
          console.log(`▶️ Playing ${type} BGM...`);
          newAudio.play()
            .then(() => console.log(`✅ ${type} BGM playing successfully!`))
            .catch(err => console.error(`❌ ${type} play error:`, err));
        }
      }, { once: true });

      // ⭐ Handle load errors
      newAudio.addEventListener('error', (e) => {
        console.error(`❌ ${type} BGM load error:`, e);
        console.error('Error code:', newAudio.error?.code);
        console.error('Error message:', newAudio.error?.message);
      });

      // ⭐ Set source AFTER adding event listeners
      newAudio.src = newUrl;
      newAudio.load(); // Explicitly trigger load

      // Update ref
      audioRef.current = newAudio;
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
