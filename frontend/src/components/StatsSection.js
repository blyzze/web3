import React, { useState, useEffect, useRef } from 'react';
import { useLang } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const step = Math.max(1, Math.floor(target / (duration / 16)));
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-barlow text-5xl md:text-6xl font-black text-[#FF6200]">
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const { t } = useLang();

  const stats = [
    { value: 12, suffix: "+", label: t.stats.products },
    { value: 10, suffix: "+", label: t.stats.experience },
    { value: 15, suffix: "+", label: t.stats.countries },
    { value: 50, suffix: "+", label: t.stats.employees },
  ];

  return (
    <>
      {/* Marquee */}
      <div className="bg-[#FF6200] py-4 overflow-hidden">
        <Marquee speed={60} gradient={false}>
          <span className="font-barlow text-lg md:text-xl uppercase tracking-wider font-bold text-white mx-12">
            {t.marquee}
          </span>
          <span className="text-white/60 mx-4">&mdash;</span>
          <span className="font-barlow text-lg md:text-xl uppercase tracking-wider font-bold text-white mx-12">
            MESTAR AGRICULTURAL EQUIPMENT
          </span>
          <span className="text-white/60 mx-4">&mdash;</span>
          <span className="font-barlow text-lg md:text-xl uppercase tracking-wider font-bold text-white mx-12">
            {t.marquee}
          </span>
          <span className="text-white/60 mx-4">&mdash;</span>
          <span className="font-barlow text-lg md:text-xl uppercase tracking-wider font-bold text-white mx-12">
            MADE IN TURKEY
          </span>
          <span className="text-white/60 mx-4">&mdash;</span>
        </Marquee>
      </div>

      {/* Stats */}
      <section data-testid="stats-section" className="bg-[#141414] py-20 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="text-center border-r border-zinc-800 last:border-r-0 py-6"
                data-testid={`stat-${i}`}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mt-3 font-ibm font-semibold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
