import React, { createContext, useContext, useEffect } from 'react';
import { useGameProgress } from '../hooks/useGameProgress';
import { useAchievements } from '../hooks/useAchievements';
import { dispatchGameEvent } from '../components/GameNotifications';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const gameProgress = useGameProgress();
  const achievements = useAchievements();

  // Enhanced XP function with notifications
  const addXPWithNotification = (amount) => {
    try {
      const oldLevel = gameProgress.progress.level;
      gameProgress.addXP(amount);
      
      // Dispatch XP notification
      dispatchGameEvent('xp_gained', { amount });
      
      // Check for level up
      const newLevel = Math.floor((gameProgress.progress.xp + amount) / 100) + 1;
      if (newLevel > oldLevel) {
        setTimeout(() => {
          dispatchGameEvent('level_up', { level: newLevel });
        }, 500);
      }
    } catch (error) {
      console.error('Error adding XP:', error);
    }
  };

  // Safe unlock deity function
  const unlockDeityWithNotification = (deityId) => {
    try {
      if (!deityId) return;
      gameProgress.unlockDeity(deityId);
      dispatchGameEvent('deity_unlocked', { deityId });
    } catch (error) {
      console.error('Error unlocking deity:', error);
    }
  };

  // Safe unlock achievement function
  const unlockAchievementWithNotification = (achievementId) => {
    try {
      if (!achievementId || !achievements?.unlockAchievement) {
        console.warn('Achievement system not ready');
        return;
      }
      const result = achievements.unlockAchievement(achievementId);
      if (result) {
        dispatchGameEvent('achievement_unlocked', { achievementId });
      }
    } catch (error) {
      console.error('Error unlocking achievement:', error);
    }
  };

  const value = {
    ...gameProgress,
    achievements: achievements?.achievements || [],
    addXP: addXPWithNotification,
    unlockDeity: unlockDeityWithNotification,
    unlockAchievement: unlockAchievementWithNotification,
    checkAchievements: achievements?.checkAchievements || (() => {}),
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
