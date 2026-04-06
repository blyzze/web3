import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';

export default function Navbar() {
  const { lang, cycleLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/products', label: t.nav.products },
    { to: '/media', label: t.nav.media },
  ];

  return (
    <nav
      data-testid="navbar"
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-zinc-800' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" data-testid="logo-link">
            <img
              src="https://customer-assets.emergentagent.com/job_doc-site-3/artifacts/hzesijqd_Gemini_Generated_Image_8cvufn8cvufn8cvu%20%281%29.png"
              alt="Mestar Logo"
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                data-testid={`nav-link-${link.to.replace('/', '') || 'home'}`}
                className={`text-sm uppercase tracking-wider font-medium transition-colors duration-200 hover:text-[#FF6200] ${
                  location.pathname === link.to ? 'text-[#FF6200]' : 'text-zinc-300'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Language Toggle */}
            <button
              onClick={cycleLang}
              data-testid="language-toggle"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-[#FF6200] transition-colors"
            >
              <Globe size={16} />
              <span className="font-semibold">{lang === 'tr' ? 'EN' : lang === 'en' ? 'AR' : 'TR'}</span>
            </button>

            {/* CTA */}
            <Link
              to="/quote"
              data-testid="nav-quote-btn"
              className="bg-[#FF6200] hover:bg-[#E65800] text-white px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-200"
            >
              {t.nav.quote}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="mobile-menu-toggle"
            className="md:hidden text-white"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div data-testid="mobile-menu" className="md:hidden bg-[#0A0A0A] border-t border-zinc-800">
          <div className="px-4 py-6 space-y-4">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="block text-sm uppercase tracking-wider text-zinc-300 hover:text-[#FF6200] py-2"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={cycleLang}
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-[#FF6200] py-2"
            >
              <Globe size={16} />
              <span>{lang === 'tr' ? 'English' : lang === 'en' ? 'العربية' : 'Türkçe'}</span>
            </button>
            <Link
              to="/quote"
              className="block bg-[#FF6200] text-white text-center px-6 py-3 text-sm font-bold uppercase tracking-wider"
            >
              {t.nav.quote}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
