import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, BookOpen, ArrowLeft, Loader, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Episode metadata
const EPISODE_DATA = {
  1: { title: "Fire, Thunder & The First Word of Eternity", coverArt: "/images/podcast-covers/mandala-1-cover.png" },
  2: { title: "River of Lost Gods: The Gritsamada Chronicles", coverArt: "/images/podcast-covers/mandala-2-cover.png" },
  3: { title: "The Rebel King & The Light of 10,000 Suns", coverArt: "/images/podcast-covers/mandala-3-cover.png" },
  4: { title: "The Divine Engineers: When Mortals Became Gods", coverArt: "/images/podcast-covers/mandala-4-cover.png" },
  5: { title: "When The Rain God Wept: Hymns of Survival", coverArt: "/images/podcast-covers/mandala-5-cover.png" },
  6: { title: "Sacred Weapons & The Science of Fire", coverArt: "/images/podcast-covers/mandala-6-cover.png" },
  7: { title: "The Sage Who Begged Forgiveness From The Sky", coverArt: "/images/podcast-covers/mandala-7-cover.png" },
  8: { title: "The Lost Plant That Made Gods Immortal", coverArt: "/images/podcast-covers/mandala-8-cover.png" },
  9: { title: "The Elixir of Cosmic Ecstasy", coverArt: "/images/podcast-covers/mandala-9-cover.png" },
  10: { title: "The Gambler, The Goddess & The Beginning of Everything", coverArt: "/images/podcast-covers/mandala-10-cover.png" }
};



