import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { MapPin, Phone, Mail } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const allProducts = [
  'HT475', 'SPIDER 275', 'SPIDER 475',
  'ALPHA 275', 'ALPHA 475', 'PDO-2N', 'PDO-2F', 'PDO-4N',
  'ULTRA 275', 'ULTRA 475', 'PSH-2S',
  'SSM-1400',
];

export default function QuotePage() {
  const { t } = useLang();
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get('product') || '';

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    product_interest: preselected,
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/quote`, form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', company: '', product_interest: '', message: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="quote-page" className="pt-20 bg-[#0A0A0A] min-h-screen">
      {/* Banner */}
      <div className="relative h-56 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1719669/pexels-photo-1719669.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)' }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <p className="text-sm uppercase tracking-[0.2em] text-[#FF6200] font-bold mb-3 font-ibm">
              {t.quote.overline}
            </p>
            <h1 className="font-barlow text-5xl md:text-6xl uppercase tracking-tighter font-black text-white">
              {t.quote.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-[#141414] border border-zinc-800 p-8 space-y-6">
              <h3 className="font-barlow text-xl uppercase tracking-tight font-bold text-white">
                {t.footer.contactInfo}
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#FF6200]/10 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-[#FF6200]" />
                  </div>
                  <span className="text-sm text-zinc-400 font-ibm">{t.footer.address}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#FF6200]/10 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-[#FF6200]" />
                  </div>
                  <span className="text-sm text-zinc-400 font-ibm">+90 332 251 20 97</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#FF6200]/10 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-[#FF6200]" />
                  </div>
                  <span className="text-sm text-zinc-400 font-ibm">info@mestaragro.com.tr</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            {success ? (
              <div data-testid="quote-success" className="bg-[#141414] border border-[#FF6200] p-12 text-center">
                <div className="w-16 h-16 bg-[#FF6200] flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">&#10003;</span>
                </div>
                <p className="text-lg text-white font-ibm">{t.quote.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} data-testid="quote-form" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-zinc-500 font-ibm font-semibold mb-2 block">
                      {t.quote.name} *
                    </label>
                    <Input
                      data-testid="quote-name"
                      required
                      value={form.name}
                      onChange={e => handleChange('name', e.target.value)}
                      className="bg-[#141414] border-zinc-800 text-white rounded-none h-12 focus:ring-2 focus:ring-[#FF6200] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-zinc-500 font-ibm font-semibold mb-2 block">
                      {t.quote.email} *
                    </label>
                    <Input
                      data-testid="quote-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={e => handleChange('email', e.target.value)}
                      className="bg-[#141414] border-zinc-800 text-white rounded-none h-12 focus:ring-2 focus:ring-[#FF6200] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-zinc-500 font-ibm font-semibold mb-2 block">
                      {t.quote.phone} *
                    </label>
                    <Input
                      data-testid="quote-phone"
                      required
                      value={form.phone}
                      onChange={e => handleChange('phone', e.target.value)}
                      className="bg-[#141414] border-zinc-800 text-white rounded-none h-12 focus:ring-2 focus:ring-[#FF6200] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-zinc-500 font-ibm font-semibold mb-2 block">
                      {t.quote.company}
                    </label>
                    <Input
                      data-testid="quote-company"
                      value={form.company}
                      onChange={e => handleChange('company', e.target.value)}
                      className="bg-[#141414] border-zinc-800 text-white rounded-none h-12 focus:ring-2 focus:ring-[#FF6200] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-zinc-500 font-ibm font-semibold mb-2 block">
                    {t.quote.productInterest}
                  </label>
                  <Select
                    value={form.product_interest}
                    onValueChange={val => handleChange('product_interest', val)}
                  >
                    <SelectTrigger
                      data-testid="quote-product-select"
                      className="bg-[#141414] border-zinc-800 text-white rounded-none h-12 focus:ring-2 focus:ring-[#FF6200]"
                    >
                      <SelectValue placeholder={t.quote.selectProduct} />
                    </SelectTrigger>
                    <SelectContent className="bg-[#141414] border-zinc-800">
                      {allProducts.map(p => (
                        <SelectItem key={p} value={p} className="text-zinc-300 focus:bg-[#FF6200]/10 focus:text-[#FF6200]">
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-zinc-500 font-ibm font-semibold mb-2 block">
                    {t.quote.message} *
                  </label>
                  <Textarea
                    data-testid="quote-message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => handleChange('message', e.target.value)}
                    className="bg-[#141414] border-zinc-800 text-white rounded-none focus:ring-2 focus:ring-[#FF6200] focus:border-transparent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  data-testid="quote-submit"
                  className="bg-[#FF6200] hover:bg-[#E65800] disabled:opacity-50 text-white px-12 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-200"
                >
                  {loading ? '...' : t.quote.send}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
