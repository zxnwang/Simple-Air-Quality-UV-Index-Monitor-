import React from 'react';

interface DataCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: React.ReactNode;
  colorClass: string;
  description: string;
  level?: { text: string; color: string };
  onClick?: () => void;
}

const DataCard: React.FC<DataCardProps> = ({ title, value, unit, icon, colorClass, description, level, onClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between transition-transform duration-300 hover:scale-105 hover:shadow-xl h-full cursor-pointer" onClick={onClick}>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-700 font-display">{title}</h3>
          <div className={`${colorClass} p-2 rounded-full`}>
            {icon}
          </div>
        </div>
        <div className="flex items-baseline gap-x-3">
          <div className="text-4xl font-bold text-gray-800">
            {value}
            <span className="text-xl font-semibold text-gray-500 ml-1">{unit}</span>
          </div>
          {level && level.text !== "N/A" && (
            <div className={`px-3 py-1 rounded-full text-sm font-bold text-white ${level.color}`}>
              {level.text}
            </div>
          )}
        </div>
      </div>
       <p className="text-sm text-gray-500 mt-4">{description}</p>
    </div>
  );
};

export default DataCard;