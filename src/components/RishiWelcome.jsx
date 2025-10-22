import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const RishiWelcome = ({ image, dialogue, storageKey }) => {
  const [showModal, setShowModal] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    // Check if user has seen this popup before
    const hasSeenPopup = sessionStorage.getItem(storageKey);
    
    if (!hasSeenPopup) {
      setShowModal(true);
      sessionStorage.setItem(storageKey, 'true');
    }
  }, [storageKey]);

  // Typewriter effect
  useEffect(() => {
    if (showModal && displayedText.length < dialogue.length) {
      const timer = setTimeout(() => {
        setDisplayedText(dialogue.substring(0, displayedText.length + 1));
      }, 40); // 40ms per character
      return () => clearTimeout(timer);
    } else if (displayedText.length === dialogue.length) {
      setIsTyping(false);
    }
  }, [showModal, displayedText, dialogue]);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm z-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative max-w-2xl w-full bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-2xl ornate-golden-border overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-lg z-10"
            >
              <X className="w-5 h-5 text-[--color-ink]" />
            </button>

            {/* Content Container */}
            <div className="flex flex-col md:flex-row items-center md:items-start p-6 gap-6">
              {/* Rishi Image */}
              <div className="flex-shrink-0">
                <img
                  src={image}
                  alt="Rishi Guide"
                  className="w-48 md:w-56 h-auto rounded-lg shadow-lg"
                  style={{
                    imageRendering: 'pixelated',
                    filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))'
                  }}
                />
              </div>

              {/* Dialogue Box */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="relative bg-white rounded-xl p-6 shadow-lg border-2 border-amber-300">
                  {/* Speech bubble pointer */}
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white"></div>
                  
                  {/* Dialogue Text with Pixelated Font */}
                  <p 
                    className="text-lg text-amber-900 leading-relaxed min-h-[120px]"
                    style={{
                      fontFamily: '"Press Start 2P", "Courier New", monospace',
                      fontSize: '14px',
                      lineHeight: '1.8'
                    }}
                  >
                    {displayedText}
                    {isTyping && <span className="animate-pulse">▮</span>}
                  </p>
                </div>

                {/* Click to dismiss hint */}
                {!isTyping && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-sm text-amber-600 mt-3 italic"
                  >
                    Click anywhere to continue
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RishiWelcome;
