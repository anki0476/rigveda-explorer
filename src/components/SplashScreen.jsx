import React, { useEffect, useRef, useState } from 'react';

const SplashScreen = ({ onFinish }) => {
  const videoRef = useRef(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleVideoEnd = () => {
    if (isFadingOut) return; // Prevent multiple triggers
    setIsFadingOut(true);
    // Wait 500ms for the fade-to-black animation before calling onFinish
    setTimeout(onFinish, 500);
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Listen for when the video ends
    videoElement.addEventListener('ended', handleVideoEnd);

    // Fallback: If video doesn't play or load, transition after 8.5 seconds
    const fallbackTimer = setTimeout(handleVideoEnd, 8500);

    // Try to play the video
    videoElement.play().catch(error => {
      console.error("Video autoplay blocked. Skipping intro.", error);
      handleVideoEnd(); // Skip if autoplay is prevented
    });

    // Cleanup
    return () => {
      videoElement.removeEventListener('ended', handleVideoEnd);
      clearTimeout(fallbackTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 bg-black z-[100] flex items-center justify-center transition-opacity duration-500 ease-in-out ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <video
        ref={videoRef}
        src="/RVintro.mp4"
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default SplashScreen;
