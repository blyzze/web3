import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const { t } = useLang();

  return (
    <div data-testid="about-page" className="pt-20 bg-[#0A0A0A] min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-72 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1000057/pexels-photo-1000057.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)' }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <p className="text-sm uppercase tracking-[0.2em] text-[#FF6200] font-bold mb-3 font-ibm">
              {t.about.overline}
            </p>
            <h1 className="font-barlow text-5xl md:text-6xl uppercase tracking-tighter font-black text-white">
              {t.about.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-base leading-relaxed text-zinc-400 font-ibm mb-8">
              {t.about.description}
            </p>
            <div className="border-l-2 border-[#FF6200] pl-6">
              <h3 className="font-barlow text-2xl uppercase tracking-tight font-semibold text-white mb-4">
                {t.about.vision}
              </h3>
              <p className="text-sm text-zinc-400 font-ibm leading-relaxed">
                {t.about.visionText}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '12+', label: t.stats.products },
                { value: '50+', label: t.stats.experience },
                { value: '10+', label: t.stats.countries },
                { value: '15+', label: t.stats.employees },
              ].map((stat, i) => (
                <div key={i} className="bg-[#141414] border border-zinc-800 p-6 text-center">
                  <span className="font-barlow text-3xl font-black text-[#FF6200]">{stat.value}</span>
                  <p className="text-xs uppercase tracking-[0.15em] text-zinc-500 mt-2 font-ibm font-semibold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-[#141414] border border-zinc-800 p-8">
              <h4 className="font-barlow text-lg uppercase tracking-tight font-bold text-white mb-4">
                {t.footer.contactInfo}
              </h4>
              <div className="space-y-3 text-sm text-zinc-400 font-ibm">
                <p>{t.footer.address}</p>
                <p>+90 332 251 20 97</p>
                <p>info@mestaragro.com.tr</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
