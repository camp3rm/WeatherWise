import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getCurrentCoordinates, getCurrentCity, getCoordinates } from '@utils/WeatherUtils';
import { API_KEY } from '../constants/weatherParameters';
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
        //
      }
      setIsLoading(true);
      const coordinates = await getCoordinates(sanitizedValue, API_KEY);
      if (!coordinates) {
        //
      }
      await fetchWeather({
        latitude: coordinates.lat,
        longitude: coordinates.lon,
      });
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };
  const fetchWeather = async ({ latitude, longitude }) => {
    if (!latitude || !longitude) {
      //
      return;
    }
    const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${API_KEY}&units=metric`;
    try {
      const [weatherResponse, cityResponse] = await Promise.allSettled([
        axios.get(weatherUrl),
        getCurrentCity({ latitude, longitude }, API_KEY),
      ]);

      console.log('Weather Response:', weatherResponse);
      console.log('City Response:', cityResponse);

      if (weatherResponse.status === 'fulfilled' && weatherResponse.value?.data) {
        setWeatherData(weatherResponse.value.data);
      } else {
        console.warn('Weather data invalid:', weatherResponse.reason || weatherResponse);
      }

      if (cityResponse.status === 'fulfilled' && cityResponse.value) {
        setWeatherCity(cityResponse.value);
      } else {
        console.warn('City data fetch failed:', cityResponse.reason || cityResponse);
      }
    } catch (error) {
      console.error('Error fetching weather or city data:', error);
    }
  };
  return (
    <WeatherContext.Provider value={{ weatherData, isLoading, handleSubmit, weatherCity }}>
      {children}
    </WeatherContext.Provider>
  );
};
