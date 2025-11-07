import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as id from '../locales/id';
import * as en from '../locales/en';
import * as cn from '../locales/cn';

const translations = { id, en, cn };

type Language = keyof typeof translations;

interface InterpolationOptions {
  [key: string]: string | number;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, options?: InterpolationOptions) => string;
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

  const t = (key: string, options?: InterpolationOptions): string => {
    const languageData = translations[language]?.default || {};
    let translation = getNestedTranslation(languageData, key);

    if (options && typeof translation === 'string') {
        Object.keys(options).forEach((key) => {
            const regex = new RegExp(`{${key}}`, 'g');
            translation = translation.replace(regex, String(options[key]));
        });
    }

    return translation;
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