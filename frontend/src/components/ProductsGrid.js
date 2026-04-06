import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categoryImages, categoryMachineImages } from '../data/products';

const categoryIds = ['soil-preparation', 'potato-planters', 'potato-harvesters', 'onion-harvesters'];

export default function ProductsGrid() {
  const { t } = useLang();

  return (
    <section data-testid="products-section" className="bg-[#0A0A0A] py-24 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#FF6200] font-bold mb-4 font-ibm">
              {t.products.overline}
            </p>
            <h2 className="font-barlow text-4xl md:text-5xl uppercase tracking-tight font-bold text-white">
              {t.products.title}
            </h2>
          </div>
          <Link
            to="/products"
            data-testid="products-view-all"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-[#FF6200] hover:text-[#E65800] text-sm uppercase tracking-wider font-bold transition-colors"
          >
            {t.products.viewAll} <ArrowRight size={16} />
          </Link>
        </div>

        {/* Equal Grid - 4 columns side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryIds.map((catId, i) => {
            const cat = t.products.categories[catId];

            return (
              <motion.div
                key={catId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group"
              >
                <Link
                  to={`/products/${catId}`}
                  data-testid={`product-card-${catId}`}
                  className="block relative overflow-hidden border border-zinc-800 hover:border-[#FF6200] transition-all duration-300 h-96"
                >
                  {/* Background Image */}
                  <img
                    src={categoryImages[catId]}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/95 group-hover:via-black/70 group-hover:to-black/50 transition-all duration-500" />

                  {/* Machine Image - appears on hover (hmsagro style) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                    <img
                      src={categoryMachineImages[catId]}
                      alt={cat.name}
                      className="w-[75%] max-h-[55%] object-contain opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out transform translate-y-12 group-hover:translate-y-[-10%] drop-shadow-[0_0_30px_rgba(255,98,0,0.3)]"
                      style={{ filter: 'drop-shadow(0 8px 30px rgba(0,0,0,0.8))' }}
                    />
                  </div>

                  {/* Text Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#FF6200] font-bold mb-1.5 font-ibm">
                      {cat.desc}
                    </p>
                    <h3 className="font-barlow text-lg md:text-xl uppercase tracking-tight font-semibold text-white group-hover:text-[#FF6200] transition-colors leading-tight">
                      {cat.name}
                    </h3>
                    <div className="mt-3 flex items-center gap-2 text-xs text-white/70 group-hover:text-[#FF6200] transition-colors font-ibm">
                      {t.products.explore} <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
