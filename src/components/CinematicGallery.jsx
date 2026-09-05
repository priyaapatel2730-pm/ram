import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const FloatingText = ({ text }) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
  >
    <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] leading-tight tracking-wide">
      {text}
    </h2>
  </motion.div>
);

const CinematicGallery = ({ nextSlide }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const journey = content.cinematicJourney || [];

  const handleNext = () => {
    if (currentIndex < journey.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const isLast = currentIndex === journey.length - 1;

  return (
    <section className="min-h-full w-full relative overflow-hidden bg-black">
      
      {/* Background Image with Ken Burns effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <motion.div 
            animate={{ scale: [1, 1.1] }}
            transition={{ duration: 10, ease: "linear" }}
            className="w-full h-full"
          >
            <img 
              src={journey[currentIndex].image} 
              alt="Memory" 
              className="w-full h-full object-cover opacity-50"
            />
            {/* Vignette & Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/90" />
            <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] pointer-events-none" />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 min-h-full flex flex-col items-center justify-center container mx-auto px-4 py-20">
        
        {/* Navigation Arrows */}
        {currentIndex > 0 && (
          <button 
            onClick={handlePrev}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-30 p-4 md:p-6 rounded-full text-white/30 hover:text-white transition-all drop-shadow-lg"
          >
            <FaChevronLeft className="text-3xl md:text-5xl" />
          </button>
        )}
        
        {!isLast && (
          <button 
            onClick={handleNext}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-30 p-4 md:p-6 rounded-full text-white/30 hover:text-white transition-all drop-shadow-lg"
          >
            <FaChevronRight className="text-3xl md:text-5xl" />
          </button>
        )}

        <div className="px-16 md:px-32 text-center flex-grow flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center gap-8"
            >
              <FloatingText text={journey[currentIndex].sentence} />
              
              {/* Optional Link (e.g. Instagram Reel) */}
              {journey[currentIndex].link && (
                <motion.a
                  href={journey[currentIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-sans font-bold text-sm md:text-base uppercase tracking-widest shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:shadow-[0_0_50px_rgba(236,72,153,0.8)] hover:scale-105 transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  {journey[currentIndex].linkText || "Watch Now ▶️"}
                </motion.a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="h-24 mt-12 flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {isLast && (
              <motion.button 
                key="next-btn"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                onClick={nextSlide}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-medium tracking-widest text-black transition-all duration-300 ease-out bg-gold-400 rounded-full hover:bg-gold-300 hover:scale-105 shadow-[0_0_30px_rgba(250,204,21,0.6)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2 font-sans text-sm md:text-base uppercase font-bold">
                  This one is for you straight from my heart 💌
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaChevronRight />
                  </motion.div>
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        
        {/* Progress Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
          {journey.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-700 ease-out ${
                idx === currentIndex ? 'bg-gold-400 w-10 shadow-[0_0_15px_rgba(250,204,21,0.8)]' : 'bg-white/30 w-3'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CinematicGallery;
