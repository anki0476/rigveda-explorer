import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotificationContext } from '../../context/NotificationContext';

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotificationContext();

  return (
    <div className="fixed top-20 right-4 z-[9999] space-y-3 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="pointer-events-auto"
          >
            <NotificationCard 
              notification={notification} 
              onClose={() => removeNotification(notification.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const NotificationCard = ({ notification, onClose }) => {
  const getNotificationStyle = (type) => {
    switch (type) {
      case 'xp':
        return 'bg-gradient-to-r from-blue-500 to-purple-600 border-blue-400';
      case 'level-up':
        return 'bg-gradient-to-r from-yellow-500 to-orange-600 border-yellow-400';
      case 'badge':
        return 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400';
      case 'deity':
        return 'bg-gradient-to-r from-purple-500 to-pink-600 border-purple-400';
      case 'achievement':
        return 'bg-gradient-to-r from-gold-500 to-yellow-600 border-yellow-500';
      default:
        return 'bg-gradient-to-r from-gray-700 to-gray-800 border-gray-600';
    }
  };

  if (notification.type === 'xp') {
    return (
      <div className={`${getNotificationStyle('xp')} border-2 rounded-xl px-4 py-2 shadow-2xl backdrop-blur-sm flex items-center gap-2 min-w-[200px]`}>
        <span className="text-2xl">⚡</span>
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-lg">+{notification.xp} XP</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${getNotificationStyle(notification.type)} border-2 rounded-xl p-4 shadow-2xl backdrop-blur-sm max-w-sm`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h4 className="text-white font-[family:--font-family-header] font-bold text-lg mb-1">
            {notification.title}
          </h4>
          <p className="text-white/90 font-[family:--font-family-body] text-sm">
            {notification.message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors text-xl leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default NotificationContainer;
