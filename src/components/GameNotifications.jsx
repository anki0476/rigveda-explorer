import React, { useState, useEffect } from 'react';

const GameNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  // Listen for game events
  useEffect(() => {
    const handleGameEvent = (event) => {
      const { type, data } = event.detail;
      
      let notification = null;
      
      switch (type) {
        case 'xp_gained':
          notification = {
            id: Date.now(),
            type: 'xp',
            message: `+${data.amount} XP`,
            icon: '⭐',
            color: '#FFD700'
          };
          break;
        
        case 'deity_unlocked':
          notification = {
            id: Date.now(),
            type: 'deity',
            message: `New deity unlocked: ${data.name}`,
            icon: '🎴',
            color: '#4A90E2'
          };
          break;
        
        case 'achievement_unlocked':
          notification = {
            id: Date.now(),
            type: 'achievement',
            message: `Achievement: ${data.name}`,
            icon: '🏆',
            color: '#FF6B35'
          };
          break;
        
        case 'level_up':
          notification = {
            id: Date.now(),
            type: 'level',
            message: `Level Up! Now Level ${data.level}`,
            icon: '🚀',
            color: '#9B59B6'
          };
          break;
      }
      
      if (notification) {
        setNotifications(prev => [...prev, notification]);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== notification.id));
        }, 3000);
      }
    };

    window.addEventListener('gameEvent', handleGameEvent);
    return () => window.removeEventListener('gameEvent', handleGameEvent);
  }, []);

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className="bg-white rounded-lg shadow-2xl p-4 border-l-4 animate-slide-in-right max-w-sm"
          style={{ borderLeftColor: notification.color }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{notification.icon}</span>
            <span className="font-[family:--font-family-body] text-[--color-ink] font-medium">
              {notification.message}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Helper function to dispatch game events
export const dispatchGameEvent = (type, data) => {
  window.dispatchEvent(new CustomEvent('gameEvent', { detail: { type, data } }));
};

export default GameNotifications;
