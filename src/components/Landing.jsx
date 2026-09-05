import React from 'react';
import { motion } from 'framer-motion';
import { FaGift } from 'react-icons/fa';

const Landing = ({ onOpenGift }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-navy-900">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/30 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/30 rounded-full blur-[120px]"
        />
      </div>

      <div className="z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <h1 className="text-3xl md:text-5xl font-light text-white mb-12 tracking-wide">
            ✨ Someone Special Has A <span className="text-gold-400 font-medium">Surprise</span> Waiting...
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <button
            onClick={onOpenGift}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-medium tracking-wide text-white transition-all duration-500 ease-out bg-transparent border-2 border-gold-400 rounded-full hover:bg-gold-400/10 hover:shadow-[0_0_40px_rgba(250,204,21,0.4)] overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
            <motion.span 
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
              className="relative flex items-center gap-3 text-lg"
            >
              <FaGift className="text-xl text-gold-400 group-hover:text-gold-300" />
              Open Your Gift
            </motion.span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
