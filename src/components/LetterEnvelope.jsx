import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import { FaEnvelope, FaTimes, FaChevronRight, FaHeart } from 'react-icons/fa';

const LetterEnvelope = ({ nextSlide }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasRead, setHasRead] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setHasRead(true);
  };

  const paragraphs = content.letterParagraphs || [];

  return (
    <section className="min-h-full flex flex-col items-center justify-center py-20 relative z-10 px-4">
      <div className="container mx-auto max-w-4xl flex flex-col items-center flex-grow justify-center">
        
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: [0, -5, 0] }}
          transition={{ 
            duration: 1,
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            A Letter For <span className="text-gold-400">You</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto opacity-70" />
        </motion.div>

        <div className="relative w-full max-w-2xl flex items-center justify-center perspective-[2000px]">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="envelope"
                initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 1.2, rotateX: -20, filter: 'blur(20px)' }}
                transition={{ duration: 1, type: "spring", bounce: 0.3 }}
                onClick={() => setIsOpen(true)}
                className="cursor-pointer group relative w-full max-w-md transform-gpu"
              >
                <div className="absolute inset-0 bg-gold-400/20 blur-[80px] rounded-full group-hover:bg-gold-400/40 transition-colors duration-700 -z-10" />
                
                <div className="relative glass-dark border border-white/20 p-12 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center text-gold-400 transform group-hover:-translate-y-4 transition-all duration-700 ease-out">
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-red-700 to-red-900 border-2 border-red-950 flex items-center justify-center z-20 shadow-[0_10px_20px_rgba(153,27,27,0.5)] transform group-hover:scale-110 transition-transform duration-500">
                    <span className="text-gold-200 text-[10px] md:text-xs tracking-widest font-serif drop-shadow-md">SEALED</span>
                  </div>
                  
                  <FaEnvelope className="text-8xl md:text-9xl mb-6 opacity-80 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]" />
                  <p className="text-white/80 font-serif font-light tracking-[0.2em] md:tracking-[0.3em] uppercase mt-4 md:mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Tap to Open</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="letter"
                initial={{ opacity: 0, scale: 0.8, y: 100, rotateX: 45 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1.2, type: "spring", damping: 20 }}
                className="w-full relative z-30"
              >
                {/* Paper-like letter */}
                <div className="bg-[#fdf8f0] rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-amber-200/30 relative overflow-hidden p-8 md:p-14">
                  
                  {/* Paper texture overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")' }} />
                  
                  {/* Decorative heart at top */}
                  <div className="flex justify-center mb-8">
                    <FaHeart className="text-red-400/60 text-3xl" />
                  </div>

                  {/* Letter paragraphs */}
                  <div className="space-y-6">
                    {paragraphs.map((paragraph, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 + index * 0.4 }}
                        className="text-gray-700 font-serif text-lg md:text-xl leading-relaxed italic"
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>

                  {/* Sign-off */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + paragraphs.length * 0.4, duration: 1 }}
                    className="mt-10 text-right"
                  >
                    <p className="text-gray-500 font-serif text-lg italic">Premathoo,</p>
                    <p className="text-gray-700 font-serif text-2xl mt-2 font-bold"> MC❤️</p>
                  </motion.div>
                </div>
                
                <div className="flex justify-center mt-8">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClose}
                    className="flex items-center gap-2 text-white/50 hover:text-gold-400 text-xs md:text-sm tracking-[0.2em] font-sans uppercase transition-colors px-6 py-3 rounded-full border border-white/10 hover:border-gold-400/30 glass"
                  >
                    <FaTimes /> Close Letter
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="h-24 mt-12 flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          {(!isOpen && hasRead) && (
            <motion.button 
              key="next-btn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              onClick={nextSlide}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-medium tracking-widest text-black transition-all duration-300 ease-out bg-gold-400 rounded-full hover:bg-gold-300 hover:scale-105 shadow-[0_0_30px_rgba(250,204,21,0.6)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 font-sans text-sm md:text-base uppercase font-bold">
                One final thing... 🎁
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

    </section>
  );
};

export default LetterEnvelope;
