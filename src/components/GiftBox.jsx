import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FaGift } from 'react-icons/fa';

const GiftBox = ({ onOpened }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    // Fire confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#facc15', '#a855f7', '#ec4899', '#3b82f6']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#facc15', '#a855f7', '#ec4899', '#3b82f6']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => {
      onOpened();
    }, 2500); // Transition to next view after a delay
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-navy-900 overflow-hidden">
      {/* Dynamic Background */}
      <motion.div 
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent"
      />
      
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 1.5, opacity: 0, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 12, stiffness: 100, exit: { duration: 1.5 } }}
            className="cursor-pointer group relative"
            onClick={handleOpen}
          >
            {/* Glow effect behind gift */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gold-400 rounded-full blur-[50px] -z-10 group-hover:blur-[70px] transition-all duration-500"
            />
            
            <motion.div
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
              className="relative text-gold-400 text-9xl drop-shadow-[0_0_30px_rgba(250,204,21,0.6)]"
            >
              <FaGift />
            </motion.div>
            
            <motion.p 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white text-center mt-8 font-light tracking-widest text-lg"
            >
              Click to Open
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Opening Light Burst */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-64 h-64 bg-white rounded-full blur-[100px]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GiftBox;
