import React, { useContext, useState } from 'react';
import { WeatherContext } from '@providers/WeatherProvider';
import styles from './main.module.scss';
import Loader from '@components/Loader/Loader';
import { getTime, getWeekday } from '@utils/WeatherUtils';
import {
  CurrentWeather,
  CurrentWeatherDetails,
  DailyWeather,
  HourlyWeather,
  SearchForm,
  ForecastToggleButtons,
} from '@pages/Main/components/index';

const Main = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tabIndex, setTabIndex] = useState(1);
  const { weatherData, isLoading, handleSubmit, weatherCity } = useContext(WeatherContext);
  const handleCityNameChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleDailyTabClick = () => {
    setTabIndex(1);
  };
  const handleHourlyTabClick = () => {
    setTabIndex(2);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    try {
      await handleSubmit(searchTerm);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <Loader />;
  if (!weatherData) {
    console.log('No data available');
    return null;
  }

  const { current, daily, hourly } = weatherData;

  const date = new Date((weatherData.current.dt + weatherData.timezone_offset) * 1000);
  const time = getTime(date);
  const weekday = getWeekday(date);

  return (
    <div className={styles.wrapper}>
      <SearchForm
        headerText={weatherCity}
        searchTerm={searchTerm}
        onSearch={handleCityNameChange}
        onSubmit={onSubmit}
      />
      <div className={styles.weather_forecast}>
        <CurrentWeather time={time} daily={daily} current={current} weekday={weekday} />
        <CurrentWeatherDetails current={current} daily={daily} />
        <ForecastToggleButtons handleDailyTabClick={handleDailyTabClick} handleHourlyTabClick={handleHourlyTabClick} />
        {tabIndex === 1 && <DailyWeather daily={daily} />}
        {tabIndex === 2 && <HourlyWeather hourly={hourly} />}
      </div>
    </div>
  );
};

export default Main;
