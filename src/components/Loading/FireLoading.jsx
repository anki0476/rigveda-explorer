import React, { useEffect } from 'react';
import Lottie from 'react-lottie';
import useSound from 'use-sound';
import fireAnimationData from '../../assets/animations/fire-animation.json';
import fireIgnitionSound from '../../assets/sounds/fire-ignition.mp3';

const FireLoading = ({ playSound }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: fireAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  // Fire ignition sound with preload
  const [playFire] = useSound(fireIgnitionSound, {
    volume: 0.9,
    interrupt: false,
    preload: true,
    soundEnabled: playSound  // Only enable if audio unlocked
  });

  // Play fire sound immediately when component mounts (if audio unlocked)
  useEffect(() => {
    if (playSound) {
      // Tiny delay to ensure sound is ready
      const timer = setTimeout(() => {
        playFire();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [playSound, playFire]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[--color-ink] via-[#1a0f08] to-[#0a0604] overflow-hidden">
      {/* Radial Glow Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-[--color-saffron] opacity-20 blur-3xl rounded-full" />
      </div>

      {/* Main Content Container */}
      <div className="relative flex flex-col items-center justify-center gap-12 px-4">
        
        {/* Lottie Fire Animation */}
        <div className="relative flex items-center justify-center">
          <Lottie
            options={defaultOptions}
            height={280}
            width={280}
            isStopped={false}
            isPaused={false}
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center gap-6 text-center max-w-xl">
          
          {/* Sanskrit Text */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-[family:--font-family-sanskrit] text-[#F4C430] drop-shadow-[0_0_20px_rgba(244,196,48,0.6)] leading-relaxed font-bold">
              अग्निमीळे पुरोहितम्
            </h1>
            <p className="text-base sm:text-lg text-[#E8C872] font-[family:--font-family-body] tracking-wider">
              Agnim īḷe purohitam
            </p>
          </div>
          
          {/* English Translation */}
          <p className="text-2xl sm:text-3xl font-[family:--font-family-body] text-white italic font-light drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]">
            Invoking Fire...
          </p>

          {/* Loading Dots */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div 
              className="w-3 h-3 bg-[#F4C430] rounded-full animate-bounce-custom shadow-[0_0_10px_rgba(244,196,48,0.8)]" 
              style={{ animationDelay: '0ms' }}
            />
            <div 
              className="w-3 h-3 bg-[#F4C430] rounded-full animate-bounce-custom shadow-[0_0_10px_rgba(244,196,48,0.8)]" 
              style={{ animationDelay: '150ms' }}
            />
            <div 
              className="w-3 h-3 bg-[#F4C430] rounded-full animate-bounce-custom shadow-[0_0_10px_rgba(244,196,48,0.8)]" 
              style={{ animationDelay: '300ms' }}
            />
          </div>
        </div>

        {/* Footer Text */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <p className="text-sm sm:text-base text-[#D4AF37] font-[family:--font-family-body] tracking-[0.25em] uppercase opacity-70">
            Rigveda Explorer
          </p>
        </div>
      </div>
    </div>
  );
};

export default FireLoading;
