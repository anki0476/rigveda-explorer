import { useEffect, useState } from 'react';

const FastDecrypt = ({ text, duration = 800, className = '' }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(true);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

  useEffect(() => {
    setIsDecrypting(true);
    let frame = 0;
    const totalFrames = Math.ceil(duration / 16); // 60fps
    
    const animate = () => {
      if (frame >= totalFrames) {
        setDisplayText(text);
        setIsDecrypting(false);
        return;
      }

      const progress = frame / totalFrames;
      const newText = text
        .split('')
        .map((char, index) => {
          if (char === ' ' || char === '\n') return char;
          
          // Reveal characters progressively
          const charProgress = index / text.length;
          if (progress > charProgress) {
            return char;
          }
          
          // Show random character
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      setDisplayText(newText);
      frame++;
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [text, duration]);

  return (
    <div className={className}>
      <span className={isDecrypting ? 'text-[--color-saffron]' : ''}>
        {displayText}
      </span>
    </div>
  );
};

export default FastDecrypt;
