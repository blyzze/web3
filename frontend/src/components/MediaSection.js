import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { motion } from 'framer-motion';

const mediaItems = [
  {
    image: "https://images.pexels.com/photos/1719669/pexels-photo-1719669.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    key: "news",
  },
  {
    image: "https://images.unsplash.com/photo-1706862609885-7771b001daa2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHw0fHx0cmFjdG9yJTIwZmllbGQlMjBzdW5zZXR8ZW58MHx8fHwxNzc0NTY2ODQ2fDA&ixlib=rb-4.1.0&q=85",
    key: "photos",
  },
  {
    image: "https://images.pexels.com/photos/1000057/pexels-photo-1000057.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    key: "videos",
  },
];

export default function MediaSection() {
  const { t } = useLang();

  return (
    <section data-testid="media-section" className="bg-[#141414] py-24 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#FF6200] font-bold mb-4 font-ibm">
              {t.media.overline}
            </p>
            <h2 className="font-barlow text-4xl md:text-5xl uppercase tracking-tight font-bold text-white">
              {t.media.title}
            </h2>
          </div>
          <Link
            to="/media"
            data-testid="media-view-all"
            className="mt-6 md:mt-0 text-[#FF6200] hover:text-[#E65800] text-sm uppercase tracking-wider font-bold transition-colors"
          >
            {t.media.viewAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mediaItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group"
            >
              <div
                data-testid={`media-card-${i}`}
                className="relative overflow-hidden border border-zinc-800 hover:border-[#FF6200] transition-all duration-300 aspect-[4/3] cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={t.media[item.key]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-barlow text-xl uppercase tracking-tight font-semibold text-white">
                    {t.media[item.key]}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
