import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { deityCards, getAllDeities, getDeityByRarity } from '../../data/deityCards';
import { useGameProgress } from '../../hooks/useGameProgress';
import DeityCard from './DeityCard';

const DeityCollector = () => {
  const navigate = useNavigate();
  const { progress, getNextDeityToUnlock, getXPToUnlockDeity, getUnlockProgressPercent } = useGameProgress();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rarity');

  const allDeities = getAllDeities();
  
  // === NEW: Calculate advanced stats ===
  const stats = useMemo(() => {
    const totalDeities = allDeities.length;
    const collectedCount = progress.collectedDeities.length;
    const lockedCount = totalDeities - collectedCount;
    const collectionPercentage = Math.round((collectedCount / totalDeities) * 100);
    
    // Rarity breakdown
    const rareCount = allDeities.filter(d => d.rarity === 'rare' && progress.collectedDeities.includes(d.id)).length;
    const epicCount = allDeities.filter(d => d.rarity === 'epic' && progress.collectedDeities.includes(d.id)).length;
    const legendaryCount = allDeities.filter(d => d.rarity === 'legendary' && progress.collectedDeities.includes(d.id)).length;
    const mythicCount = allDeities.filter(d => d.rarity === 'mythic' && progress.collectedDeities.includes(d.id)).length;

    // Total XP needed for all remaining deities
    const remainingXP = allDeities
      .filter(d => !progress.collectedDeities.includes(d.id))
      .reduce((sum, d) => sum + d.xpRequired, 0);

    // Next deity to unlock
    const nextDeity = getNextDeityToUnlock();

    return {
      totalDeities,
      collectedCount,
      lockedCount,
      collectionPercentage,
      rareCount,
      epicCount,
      legendaryCount,
      mythicCount,
      remainingXP,
      nextDeity
    };
  }, [progress.collectedDeities, allDeities, getNextDeityToUnlock]);

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
              Collect all {stats.totalDeities} Vedic deities
            </p>

            {/* Collection Progress Bar */}
            <div className="max-w-2xl mx-auto mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-[family:--font-family-header] text-[--color-ink]">
                  {stats.collectedCount} / {stats.totalDeities} Collected
                </span>
                <span className="text-sm font-[family:--font-family-header] font-bold text-[--color-gold]">
                  {stats.collectionPercentage}%
                </span>
              </div>
              <div className="w-full bg-[--color-parchment-dark] rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[--color-gold] to-[--color-saffron] h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                  style={{ width: `${stats.collectionPercentage}%` }}
                >
                  {stats.collectionPercentage > 10 && (
                    <span className="text-xs text-white font-bold">🔥</span>
                  )}
                </div>
              </div>
            </div>

            {/* === NEW: Rarity Breakdown ===*/}
            <div className="grid grid-cols-4 gap-2 max-w-2xl mx-auto">
              <div className="text-center p-2 bg-[--color-parchment-dark] rounded">
                <div className="text-xs font-[family:--font-family-header] text-[--color-ink-light] mb-1">🟦 Rare</div>
                <div className="text-lg font-bold text-blue-400">{stats.rareCount}</div>
              </div>
              <div className="text-center p-2 bg-[--color-parchment-dark] rounded">
                <div className="text-xs font-[family:--font-family-header] text-[--color-ink-light] mb-1">🟪 Epic</div>
                <div className="text-lg font-bold text-purple-400">{stats.epicCount}</div>
              </div>
              <div className="text-center p-2 bg-[--color-parchment-dark] rounded">
                <div className="text-xs font-[family:--font-family-header] text-[--color-ink-light] mb-1">🟨 Legendary</div>
                <div className="text-lg font-bold text-yellow-500">{stats.legendaryCount}</div>
              </div>
              <div className="text-center p-2 bg-[--color-parchment-dark] rounded">
                <div className="text-xs font-[family:--font-family-header] text-[--color-ink-light] mb-1">🔴 Mythic</div>
                <div className="text-lg font-bold text-red-500">{stats.mythicCount}</div>
              </div>
            </div>
          </div>
        </div>

        {/* === NEW: XP Progress Panel ===*/}
        {stats.nextDeity && (
          <div className="ornate-golden-border bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{stats.nextDeity.icon}</div>
                <div>
                  <h3 className="font-[family:--font-family-header] font-bold text-[--color-ink]">
                    Next Unlock: {stats.nextDeity.name}
                  </h3>
                  <p className="text-xs font-[family:--font-family-body] text-[--color-ink-light]">
                    {stats.nextDeity.title} • {stats.nextDeity.rarity}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[--color-gold]">{getXPToUnlockDeity(stats.nextDeity.id)}</div>
                <div className="text-xs font-[family:--font-family-body] text-[--color-ink-light]">XP to unlock</div>
              </div>
            </div>

            {/* Progress Bar for next unlock */}
            <div className="w-full bg-[--color-parchment-dark] rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${getUnlockProgressPercent(stats.nextDeity.id)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs font-[family:--font-family-body] text-[--color-ink-light] mt-2">
              <span>{progress.xp} / {stats.nextDeity.xpRequired} XP</span>
              <span>{Math.round(getUnlockProgressPercent(stats.nextDeity.id))}%</span>
            </div>
          </div>
        )}

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
              All ({stats.totalDeities})
            </button>
            <button
              onClick={() => setFilter('collected')}
              className={`px-4 py-2 rounded-lg font-[family:--font-family-header] text-sm transition-colors ${
                filter === 'collected'
                  ? 'bg-[--color-gold] text-white'
                  : 'bg-[--color-parchment-dark] text-[--color-ink] hover:bg-[--color-gold] hover:text-white'
              }`}
            >
              Collected ({stats.collectedCount})
            </button>
            <button
              onClick={() => setFilter('locked')}
              className={`px-4 py-2 rounded-lg font-[family:--font-family-header] text-sm transition-colors ${
                filter === 'locked'
                  ? 'bg-[--color-gold] text-white'
                  : 'bg-[--color-parchment-dark] text-[--color-ink] hover:bg-[--color-gold] hover:text-white'
              }`}
            >
              Locked ({stats.lockedCount})
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

        {/* CARD SECTION */}
        {filteredDeities.length > 0 && (
          <div className="flex flex-wrap gap-6 justify-start">
            {filteredDeities.map((deity) => (
              <div 
                key={deity.id} 
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] relative"
                style={{ minHeight: '450px' }}
              >
                <DeityCard deity={deity} />
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

        <div style={{ height: '100px' }}></div>

        {/* Collection Milestones */}
        <div className="ornate-golden-border bg-[--color-parchment-light] rounded-2xl p-6">
          <h2 className="text-2xl font-[family:--font-family-header] font-bold text-[--color-ink] mb-4 text-center">
            🏆 Collection Milestones
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`text-center p-4 rounded-lg transition-all ${stats.collectedCount >= 3 ? 'bg-[--color-gold]/20 border-2 border-[--color-gold]' : 'bg-[--color-parchment-dark] opacity-50'}`}>
              <div className="text-3xl mb-2">🥉</div>
              <div className="text-sm font-[family:--font-family-header] text-[--color-ink]">3 Deities</div>
              {stats.collectedCount >= 3 && (
                <div className="text-xs text-[--color-gold] mt-1 font-bold">✓ UNLOCKED</div>
              )}
            </div>
            <div className={`text-center p-4 rounded-lg transition-all ${stats.collectedCount >= 5 ? 'bg-[--color-gold]/20 border-2 border-[--color-gold]' : 'bg-[--color-parchment-dark] opacity-50'}`}>
              <div className="text-3xl mb-2">🥈</div>
              <div className="text-sm font-[family:--font-family-header] text-[--color-ink]">5 Deities</div>
              {stats.collectedCount >= 5 && (
                <div className="text-xs text-[--color-gold] mt-1 font-bold">✓ UNLOCKED</div>
              )}
            </div>
            <div className={`text-center p-4 rounded-lg transition-all ${stats.collectedCount >= Math.ceil(stats.totalDeities / 2) ? 'bg-[--color-gold]/20 border-2 border-[--color-gold]' : 'bg-[--color-parchment-dark] opacity-50'}`}>
              <div className="text-3xl mb-2">🥇</div>
              <div className="text-sm font-[family:--font-family-header] text-[--color-ink]">50% Complete</div>
              {stats.collectedCount >= Math.ceil(stats.totalDeities / 2) && (
                <div className="text-xs text-[--color-gold] mt-1 font-bold">✓ UNLOCKED</div>
              )}
            </div>
            <div className={`text-center p-4 rounded-lg transition-all ${stats.collectedCount === stats.totalDeities ? 'bg-[--color-gold]/20 border-2 border-[--color-gold]' : 'bg-[--color-parchment-dark] opacity-50'}`}>
              <div className="text-3xl mb-2">👑</div>
              <div className="text-sm font-[family:--font-family-header] text-[--color-ink]">Master Collector</div>
              {stats.collectedCount === stats.totalDeities && (
                <div className="text-xs text-[--color-gold] mt-1 font-bold">✓ COMPLETE!</div>
              )}
            </div>
          </div>

          {/* Progress Message */}
          <div className="mt-6 text-center">
            {stats.collectedCount === 0 && (
              <p className="text-sm font-[family:--font-family-body] text-[--color-ink-light] italic">
                Start your journey in Story Mode to unlock deities!
              </p>
            )}
            {stats.collectedCount > 0 && stats.collectedCount < stats.totalDeities && (
              <div>
                <p className="text-sm font-[family:--font-family-body] text-[--color-gold] font-semibold mb-2">
                  Keep exploring! {stats.lockedCount} more deities await...
                </p>
                <p className="text-xs font-[family:--font-family-body] text-[--color-ink-light]">
                  Need {stats.remainingXP} more XP to unlock all remaining deities
                </p>
              </div>
            )}
            {stats.collectedCount === stats.totalDeities && (
              <p className="text-lg font-[family:--font-family-header] text-[--color-gold] font-bold">
                🎉 Congratulations! You are a true Master Collector! 🎉
              </p>
            )}
          </div>
        </div>

        <div style={{ height: '50px' }}></div>
      </div>
    </div>
  );
};

export default DeityCollector;
