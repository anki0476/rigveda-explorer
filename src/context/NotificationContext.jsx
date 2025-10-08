import React, { createContext, useContext } from 'react';
import { useNotification } from '../hooks/useNotification';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const notificationValue = useNotification();

  return (
    <NotificationContext.Provider value={notificationValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within NotificationProvider');
  }
  return context;
};
