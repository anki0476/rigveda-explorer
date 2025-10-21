import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deityCards, getAllDeities, getDeityByRarity } from '../../data/deityCards';
import { useGameProgress } from '../../hooks/useGameProgress';
import DeityCard from './DeityCard';

const DeityCollector = () => {
  const navigate = useNavigate();
  const { progress } = useGameProgress();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rarity');

  const allDeities = getAllDeities();
  
  // Calculate collection stats
  const totalDeities = allDeities.length;
  const collectedCount = progress.collectedDeities.length;
  const collectionPercentage = Math.round((collectedCount / totalDeities) * 100);

  // Filter deities
  const getFilteredDeities = () => {
    let filtered = allDeities;

    if (filter === 'collected') {
      filtered = filtered.filter(d => progress.collectedDeities.includes(d.id));
    } else if (filter === 'locked') {
      filtered = filtered.filter(d => !progress.collectedDeities.includes(d.id));
    } else if (filter !== 'all') {
      filtered = getDeityByRarity(filter);
    }

    // Sort
    if (sortBy === 'rarity') {
      const rarityOrder = { mythic: 0, legendary: 1, epic: 2, rare: 3, common: 4 };
      filtered.sort((a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]);
    } else if (sortBy === 'power') {
      filtered.sort((a, b) => b.power - a.power);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  };

  const filteredDeities = getFilteredDeities();

  return (
    <div className="min-h-screen bg-[--color-parchment]">
      {/* MAIN CONTAINER WITH PROPER FLOW */}
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* Header */}
        <div>
          <button
            onClick={() => navigate('/games')}
            className="mb-4 px-4 py-2 bg-[--color-parchment-dark] border-2 border-[--color-gold] rounded-lg font-[family:--font-family-header] text-[--color-ink] hover:bg-[--color-gold] hover:text-white transition-colors"
          >
            ← Back to Games
          </button>

          <div className="ornate-golden-border bg-[--color-parchment-light] rounded-2xl p-6 text-center">
            <h1 className="text-4xl md:text-5xl font-[family:--font-family-header] font-bold text-[--color-ink] mb-2">
              🎴 Deity Collection
            </h1>
            <p className="text-lg font-[family:--font-family-body] text-[--color-ink-light] mb-4">
              Collect all {totalDeities} Vedic deities
            </p>

            {/* Progress Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-[family:--font-family-header] text-[--color-ink]">
                  {collectedCount} / {totalDeities} Collected
                </span>
                <span className="text-sm font-[family:--font-family-header] font-bold text-[--color-gold]">
                  {collectionPercentage}%
                </span>
              </div>
              <div className="w-full bg-[--color-parchment-dark] rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[--color-gold] to-[--color-saffron] h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                  style={{ width: `${collectionPercentage}%` }}
                >
                  {collectionPercentage > 10 && (
                    <span className="text-xs text-white font-bold">🔥</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Sort */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-[family:--font-family-header] text-sm transition-colors ${
                filter === 'all'
                  ? 'bg-[--color-gold] text-white'
                  : 'bg-[--color-parchment-dark] text-[--color-ink] hover:bg-[--color-gold] hover:text-white'
              }`}
            >
              All ({totalDeities})
            </button>
            <button
              onClick={() => setFilter('collected')}
              className={`px-4 py-2 rounded-lg font-[family:--font-family-header] text-sm transition-colors ${
                filter === 'collected'
                  ? 'bg-[--color-gold] text-white'
                  : 'bg-[--color-parchment-dark] text-[--color-ink] hover:bg-[--color-gold] hover:text-white'
              }`}
            >
              Collected ({collectedCount})
            </button>
            <button
              onClick={() => setFilter('locked')}
              className={`px-4 py-2 rounded-lg font-[family:--font-family-header] text-sm transition-colors ${
                filter === 'locked'
                  ? 'bg-[--color-gold] text-white'
                  : 'bg-[--color-parchment-dark] text-[--color-ink] hover:bg-[--color-gold] hover:text-white'
              }`}
            >
              Locked ({totalDeities - collectedCount})
            </button>
          </div>

          {/* Rarity Filters */}
          <div className="flex flex-wrap gap-2">
            {['mythic', 'legendary', 'epic', 'rare'].map(rarity => (
              <button
                key={rarity}
                onClick={() => setFilter(rarity)}
                className={`px-3 py-1 rounded-lg font-[family:--font-family-header] text-xs uppercase transition-colors ${
                  filter === rarity
                    ? 'bg-[--color-gold] text-white'
                    : 'bg-[--color-parchment-dark] text-[--color-ink] hover:bg-[--color-gold] hover:text-white'
                }`}
              >
                {rarity}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg font-[family:--font-family-header] text-sm bg-[--color-parchment-dark] text-[--color-ink] border-2 border-[--color-gold] cursor-pointer"
          >
            <option value="rarity">Sort by Rarity</option>
            <option value="power">Sort by Power</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        {/* CARD SECTION - USING FLEX WRAP WITH PROPER STACKING */}
        {filteredDeities.length > 0 && (
          <div className="flex flex-wrap gap-6 justify-start">
            {filteredDeities.map((deity) => (
              <div 
                key={deity.id} 
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] relative"
                style={{ minHeight: '450px' }}
              >
                <DeityCard
                  deity={deity}
                  isUnlocked={progress.collectedDeities.includes(deity.id)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredDeities.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl font-[family:--font-family-header] text-[--color-ink-light]">
              No deities found with this filter
            </p>
          </div>
        )}

        {/* SPACER - FORCES SEPARATION */}
        <div style={{ height: '100px' }}></div>

        {/* Collection Milestones - COMPLETELY SEPARATE */}
        <div className="ornate-golden-border bg-[--color-parchment-light] rounded-2xl p-6">
          <h2 className="text-2xl font-[family:--font-family-header] font-bold text-[--color-ink] mb-4 text-center">
            🏆 Collection Milestones
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`text-center p-4 rounded-lg transition-all ${collectedCount >= 3 ? 'bg-[--color-gold]/20 border-2 border-[--color-gold]' : 'bg-[--color-parchment-dark] opacity-50'}`}>
              <div className="text-3xl mb-2">🥉</div>
              <div className="text-sm font-[family:--font-family-header] text-[--color-ink]">3 Deities</div>
              {collectedCount >= 3 && (
                <div className="text-xs text-[--color-gold] mt-1 font-bold">✓ UNLOCKED</div>
              )}
            </div>
            <div className={`text-center p-4 rounded-lg transition-all ${collectedCount >= 5 ? 'bg-[--color-gold]/20 border-2 border-[--color-gold]' : 'bg-[--color-parchment-dark] opacity-50'}`}>
              <div className="text-3xl mb-2">🥈</div>
              <div className="text-sm font-[family:--font-family-header] text-[--color-ink]">5 Deities</div>
              {collectedCount >= 5 && (
                <div className="text-xs text-[--color-gold] mt-1 font-bold">✓ UNLOCKED</div>
              )}
            </div>
            <div className={`text-center p-4 rounded-lg transition-all ${collectedCount >= totalDeities / 2 ? 'bg-[--color-gold]/20 border-2 border-[--color-gold]' : 'bg-[--color-parchment-dark] opacity-50'}`}>
              <div className="text-3xl mb-2">🥇</div>
              <div className="text-sm font-[family:--font-family-header] text-[--color-ink]">50% Complete</div>
              {collectedCount >= totalDeities / 2 && (
                <div className="text-xs text-[--color-gold] mt-1 font-bold">✓ UNLOCKED</div>
              )}
            </div>
            <div className={`text-center p-4 rounded-lg transition-all ${collectedCount === totalDeities ? 'bg-[--color-gold]/20 border-2 border-[--color-gold]' : 'bg-[--color-parchment-dark] opacity-50'}`}>
              <div className="text-3xl mb-2">👑</div>
              <div className="text-sm font-[family:--font-family-header] text-[--color-ink]">Master Collector</div>
              {collectedCount === totalDeities && (
                <div className="text-xs text-[--color-gold] mt-1 font-bold">✓ COMPLETE!</div>
              )}
            </div>
          </div>

          {/* Progress Message */}
          <div className="mt-6 text-center">
            {collectedCount === 0 && (
              <p className="text-sm font-[family:--font-family-body] text-[--color-ink-light] italic">
                Start your journey in Story Mode to unlock deities!
              </p>
            )}
            {collectedCount > 0 && collectedCount < totalDeities && (
              <p className="text-sm font-[family:--font-family-body] text-[--color-gold] font-semibold">
                Keep exploring! {totalDeities - collectedCount} more deities await...
              </p>
            )}
            {collectedCount === totalDeities && (
              <p className="text-lg font-[family:--font-family-header] text-[--color-gold] font-bold">
                🎉 Congratulations! You are a true Master Collector! 🎉
              </p>
            )}
          </div>
        </div>

        {/* BOTTOM PADDING */}
        <div style={{ height: '50px' }}></div>
      </div>
    </div>
  );
};

export default DeityCollector;