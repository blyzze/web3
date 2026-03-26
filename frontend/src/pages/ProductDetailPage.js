import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { products } from '../data/products';

export default function ProductDetailPage() {
  const { lang, t } = useLang();
  const { productId } = useParams();
  const product = products[productId];

  if (!product) {
    return (
      <div className="pt-20 bg-[#0A0A0A] min-h-screen flex items-center justify-center">
        <p className="text-zinc-400 font-ibm">Product not found</p>
      </div>
    );
  }

  const specLabels = t.productDetail;
  const features = lang === 'tr' ? product.features_tr : product.features_en;

  return (
    <div data-testid="product-detail-page" className="pt-20 bg-[#0A0A0A] min-h-screen">
      {/* Banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex items-end pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Link
              to={`/products/${product.category}`}
              data-testid="product-back-link"
              className="inline-flex items-center gap-2 text-sm text-[#FF6200] hover:underline font-ibm mb-4"
            >
              <ArrowLeft size={14} /> {specLabels.back}
            </Link>
            <h1 className="font-barlow text-5xl md:text-6xl uppercase tracking-tighter font-black text-white">
              {product.name}
            </h1>
            <p className="text-lg text-zinc-300 font-ibm mt-2">
              {lang === 'tr' ? product.subtitle_tr : product.subtitle_en}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Specs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-barlow text-2xl md:text-3xl uppercase tracking-tight font-bold text-white mb-8">
              {specLabels.specs}
            </h2>
            <div className="border border-zinc-800">
              {Object.entries(product.specs).map(([key, value], i) => (
                <div
                  key={key}
                  data-testid={`spec-${key}`}
                  className={`flex items-center justify-between p-4 ${
                    i % 2 === 0 ? 'bg-[#141414]' : 'bg-[#0A0A0A]'
                  } border-b border-zinc-800 last:border-b-0`}
                >
                  <span className="text-sm text-zinc-400 font-ibm uppercase tracking-wider">
                    {specLabels[key] || key}
                  </span>
                  <span className="text-sm text-white font-ibm font-semibold">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-barlow text-2xl md:text-3xl uppercase tracking-tight font-bold text-white mb-8">
              {specLabels.features}
            </h2>
            <div className="space-y-4">
              {features.map((feature, i) => (
                <div
                  key={i}
                  data-testid={`feature-${i}`}
                  className="flex items-start gap-4 p-4 bg-[#141414] border border-zinc-800"
                >
                  <div className="w-8 h-8 bg-[#FF6200]/10 border border-[#FF6200]/30 flex items-center justify-center shrink-0">
                    <span className="text-[#FF6200] text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="text-sm text-zinc-300 font-ibm leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              to={`/quote?product=${product.name}`}
              data-testid="product-get-quote"
              className="mt-8 inline-block bg-[#FF6200] hover:bg-[#E65800] text-white px-10 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-200"
            >
              {specLabels.getQuote}
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
