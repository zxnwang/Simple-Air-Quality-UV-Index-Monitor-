import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as id from '../locales/id';
import * as en from '../locales/en';
import * as cn from '../locales/cn';

const translations = { id, en, cn };

type Language = keyof typeof translations;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  translations: any;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getNestedTranslation = (languageData: any, key: string): string => {
  return key.split('.').reduce((obj, k) => (obj && obj[k] !== 'undefined' ? obj[k] : key), languageData);
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const storedLang = localStorage.getItem('language');
    return (storedLang && storedLang in translations) ? storedLang as Language : 'id';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const languageData = translations[language]?.default || {};
    return getNestedTranslation(languageData, key);
  };

  const value = {
    language,
    setLanguage,
    t,
    translations: translations[language]?.default || {}
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};