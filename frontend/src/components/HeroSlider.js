import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const heroImages = [
  "https://images.pexels.com/photos/1719669/pexels-photo-1719669.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.unsplash.com/photo-1706862609885-7771b001daa2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHw0fHx0cmFjdG9yJTIwZmllbGQlMjBzdW5zZXR8ZW58MHx8fHwxNzc0NTY2ODQ2fDA&ixlib=rb-4.1.0&q=85",
  "https://images.pexels.com/photos/1000057/pexels-photo-1000057.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
];

export default function HeroSlider() {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const slides = t.hero.slides;

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = () => {
    setCurrent(prev => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const ctas = ['/products', '/quote', '/about'];

  return (
    <section data-testid="hero-slider" className="relative h-screen w-full overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImages[current]})` }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-sm uppercase tracking-[0.2em] text-[#FF6200] font-bold mb-4 font-ibm"
              >
                {slides[current].overline}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="font-barlow text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter font-black text-white mb-8 leading-[0.95]"
              >
                {slides[current].title}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Link
                  to={ctas[current]}
                  data-testid={`hero-cta-${current}`}
                  className="inline-block bg-[#FF6200] hover:bg-[#E65800] text-white px-10 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5"
                >
                  {slides[current].cta}
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-2">
        <button
          onClick={prev}
          data-testid="hero-prev"
          className="w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-[#FF6200] hover:border-[#FF6200] transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          data-testid="hero-next"
          className="w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-[#FF6200] hover:border-[#FF6200] transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            data-testid={`hero-dot-${i}`}
            className={`h-1 transition-all duration-300 ${
              i === current ? 'w-12 bg-[#FF6200]' : 'w-6 bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
