import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const FloatingText = ({ text }) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <p className="text-3xl md:text-5xl lg:text-6xl text-gold-400 font-serif font-light leading-relaxed italic drop-shadow-[0_0_15px_rgba(250,204,21,0.3)] tracking-wide">
      "{text}"
    </p>
  </motion.div>
);

const TwelveSentences = ({ nextSlide }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sentences = content.twelveSentences || [];
  
  const handleNext = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const isLast = currentIndex === sentences.length - 1;

  return (
    <section className="min-h-full flex flex-col items-center justify-center relative z-10 px-4 py-20">
      <div className="container mx-auto max-w-4xl text-center flex-grow flex flex-col justify-center relative">
        
        {/* Navigation Arrows */}
        {currentIndex > 0 && (
          <button 
            onClick={handlePrev}
            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/5 hover:bg-white/20 text-white/50 hover:text-white transition-all backdrop-blur-md"
          >
            <FaChevronLeft className="text-xl md:text-2xl" />
          </button>
        )}
        
        {!isLast && (
          <button 
            onClick={handleNext}
            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/5 hover:bg-white/20 text-white/50 hover:text-white transition-all backdrop-blur-md"
          >
            <FaChevronRight className="text-xl md:text-2xl" />
          </button>
        )}

        <div className="px-12 md:px-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <FloatingText text={sentences[currentIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      <div className="h-24 mt-12 flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          {isLast && (
            <motion.button 
              key="next-btn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              onClick={nextSlide}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-medium tracking-widest text-black transition-all duration-300 ease-out bg-gold-400 rounded-full hover:bg-gold-300 hover:scale-105 shadow-[0_0_20px_rgba(250,204,21,0.5)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 font-sans text-sm md:text-base uppercase font-bold">
                 Every photo holds a first, and every first holds a memory I’d love to relive with you❤️
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
        {sentences.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-700 ease-out ${
              idx === currentIndex ? 'bg-gold-400 w-8 shadow-[0_0_10px_rgba(250,204,21,0.8)]' : 'bg-white/20 w-2'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default TwelveSentences;
