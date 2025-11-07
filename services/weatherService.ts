
import { AirQualityData, UvIndexData } from '../types';

const AIR_QUALITY_API_BASE = 'https://air-quality-api.open-meteo.com/v1/air-quality';
const UV_INDEX_API_BASE = 'https://currentuvindex.com/api/v1/uvi';

export const fetchAirQuality = async (latitude: number, longitude: number): Promise<AirQualityData> => {
  const url = `${AIR_QUALITY_API_BASE}?latitude=${latitude}&longitude=${longitude}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch air quality data');
  }
  return response.json();
};

export const fetchUvIndex = async (latitude: number, longitude: number): Promise<UvIndexData> => {
  const url = `${UV_INDEX_API_BASE}?latitude=${latitude}&longitude=${longitude}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch UV index data');
  }
  return response.json();
};
