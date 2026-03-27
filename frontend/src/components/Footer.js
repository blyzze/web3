import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Globe, ArrowUp } from 'lucide-react';

export default function Footer() {
  const { t } = useLang();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer data-testid="footer" className="bg-[#0A0A0A] border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <img
                src="https://customer-assets.emergentagent.com/job_doc-site-3/artifacts/bk291rdd_image.png"
                alt="Mestar Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-zinc-400 font-ibm leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-3 mt-6">
              <span className="bg-[#FF6200] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                Made in Turkey
              </span>
              <span className="border border-zinc-600 text-zinc-400 text-xs font-bold px-3 py-1 uppercase tracking-wider">
                CE Certified
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-barlow text-lg uppercase tracking-tight font-bold text-white mb-6">
              {t.footer.quickLinks}
            </h4>
            <div className="space-y-3">
              {[
                { to: '/', label: t.nav.home },
                { to: '/about', label: t.nav.about },
                { to: '/products', label: t.nav.products },
                { to: '/media', label: t.nav.media },
                { to: '/quote', label: t.nav.quote },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-sm text-zinc-400 hover:text-[#FF6200] transition-colors font-ibm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-barlow text-lg uppercase tracking-tight font-bold text-white mb-6">
              {t.footer.contactInfo}
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#FF6200] mt-1 shrink-0" />
                <span className="text-sm text-zinc-400 font-ibm">{t.footer.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#FF6200] shrink-0" />
                <a href="tel:+903322512097" className="text-sm text-zinc-400 hover:text-[#FF6200] transition-colors font-ibm">
                  +90 332 251 20 97
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#FF6200] shrink-0" />
                <a href="mailto:info@mestaragro.com.tr" className="text-sm text-zinc-400 hover:text-[#FF6200] transition-colors font-ibm">
                  info@mestaragro.com.tr
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Globe size={16} className="text-[#FF6200] shrink-0" />
                <span className="text-sm text-zinc-400 font-ibm">www.mestaragro.com.tr</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <p className="text-xs text-zinc-500 font-ibm">
            &copy; {new Date().getFullYear()} Mestar Tarımsal Ekipmanlar. {t.footer.rights}
          </p>
          <button
            onClick={scrollToTop}
            data-testid="scroll-to-top"
            className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#FF6200] hover:border-[#FF6200] transition-all"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
