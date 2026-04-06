import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

const langOrder = ['tr', 'en', 'ar'];

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('tr');
  const t = translations[lang];

  const cycleLang = () => {
    setLang(prev => {
      const idx = langOrder.indexOf(prev);
      return langOrder[(idx + 1) % langOrder.length];
    });
  };

  // Set RTL direction for Arabic
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, cycleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
