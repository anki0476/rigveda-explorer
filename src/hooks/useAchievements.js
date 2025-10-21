import { useEffect } from 'react';
import { useGameProgress } from './useGameProgress';
import { achievements } from '../data/achievementData';

export const useAchievements = () => {
  const { progress, unlockAchievement } = useGameProgress();

  // Check for achievements whenever progress changes
  useEffect(() => {
    const checkAchievements = () => {
      try {
        Object.values(achievements).forEach(achievement => {
          // Skip if already unlocked
          if (progress.unlockedAchievements?.includes(achievement.id)) return;

          let shouldUnlock = false;

          // Check different achievement conditions
          switch (achievement.id) {
            case 'first_steps':
              shouldUnlock = progress.xp >= 0;
              break;
            case 'collector_novice':
              shouldUnlock = progress.collectedDeities?.length >= 3;
              break;
            case 'collector_master':
              shouldUnlock = progress.collectedDeities?.length >= 8;
              break;
            case 'fire_scholar':
              shouldUnlock = progress.collectedDeities?.includes('agni') && progress.xp >= 100;
              break;
            case 'dawn_seeker':
              shouldUnlock = progress.collectedDeities?.includes('surya') && progress.xp >= 100;
              break;
            case 'philosopher':
              shouldUnlock = progress.collectedDeities?.includes('varuna') && progress.xp >= 150;
              break;
            case 'enlightened':
              shouldUnlock = progress.collectedDeities?.includes('brahman');
              break;
            case 'hymn_master':
              shouldUnlock = progress.xp >= 500;
              break;
            default:
              shouldUnlock = achievement.xpRequired && progress.xp >= achievement.xpRequired;
          }

          if (shouldUnlock && unlockAchievement) {
            unlockAchievement(achievement.id);
            // Note: Removed unlockTitle() - it doesn't exist in useGameProgress
            // If you want titles, add that function to useGameProgress first
          }
        });
      } catch (error) {
        console.error('Error checking achievements:', error);
      }
    };

    checkAchievements();
  }, [progress, unlockAchievement]);

  return {
    achievements: progress.unlockedAchievements || [],
    checkAchievements: () => {
      // Manual achievement checking if needed
    }
  };
};
