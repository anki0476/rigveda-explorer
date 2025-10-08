import React, { useState, useEffect } from 'react';

const TypewriterPlaceholder = () => {
  const words = ['deities', 'hymns', 'topics', 'facts'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing forward
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
          setTypingSpeed(100);
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting backward
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
          setTypingSpeed(50);
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
          setTypingSpeed(500); // Pause before typing next word
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed, words]);

  return (
    <span className="inline-flex items-center">
      <span className="text-[--color-ink-light]">Search </span>
      <span className="text-[--color-ink-light] min-w-[80px]">
        {currentText}
        <span className="animate-pulse">|</span>
      </span>
      <span className="text-[--color-ink-light]">...</span>
    </span>
  );
};

export default TypewriterPlaceholder;
