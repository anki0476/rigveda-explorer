import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { achievements, getAllAchievements, titles } from '../../data/achievementData';
import { useGameProgress } from '../../hooks/useGameProgress';

const AchievementPanel = () => {
  const navigate = useNavigate();
  const { progress, setActiveTitle } = useGameProgress();

  const allAchievements = getAllAchievements();
  const unlockedCount = progress.unlockedAchievements.length;
  const totalAchievements = allAchievements.length;
  const completionPercentage = Math.round((unlockedCount / totalAchievements) * 100);

  // Group achievements by tier
  const achievementsByTier = {
    platinum: allAchievements.filter(a => a.tier === 'platinum'),
    gold: allAchievements.filter(a => a.tier === 'gold'),
    silver: allAchievements.filter(a => a.tier === 'silver'),
    bronze: allAchievements.filter(a => a.tier === 'bronze'),
  };

  const tierColors = {
    platinum: '#E5E4E2',
    gold: '#FFD700',
    silver: '#C0C0C0',
    bronze: '#CD7F32'
  };

  return (
    <div className="min-h-screen bg-[--color-parchment] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/games')}
            className="mb-4 px-4 py-2 bg-[--color-parchment-dark] border-2 border-[--color-gold] rounded-lg font-[family:--font-family-header] text-[--color-ink] hover:bg-[--color-gold] hover:text-white transition-colors"
          >
            ← Back to Games
          </button>

          <div className="ornate-golden-border bg-[--color-parchment-light] rounded-2xl p-6">
            <h1 className="text-4xl md:text-5xl font-[family:--font-family-header] font-bold text-[--color-ink] text-center mb-2">
              🏆 Achievements & Titles
            </h1>
            <p className="text-lg font-[family:--font-family-body] text-[--color-ink-light] text-center mb-4">
              Unlock achievements to earn prestigious titles
            </p>

            {/* Progress */}
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-[family:--font-family-header] text-[--color-ink]">
                  {unlockedCount} / {totalAchievements} Unlocked
                </span>
                <span className="text-sm font-[family:--font-family-header] font-bold text-[--color-gold]">
                  {completionPercentage}%
                </span>
              </div>
              <div className="w-full bg-[--color-parchment-dark] rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[--color-gold] to-[--color-saffron] h-4 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Player Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="double-golden-border bg-[--color-parchment-light] rounded-xl p-6 text-center">
            <div className="text-4xl font-[family:--font-family-header] font-bold text-[--color-gold] mb-2">
              Level {progress.level}
            </div>
            <div className="text-sm font-[family:--font-family-body] text-[--color-ink-light]">
              Current Level
            </div>
          </div>
          <div className="double-golden-border bg-[--color-parchment-light] rounded-xl p-6 text-center">
            <div className="text-4xl font-[family:--font-family-header] font-bold text-[--color-saffron] mb-2">
              {progress.xp}
            </div>
            <div className="text-sm font-[family:--font-family-body] text-[--color-ink-light]">
              Total XP
            </div>
          </div>
          <div className="double-golden-border bg-[--color-parchment-light] rounded-xl p-6 text-center">
            <div className="text-4xl font-[family:--font-family-header] font-bold text-[--color-gold] mb-2">
              {progress.titles.length}
            </div>
            <div className="text-sm font-[family:--font-family-body] text-[--color-ink-light]">
              Titles Earned
            </div>
          </div>
        </div>

        {/* Current Title Display */}
        <div className="mb-8 ornate-golden-border bg-gradient-to-r from-[--color-parchment-light] to-[--color-parchment] rounded-2xl p-6">
          <h2 className="text-2xl font-[family:--font-family-header] font-bold text-[--color-ink] mb-4 text-center">
            Your Current Title
          </h2>
          <div className="text-center">
            <div className="inline-block px-8 py-4 bg-[--color-gold] rounded-xl shadow-lg">
              <span className="text-3xl mr-3">{titles[progress.currentTitle]?.icon}</span>
              <span className="text-3xl font-[family:--font-family-header] font-bold text-white">
                {titles[progress.currentTitle]?.name}
              </span>
            </div>
          </div>
        </div>

        {/* Achievements by Tier */}
        {Object.entries(achievementsByTier).map(([tier, tierAchievements]) => (
          <div key={tier} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <h2 
                className="text-2xl font-[family:--font-family-header] font-bold uppercase"
                style={{ color: tierColors[tier] }}
              >
                {tier} Tier
              </h2>
              <div className="flex-1 h-1 rounded" style={{ backgroundColor: tierColors[tier] + '40' }}></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tierAchievements.map(achievement => {
                const isUnlocked = progress.unlockedAchievements.includes(achievement.id);
                const canUnlock = progress.xp >= achievement.xpRequired;
                const IconComponent = achievement.iconComponent;

                return (
                  <div
                    key={achievement.id}
                    className={`double-golden-border rounded-xl p-6 transition-all ${
                      isUnlocked
                        ? 'bg-gradient-to-r from-[--color-parchment-light] to-[--color-parchment] shadow-xl'
                        : canUnlock
                        ? 'bg-[--color-parchment] border-dashed opacity-75'
                        : 'bg-[--color-parchment-dark] opacity-50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon - UPDATED */}
                      <div className={`flex items-center justify-center ${!isUnlocked && 'grayscale opacity-50'}`}>
                        {isUnlocked ? (
                          IconComponent ? (
                            <IconComponent 
                              size={56} 
                              strokeWidth={1.5} 
                              style={{ color: tierColors[tier] }}
                            />
                          ) : (
                            <span className="text-5xl">{achievement.icon}</span>
                          )
                        ) : (
                          <Lock size={56} strokeWidth={1.5} className="text-gray-400" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-[family:--font-family-header] font-bold text-[--color-ink] mb-1">
                          {achievement.name}
                        </h3>
                        <p className="text-sm font-[family:--font-family-body] text-[--color-ink-light] mb-2">
                          {achievement.description}
                        </p>

                        {/* Requirements */}
                        <div className="flex items-center gap-4 text-xs">
                          <span className="font-[family:--font-family-header] text-[--color-gold]">
                            {achievement.xpRequired} XP Required
                          </span>
                          {isUnlocked && (
                            <span className="px-2 py-1 bg-[--color-gold] text-white rounded-full font-bold">
                              ✓ UNLOCKED
                            </span>
                          )}
                          {!isUnlocked && canUnlock && (
                            <span className="px-2 py-1 bg-[--color-saffron] text-white rounded-full font-bold animate-pulse">
                              READY!
                            </span>
                          )}
                        </div>

                        {/* Reward */}
                        {isUnlocked && achievement.reward && (
                          <div className="mt-3 pt-3 border-t border-[--color-gold]/30">
                            <span className="text-xs font-[family:--font-family-body] text-[--color-ink-light]">
                              Reward: {achievement.reward.title && `Title: "${achievement.reward.title}"`} • +{achievement.reward.xp} XP
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementPanel;
