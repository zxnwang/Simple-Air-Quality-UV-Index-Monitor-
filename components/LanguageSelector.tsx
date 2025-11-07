import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  const languages = [
    { code: 'id', label: 'ID' },
    { code: 'en', label: 'EN' },
    { code: 'cn', label: '中文' },
  ];

  return (
    <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-md">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as 'id' | 'en' | 'cn')}
          className={`px-3 py-1 text-sm font-bold rounded-full transition-colors duration-300 ${
            language === lang.code
              ? 'bg-blue-600 text-white shadow'
              : 'text-gray-600 hover:bg-blue-100'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
