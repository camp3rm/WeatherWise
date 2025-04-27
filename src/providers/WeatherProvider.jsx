import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getCurrentCoordinates, getCurrentCity, getCoordinates } from '@utils/WeatherUtils';
import { API_KEY } from '@constants/weatherParameters';
export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherCity, setWeatherCity] = useState(null);

  useEffect(() => {
    const getFetchingData = async () => {
      try {
        const position = await getCurrentCoordinates();
        await fetchWeather({
          latitude: position.latitude,
          longitude: position.longitude,
        });
      } catch (error) {
        try {
          await fetchWeather({ latitude: 52.232, longitude: 21.0067 });
        } catch (error) {
          console.log(error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    getFetchingData();
  }, []);
  const handleSubmit = async (value) => {
    try {
      const sanitizedValue = value?.trim();
      if (!sanitizedValue) {
        throw new Error('Please enter a valid city name');
      }
      setIsLoading(true);
      const coordinates = await getCoordinates(sanitizedValue);
      if (!coordinates) {
        throw new Error('No coordinates');
      }
      await fetchWeather({
        latitude: coordinates.lat,
        longitude: coordinates.lon,
      });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const fetchWeather = async ({ latitude, longitude }) => {
    if (!latitude || !longitude) {
      throw new Error('Invalid coordinates');
    
    }
    const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${API_KEY}&units=metric`;
    
      const [weatherResponse, cityResponse] = await Promise.allSettled([
        axios.get(weatherUrl),
        getCurrentCity({ latitude, longitude }),
      ]);

      if (weatherResponse.status === 'fulfilled' ) {
        if (cityResponse.status === 'fulfilled') {
          setWeatherCity(cityResponse.value);
        }
        setWeatherData(weatherResponse.value.data);
      } else {
        throw new Error('Data fetch is failed');
      }
  return (
    <WeatherContext.Provider value={{ weatherData, isLoading, handleSubmit, weatherCity }}>
      {children}
    </WeatherContext.Provider>
  );
};
