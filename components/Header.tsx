import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSelector from './LanguageSelector';

const CloudIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
);


const Header: React.FC = () => {
  const { t } = useTranslation();
  return (
    <header className="relative text-center p-4 sm:p-6 animate-fade-in-down">
       <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      <div className="flex items-center justify-center gap-4 mb-2">
        <CloudIcon />
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 font-display">
          {t('header.title')}
        </h1>
      </div>
      <p className="text-md sm:text-lg text-gray-500">
        {t('header.subtitle')}
      </p>
    </header>
  );
};

export default Header;