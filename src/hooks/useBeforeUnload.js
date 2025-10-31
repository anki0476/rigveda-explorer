// src/hooks/useBeforeUnload.js
import { useEffect } from 'react';

export const useBeforeUnload = (showModal) => {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Show Rishi modal
      showModal();
      
      // Standard browser warning (required for beforeunload)
      e.preventDefault();
      e.returnValue = '';
      
      return '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [showModal]);
};
