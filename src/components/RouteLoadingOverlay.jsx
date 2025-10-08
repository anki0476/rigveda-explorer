import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import BookLoadingAnimation from './BookLoadingAnimation';

const RouteLoadingOverlay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    
    // Show book animation briefly on route change
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Book animation shows for 800ms

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(232, 220, 196, 0.95)', // Semi-transparent parchment
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            pointerEvents: 'auto'
          }}
        >
          <BookLoadingAnimation size="large" text="Loading..." />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RouteLoadingOverlay;
