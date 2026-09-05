import React from 'react';
import { motion } from 'framer-motion';
import { content } from '../data/content';
import { FaChevronRight } from 'react-icons/fa';

const splitText = (text) => {
  return text.split('').map((char, index) => (
    <motion.span
      key={index}
      initial={{ opacity: 0, y: 50, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.05 + 0.5, 
        type: "spring", 
        damping: 12 
      }}
      className="inline-block"
      style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
    >
      {char}
    </motion.span>
  ));
};

const Hero = ({ nextSlide }) => {
  return (
    <section className="relative min-h-full flex items-center justify-center overflow-hidden py-10 perspective-1000">
      <div className="container mx-auto px-4 z-10 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", type: "spring", damping: 20 }}
          className="relative mb-12 group"
        >
          <motion.div 
            animate={{ 
              boxShadow: ['0 0 20px rgba(250,204,21,0.2)', '0 0 60px rgba(250,204,21,0.6)', '0 0 20px rgba(250,204,21,0.2)']
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-gold-400/50 relative z-10 p-2"
          >
            <div className="w-full h-full rounded-full overflow-hidden">
              <img 
                src={content.heroImage} 
                alt="Hero" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1530103862676-de8892795492?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -5, 0] }}
          transition={{ 
            duration: 1, 
            delay: 0.2,
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <h2 className="text-xl md:text-3xl text-gold-400 font-serif font-light mb-4 tracking-[0.3em] uppercase">
            {content.heroTitle}
          </h2>
        </motion.div>

        <div className="min-h-[80px] md:min-h-[112px] flex items-center justify-center w-full overflow-hidden perspective-[1000px]">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold font-serif text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            {splitText(content.brotherName)}
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: [0, -5, 0] }}
          transition={{ 
            duration: 1.5, 
            delay: 1.5,
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
          }}
          className="max-w-2xl mt-4 mb-16"
        >
          <p className="text-lg md:text-2xl text-white/90 font-light leading-relaxed font-serif italic drop-shadow-md">
            {content.heroSubtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <button 
            onClick={nextSlide}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-medium tracking-widest text-black transition-all duration-300 ease-out bg-gold-400 rounded-full hover:bg-gold-300 hover:scale-105 shadow-[0_0_20px_rgba(250,204,21,0.5)] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2 font-sans text-sm md:text-base uppercase font-bold tracking-widest">
              I have something to tell you ✨
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </span>
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
