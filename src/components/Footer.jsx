import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { content } from '../data/content';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  const [surpriseRevealed, setSurpriseRevealed] = useState(false);

  const handleFinalSurprise = () => {
    setSurpriseRevealed(true);
    
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#facc15', '#a855f7', '#ec4899', '#3b82f6', '#ffffff']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#facc15', '#a855f7', '#ec4899', '#3b82f6', '#ffffff']
      });
    }, 250);
  };

  return (
    <section className="min-h-full flex flex-col justify-center relative z-10 px-4 py-20">
      
      <div className="container mx-auto max-w-4xl text-center flex-grow flex flex-col justify-center">
        
        <AnimatePresence mode="wait">
          {!surpriseRevealed ? (
            <motion.div
              key="button"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotateX: 90 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="perspective-[1000px]"
            >
              <button
                onClick={handleFinalSurprise}
                className="group relative inline-flex items-center justify-center px-10 py-5 font-medium tracking-wide text-white transition-all duration-700 ease-out bg-transparent border border-gold-400 rounded-full hover:bg-gold-400/10 hover:scale-105 overflow-hidden shadow-[0_0_20px_rgba(250,204,21,0.2)] hover:shadow-[0_0_60px_rgba(250,204,21,0.6)]"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-gold-400/0 via-gold-400/30 to-gold-400/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <span className="relative flex items-center gap-3 text-xl uppercase tracking-[0.3em] font-serif text-gold-400 group-hover:text-gold-300 transition-colors duration-500">
                  <FaHeart className="text-red-500 animate-pulse-slow" />
                  One Last Surprise
                  <FaHeart className="text-red-500 animate-pulse-slow" />
                </span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.5, type: "spring", damping: 15 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 2, -2, 0],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="mb-12 relative"
              >
                <div className="absolute inset-0 bg-gold-400/20 blur-[60px] rounded-full" />
                <h2 className="text-6xl md:text-8xl font-bold font-serif text-gold-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.6)] relative z-10">
                  Happy Birthday ❤️
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="glass-panel p-8 md:p-14 rounded-3xl border border-gold-400/30 max-w-3xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <p className="text-2xl md:text-4xl text-white font-serif font-light leading-relaxed italic text-glow relative z-10">
                  "{content.finalMessage}"
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
                className="mt-12"
              >
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 rounded-full border border-white/20 text-white/50 hover:text-gold-400 hover:border-gold-400/50 transition-colors uppercase tracking-[0.2em] text-xs font-sans"
                >
                  Replay Journey
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-auto border-t border-white/10 pt-8 pb-4 relative z-20"
      >
        <p className="text-white/60 text-xs md:text-sm tracking-[0.2em] font-light uppercase flex items-center justify-center gap-3 font-sans">
          Made with endless love <FaHeart className="text-red-500/80 text-sm animate-bounce" />
        </p>
      </motion.div>

    </section>
  );
};

export default Footer;
