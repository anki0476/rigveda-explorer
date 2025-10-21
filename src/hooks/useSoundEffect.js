import { useCallback, useRef } from 'react';
import { useBGM } from '../context/BGMContext';

export const useSoundEffect = (audioPath) => {
  const { soundEffectsEnabled } = useBGM();
  const audioRef = useRef(null);

  const play = useCallback(() => {
    if (!soundEffectsEnabled) return; // Don't play if disabled

    if (!audioRef.current) {
      audioRef.current = new Audio(audioPath);
      audioRef.current.volume = 0.5;
    }

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(err => console.log('Sound effect failed:', err));
  }, [audioPath, soundEffectsEnabled]);

  return play;
};
