import React, { useEffect, useRef, useState } from 'react';
import { SkipForward } from 'lucide-react';

const VideoIntro = ({ onComplete }) => {
  const videoRef = useRef(null);
  const [phase, setPhase] = useState('playing');
  const [showSkip, setShowSkip] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // ✅ NEW: Loading state

  const handleSkip = () => {
    console.log('⏭️ Skip button clicked');
    setShowSkip(false);
    onComplete();
  };

  useEffect(() => {
    const video = videoRef.current;
    
    console.log('🎬 VideoIntro: Component mounted');

    if (!video) {
      console.error('❌ VideoIntro: Video ref is null!');
      return;
    }

    // ✅ NEW: Wait for video to be ready before playing
    const handleCanPlayThrough = () => {
      console.log('✅ VideoIntro: Video fully buffered and ready');
      setIsLoading(false);
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('✅ VideoIntro: Video is playing!');
          })
          .catch((error) => {
            console.error('❌ VideoIntro: Autoplay failed:', error.message);
            setTimeout(handleVideoEnd, 2000);
          });
      }
    };

    const handleVideoEnd = () => {
      console.log('✅ VideoIntro: Video ended, fading to black...');
      setShowSkip(false);
      setPhase('fading');
      
      setTimeout(() => {
        console.log('⚫ VideoIntro: Now showing black screen...');
        setPhase('black');
        
        setTimeout(() => {
          console.log('✅ VideoIntro: Black screen complete, calling onComplete');
          onComplete();
        }, 1500);
      }, 500);
    };

    // ✅ NEW: Handle loading errors
    const handleError = () => {
      console.error('❌ VideoIntro: Video failed to load');
      setIsLoading(false);
      setTimeout(handleVideoEnd, 1000); // Skip to next if video fails
    };
    
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('error', handleError);

    // ✅ Preload video
    video.load();

    const safetyTimeout = setTimeout(() => {
      console.log('⚠️ VideoIntro: Safety timeout - forcing transition');
      handleVideoEnd();
    }, 12000); // Increased to 12s to account for loading

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('error', handleError);
      clearTimeout(safetyTimeout);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        backgroundColor: '#000',
        overflow: 'hidden',
        margin: 0,
        padding: 0
      }}
    >
      {/* ✅ NEW: Loading Spinner */}
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 100001
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '20px',
            animation: 'pulse 1.5s ease-in-out infinite'
          }}>
            ⚡
          </div>
          <div style={{
            color: 'white',
            fontSize: '18px',
            fontWeight: '600',
            opacity: 0.8
          }}>
            Loading Rigveda Odyssey...
          </div>
        </div>
      )}

      {/* Skip Button */}
      {showSkip && !isLoading && (
        <button
          onClick={handleSkip}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 100000,
            padding: '12px 20px',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            animation: 'fadeInSkip 0.5s ease-out'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          <span>Skip Intro</span>
          <SkipForward size={18} />
        </button>
      )}

      {/* Video */}
      <video
        ref={videoRef}
        src="/RVintro.mp4"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          objectFit: 'cover',
          display: 'block',
          transition: 'opacity 500ms ease-in-out',
          opacity: phase === 'playing' && !isLoading ? 1 : 0
        }}
        muted
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
      />

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeInSkip {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default VideoIntro;
