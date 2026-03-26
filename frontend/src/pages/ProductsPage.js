import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { products, categoryImages, getProductsByCategory } from '../data/products';

const categoryIds = ['soil-preparation', 'potato-planters', 'potato-harvesters', 'onion-harvesters'];

export default function ProductsPage() {
  const { lang, t } = useLang();
  const { categoryId } = useParams();

  // Single category view
  if (categoryId) {
    const catProducts = getProductsByCategory(categoryId);
    const cat = t.products.categories[categoryId];

    return (
      <div data-testid="products-category-page" className="pt-20 bg-[#0A0A0A] min-h-screen">
        {/* Banner */}
        <div className="relative h-64 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${categoryImages[categoryId]})` }}
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <Link to="/products" className="text-sm text-[#FF6200] hover:underline font-ibm mb-3 inline-block" data-testid="back-to-products">
                &larr; {t.productDetail.back}
              </Link>
              <h1 className="font-barlow text-4xl md:text-5xl uppercase tracking-tighter font-black text-white">
                {cat?.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {catProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={`/product/${product.id}`}
                  data-testid={`product-item-${product.id}`}
                  className="block border border-zinc-800 hover:border-[#FF6200] transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6 bg-[#141414]">
                    <h3 className="font-barlow text-xl uppercase tracking-tight font-bold text-white group-hover:text-[#FF6200] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-zinc-400 font-ibm mt-1">
                      {lang === 'tr' ? product.subtitle_tr : product.subtitle_en}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-[#FF6200] uppercase tracking-wider font-bold font-ibm">
                      {t.products.explore} <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // All categories view
  return (
    <div data-testid="products-page" className="pt-20 bg-[#0A0A0A] min-h-screen">
      {/* Banner */}
      <div className="relative h-64 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${categoryImages['soil-preparation']})` }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <p className="text-sm uppercase tracking-[0.2em] text-[#FF6200] font-bold mb-3 font-ibm">
              {t.products.overline}
            </p>
            <h1 className="font-barlow text-5xl md:text-6xl uppercase tracking-tighter font-black text-white">
              {t.products.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categoryIds.map((catId, i) => {
            const cat = t.products.categories[catId];
            const prods = getProductsByCategory(catId);

            return (
              <motion.div
                key={catId}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Link
                  to={`/products/${catId}`}
                  data-testid={`category-link-${catId}`}
                  className="block border border-zinc-800 hover:border-[#FF6200] transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={categoryImages[catId]}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h2 className="font-barlow text-2xl md:text-3xl uppercase tracking-tight font-bold text-white group-hover:text-[#FF6200] transition-colors">
                        {cat.name}
                      </h2>
                      <p className="text-sm text-zinc-400 font-ibm mt-1">{cat.desc}</p>
                      <p className="text-xs text-zinc-500 font-ibm mt-2">{prods.length} {lang === 'tr' ? 'ürün' : 'products'}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
