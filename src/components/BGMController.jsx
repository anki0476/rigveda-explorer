import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useBGM } from '../context/BGMContext';

export const BGMController = () => {
  const location = useLocation();
  const { switchBGM, gamesBGMEnabled } = useBGM();

  useEffect(() => {
    // Check if we're in the games section (any /games/* route)
    const isGamesRoute = location.pathname.startsWith('/games');
    
    console.log(`🎵 BGM Controller: Route = ${location.pathname}, isGamesRoute = ${isGamesRoute}`);
    
    if (isGamesRoute && gamesBGMEnabled) {
      console.log('🎮 Switching to games BGM');
      switchBGM('games');
    } else {
      console.log('🏠 Switching to main BGM');
      switchBGM('main');
    }
  }, [location.pathname, switchBGM, gamesBGMEnabled]);

  return null; // This component doesn't render anything
};
