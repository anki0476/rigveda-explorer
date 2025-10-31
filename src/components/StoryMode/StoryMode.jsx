import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storyChapters } from '../../data/storyData';
import { useGameProgress } from '../../hooks/useGameProgress';
import { deityCards } from '../../data/deityCards';

const StoryMode = () => {
  const navigate = useNavigate();
  const { progress, addXP, unlockDeity, unlockAchievement, setCurrentChapter } = useGameProgress();
  const [currentStory, setCurrentStory] = useState(storyChapters[progress.currentChapter]);
  const [showReward, setShowReward] = useState(false);
  const [lastReward, setLastReward] = useState(null);
  const [newUnlockedDeity, setNewUnlockedDeity] = useState(null);

  useEffect(() => {
    setCurrentStory(storyChapters[progress.currentChapter]);
  }, [progress.currentChapter]);

  const handleChoice = (choice) => {
    if (choice.reward) {
      // === UPDATED: Smart deity unlock logic based on storyRequired flag ===
      let deityCanUnlock = false;
      let xpShortfall = 0;
      let unlockedDeity = null;

      if (choice.reward.deity) {
        const deity = deityCards[choice.reward.deity];
        
        if (deity) {
          const alreadyCollected = progress.collectedDeities.includes(choice.reward.deity);

          if (!alreadyCollected) {
            // === CASE 1: Story-Required Deity ===
            if (deity.storyRequired) {
              // Both conditions must be met: story path + XP threshold
              const meetsXPRequirement = progress.xp >= deity.xpRequired;
              
              if (meetsXPRequirement) {
                deityCanUnlock = true;
                unlockedDeity = deity;
                console.log(`✅ Story + XP met! ${deity.name} will unlock`);
              } else {
                xpShortfall = deity.xpRequired - progress.xp;
                console.log(`⚠️ Story path unlocked but need ${xpShortfall} more XP for ${deity.name}`);
              }
            } 
            // === CASE 2: XP-Only Deity ===
            else {
              // This shouldn't happen often (auto-unlocked), but handle it
              console.log(`ℹ️ ${deity.name} is XP-only. It will auto-unlock when XP threshold is reached.`);
            }
          }
        }
      }

      setLastReward({
        ...choice.reward,
        deityCanUnlock,
        xpShortfall,
        deityInfo: choice.reward.deity ? deityCards[choice.reward.deity] : null
      });

      if (deityCanUnlock) {
        setNewUnlockedDeity(unlockedDeity);
      }

      setShowReward(true);

      // Add XP
      if (choice.reward.xp) {
        addXP(choice.reward.xp);
      }

      // === FIX: Unlock deity ONLY if both conditions met (for story-required) ===
      if (deityCanUnlock) {
        unlockDeity(choice.reward.deity);
        console.log(`🎉 Deity Unlocked: ${choice.reward.deity}`);
      }

      // Unlock achievement
      if (choice.reward.achievement) {
        unlockAchievement(choice.reward.achievement);
      }

      // Wait for animation, then proceed
      setTimeout(() => {
        setShowReward(false);
        setNewUnlockedDeity(null);
        setCurrentChapter(choice.nextChapter);
      }, 3000);
    } else {
      setCurrentChapter(choice.nextChapter);
    }
  };

  const handleRestart = () => {
    setCurrentChapter('start');
  };

  // Check if story not found OR if choices array is empty (story ended)
  if (!currentStory || !currentStory.choices || currentStory.choices.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
        <div className="text-center bg-white p-12 rounded-2xl shadow-2xl max-w-2xl ornate-golden-border">
          <h1 className="text-5xl font-bold text-amber-900 mb-6">🎉 Journey Complete! 🎉</h1>
          <p className="text-xl text-gray-700 mb-8 font-[family:--font-family-body]">
            You've completed this path of the RigVeda Odyssey story! Your choices have shaped your understanding of ancient wisdom.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={handleRestart}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg font-[family:--font-family-header]"
            >
              🔄 Take a different path?
            </button>
            
            <button
              onClick={() => navigate('/games')}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 font-[family:--font-family-header]"
            >
              ← Back to Games Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Get the icon component
  const IconComponent = currentStory.icon;

  return (
    <div className="min-h-screen bg-[--color-parchment] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Progress */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate('/games')}
            className="px-4 py-2 bg-[--color-parchment-dark] border-2 border-[--color-gold] rounded-lg font-[family:--font-family-header] text-[--color-ink] hover:bg-[--color-gold] hover:text-white transition-colors"
          >
            ← Back to Games
          </button>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-[family:--font-family-header] text-[--color-ink-light]">
                Chapter {currentStory.chapter}
              </div>
              <div className="text-lg font-[family:--font-family-header] font-bold text-[--color-gold]">
                Level {progress.level} • {progress.xp} XP
              </div>
            </div>
          </div>
        </div>

        {/* Story Card */}
        <div className="ornate-golden-border bg-[--color-parchment-light] rounded-2xl p-8 mb-8 shadow-2xl">
          {/* Icon */}
          <div className="text-center mb-6 animate-float flex justify-center text-[--color-gold]">
            {IconComponent ? <IconComponent size={96} strokeWidth={1.5} /> : currentStory.image}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-[family:--font-family-header] font-bold text-[--color-ink] text-center mb-4">
            {currentStory.title}
          </h1>

          <div className="ornate-divider mb-6"></div>

          {/* Description */}
          <p className="text-lg font-[family:--font-family-body] text-[--color-ink-light] leading-relaxed mb-8 text-center max-w-2xl mx-auto">
            {currentStory.description}
          </p>

          {/* Unlocks Display */}
          {currentStory.unlocks && currentStory.unlocks.length > 0 && (
            <div className="mb-6 p-4 bg-gradient-to-r from-[--color-gold]/10 to-[--color-saffron]/10 rounded-lg border-2 border-[--color-gold]/30">
              <div className="text-center text-sm font-[family:--font-family-header] text-[--color-gold] font-semibold">
                🎁 New deity card available!
              </div>
            </div>
          )}

          {/* Choices */}
          <div className="space-y-4">
            <h3 className="text-xl font-[family:--font-family-header] font-bold text-[--color-ink] text-center mb-4">
              What will you do?
            </h3>
            
            {currentStory.choices.map((choice, index) => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice)}
                className="w-full double-golden-border card-glare-container bg-gradient-to-r from-[--color-parchment-light] to-[--color-parchment] p-6 rounded-xl hover:scale-[1.02] transition-all group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{String.fromCharCode(65 + index)}</div>
                  <div className="flex-1 text-left">
                    <div className="text-lg font-[family:--font-family-header] font-bold text-[--color-ink] mb-1 group-hover:text-[--color-gold] transition-colors">
                      {choice.text}
                    </div>
                    <div className="text-sm font-[family:--font-family-body] text-[--color-ink-light] italic">
                      {choice.label}
                    </div>
                    
                    {/* Reward type icons */}
                    {choice.reward && (
                      <div className="mt-2 flex gap-2 text-xs">
                        {choice.reward.deity && (
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded font-bold">
                            🎴 Card Reward
                          </span>
                        )}
                        {choice.reward.achievement && (
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded font-bold">
                            🏆 Achievement
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Progress Path */}
        <div className="text-center text-sm font-[family:--font-family-body] text-[--color-ink-light]">
          Story Path: {progress.storyPath.length} chapters completed
        </div>
      </div>

      {/* === ENHANCED Reward Popup with Smart Deity Logic === */}
      {showReward && lastReward && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in-smooth p-4">
          <div className="ornate-golden-border bg-[--color-parchment-light] p-8 rounded-2xl shadow-2xl max-w-md animate-scale-in">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h3 className="text-2xl font-[family:--font-family-header] font-bold text-[--color-gold] mb-6">
                Reward Earned!
              </h3>
              
              <div className="space-y-4">
                {/* XP Reward */}
                {lastReward.xp && (
                  <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-[--color-gold]">
                    <div className="text-3xl font-bold text-[--color-gold]">+{lastReward.xp}</div>
                    <div className="text-sm font-[family:--font-family-body] text-[--color-ink]">
                      Experience Points
                    </div>
                  </div>
                )}
                
                {/* === CASE 1: Deity Unlock SUCCESS (both conditions met) ===*/}
                {lastReward.deity && newUnlockedDeity && (
                  <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-400 animate-pulse">
                    <div className="text-3xl mb-2">{newUnlockedDeity.icon}</div>
                    <div className="text-lg font-[family:--font-family-header] font-bold text-blue-400">
                      ✅ Deity Unlocked!
                    </div>
                    <div className="text-sm font-[family:--font-family-body] text-[--color-ink] mt-1">
                      {newUnlockedDeity.name}
                    </div>
                    <div className="text-xs font-[family:--font-family-body] text-[--color-ink-light] mt-1">
                      {newUnlockedDeity.title} • {newUnlockedDeity.rarity}
                    </div>
                    {newUnlockedDeity.storyRequired && (
                      <div className="text-xs font-[family:--font-family-body] text-blue-300 mt-2 italic">
                        📖 Story path unlocked!
                      </div>
                    )}
                  </div>
                )}

                {/* === CASE 2: Story Unlocked But XP Shortfall === */}
                {lastReward.deity && !newUnlockedDeity && lastReward.xpShortfall > 0 && lastReward.deityInfo && (
                  <div className="p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg border-2 border-orange-400">
                    <div className="text-3xl mb-2">🔒</div>
                    <div className="text-lg font-[family:--font-family-header] font-bold text-orange-500">
                      Almost There!
                    </div>
                    <div className="text-sm font-[family:--font-family-body] text-[--color-ink] mt-2">
                      You unlocked the story path for <span className="font-bold">{lastReward.deityInfo.name}</span>, but need more XP!
                    </div>
                    <div className="mt-3 p-3 bg-orange-500/20 rounded">
                      <div className="text-xs font-[family:--font-family-body] text-[--color-ink-light]">
                        📚 Story Available Now!
                      </div>
                      <div className="text-xs font-[family:--font-family-body] text-[--color-ink-light] mt-1">
                        🔑 Need <span className="font-bold text-orange-500">{lastReward.xpShortfall}</span> more XP to unlock
                      </div>
                      <div className="text-xs font-[family:--font-family-body] text-[--color-ink-light] mt-1">
                        Current: {progress.xp} / {lastReward.deityInfo.xpRequired}
                      </div>
                    </div>
                  </div>
                )}

                {/* === CASE 3: XP-Only Deity (informational) === */}
                {lastReward.deity && !newUnlockedDeity && !lastReward.xpShortfall && lastReward.deityInfo && (
                  <div className="p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border-2 border-green-400">
                    <div className="text-3xl mb-2">💡</div>
                    <div className="text-lg font-[family:--font-family-header] font-bold text-green-400">
                      XP-Only Unlock
                    </div>
                    <div className="text-sm font-[family:--font-family-body] text-[--color-ink] mt-2">
                      <span className="font-bold">{lastReward.deityInfo.name}</span> will auto-unlock based on XP progression!
                    </div>
                  </div>
                )}
                
                {/* Achievement Unlock */}
                {lastReward.achievement && (
                  <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-lg border border-yellow-400">
                    <div className="text-3xl mb-2">🏆</div>
                    <div className="text-lg font-[family:--font-family-header] font-bold text-yellow-500">
                      Achievement Unlocked!
                    </div>
                  </div>
                )}
              </div>

              {/* Progress Summary */}
              <div className="mt-6 pt-4 border-t border-[--color-gold]/30">
                <div className="text-xs font-[family:--font-family-body] text-[--color-ink-light]">
                  Total XP: <span className="text-[--color-gold] font-bold">{progress.xp}</span>
                </div>
                <div className="text-xs font-[family:--font-family-body] text-[--color-ink-light]">
                  Level: <span className="text-[--color-gold] font-bold">{progress.level}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryMode;
