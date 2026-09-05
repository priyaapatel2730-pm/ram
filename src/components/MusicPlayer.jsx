import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaMusic } from 'react-icons/fa';
import { content } from '../data/content';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(content.musicFile);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => setIsPlaying(false));
    }

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    audio.addEventListener('timeupdate', updateProgress);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.pause();
    };
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.error("Playback error:", err);
            setIsPlaying(false);
          });
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    e.stopPropagation();
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    if (newVolume === 0) {
      setIsMuted(true);
      audioRef.current.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      audioRef.current.muted = false;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2 }}
      className="fixed bottom-4 left-4 z-50 md:bottom-8 md:left-8"
    >
      <motion.div 
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        className={`glass p-2 rounded-full shadow-2xl flex items-center gap-3 cursor-pointer overflow-hidden transition-colors duration-300 ${isExpanded ? 'bg-black/60 backdrop-blur-2xl border-gold-400/30' : 'hover:bg-white/10'}`}
      >
        <div className="relative">
          <motion.button 
            onClick={togglePlay}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gold-400 text-black flex items-center justify-center hover:bg-gold-300 transition-colors shadow-[0_0_15px_rgba(250,204,21,0.5)] z-10 relative"
          >
            {isPlaying ? <FaPause className="text-sm md:text-base" /> : <FaPlay className="text-sm md:text-base ml-1" />}
          </motion.button>
          
          {/* Animated rings when playing */}
          <AnimatePresence>
            {isPlaying && !isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.5, 0], scale: [1, 1.5, 2] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border border-gold-400 pointer-events-none"
              />
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="flex items-center gap-4 pr-4 overflow-hidden"
            >
              <div className="flex flex-col gap-1 w-24 md:w-32">
                <div className="flex justify-between items-center text-[10px] md:text-xs text-gold-400 font-sans tracking-widest uppercase">
                  <span>Music</span>
                  <FaMusic className={isPlaying ? "animate-bounce" : ""} />
                </div>
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gold-400 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="h-6 w-px bg-white/20 mx-1" />

              <div className="flex items-center gap-2">
                <button onClick={toggleMute} className="text-white/70 hover:text-white transition-colors">
                  {isMuted || volume === 0 ? <FaVolumeMute className="text-xs md:text-sm" /> : <FaVolumeUp className="text-xs md:text-sm" />}
                </button>
                <input 
                  type="range" min="0" max="1" step="0.01" 
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  onClick={e => e.stopPropagation()}
                  className="w-16 md:w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-gold-400"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default MusicPlayer;
