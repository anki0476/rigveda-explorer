import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, BookOpen, ArrowLeft, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateAudioChunks } from '../utils/audioGenerator';

const PodcastPlayer = ({ mandalaNumber, onClose }) => {
  const [episode, setEpisode] = useState(null);
  const [script, setScript] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generatingAudio, setGeneratingAudio] = useState(false);
  
  const [audioChunks, setAudioChunks] = useState([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showScript, setShowScript] = useState(false);
  
  const audioRef = useRef(null);

  // Fetch episode data
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
        
        // Generate audio chunks
        setGeneratingAudio(true);
        console.log('🎙️ Generating audio chunks for Mandala', mandalaNumber);
        
        try {
          const audioUrls = await generateAudioChunks(scriptForMandala.dialogue);
          setAudioChunks(audioUrls);
          setCurrentChunkIndex(0);
          console.log(`✅ Generated ${audioUrls.length} audio chunks`);
        } catch (err) {
          console.error('Audio generation failed:', err);
          setError('Audio generation failed. You can still view the script below.');
        } finally {
          setGeneratingAudio(false);
        }
        
      } catch (err) {
        console.error('Error loading episode:', err);
        setError(err.message);
        setLoading(false);
        setGeneratingAudio(false);
      }
    };

    fetchEpisodeData();
    
    return () => {
      // Cleanup blob URLs
      audioChunks.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [mandalaNumber]);

  // Load current chunk - CRITICAL: Only when index changes!
  useEffect(() => {
    if (audioChunks.length > 0 && audioRef.current && currentChunkIndex < audioChunks.length) {
      console.log(`📀 Loading chunk ${currentChunkIndex + 1}/${audioChunks.length}`);
      
      // STOP any current playback FIRST
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      
      // Load new chunk
      audioRef.current.src = audioChunks[currentChunkIndex];
      audioRef.current.load();
      
      // Auto-play if we were already playing
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.log('Playback error:', err);
          setIsPlaying(false);
        });
      }
    }
  }, [currentChunkIndex, audioChunks]); // Only trigger on chunk index/list change

  // Handle chunk end - move to next chunk
  const handleChunkEnded = () => {
    console.log(`✅ Chunk ${currentChunkIndex + 1} finished`);
    
    if (currentChunkIndex < audioChunks.length - 1) {
      console.log(`➡️ Moving to chunk ${currentChunkIndex + 2}`);
      setCurrentChunkIndex(prev => prev + 1);
    } else {
      console.log('🎉 All chunks completed!');
      setIsPlaying(false);
      setCurrentChunkIndex(0);
    }
  };

  // Audio controls
  const togglePlay = () => {
    if (!audioRef.current || generatingAudio || audioChunks.length === 0) return;
    
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

  const nextChunk = () => {
    if (currentChunkIndex < audioChunks.length - 1) {
      setCurrentChunkIndex(prev => prev + 1);
    }
  };

  const prevChunk = () => {
    if (currentChunkIndex > 0) {
      setCurrentChunkIndex(prev => prev - 1);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-orange-800 font-semibold">Loading Episode...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !episode) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="bg-white/40 backdrop-blur-2xl p-8 rounded-2xl shadow-xl max-w-md border-2 border-white/60">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">Error Loading Episode</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-8">
      <div className="max-w-5xl mx-auto bg-white/30 backdrop-blur-md rounded-[3rem] p-8 shadow-2xl border border-white/50">
        
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onClose}
          className="mb-6 flex items-center gap-2 px-6 py-3 bg-white/50 backdrop-blur-xl rounded-xl shadow-lg hover:shadow-xl transition text-orange-600 font-bold hover:bg-white/60 border-2 border-white/60"
        >
          <ArrowLeft size={20} />
          BACK TO MANDALAS
        </motion.button>

        {/* Episode Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-amber-50/70 to-orange-100/70 backdrop-blur-2xl rounded-3xl shadow-xl p-8 mb-6 border-2 border-white/60"
        >
          <div className="flex items-start gap-6">
            <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl flex-shrink-0 bg-white/70 backdrop-blur-md border-2 border-white/80">
              <img 
                src={episode.thumbnail || '/images/default-mandala.jpg'} 
                alt={episode.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/images/default-mandala.jpg';
                }}
              />
            </div>
            
            <div className="flex-1">
              <div className="text-sm text-orange-600 font-semibold mb-2">
                Episode {episode.id} • {episode.duration}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {episode.title}
              </h1>
              <h2 className="text-xl text-gray-700 mb-4">
                {episode.subtitle}
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {episode.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {episode.highlights?.map((highlight, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 bg-white/60 backdrop-blur-md text-orange-700 rounded-full text-sm font-medium border border-orange-200 shadow-sm"
                  >
                    ✨ {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Audio Generating State */}
        {generatingAudio && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-orange-100/50 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-orange-300"
          >
            <div className="flex items-center gap-4">
              <Loader className="animate-spin text-orange-600" size={32} />
              <div>
                <h3 className="text-lg font-bold text-orange-800">Generating Audio...</h3>
                <p className="text-orange-700 text-sm">Creating podcast audio in multiple parts. This may take 30-60 seconds.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Audio Player */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-400 rounded-3xl shadow-2xl p-8 text-white"
        >
          {/* Audio Element - CRITICAL: Proper event handlers */}
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleChunkEnded}
            preload="auto"
          />

          {/* Chunk Info */}
          {audioChunks.length > 1 && (
            <div className="text-center mb-4 text-sm font-semibold opacity-90">
              Part {currentChunkIndex + 1} of {audioChunks.length}
            </div>
          )}

          {/* Progress Bar */}
          <div className="mb-6">
            <input
              type="range"
              min="0"
              max="100"
              value={(currentTime / duration) * 100 || 0}
              onChange={handleSeek}
              disabled={generatingAudio || audioChunks.length === 0}
              className="w-full h-2 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg disabled:opacity-50"
            />
            <div className="flex justify-between text-sm mt-2 font-semibold">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={prevChunk}
              disabled={generatingAudio || audioChunks.length === 0 || currentChunkIndex === 0}
              className="p-3 hover:bg-white/20 rounded-full transition disabled:opacity-30 disabled:cursor-not-allowed"
              title="Previous part"
            >
              <SkipBack size={24} />
            </button>
            
            <button
              onClick={togglePlay}
              disabled={generatingAudio || audioChunks.length === 0}
              className="p-6 bg-white text-orange-500 rounded-full hover:scale-110 transition-transform shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} />}
            </button>
            
            <button
              onClick={nextChunk}
              disabled={generatingAudio || audioChunks.length === 0 || currentChunkIndex === audioChunks.length - 1}
              className="p-3 hover:bg-white/20 rounded-full transition disabled:opacity-30 disabled:cursor-not-allowed"
              title="Next part"
            >
              <SkipForward size={24} />
            </button>
          </div>

          {/* Volume & Script Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={toggleMute} className="hover:scale-110 transition">
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={volume * 100}
                onChange={handleVolumeChange}
                className="w-24 h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
            </div>

            <button
              onClick={() => setShowScript(!showScript)}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full hover:bg-white/30 transition"
            >
              <BookOpen size={18} />
              {showScript ? 'Hide' : 'Show'} Script
            </button>
          </div>
        </motion.div>

        {/* Script Display */}
        <AnimatePresence>
          {showScript && script && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 bg-gradient-to-br from-amber-50/60 to-orange-50/60 backdrop-blur-2xl rounded-3xl shadow-xl p-8 overflow-hidden border-2 border-white/60"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BookOpen className="text-orange-500" />
                Episode Script
              </h3>
              
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {script.dialogue?.map((line, i) => (
                  <div 
                    key={i}
                    className={`p-4 rounded-xl backdrop-blur-md shadow-md ${
                      line.speaker === 'rishi' 
                        ? 'bg-orange-100/60 border-l-4 border-orange-500' 
                        : 'bg-blue-50/60 border-l-4 border-blue-400'
                    }`}
                  >
                    <div className="font-semibold text-sm mb-1 text-gray-700">
                      {line.speaker === 'rishi' ? '🧘♂️ Rishi' : '🎓 Seeker'}
                    </div>
                    <div className="text-gray-800 leading-relaxed">
                      {line.text}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PodcastPlayer;
