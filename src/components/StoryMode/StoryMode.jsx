import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storyChapters } from '../../data/storyData';
import { useGameProgress } from '../../hooks/useGameProgress';

const StoryMode = () => {
  const navigate = useNavigate();
  const { progress, addXP, unlockDeity, unlockAchievement, setCurrentChapter } = useGameProgress();
  const [currentStory, setCurrentStory] = useState(storyChapters[progress.currentChapter]);
  const [showReward, setShowReward] = useState(false);
  const [lastReward, setLastReward] = useState(null);

  useEffect(() => {
    setCurrentStory(storyChapters[progress.currentChapter]);
  }, [progress.currentChapter]);

  const handleChoice = (choice) => {
    // Show rewards
    if (choice.reward) {
      setLastReward(choice.reward);
      setShowReward(true);

      // Add XP
      if (choice.reward.xp) {
        addXP(choice.reward.xp);
      }

      // Unlock deity
      if (choice.reward.deity) {
        unlockDeity(choice.reward.deity);
      }

      // Unlock achievement
      if (choice.reward.achievement) {
        unlockAchievement(choice.reward.achievement);
      }

      // Wait for animation, then proceed
      setTimeout(() => {
        setShowReward(false);
        setCurrentChapter(choice.nextChapter);
      }, 2000);
    } else {
      setCurrentChapter(choice.nextChapter);
    }
  };

  const handleRestart = () => {
    setCurrentChapter('start');
  };

  // ✅ CHANGE: Check if story not found OR if choices array is empty (story ended)
  if (!currentStory || !currentStory.choices || currentStory.choices.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
        <div className="text-center bg-white p-12 rounded-2xl shadow-2xl max-w-2xl ornate-golden-border">
          <h1 className="text-5xl font-bold text-amber-900 mb-6">🎉 Journey Complete! 🎉</h1>
          <p className="text-xl text-gray-700 mb-8 font-[family:--font-family-body]">
            You've completed this path of the RigVeda Explorer story! Your choices have shaped your understanding of ancient wisdom.
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

      {/* Reward Popup */}
      {showReward && lastReward && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in-smooth">
          <div className="ornate-golden-border bg-[--color-parchment-light] p-8 rounded-2xl shadow-2xl max-w-md animate-scale-in">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-[family:--font-family-header] font-bold text-[--color-gold] mb-4">
                Reward Earned!
              </h3>
              
              {lastReward.xp && (
                <div className="mb-3">
                  <span className="text-lg font-[family:--font-family-body] text-[--color-ink]">
                    +{lastReward.xp} XP
                  </span>
                </div>
              )}
              
              {lastReward.deity && (
                <div className="mb-3">
                  <span className="text-lg font-[family:--font-family-body] text-[--color-ink]">
                    🎴 New Deity Card Unlocked!
                  </span>
                </div>
              )}
              
              {lastReward.achievement && (
                <div className="mb-3">
                  <span className="text-lg font-[family:--font-family-body] text-[--color-ink]">
                    🏆 Achievement Unlocked!
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryMode;
