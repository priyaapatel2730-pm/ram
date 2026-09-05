import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ParticleBackground = ({ slideId }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      
      let count = 20;
      let colors = ['rgba(255,255,255,0.2)'];

      switch(slideId) {
        case 'hero':
          count = 40;
          colors = ['rgba(250,204,21,0.3)', 'rgba(255,255,255,0.4)', 'rgba(168,85,247,0.2)'];
          break;
        case 'twelve-sentences':
          count = 30;
          colors = ['rgba(168,85,247,0.3)', 'rgba(250,204,21,0.2)', 'rgba(236,72,153,0.15)'];
          break;
        case 'cinematic-gallery':
          count = 15;
          colors = ['rgba(255,255,255,0.1)', 'rgba(250,204,21,0.1)'];
          break;
        case 'letter':
          count = 35;
          colors = ['rgba(239,68,68,0.3)', 'rgba(250,204,21,0.2)', 'rgba(236,72,153,0.2)'];
          break;
        case 'footer':
          count = 50;
          colors = ['rgba(250,204,21,0.5)', 'rgba(168,85,247,0.5)', 'rgba(236,72,153,0.5)', 'rgba(59,130,246,0.3)'];
          break;
        default:
          count = 20;
      }

      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: Math.random() * 20 + 10,
          delay: Math.random() * 5
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, [slideId]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={`${slideId}-${p.id}`}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.1, 0.8, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
