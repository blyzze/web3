import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categoryImages } from '../data/products';

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

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {categoryIds.map((catId, i) => {
            const cat = t.products.categories[catId];
            const isLarge = i === 0 || i === 3;
            const colSpan = isLarge ? 'md:col-span-7' : 'md:col-span-5';

            return (
              <motion.div
                key={catId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`${colSpan} group`}
              >
                <Link
                  to={`/products/${catId}`}
                  data-testid={`product-card-${catId}`}
                  className="block relative overflow-hidden border border-zinc-800 hover:border-[#FF6200] transition-all duration-300 h-80"
                >
                  <img
                    src={categoryImages[catId]}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xs uppercase tracking-[0.15em] text-[#FF6200] font-bold mb-2 font-ibm">
                      {cat.desc}
                    </p>
                    <h3 className="font-barlow text-2xl md:text-3xl uppercase tracking-tight font-semibold text-white group-hover:text-[#FF6200] transition-colors">
                      {cat.name}
                    </h3>
                    <div className="mt-4 flex items-center gap-2 text-sm text-white/70 group-hover:text-[#FF6200] transition-colors font-ibm">
                      {t.products.explore} <ArrowRight size={14} />
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
