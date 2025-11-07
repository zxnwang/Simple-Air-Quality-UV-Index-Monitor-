import React, { useState, useEffect, useRef } from 'react';
import type { IndonesianCity } from '../types';
import { indonesianCities } from '../data/cities';
import { useTranslation } from '../hooks/useTranslation';

interface CitySelectorProps {
  selectedCity: IndonesianCity;
  onCityChange: (city: IndonesianCity) => void;
}

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const ChevronUpDownIcon = ({ className = '' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`h-5 w-5 text-gray-400 ${className}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
    </svg>
);

const CitySelector: React.FC<CitySelectorProps> = ({ selectedCity, onCityChange }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filteredCities = searchTerm === ''
    ? indonesianCities
    : indonesianCities.filter((city) =>
        city.name.toLowerCase().replace(/\s+/g, '').includes(searchTerm.toLowerCase().replace(/\s+/g, ''))
      );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(indonesianCities.findIndex(c => c.name === selectedCity.name) || 0);
      searchInputRef.current?.focus();
    }
  }, [isOpen, selectedCity]);
  
  const handleSelect = (city: IndonesianCity) => {
    onCityChange(city);
    setIsOpen(false);
    setSearchTerm('');
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isOpen) return;
      switch (e.key) {
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex(prev => (prev + 1) % filteredCities.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex(prev => (prev - 1 + filteredCities.length) % filteredCities.length);
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCities[highlightedIndex]) {
            handleSelect(filteredCities[highlightedIndex]);
          }
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, filteredCities, highlightedIndex]);

  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listRef.current) {
      const highlightedItem = listRef.current.children[highlightedIndex] as HTMLLIElement;
      highlightedItem?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex, isOpen]);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center my-6 animate-fade-in-up opacity-0" style={{ animationDelay: '200ms' }}>
       <label id="listbox-label" className="block text-lg font-medium text-gray-700 mb-2 font-display">
        {t('citySelector.label')}
      </label>
      <div ref={wrapperRef} className="relative mt-1 w-72">
        <button
          type="button"
          className="relative w-full cursor-default rounded-xl bg-white py-3 pl-3 pr-10 text-left shadow-lg focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm transition-shadow duration-200 hover:shadow-xl"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby="listbox-label"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="block truncate text-gray-800 font-medium">{selectedCity.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </span>
        </button>

        <div className={`absolute z-50 mt-2 w-full rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 ease-out origin-top ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <div className="p-2 sticky top-0 bg-white z-10 border-b border-gray-200">
                <div className="relative">
                     <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <SearchIcon />
                     </span>
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder={t('citySelector.searchPlaceholder')}
                      className="w-full rounded-md border-gray-300 py-2 pl-10 pr-4 focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setHighlightedIndex(0);
                      }}
                      aria-label="Cari kota"
                    />
                </div>
            </div>
            <ul
              ref={listRef}
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              className="py-1 max-h-56 overflow-auto"
            >
              {filteredCities.length > 0 ? filteredCities.map((city, index) => (
                <li
                  key={city.name}
                  id={`listbox-option-${city.name}`}
                  role="option"
                  aria-selected={city.name === selectedCity.name}
                  className={`relative cursor-pointer select-none py-2 pl-10 pr-4 text-gray-900 transition-colors duration-150 ${index === highlightedIndex ? 'bg-blue-100' : 'hover:bg-blue-50'}`}
                  onClick={() => handleSelect(city)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {city.name === selectedCity.name && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                      <CheckIcon />
                    </span>
                  )}
                  <span className={`block truncate ${city.name === selectedCity.name ? 'font-semibold' : 'font-normal'}`}>
                    {city.name}
                  </span>
                </li>
              )) : (
                 <li className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    {t('citySelector.notFound')}
                 </li>
              )
              }
            </ul>
          </div>
      </div>
    </div>
  );
};

export default CitySelector;