import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { motion } from 'framer-motion';

export default function AboutSection() {
  const { t } = useLang();

  return (
    <section data-testid="about-section" className="bg-[#0A0A0A] py-24 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-[#FF6200] font-bold mb-4 font-ibm">
              {t.about.overline}
            </p>
            <h2 className="font-barlow text-4xl md:text-5xl uppercase tracking-tight font-bold text-white mb-6">
              {t.about.title}
            </h2>
            <p className="text-base leading-relaxed text-zinc-400 font-ibm mb-8">
              {t.about.description}
            </p>
            <div className="border-l-2 border-[#FF6200] pl-6 mb-8">
              <h3 className="font-barlow text-xl uppercase tracking-tight font-semibold text-white mb-3">
                {t.about.vision}
              </h3>
              <p className="text-sm text-zinc-400 font-ibm leading-relaxed">
                {t.about.visionText}
              </p>
            </div>
            <Link
              to="/about"
              data-testid="about-read-more"
              className="inline-block border border-[#FF6200] text-[#FF6200] hover:bg-[#FF6200] hover:text-white px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300"
            >
              {t.about.readMore}
            </Link>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative overflow-hidden border border-zinc-800 aspect-[3/4]">
                  <img
                    src="https://images.pexels.com/photos/1719669/pexels-photo-1719669.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Agricultural field"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative overflow-hidden border border-zinc-800 aspect-square">
                  <img
                    src="https://images.pexels.com/photos/1000057/pexels-photo-1000057.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Plowed farmland"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="bg-[#FF6200] p-6 flex flex-col justify-center">
                  <span className="font-barlow text-4xl font-black text-white">CE</span>
                  <span className="text-xs uppercase tracking-wider text-white/80 mt-1">Certified</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
