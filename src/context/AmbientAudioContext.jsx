// src/context/AmbientAudioContext.jsx
import React, { createContext, useContext, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useBGM } from './BGMContext';

const AmbientAudioContext = createContext();

export const useAmbientAudio = () => {
  const context = useContext(AmbientAudioContext);
  if (!context) {
    return {};
  }
  return context;
};

export const AmbientAudioProvider = ({ children }) => {
  const gamesAudioRef = useRef(null);
  const location = useLocation();
  const { bgmEnabled, gamesBGMEnabled, audioRef: mainAudioRef } = useBGM();

  // Initialize games BGM once
  useEffect(() => {
    console.log('🎮 Initializing Games BGM system');
    
    const audio = new Audio('/audio/bgm-games.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    gamesAudioRef.current = audio;

    return () => {
      if (gamesAudioRef.current) {
        gamesAudioRef.current.pause();
        gamesAudioRef.current.src = '';
        gamesAudioRef.current = null;
      }
    };
  }, []);

  // Route-based track switching
  useEffect(() => {
    if (!bgmEnabled) {
      console.log('🎮 BGM disabled');
      if (gamesAudioRef.current && !gamesAudioRef.current.paused) {
        gamesAudioRef.current.pause();
        gamesAudioRef.current.currentTime = 0;
      }
      return;
    }

    const mainAudio = mainAudioRef?.current;
    const gamesAudio = gamesAudioRef.current;

    if (!mainAudio || !gamesAudio) {
      console.warn('⚠️ Audio not ready');
      return;
    }

    const isGamesRoute = 
      location.pathname === '/games' || 
      location.pathname === '/games/story' || 
      location.pathname === '/games/collection' || 
      location.pathname === '/games/achievements' ||
      location.pathname === '/vedic-identity';

    const shouldPlayGames = isGamesRoute && gamesBGMEnabled;

    console.log('🎮 Route change:', { 
      pathname: location.pathname, 
      isGamesRoute, 
      shouldPlayGames,
      mainPaused: mainAudio.paused,
      gamesPaused: gamesAudio.paused
    });

    // Use setTimeout to handle audio
    const timer = setTimeout(() => {
      if (shouldPlayGames) {
        // ON GAMES ROUTE - Play games, pause main
        if (gamesAudio.paused) {
          console.log('🔄 Switching to games BGM');
          
          if (!mainAudio.paused) {
            mainAudio.pause();
            console.log('⏸️ Paused main BGM');
          }

          gamesAudio.currentTime = 0;
          gamesAudio.play()
            .then(() => console.log('✅ Games BGM playing'))
            .catch(err => console.error('❌ Games play error:', err));
        }
      } else {
        // NOT ON GAMES ROUTE - Stop games, ensure main is playing
        console.log('🔄 Not on games route, managing audio');
        
        // Always stop games if it's playing
        if (!gamesAudio.paused) {
          gamesAudio.pause();
          gamesAudio.currentTime = 0;
          console.log('⏸️ Stopped games BGM');
        }

        // Always ensure main is playing when not on games route
        if (mainAudio.paused) {
          console.log('▶️ Starting/resuming main BGM');
          mainAudio.play()
            .then(() => console.log('✅ Main BGM playing'))
            .catch(err => console.error('❌ Main play error:', err));
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, bgmEnabled, gamesBGMEnabled]);

  return (
    <AmbientAudioContext.Provider value={{}}>
      {children}
    </AmbientAudioContext.Provider>
  );
};