const PodcastPlayer = ({ mandalaNumber, onClose }) => {
  const [episode, setEpisode] = useState(null);
  const [script, setScript] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showScript, setShowScript] = useState(false);
  const [language, setLanguage] = useState('en');

  const audioRef = useRef(null);

  const audioUrl = useMemo(() => {
    const availablePodcasts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    if (availablePodcasts.includes(mandalaNumber)) {
      return `/audio/podcasts/Mandala-${mandalaNumber}-${language === 'en' ? 'English' : 'Hindi'}-Podcast.m4a`;
    }
    return null;
  }, [mandalaNumber, language]);

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      const wasPlaying = isPlaying;

      audioRef.current.pause();
      setIsPlaying(false);
      audioRef.current.load();

      if (wasPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => console.log('Auto-play blocked:', err));
      }
    }
  }, [audioUrl]);

  useEffect(() => {
    const fetchEpisodeData = async () => {
      try {
        setLoading(true);
        const indexRes = await fetch('/data/podcastIndex.json');
        const indexData = await indexRes.json();

        const foundEpisode = indexData.episodes.find(
          ep => ep.mandalaNumbers.includes(mandalaNumber)
        );

        if (!foundEpisode) {
          throw new Error(`Episode not found for Mandala ${mandalaNumber}`);
        }

        setEpisode(foundEpisode);

        const scriptRes = await fetch(foundEpisode.scriptFile);
        const scriptData = await scriptRes.json();
        const scriptForMandala = scriptData[mandalaNumber];

        if (!scriptForMandala) {
          throw new Error(`Script not found for Mandala ${mandalaNumber}`);
        }

        setScript(scriptForMandala);
        setLoading(false);
      } catch (err) {
        console.error('Error loading episode:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEpisodeData();
  }, [mandalaNumber]);

  const togglePlay = () => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => {
        console.log('Play error:', err);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 15,
        duration
      );
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 15,
        0
      );
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#f5e6d3]/95 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-gray-800 text-lg font-semibold">Loading Episode...</p>
        </div>
      </div>
    );
  }

  if (error || !audioUrl) {
    return (
      <div className="fixed inset-0 bg-[#f5e6d3]/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/20 backdrop-blur-3xl border-2 border-orange-500 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
        >
          <div className="text-6xl mb-4">ðŸŽ™ï¸</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Episode Unavailable</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-semibold"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#f5e6d3] z-50 overflow-y-auto pt-20">
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Player Card with STRONG Glassmorphism */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative bg-white/20 backdrop-blur-3xl border-2 border-white/40 rounded-3xl overflow-hidden shadow-2xl"
            style={{
              boxShadow: '0 8px 32px 0 rgba(234, 88, 12, 0.2), inset 0 0 60px rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Back Button - Top Left INSIDE Card */}
            <div className="absolute top-4 left-4 z-20">
              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-xl hover:bg-white/50 border-2 border-white/60 rounded-full transition-all hover:scale-105 shadow-xl font-bold text-orange-700"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">BACK</span>
              </motion.button>
            </div>

            {/* Cover Art with Image */}
            <div className="relative h-64 md:h-96 overflow-hidden">
              <img 
                src={EPISODE_DATA[mandalaNumber]?.coverArt} 
                alt={`Mandala ${mandalaNumber} Cover`}
                className="w-full h-full object-cover"
              />
              {/* Text Overlay on Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
              <div className="p-8 text-white w-full">
                <h1 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-2xl !text-white">
                  {EPISODE_DATA[mandalaNumber]?.title || `Mandala ${mandalaNumber}`}
                </h1>
                <p className="text-lg drop-shadow-lg font-semibold text-white/90">Deep Dive Podcast</p>
              </div>
            </div>

            </div>



            {/* Language Toggle - STRONG Glassmorphism */}
            <div className="px-6 py-4 bg-white/20 backdrop-blur-2xl border-b-2 border-white/30">
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <Globe className="w-5 h-5 text-orange-700" />
                <span className="text-gray-800 font-bold mr-4">Listen in:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${
                      language === 'en'
                        ? 'bg-orange-600 text-white shadow-lg scale-105'
                        : 'bg-white/40 backdrop-blur-xl text-gray-700 border-2 border-white/60 hover:bg-white/60 hover:scale-105'
                    }`}
                  >
                    <span className="text-sm">GB</span> ENGLISH
                  </button>
                  <button
                    onClick={() => setLanguage('hi')}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${
                      language === 'hi'
                        ? 'bg-orange-600 text-white shadow-lg scale-105'
                        : 'bg-white/40 backdrop-blur-xl text-gray-700 border-2 border-white/60 hover:bg-white/60 hover:scale-105'
                    }`}
                  >
                    <span className="text-sm">IN</span> हिंदी
                  </button>
                </div>
              </div>
            </div>

            {/* Player Controls - STRONG Glassmorphism */}
            <div className="p-6 md:p-8 bg-gradient-to-b from-white/15 to-white/25 backdrop-blur-2xl">
              {/* Progress Bar */}
              <div className="mb-6">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={(currentTime / duration) * 100 || 0}
                  onChange={handleSeek}
                  className="w-full h-3 bg-orange-300/50 backdrop-blur-sm rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-800 font-bold mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Play Controls */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <button
                  onClick={skipBackward}
                  className="p-3 bg-white/40 backdrop-blur-2xl hover:bg-white/60 border-2 border-white/60 rounded-full transition-all hover:scale-110 shadow-xl"
                  title="Skip back 15s"
                >
                  <SkipBack className="w-6 h-6 text-orange-700" />
                </button>

                <button
                  onClick={togglePlay}
                  className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-full transition-all hover:scale-110 shadow-2xl"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white" />
                  )}
                </button>

                <button
                  onClick={skipForward}
                  className="p-3 bg-white/40 backdrop-blur-2xl hover:bg-white/60 border-2 border-white/60 rounded-full transition-all hover:scale-110 shadow-xl"
                  title="Skip forward 15s"
                >
                  <SkipForward className="w-6 h-6 text-orange-700" />
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-4 mb-6">
                <button 
                  onClick={toggleMute} 
                  className="p-2 bg-white/40 backdrop-blur-2xl hover:bg-white/60 border-2 border-white/60 rounded-lg transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-orange-700" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-orange-700" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume * 100}
                  onChange={handleVolumeChange}
                  className="w-full h-3 bg-orange-300/50 backdrop-blur-sm rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Script Button */}
              <div className="flex justify-center mb-6">
                <button
                  onClick={() => setShowScript(!showScript)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all font-bold ${
                    showScript 
                      ? 'bg-orange-600 text-white shadow-lg scale-105' 
                      : 'bg-white/40 backdrop-blur-2xl text-gray-700 border-2 border-white/60 hover:bg-white/60 hover:scale-105'
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  <span>{showScript ? 'HIDE SCRIPT' : 'VIEW SCRIPT'}</span>
                </button>
              </div>

              {/* Episode Info - STRONG Glassmorphism */}
              <div className="p-6 bg-white/30 backdrop-blur-3xl border-2 border-white/50 rounded-xl shadow-inner">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {episode?.title || `Mandala ${mandalaNumber} - Deep Dive`}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {episode?.description || `Explore the profound wisdom of Mandala ${mandalaNumber} through an engaging audio journey. Listen to expert insights, historical context, and spiritual depth.`}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-700 font-semibold flex-wrap">
                  <span className="flex items-center gap-1">
                  ⏱️ ~35-40 minutes
                  </span>
                  <span>Language:</span>
                  <span className="flex items-center gap-1">
                  {language === 'en' ? '🇬🇧 English' : '🇮🇳 हिंदी'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Script Viewer - STRONG Glassmorphism */}
          <AnimatePresence>
            {showScript && script && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-6 bg-white/30 backdrop-blur-3xl border-2 border-white/50 rounded-2xl p-6 md:p-8 shadow-xl"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-orange-600" />
                  Podcast Script
                </h3>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-4 custom-scrollbar">
                  {script.dialogue?.map((line, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 backdrop-blur-xl ${
                        line.speaker === 'rishi'
                          ? 'bg-orange-100/60 border-orange-500'
                          : 'bg-blue-100/60 border-blue-500'
                      }`}
                    >
                      <div className="text-xs font-bold uppercase text-gray-500 mb-1">
                        {line.speaker}
                      </div>
                      <p className="text-gray-800 leading-relaxed">{line.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          preload="metadata"
        />
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(234, 88, 12, 0.5);
          transition: transform 0.2s;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(234, 88, 12, 0.6);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(234, 88, 12, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(254, 215, 170, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ea580c;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #c2410c;
        }
      `}</style>
    </div>
  );
};

export default PodcastPlayer;