import React, { useState, useEffect, ReactNode, useCallback } from 'react';
import type { AirQualityData, UvIndexData, IndonesianCity } from './types';
import { fetchAirQuality, fetchUvIndex } from './services/weatherService';
import Header from './components/Header';
import Spinner from './components/Spinner';
import DataCard from './components/DataCard';
import CitySelector from './components/CitySelector';
import Modal from './components/Modal';
import ComparisonChart from './components/ComparisonChart';
import RefreshIcon from './components/RefreshIcon';
import { indonesianCities } from './data/cities';
import { useTranslation } from './hooks/useTranslation';

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const WindIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

type Pollutant = 'pm2_5' | 'pm10' | 'ozone' | 'carbon_monoxide' | 'nitrogen_dioxide' | 'sulphur_dioxide';
type MetricKey = 'uv' | Pollutant;

const App: React.FC = () => {
    const { t, translations } = useTranslation();
    const [selectedCity, setSelectedCity] = useState<IndonesianCity>(indonesianCities[0]);
    const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
    const [uvIndex, setUvIndex] = useState<UvIndexData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [modalMetricKey, setModalMetricKey] = useState<MetricKey | null>(null);

    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
    const [compareCity, setCompareCity] = useState<IndonesianCity | null>(null);
    const [compareAirQuality, setCompareAirQuality] = useState<AirQualityData | null>(null);
    const [isComparing, setIsComparing] = useState(false);

    const fetchData = useCallback(async (isManualRefresh = false) => {
        if (!selectedCity) return;

        if (isManualRefresh) {
            setIsRefreshing(true);
        } else if (!airQuality) {
            setLoading(true);
        }
        setError(null);

        try {
            const [aqData, uvData] = await Promise.all([
                fetchAirQuality(selectedCity.latitude, selectedCity.longitude),
                fetchUvIndex(selectedCity.latitude, selectedCity.longitude),
            ]);
            setAirQuality(aqData);
            setUvIndex(uvData);
            setLastUpdated(new Date());
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            if (isManualRefresh) {
                setIsRefreshing(false);
            } else {
                setLoading(false);
            }
        }
    }, [selectedCity, airQuality]);

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 300000);
        return () => clearInterval(intervalId);
    }, [fetchData]);

    const handleCityChange = (city: IndonesianCity) => {
        setAirQuality(null);
        setUvIndex(null);
        setSelectedCity(city);
    };
    
    const handleCardClick = (metricKey: MetricKey) => {
        setModalMetricKey(metricKey);
    };

    const handleCompareCityChange = async (city: IndonesianCity) => {
        setCompareCity(city);
        setCompareAirQuality(null);
        setIsComparing(true);
        try {
            const aqData = await fetchAirQuality(city.latitude, city.longitude);
            setCompareAirQuality(aqData);
        } catch (err) {
            console.error("Failed to fetch comparison data", err);
        } finally {
            setIsComparing(false);
        }
    };
    
    const closeCompareModal = () => {
        setIsCompareModalOpen(false);
        setCompareCity(null);
        setCompareAirQuality(null);
    };

    const getUvIndexInfo = (uv: number | undefined): { text: string; color: string } => {
        if (typeof uv !== 'number' || isNaN(uv)) {
            return { text: "N/A", color: "bg-gray-400" };
        }
        if (uv <= 2) return { text: t('levels.uv.low'), color: "bg-green-500" };
        if (uv <= 5) return { text: t('levels.uv.moderate'), color: "bg-yellow-500" };
        if (uv <= 7) return { text: t('levels.uv.high'), color: "bg-orange-500" };
        if (uv <= 10) return { text: t('levels.uv.veryHigh'), color: "bg-red-500" };
        return { text: t('levels.uv.extreme'), color: "bg-purple-500" };
    };
    
    const getAqiInfo = (pollutant: Pollutant, value: number): { text: string; color: string } => {
        if (typeof value !== 'number' || isNaN(value)) {
            return { text: "N/A", color: "bg-gray-400" };
        }
        switch (pollutant) {
            case 'pm2_5':
                if (value <= 12) return { text: t('levels.aqi.good'), color: "bg-green-500" };
                if (value <= 35.4) return { text: t('levels.aqi.moderate'), color: "bg-yellow-500" };
                if (value <= 55.4) return { text: t('levels.aqi.unhealthySensitive'), color: "bg-orange-500" };
                if (value <= 150.4) return { text: t('levels.aqi.unhealthy'), color: "bg-red-500" };
                return { text: t('levels.aqi.veryUnhealthy'), color: "bg-purple-500" };
            case 'pm10':
                if (value <= 54) return { text: t('levels.aqi.good'), color: "bg-green-500" };
                if (value <= 154) return { text: t('levels.aqi.moderate'), color: "bg-yellow-500" };
                if (value <= 254) return { text: t('levels.aqi.unhealthySensitive'), color: "bg-orange-500" };
                if (value <= 354) return { text: t('levels.aqi.unhealthy'), color: "bg-red-500" };
                return { text: t('levels.aqi.veryUnhealthy'), color: "bg-purple-500" };
            case 'ozone':
                if (value <= 100) return { text: t('levels.aqi.good'), color: "bg-green-500" };
                if (value <= 160) return { text: t('levels.aqi.moderate'), color: "bg-yellow-500" };
                return { text: t('levels.aqi.unhealthy'), color: "bg-orange-500" };
            case 'carbon_monoxide':
                if (value <= 5000) return { text: t('levels.aqi.good'), color: "bg-green-500" };
                if (value <= 10000) return { text: t('levels.aqi.moderate'), color: "bg-yellow-500" };
                return { text: t('levels.aqi.unhealthy'), color: "bg-orange-500" };
            case 'nitrogen_dioxide':
                if (value <= 100) return { text: t('levels.aqi.good'), color: "bg-green-500" };
                if (value <= 188) return { text: t('levels.aqi.moderate'), color: "bg-yellow-500" };
                return { text: t('levels.aqi.unhealthy'), color: "bg-orange-500" };
            case 'sulphur_dioxide':
                if (value <= 90) return { text: t('levels.aqi.good'), color: "bg-green-500" };
                if (value <= 190) return { text: t('levels.aqi.moderate'), color: "bg-yellow-500" };
                return { text: t('levels.aqi.unhealthy'), color: "bg-orange-500" };
            default:
                return { text: "", color: "bg-gray-400" };
        }
    };

    const renderContent = () => {
        if (loading) {
            return <Spinner />;
        }
        if (error) {
            return <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{error}</div>;
        }
       
        if (airQuality && uvIndex) {
            const uvValue = uvIndex?.[0]?.value;
            const uvInfo = getUvIndexInfo(uvValue);
            
            const metricsConfig: { key: MetricKey, value: number | string, unit: string, icon: ReactNode, colorClass: string, level?: { text: string; color: string }}[] = [
                 { key: 'uv', value: typeof uvValue === 'number' ? uvValue.toFixed(1) : 'N/A', unit: "", icon: <SunIcon/>, colorClass: uvInfo.color, level: { text: uvInfo.text, color: uvInfo.color } },
                 { key: 'pm2_5', value: airQuality.current.pm2_5, unit: airQuality.current_units.pm2_5, icon: <WindIcon/>, colorClass: "bg-teal-500", level: getAqiInfo('pm2_5', airQuality.current.pm2_5) },
                 { key: 'pm10', value: airQuality.current.pm10, unit: airQuality.current_units.pm10, icon: <WindIcon/>, colorClass: "bg-cyan-500", level: getAqiInfo('pm10', airQuality.current.pm10) },
                 { key: 'ozone', value: airQuality.current.ozone, unit: airQuality.current_units.ozone, icon: <WindIcon/>, colorClass: "bg-indigo-500", level: getAqiInfo('ozone', airQuality.current.ozone) },
                 { key: 'carbon_monoxide', value: airQuality.current.carbon_monoxide, unit: airQuality.current_units.carbon_monoxide, icon: <WindIcon/>, colorClass: "bg-slate-500", level: getAqiInfo('carbon_monoxide', airQuality.current.carbon_monoxide) },
                 { key: 'nitrogen_dioxide', value: airQuality.current.nitrogen_dioxide, unit: airQuality.current_units.nitrogen_dioxide, icon: <WindIcon/>, colorClass: "bg-amber-500", level: getAqiInfo('nitrogen_dioxide', airQuality.current.nitrogen_dioxide) },
                 { key: 'sulphur_dioxide', value: airQuality.current.sulphur_dioxide, unit: airQuality.current_units.sulphur_dioxide, icon: <WindIcon/>, colorClass: "bg-lime-500", level: getAqiInfo('sulphur_dioxide', airQuality.current.sulphur_dioxide) },
            ];

            return (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {metricsConfig.map((metric, index) => (
                      <div key={metric.key} className="animate-fade-in-up opacity-0" style={{ animationDelay: `${500 + index * 100}ms`}}>
                        <DataCard 
                            title={t(`metrics.${metric.key}.title`)}
                            description={t(`metrics.${metric.key}.description`)}
                            value={metric.value}
                            unit={metric.unit}
                            icon={metric.icon}
                            colorClass={metric.colorClass}
                            level={metric.level}
                            onClick={() => handleCardClick(metric.key)} 
                        />
                      </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-slate-50 min-h-screen text-gray-800">
            <main className="max-w-6xl mx-auto px-4 py-8">
                <Header />
                <div className="flex flex-col items-center">
                    <CitySelector selectedCity={selectedCity} onCityChange={handleCityChange} />
                    <button
                        onClick={() => setIsCompareModalOpen(true)}
                        className="mt-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-transform duration-200 hover:scale-105 animate-fade-in-up opacity-0"
                        style={{ animationDelay: '300ms' }}
                    >
                        {t('app.compareCities')}
                    </button>
                </div>
                <div className="mt-4">
                  <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '400ms' }}>
                    <h2 className="text-2xl font-bold text-center text-gray-700 font-display mb-2">
                      {t('app.showingDataFor')} <span className="text-blue-600">{selectedCity.name}</span>
                    </h2>
                    {lastUpdated && !loading && (
                      <div className="flex items-center justify-center gap-2 text-center text-gray-500 text-sm mb-6">
                        <span>{t('app.lastUpdated')} {lastUpdated.toLocaleTimeString()}</span>
                        <button onClick={() => fetchData(true)} disabled={isRefreshing} aria-label="Refresh data" className="text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors">
                            <RefreshIcon spinning={isRefreshing} />
                        </button>
                      </div>
                    )}
                  </div>
                  {renderContent()}
                </div>
            </main>
            <footer className="text-center py-6 text-sm text-gray-400">
                <p>{t('app.poweredBy')}</p>
            </footer>

            {modalMetricKey && (
                <Modal isOpen={!!modalMetricKey} onClose={() => setModalMetricKey(null)} title={t(`metrics.${modalMetricKey}.title`)}>
                    <div className="space-y-4 text-sm text-gray-600">
                        <p>{t(`metrics.${modalMetricKey}.details.description`)}</p>
                        <div>
                            <h4 className="font-bold text-gray-800 mb-1">{t('app.healthImpact')}:</h4>
                            <p>{t(`metrics.${modalMetricKey}.details.healthImpact`)}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 mb-2">{t('app.recommendations')}:</h4>
                            <ul className="list-disc list-inside space-y-1">
                                {translations.metrics[modalMetricKey].details.recommendations.map((rec: string, index: number) => (
                                    <li key={index}>{rec}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Modal>
            )}

            <Modal isOpen={isCompareModalOpen} onClose={closeCompareModal} title={t('comparison.title')}>
                <div className="grid grid-cols-2 gap-4 items-center border-b pb-4">
                    <div className="text-center">
                        <p className="font-bold text-lg text-blue-600">{selectedCity.name}</p>
                    </div>
                    <div className="text-center">
                        <CitySelector
                            selectedCity={compareCity}
                            onCityChange={handleCompareCityChange}
                            disabledCityName={selectedCity.name}
                        />
                    </div>
                </div>
                <div className="mt-4 min-h-[200px]">
                    {isComparing && <Spinner />}
                    {!isComparing && airQuality && compareAirQuality && compareCity ? (
                        <ComparisonChart
                            data1={airQuality}
                            city1Name={selectedCity.name}
                            data2={compareAirQuality}
                            city2Name={compareCity.name}
                        />
                    ) : (
                        !isComparing && <p className="text-center text-gray-500 mt-8">{t('comparison.selectCity', { cityName: selectedCity.name })}</p>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default App;