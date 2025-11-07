export interface Location {
  latitude: number;
  longitude: number;
}

export interface IndonesianCity extends Location {
  name: string;
}

export interface AirQualityData {
  current: {
    time: string;
    interval: number;
    pm10: number;
    pm2_5: number;
    carbon_monoxide: number;
    nitrogen_dioxide: number;
    sulphur_dioxide: number;
    ozone: number;
  };
  current_units: {
    pm10: string;
    pm2_5: string;
    carbon_monoxide: string;
    nitrogen_dioxide: string;
    sulphur_dioxide: string;
    ozone: string;
  }
}

export type UvIndexData = {
  value: number;
  date_iso: string;
}[];