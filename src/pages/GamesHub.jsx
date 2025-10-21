import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameProgress } from '../hooks/useGameProgress';

const GamesHub = () => {
  const navigate = useNavigate();
  const { progress, resetProgress } = useGameProgress();

  const games = [
    {
      id: 'story',
      title: 'Interactive Story',
      description: 'Journey through ancient India and discover the RigVeda',
      icon: '📖',
      path: '/games/story',
      color: '#FF6B35'
    },
    {
      id: 'collection',
      title: 'Deity Collector',
      description: 'Collect all Vedic deities like Pokémon cards',
      icon: '🎴',
      path: '/games/collection',
      color: '#4A90E2'
    },
    {
      id: 'achievements',
      title: 'Achievements',
      description: 'Unlock badges and earn prestigious titles',
      icon: '🏆',
      path: '/games/achievements',
      color: '#FFD700'
    }
  ];

  return (
    <div className="min-h-screen bg-[--color-parchment] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="ornate-golden-border bg-[--color-parchment-light] rounded-2xl p-8 mb-8 text-center">
          <h1 className="text-5xl md:text-6xl font-[family:--font-family-header] font-bold text-[--color-ink] mb-4">
            🎮 Vedic Games
          </h1>
          <p className="text-xl font-[family:--font-family-body] text-[--color-ink-light]">
            Learn RigVeda through interactive adventures
          </p>
          <div className="ornate-divider my-6"></div>
          
          {/* Player Stats */}
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div>
              <div className="text-3xl font-[family:--font-family-header] font-bold text-[--color-gold]">
                Level {progress.level}
              </div>
              <div className="text-sm text-[--color-ink-light]">Current Level</div>
            </div>
            <div>
              <div className="text-3xl font-[family:--font-family-header] font-bold text-[--color-saffron]">
                {progress.xp} XP
              </div>
              <div className="text-sm text-[--color-ink-light]">Experience Points</div>
            </div>
            <div>
              <div className="text-3xl font-[family:--font-family-header] font-bold text-[--color-gold]">
                {progress.collectedDeities.length}
              </div>
              <div className="text-sm text-[--color-ink-light]">Deities Collected</div>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {games.map(game => (
            <button
              key={game.id}
              onClick={() => navigate(game.path)}
              className="card-glare-container double-golden-border bg-[--color-parchment-light] rounded-2xl p-8 hover:scale-105 transition-all text-center group"
            >
              <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">
                {game.icon}
              </div>
              <h2 className="text-2xl font-[family:--font-family-header] font-bold text-[--color-ink] mb-3">
                {game.title}
              </h2>
              <p className="text-sm font-[family:--font-family-body] text-[--color-ink-light] leading-relaxed">
                {game.description}
              </p>
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-[--color-parchment-dark] border-2 border-[--color-gold] rounded-lg font-[family:--font-family-header] text-[--color-ink] hover:bg-[--color-gold] hover:text-white transition-colors"
          >
            ← Back to Home
          </button>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all progress?')) {
                resetProgress();
              }
            }}
            className="px-6 py-3 bg-red-100 border-2 border-red-500 rounded-lg font-[family:--font-family-header] text-red-700 hover:bg-red-500 hover:text-white transition-colors"
          >
            🔄 Reset Progress
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamesHub;
