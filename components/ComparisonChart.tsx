import React from 'react';
import type { AirQualityData } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface ComparisonChartProps {
  data1: AirQualityData;
  city1Name: string;
  data2: AirQualityData;
  city2Name: string;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ data1, city1Name, data2, city2Name }) => {
  const { t } = useTranslation();

  // Fix: The original type using `keyof` on an interface was too broad, as interfaces can be augmented with symbol keys.
  // This caused TypeScript to infer that 'pollutant' could be a symbol, leading to a compile error.
  // Explicitly defining the type as a union of string literals ensures 'pollutant' is always a string and resolves the error.
  const pollutants: ('pm2_5' | 'pm10' | 'ozone' | 'carbon_monoxide' | 'nitrogen_dioxide' | 'sulphur_dioxide')[] = [
    'pm2_5', 'pm10', 'ozone', 'carbon_monoxide', 'nitrogen_dioxide', 'sulphur_dioxide'
  ];

  const allValues = pollutants.flatMap(p => {
    const v1 = data1.current[p];
    const v2 = data2.current[p];
    return [typeof v1 === 'number' ? v1 : 0, typeof v2 === 'number' ? v2 : 0];
  });
  const maxValue = Math.max(...allValues, 1); 

  return (
    <div className="mt-6 space-y-4 animate-fade-in">
      <div className="flex justify-center items-center gap-4 text-sm font-medium">
          <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-500"></div>
              <span>{city1Name}</span>
          </div>
          <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-teal-500"></div>
              <span>{city2Name}</span>
          </div>
      </div>

      <div className="space-y-5 pt-2">
        {pollutants.map(pollutant => {
          const value1 = data1.current[pollutant];
          const value2 = data2.current[pollutant];
          const unit = data1.current_units[pollutant];

          if (typeof value1 !== 'number' || typeof value2 !== 'number') return null;
          
          const width1 = Math.min((value1 / maxValue) * 100, 100);
          const width2 = Math.min((value2 / maxValue) * 100, 100);

          return (
            <div key={pollutant}>
              <div className="flex justify-between items-center mb-2 text-sm font-bold text-gray-700">
                <span>{t(`metrics.${pollutant}.title`)}</span>
                <span className="text-xs font-normal text-gray-500">{unit}</span>
              </div>
              <div className="space-y-2">
                  <div className="flex items-center text-xs">
                      <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
                          <div className="bg-blue-500 h-5 rounded-full transition-all duration-500" style={{ width: `${width1}%` }}></div>
                      </div>
                      <span className="ml-3 w-14 text-right font-semibold text-gray-800">{value1.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center text-xs">
                      <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
                          <div className="bg-teal-500 h-5 rounded-full transition-all duration-500" style={{ width: `${width2}%` }}></div>
                      </div>
                      <span className="ml-3 w-14 text-right font-semibold text-gray-800">{value2.toFixed(2)}</span>
                  </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComparisonChart;
