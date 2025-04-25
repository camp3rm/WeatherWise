import axios from 'axios';
import { API_KEY } from '@constants/weatherParameters';
console.log('API_KEY:', API_KEY);
export const getCurrentCoordinates = async () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position.coords);
      },
      (error) => reject(error)
    );
  });

export const getCurrentCity = async ({ latitude, longitude }) => {
  const response = await axios.get(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${API_KEY}`
  );
  return response.data[0].name;
};

export const getCoordinates = async (value) => {
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`;
  const response = await axios.get(geoUrl);
  return response.data?.[0];
};

export const getTime = (date) => {
  return date.toLocaleTimeString('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });
};

export const getWeekday = (date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    timeZone: 'UTC',
  });
};
