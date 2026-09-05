import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import LoadingScreen from './components/LoadingScreen';
import Landing from './components/Landing';
import GiftBox from './components/GiftBox';
import Hero from './components/Hero';
import TwelveSentences from './components/TwelveSentences';
import CinematicGallery from './components/CinematicGallery';
import LetterEnvelope from './components/LetterEnvelope';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';

// Backgrounds
import ParticleBackground from './components/ParticleBackground';
import FloatingWishes from './components/FloatingWishes';

const SLIDES = [
  { id: 'hero', component: Hero },
  { id: 'twelve-sentences', component: TwelveSentences },
  { id: 'cinematic-gallery', component: CinematicGallery },
  { id: 'letter', component: LetterEnvelope },
  { id: 'footer', component: Footer }
];

function App() {
  const [appState, setAppState] = useState('loading'); // loading, landing, gift, main
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      if (document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
    };
  }, []);

  const handleNextSlide = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-animated-gradient text-white selection:bg-gold-400/30 font-sans relative">
      
      <AnimatePresence mode="wait">
        {appState === 'loading' && (
          <LoadingScreen key="loading" onComplete={() => setAppState('landing')} />
        )}
        
        {appState === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="h-full w-full"
          >
            <Landing onOpenGift={() => setAppState('gift')} />
          </motion.div>
        )}

        {appState === 'gift' && (
          <motion.div
            key="gift"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
            className="h-full w-full"
          >
            <GiftBox onOpened={() => setAppState('main')} />
          </motion.div>
        )}

        {appState === 'main' && (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="h-full w-full relative"
          >
            <ParticleBackground slideId={SLIDES[currentSlide].id} />
            <FloatingWishes slideId={SLIDES[currentSlide].id} />
            
            <div className="relative z-10 h-full w-full overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 1.05 }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                  className="absolute inset-0 h-full w-full overflow-y-auto overflow-x-hidden pb-8"
                >
                  {React.createElement(SLIDES[currentSlide].component, { 
                    isActive: true, 
                    nextSlide: handleNextSlide, 
                    prevSlide: handlePrevSlide,
                    isLast: currentSlide === SLIDES.length - 1
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Global Back Button */}
            {currentSlide > 0 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handlePrevSlide}
                className="fixed top-4 left-4 md:top-8 md:left-8 z-50 glass px-4 py-2 md:px-5 md:py-3 rounded-full text-white/80 hover:text-white flex items-center gap-2 text-xs md:text-sm uppercase tracking-widest font-bold font-sans shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-white/10 transition-colors"
              >
                <span>← Back</span>
              </motion.button>
            )}

            <MusicPlayer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
