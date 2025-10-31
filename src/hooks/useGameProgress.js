import { useState, useEffect, useCallback } from 'react';
import { deityCards } from '../data/deityCards';

const STORAGE_KEY = 'rigveda_game_progress';

const initialProgress = {
  level: 1,
  xp: 0,
  xpToNextLevel: 500,  // ✅ CHANGED: First level requires 500 XP (not 100)
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

  // === FIXED: Exponential level progression (15% increase per level) ===
  const calculateLevelFromXP = useCallback((totalXP) => {
    let level = 1;
    let currentThreshold = 500;  // ✅ First level: 500 XP

    // Exponential: each level costs 15% more XP than previous
    while (totalXP >= currentThreshold) {
      level += 1;
      currentThreshold = Math.floor(currentThreshold * 1.15);
    }

    return {
      level,
      currentThreshold,  // XP needed for NEXT level
      totalXP
    };
  }, []);

  const checkLevelUp = useCallback((currentXP, currentLevel) => {
    const result = calculateLevelFromXP(currentXP);
    
    if (result.level > currentLevel) {
      console.log(`⬆️ Level Up! Reached Level ${result.level}`);
      return {
        level: result.level,
        xp: result.totalXP,
        xpToNextLevel: result.currentThreshold,
        leveled: true
      };
    }

    return {
      level: currentLevel,
      xp: result.totalXP,
      xpToNextLevel: result.currentThreshold,
      leveled: false
    };
  }, [calculateLevelFromXP]);

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
        message: 'Collected ALL deities!'
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

  // === NEW: Auto-unlock XP-only deities ===
  const autoUnlockXPDeities = useCallback((totalXP, currentDeities) => {
    let unlockedDeities = [...currentDeities];
    let newUnlocks = [];

    Object.entries(deityCards).forEach(([deityId, deity]) => {
      // Skip if already collected
      if (unlockedDeities.includes(deityId)) return;

      // Skip if story is required (only auto-unlock XP-only cards)
      if (deity.storyRequired) return;

      // Auto-unlock if XP threshold met
      if (totalXP >= deity.xpRequired) {
        unlockedDeities.push(deityId);
        newUnlocks.push(deityId);
        console.log(`🔓 Auto-unlocked by XP: ${deity.name} (${deity.xpRequired} XP)`);
      }
    });

    return { unlockedDeities, newUnlocks };
  }, []);

  const addXP = useCallback(
    (amount) => {
      setProgress((prev) => {
        const newTotalXP = prev.xp + amount;
        console.log(`➕ Adding ${amount} XP. Total: ${prev.xp} → ${newTotalXP}`);

        const levelResult = checkLevelUp(newTotalXP, prev.level);

        // === NEW: Check for auto-unlock of XP-only deities ===
        const { unlockedDeities, newUnlocks } = autoUnlockXPDeities(
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

        // Log auto-unlocks
        newUnlocks.forEach((deityId) => {
          const deity = deityCards[deityId];
          console.log(
            `✨ Deity auto-unlocked: ${deity?.name} (${deity?.rarity?.toUpperCase()})`
          );
        });

        setTimeout(() => checkAchievements(updatedProgress), 500);
        return updatedProgress;
      });
    },
    [checkLevelUp, autoUnlockXPDeities, checkAchievements]
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
      const deity = deityCards[deityId];
      console.log(`🎴 Deity Unlocked: ${deity?.name || deityId}`);
      
      const updatedProgress = {
        ...prev,
        collectedDeities: [...prev.collectedDeities, deityId]
      };
      
      setTimeout(() => checkAchievements(updatedProgress), 500);
      
      return updatedProgress;
    });
  }, [checkAchievements]);

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

  const canUnlockDeity = useCallback(
    (deityId) => {
      const deity = deityCards[deityId];
      if (!deity) return false;
      
      if (progress.collectedDeities.includes(deityId)) return true;
      
      if (!deity.storyRequired) {
        return progress.xp >= deity.xpRequired;
      }
      
      return false;
    },
    [progress.xp, progress.collectedDeities]
  );

  const getXPToUnlockDeity = useCallback(
    (deityId) => {
      const deity = deityCards[deityId];
      if (!deity) return 0;
      const required = deity.xpRequired;
      const remaining = required - progress.xp;
      return Math.max(0, remaining);
    },
    [progress.xp]
  );

  const getUnlockProgressPercent = useCallback(
    (deityId) => {
      const deity = deityCards[deityId];
      if (!deity) return 0;
      const required = deity.xpRequired;
      if (required === 0) return 100;
      return Math.min(100, (progress.xp / required) * 100);
    },
    [progress.xp]
  );

  const getNextDeityToUnlock = useCallback(() => {
    return Object.entries(deityCards)
      .filter(([id, d]) => d.xpRequired > 0)
      .filter(([id]) => !progress.collectedDeities.includes(id))
      .sort(([, a], [, b]) => a.xpRequired - b.xpRequired)[0]?.[1];
  }, [progress.collectedDeities]);

  const getUnlockedDeities = useCallback(() => {
    return progress.collectedDeities
      .map((id) => ({ id, ...deityCards[id] }))
      .filter((d) => d.id && d.name);
  }, [progress.collectedDeities]);

  const getLockedDeities = useCallback(() => {
    return Object.entries(deityCards)
      .filter(([id]) => !progress.collectedDeities.includes(id))
      .map(([id, deity]) => ({ id, ...deity }));
  }, [progress.collectedDeities]);

  return {
    progress,
    addXP,
    canUnlockDeity,
    getXPToUnlockDeity,
    getUnlockProgressPercent,
    getNextDeityToUnlock,
    getUnlockedDeities,
    getLockedDeities,
    unlockBadge,
    collectDeity,
    completePath,
    setCurrentChapter,
    unlockDeity,
    unlockAchievement,
    resetProgress
  };
};
