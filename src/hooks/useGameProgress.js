import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'rigveda_game_progress';

const initialProgress = {
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  completedPaths: [],
  currentPath: null,
  currentChapter: 'start',
  storyPath: [],
  unlockedBadges: [],
  collectedDeities: ['agni', 'ushas', 'pushan'],
  totalPlayTime: 0,
  achievements: []
};

export const useGameProgress = () => {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialProgress;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const checkLevelUp = useCallback((currentXP, currentLevel) => {
    const xpNeeded = currentLevel * 100;
    if (currentXP >= xpNeeded) {
      const newLevel = currentLevel + 1;
      const remainingXP = currentXP - xpNeeded;
      console.log(`Level Up! Reached Level ${newLevel}`);
      return {
        level: newLevel,
        xp: remainingXP,
        xpToNextLevel: newLevel * 100,
        leveled: true
      };
    }
    return { level: currentLevel, xp: currentXP, xpToNextLevel: currentLevel * 100, leveled: false };
  }, []);

  const checkAchievements = useCallback((updatedProgress) => {
    const achievements = [
      {
        id: 'first_path',
        condition: () => updatedProgress.completedPaths.length === 1,
        title: '🎯 First Steps',
        message: 'Completed your first path!'
      },
      {
        id: 'deity_collector',
        condition: () => updatedProgress.collectedDeities.length >= 3,
        title: '🎴 Deity Collector',
        message: 'Collected 3 deities!'
      },
      {
        id: 'level_5',
        condition: () => updatedProgress.level >= 5,
        title: '⭐ Rising Scholar',
        message: 'Reached Level 5!'
      },
      {
        id: 'level_10',
        condition: () => updatedProgress.level >= 10,
        title: '👑 Master Scholar',
        message: 'Reached Level 10!'
      },
      {
        id: 'all_deities',
        condition: () => updatedProgress.collectedDeities.length >= 8,
        title: '🏆 Master Collector',
        message: 'Collected all deities!'
      }
    ];

    achievements.forEach(achievement => {
      const alreadyUnlocked = updatedProgress.achievements?.includes(achievement.id);
      if (!alreadyUnlocked && achievement.condition()) {
        console.log(`Achievement unlocked: ${achievement.title}`);
        setProgress(prev => ({
          ...prev,
          achievements: [...(prev.achievements || []), achievement.id]
        }));
      }
    });
  }, []);

  const addXP = useCallback((amount) => {
    setProgress((prev) => {
      const newXP = prev.xp + amount;
      const levelResult = checkLevelUp(newXP, prev.level);
      let updatedProgress = {
        ...prev,
        level: levelResult.level,
        xp: levelResult.xp,
        xpToNextLevel: levelResult.xpToNextLevel
      };

      const xpThresholds = [
        { xp: 100, deity: 'indra' },
        { xp: 200, deity: 'soma' },
        { xp: 300, deity: 'varuna' },
        { xp: 400, deity: 'surya' },
        { xp: 500, deity: 'vayu' }
      ];

      xpThresholds.forEach(threshold => {
        if (newXP >= threshold.xp && !updatedProgress.collectedDeities.includes(threshold.deity)) {
          updatedProgress = {
            ...updatedProgress,
            collectedDeities: [...updatedProgress.collectedDeities, threshold.deity]
          };
          console.log(`New Deity Unlocked: ${threshold.deity}`);
        }
      });

      setTimeout(() => checkAchievements(updatedProgress), 500);
      return updatedProgress;
    });
  }, [checkLevelUp, checkAchievements]);

  const unlockBadge = useCallback((badgeId) => {
    setProgress((prev) => {
      if (prev.unlockedBadges.includes(badgeId)) {
        return prev;
      }
      console.log('Badge Unlocked!');
      const updatedProgress = {
        ...prev,
        unlockedBadges: [...prev.unlockedBadges, badgeId]
      };
      setTimeout(() => checkAchievements(updatedProgress), 500);
      return updatedProgress;
    });
  }, [checkAchievements]);

  const collectDeity = useCallback((deityId) => {
    setProgress((prev) => {
      if (prev.collectedDeities.includes(deityId)) {
        return prev;
      }
      console.log('Deity Collected!');
      const updatedProgress = {
        ...prev,
        collectedDeities: [...prev.collectedDeities, deityId]
      };
      setTimeout(() => checkAchievements(updatedProgress), 500);
      return updatedProgress;
    });
  }, [checkAchievements]);

  const completePath = useCallback((pathId) => {
    setProgress((prev) => {
      if (prev.completedPaths.includes(pathId)) {
        return prev;
      }
      const updatedProgress = {
        ...prev,
        completedPaths: [...prev.completedPaths, pathId]
      };
      setTimeout(() => checkAchievements(updatedProgress), 500);
      return updatedProgress;
    });
  }, [checkAchievements]);

  const setCurrentChapter = useCallback((chapterId) => {
    setProgress((prev) => ({
      ...prev,
      currentChapter: chapterId,
      storyPath: [...prev.storyPath, chapterId]
    }));
  }, []);

  const unlockDeity = useCallback((deityId) => {
    setProgress((prev) => {
      if (prev.collectedDeities.includes(deityId)) {
        return prev;
      }
      console.log(`Deity Unlocked: ${deityId}`);
      return {
        ...prev,
        collectedDeities: [...prev.collectedDeities, deityId]
      };
    });
  }, []);

  const unlockAchievement = useCallback((achievementId) => {
    setProgress((prev) => {
      if (prev.achievements?.includes(achievementId)) {
        return prev;
      }
      console.log(`Achievement Unlocked: ${achievementId}`);
      return {
        ...prev,
        achievements: [...(prev.achievements || []), achievementId]
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(initialProgress);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    progress,
    addXP,
    unlockBadge,
    collectDeity,
    completePath,
    setCurrentChapter,
    unlockDeity,
    unlockAchievement,
    resetProgress
  };
};
