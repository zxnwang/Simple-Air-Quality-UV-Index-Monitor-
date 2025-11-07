import React from 'react';
import type { IndonesianCity } from '../types';
import { indonesianCities } from '../data/cities';

interface CitySelectorProps {
  selectedCity: IndonesianCity;
  onCityChange: (city: IndonesianCity) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ selectedCity, onCityChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = indonesianCities.find(city => city.name === event.target.value);
    if (selected) {
      onCityChange(selected);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-6">
      <label htmlFor="city-select" className="block text-lg font-medium text-gray-700 mb-2 font-display">
        Pilih Kota
      </label>
      <div className="relative">
        <select
          id="city-select"
          value={selectedCity.name}
          onChange={handleChange}
          className="appearance-none w-64 bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          aria-label="Pilih kota untuk melihat data"
        >
          {indonesianCities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CitySelector;
