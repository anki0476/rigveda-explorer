import { useState, useEffect, useCallback } from 'react';
import { deityCards, getXPRequiredForDeity, isDeityLocked } from '../data/deityCards'; // ✅ FIXED

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
  collectedDeities: ['agni', 'ushas', 'pushan'], // ⭐ Starters (0 XP)
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
    return {
      level: currentLevel,
      xp: currentXP,
      xpToNextLevel: currentLevel * 100,
      leveled: false
    };
  }, []);

  // === NEW: Check Deity Unlocks by XP Threshold ===
  const checkDeityUnlocks = useCallback((totalXP, currentDeities) => {
    const unlockedDeities = [...currentDeities];
    let newUnlocks = [];

    Object.values(deityCards).forEach((deity) => {
      // Skip starters (0 XP requirement)
      if (deity.xpRequired === 0) return;

      // Check if this deity should be unlocked
      if (
        totalXP >= deity.xpRequired &&
        !unlockedDeities.includes(deity.id)
      ) {
        unlockedDeities.push(deity.id);
        newUnlocks.push(deity.id);
        console.log(
          `🎉 Deity Unlocked: ${deity.name} (${deity.rarity}) - ${deity.xpRequired} XP`
        );
      }
    });

    return { unlockedDeities, newUnlocks };
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
        id: 'deity_collector_3',
        condition: () => updatedProgress.collectedDeities.length >= 3,
        title: '🎴 Collector I',
        message: 'Collected 3 deities!'
      },
      {
        id: 'deity_collector_5',
        condition: () => updatedProgress.collectedDeities.length >= 5,
        title: '🎴 Collector II',
        message: 'Collected 5 deities!'
      },
      {
        id: 'deity_collector_10',
        condition: () => updatedProgress.collectedDeities.length >= 10,
        title: '🎴 Collector III',
        message: 'Collected 10 deities!'
      },
      {
        id: 'first_rare',
        condition: () =>
          updatedProgress.collectedDeities.some(
            (d) =>
              deityCards[d]?.rarity === 'rare' &&
              !['agni', 'ushas', 'pushan'].includes(d)
          ),
        title: '🟦 Rare Collector',
        message: 'Unlocked your first Rare deity!'
      },
      {
        id: 'first_epic',
        condition: () =>
          updatedProgress.collectedDeities.some(
            (d) => deityCards[d]?.rarity === 'epic'
          ),
        title: '🟪 Epic Collector',
        message: 'Unlocked your first Epic deity!'
      },
      {
        id: 'first_legendary',
        condition: () =>
          updatedProgress.collectedDeities.some(
            (d) => deityCards[d]?.rarity === 'legendary' && d !== 'agni'
          ),
        title: '🟨 Legendary Collector',
        message: 'Unlocked your first Legendary deity!'
      },
      {
        id: 'mythic_unlocked',
        condition: () =>
          updatedProgress.collectedDeities.includes('brahman'),
        title: '🔴 Ultimate Power',
        message: 'Unlocked Brahman - The Ultimate Reality!'
      },
      {
        id: 'all_deities',
        condition: () =>
          updatedProgress.collectedDeities.length === Object.keys(deityCards).length,
        title: '🏆 Master Collector',
        message: 'Collected ALL 26 deities!'
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
        id: 'level_20',
        condition: () => updatedProgress.level >= 20,
        title: '🌟 Legendary Scholar',
        message: 'Reached Level 20!'
      }
    ];

    achievements.forEach((achievement) => {
      const alreadyUnlocked = updatedProgress.achievements?.includes(
        achievement.id
      );
      if (!alreadyUnlocked && achievement.condition()) {
        console.log(`✨ Achievement unlocked: ${achievement.title}`);
        setProgress((prev) => ({
          ...prev,
          achievements: [...(prev.achievements || []), achievement.id]
        }));
      }
    });
  }, []);

  const addXP = useCallback(
    (amount) => {
      setProgress((prev) => {
        const newTotalXP = prev.xp + amount;
        const levelResult = checkLevelUp(newTotalXP, prev.level);

        // === NEW: Check for deity unlocks ===
        const { unlockedDeities, newUnlocks } = checkDeityUnlocks(
          newTotalXP,
          prev.collectedDeities
        );

        let updatedProgress = {
          ...prev,
          level: levelResult.level,
          xp: levelResult.xp,
          xpToNextLevel: levelResult.xpToNextLevel,
          collectedDeities: unlockedDeities
        };

        // Trigger notifications for new unlocks
        newUnlocks.forEach((deityId) => {
          const deity = deityCards[deityId];
          console.log(
            `🎊 New Deity: ${deity.name} (${deity.rarity.toUpperCase()})`
          );
        });

        setTimeout(() => checkAchievements(updatedProgress), 500);
        return updatedProgress;
      });
    },
    [checkLevelUp, checkDeityUnlocks, checkAchievements]
  );

  const unlockBadge = useCallback(
    (badgeId) => {
      setProgress((prev) => {
        if (prev.unlockedBadges.includes(badgeId)) {
          return prev;
        }
        console.log('🎖️ Badge Unlocked!');
        const updatedProgress = {
          ...prev,
          unlockedBadges: [...prev.unlockedBadges, badgeId]
        };
        setTimeout(() => checkAchievements(updatedProgress), 500);
        return updatedProgress;
      });
    },
    [checkAchievements]
  );

  const collectDeity = useCallback(
    (deityId) => {
      setProgress((prev) => {
        if (prev.collectedDeities.includes(deityId)) {
          return prev;
        }
        console.log('🎴 Deity Collected!');
        const updatedProgress = {
          ...prev,
          collectedDeities: [...prev.collectedDeities, deityId]
        };
        setTimeout(() => checkAchievements(updatedProgress), 500);
        return updatedProgress;
      });
    },
    [checkAchievements]
  );

  const completePath = useCallback(
    (pathId) => {
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
    },
    [checkAchievements]
  );

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
      console.log(`🎴 Deity Unlocked: ${deityId}`);
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
      console.log(`✨ Achievement Unlocked: ${achievementId}`);
      return {
        ...prev,
        achievements: [...(prev.achievements || []), achievementId]
      };
    });
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(initialProgress);
    localStorage.removeItem(STORAGE_KEY);
    console.log('🔄 Progress reset to initial state');
  }, []);

  // === NEW: Helper functions for UI ===
  const isDeityUnlocked = useCallback(
    (deityId) => {
      return !isDeityLocked(deityId, progress.xp);
    },
    [progress.xp]
  );

  const getXPToUnlockDeity = useCallback(
    (deityId) => {
      const required = getXPRequiredForDeity(deityId);
      const remaining = required - progress.xp;
      return Math.max(0, remaining);
    },
    [progress.xp]
  );

  const getUnlockProgressPercent = useCallback(
    (deityId) => {
      const required = getXPRequiredForDeity(deityId);
      if (required === 0) return 100; // Starter card
      return Math.min(100, (progress.xp / required) * 100);
    },
    [progress.xp]
  );

  const getNextDeityToUnlock = useCallback(() => {
    return Object.values(deityCards)
      .filter((d) => d.xpRequired > 0) // Exclude starters
      .filter((d) => isDeityLocked(d.id, progress.xp))
      .sort((a, b) => a.xpRequired - b.xpRequired)[0];
  }, [progress.xp]);

  const getUnlockedDeities = useCallback(() => {
    return progress.collectedDeities.map((id) => deityCards[id]).filter(Boolean);
  }, [progress.collectedDeities]);

  const getLockedDeities = useCallback(() => {
    return Object.values(deityCards).filter(
      (d) => !progress.collectedDeities.includes(d.id)
    );
  }, [progress.collectedDeities]);

  return {
    // State
    progress,

    // XP & Level Management
    addXP,

    // Deity Unlock System (NEW)
    isDeityUnlocked,
    getXPToUnlockDeity,
    getUnlockProgressPercent,
    getNextDeityToUnlock,
    getUnlockedDeities,
    getLockedDeities,

    // Legacy Functions
    unlockBadge,
    collectDeity,
    completePath,
    setCurrentChapter,
    unlockDeity,
    unlockAchievement,
    resetProgress
  };
};
