import React, { useRef, useState, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import useSound from 'use-sound';
import pageFlipSound from '../../assets/sounds/page-flip.mp3';

const FlipBook = ({ pages }) => {
  const bookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Page flip sound - using free online sound
  // Replace with local file if you download one: import pageFlipSound from '../../assets/sounds/page-flip.mp3'
  const [playPageFlip] = useSound(
    pageFlipSound,  // Use local file instead of URL
    { volume: 1.0, interrupt: true, preload: true }
  );

  const handleFlip = (e) => {
    setCurrentPage(e.data);
    playPageFlip();  // Play sound on page flip!
  };

  // Use useCallback to memoize these functions
  const goToPrevPage = useCallback(() => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
      playPageFlip();  // Play sound when using buttons
    }
  }, [playPageFlip]);

  const goToNextPage = useCallback(() => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
      playPageFlip();  // Play sound when using buttons
    }
  }, [playPageFlip]);

  // Keyboard navigation with proper dependencies
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevPage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [goToPrevPage, goToNextPage]);

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* FlipBook Container */}
      <div className="relative shadow-2xl">
        <HTMLFlipBook
          ref={bookRef}
          width={500}
          height={700}
          size="fixed"
          minWidth={300}
          maxWidth={500}
          minHeight={400}
          maxHeight={700}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={handleFlip}
          className="flipbook"
        >
          {pages.map((page, index) => (
            <div key={index} className="page bg-[--color-parchment-light] p-8 shadow-lg">
              {page}
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-8">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          className="px-6 py-3 bg-[--color-gold] text-[--color-ink] font-[family:--font-family-header] rounded-md hover:bg-[--color-saffron] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md"
        >
          ← [translate:पूर्व]
        </button>
        
        <span className="text-[--color-ink-light] font-[family:--font-family-body]">
          [translate:पृष्ठ] {currentPage + 1} / {pages.length}
        </span>
        
        <button
          onClick={goToNextPage}
          disabled={currentPage >= pages.length - 1}
          className="px-6 py-3 bg-[--color-gold] text-[--color-ink] font-[family:--font-family-header] rounded-md hover:bg-[--color-saffron] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md"
        >
          [translate:अगला] →
        </button>
      </div>
    </div>
  );
};

export default FlipBook;
