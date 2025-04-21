import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { getCurrentCoordinates, getCurrentCity, getCoordinates } from "@utils/WeatherUtils";
export const WeatherContext = createContext();
export const API_KEY = "f9db56c6edd22f0c7a44a291f2d6d8a4";
export const WeatherProvider = ({ children }) => {
	const [weatherData, setWeatherData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchCity, setSearchCity] = useState(null);

	useEffect(() => {
		const getFetchingData = async () => {
			try {
				const position = await getCurrentCoordinates()
				await fetchWeather({ latitude: position.latitude, longitude: position.longitude })
			} catch (error) {
				await fetchWeather({ latitude: 52.232, longitude: 21.0067 })
			} finally {
				setIsLoading(false);
			}
		}
		getFetchingData()
	}, []);
	const handleSubmit = async (value) => {
		try {
			const sanitizedValue = value?.trim();
			if (sanitizedValue === "" || !sanitizedValue) {
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

		const fetchCompleteWeatherData = async (lat, lon) => {
			try {
				const [weatherResponse, cityResponse] = await Promise.all([
					axios.get(weatherUrl),
					getCurrentCity({ latitude: lat, longitude: lon }, API_KEY),]
				);
				if (weatherResponse?.data) {
					setWeatherData(weatherResponse.data);
				} else {
					console.log("Weather data invalid.");
				}

				if (cityResponse) {
					setSearchCity(cityResponse);
				} else {
					console.log("City data is invalid.");
				}
			}
			catch (error) {
				//
			}
		}
		fetchCompleteWeatherData(latitude, longitude);
	}
	return (
		<WeatherContext.Provider value={{ weatherData, isLoading, handleSubmit, searchCity }}>
			{children}
		</WeatherContext.Provider>
	);
}




