import React from 'react';
import { useLang } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const galleryImages = [
  { src: "https://images.pexels.com/photos/1719669/pexels-photo-1719669.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Tractor sunset" },
  { src: "https://images.unsplash.com/photo-1706862609885-7771b001daa2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHw0fHx0cmFjdG9yJTIwZmllbGQlMjBzdW5zZXR8ZW58MHx8fHwxNzc0NTY2ODQ2fDA&ixlib=rb-4.1.0&q=85", alt: "Tractor field" },
  { src: "https://images.pexels.com/photos/1000057/pexels-photo-1000057.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Plowed farmland" },
  { src: "https://images.unsplash.com/photo-1643456457241-745a30930c17?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHwzfHxhZ3JpY3VsdHVyZSUyMG1hY2hpbmVyeXxlbnwwfHx8fDE3NzQ1NjY4NDd8MA&ixlib=rb-4.1.0&q=85", alt: "Agriculture machinery" },
  { src: "https://images.unsplash.com/photo-1594771804886-a933bb2d609b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHwyfHxhZ3JpY3VsdHVyZSUyMG1hY2hpbmVyeXxlbnwwfHx8fDE3NzQ1NjY4NDd8MA&ixlib=rb-4.1.0&q=85", alt: "Harvester" },
  { src: "https://images.pexels.com/photos/4553070/pexels-photo-4553070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", alt: "Potato harvester" },
];

export default function MediaPage() {
  const { t } = useLang();

  return (
    <div data-testid="media-page" className="pt-20 bg-[#0A0A0A] min-h-screen">
      {/* Banner */}
      <div className="relative h-56 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${galleryImages[0].src})` }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <p className="text-sm uppercase tracking-[0.2em] text-[#FF6200] font-bold mb-3 font-ibm">
              {t.media.overline}
            </p>
            <h1 className="font-barlow text-5xl md:text-6xl uppercase tracking-tighter font-black text-white">
              {t.media.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group"
            >
              <div
                data-testid={`gallery-item-${i}`}
                className="relative overflow-hidden border border-zinc-800 hover:border-[#FF6200] transition-all duration-300 aspect-[4/3]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
