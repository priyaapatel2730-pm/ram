import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingWishes = ({ slideId }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let icons = [];
    switch(slideId) {
      case 'hero': icons = ['✨', '🎈', '🎉', '🥳']; break;
      case 'twelve-sentences': icons = ['💛', '⭐', '🌟', '💫']; break;
      case 'cinematic-gallery': icons = ['📸', '💖', '🌸', '💕']; break;
      case 'letter': icons = ['💌', '❤️', '🌹', '💗']; break;
      case 'footer': icons = ['🎁', '🎆', '🎊', '🎂', '🥂']; break;
      default: icons = ['✨'];
    }

    const generateItems = () => {
      const newItems = [];
      const count = slideId === 'footer' ? 12 : 8;
      for (let i = 0; i < count; i++) {
        newItems.push({
          id: i,
          icon: icons[Math.floor(Math.random() * icons.length)],
          x: Math.random() * 100,
          delay: Math.random() * 5,
          duration: Math.random() * 15 + 15,
          scale: Math.random() * 0.5 + 0.5,
        });
      }
      return newItems;
    };

    setItems(generateItems());
  }, [slideId]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 md:opacity-50">
      {items.map((item) => (
        <motion.div
          key={`${slideId}-${item.id}`}
          className="absolute text-2xl md:text-4xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          initial={{ y: "110vh", x: `${item.x}vw`, opacity: 0 }}
          animate={{
            y: "-10vh",
            x: [`${item.x}vw`, `${item.x + (Math.random() * 10 - 5)}vw`, `${item.x}vw`],
            opacity: [0, 1, 1, 0],
            rotate: Math.random() * 360
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingWishes;
