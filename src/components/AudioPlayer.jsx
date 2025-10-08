import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';

const AudioPlayer = ({ hymnId, hymnTitle, audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // For demo: use placeholder audio or your own Sanskrit chanting audio
  const finalAudioUrl = audioUrl || `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${Math.floor(Math.random() * 8) + 1}.mp3`;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const skip = (seconds) => {
    audioRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-gradient-to-r from-[--color-parchment-light] to-[--color-parchment-dark] rounded-xl border-2 border-[--color-gold] p-4 shadow-lg">
      <audio ref={audioRef} src={finalAudioUrl} preload="metadata" />
      
      {/* Title */}
      <div className="mb-3 flex items-center gap-2">
        <span className="text-2xl">🎵</span>
        <div>
          <div className="text-sm font-[family:--font-family-header] text-[--color-ink] font-semibold">
            Hymn {hymnId}
          </div>
          <div className="text-xs text-[--color-ink-light] font-[family:--font-family-body]">
            {hymnTitle}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="w-full h-2 bg-[--color-gold]/20 rounded-lg appearance-none cursor-pointer 
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                     [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[--color-gold] 
                     [&::-webkit-slider-thumb]:cursor-pointer hover:[&::-webkit-slider-thumb]:scale-110 
                     [&::-webkit-slider-thumb]:transition-transform"
        />
        <div className="flex justify-between text-xs text-[--color-ink-light] mt-1 font-[family:--font-family-body]">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        {/* Left: Skip Back */}
        <button
          onClick={() => skip(-10)}
          className="p-2 rounded-full hover:bg-[--color-gold]/20 transition-colors"
          aria-label="Skip back 10 seconds"
        >
          <SkipBack size={20} className="text-[--color-ink]" />
        </button>

        {/* Center: Play/Pause */}
        <button
          onClick={togglePlay}
          className="p-4 rounded-full bg-[--color-gold] hover:bg-[--color-gold-dark] transition-all transform hover:scale-105 shadow-md"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause size={24} className="text-[--color-parchment-light]" fill="currentColor" />
          ) : (
            <Play size={24} className="text-[--color-parchment-light]" fill="currentColor" />
          )}
        </button>

        {/* Right: Skip Forward */}
        <button
          onClick={() => skip(10)}
          className="p-2 rounded-full hover:bg-[--color-gold]/20 transition-colors"
          aria-label="Skip forward 10 seconds"
        >
          <SkipForward size={20} className="text-[--color-ink]" />
        </button>

        {/* Volume Controls */}
        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-[--color-gold]/20 transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX size={20} className="text-[--color-ink]" />
            ) : (
              <Volume2 size={20} className="text-[--color-ink]" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume * 100}
            onChange={handleVolumeChange}
            className="w-20 h-2 bg-[--color-gold]/20 rounded-lg appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
                       [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[--color-gold] 
                       [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
