import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Loader from '@components/Loader/Loader';
import { GetCurrentCoordinates, GetCurrentCity, GetCoordinates } from "@utils/AdditionalData";
export const DataContext = createContext();
const API_KEY = "f9db56c6edd22f0c7a44a291f2d6d8a4";
export const DataProvider = ({ children }) => {
	const [weatherData, setWeatherData] = useState(null);
	const [modalWindow, setModalWindow] = useState(
		{
			invalidCityName: false,
			invalidCoordinates: false,
			invalidFetchingData: false,
		}
	);
	const [isLoading, setIsLoading] = useState(true);
	const [searchCity, setSearchCity] = useState(null);

	useEffect(() => {
		const getFetchingData = async () => {

			try {
				const position = await GetCurrentCoordinates()
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
				setModalWindow(prev => ({ ...prev, invalid1CityName: true }))
				return;
			}
			setIsLoading(true);
			const coordinates = await GetCoordinates(sanitizedValue);
			if (!coordinates) {
				setModalWindow(prev => ({ ...prev, invalidCoordinates: true }))
				return
			}
			await fetchWeather({
				latitude: coordinates.lat,
				longitude: coordinates.lon,
			});

		} catch (error) {
			setModalWindow(prev => ({ ...prev, invalidCityName: true }))
		} finally {
			setIsLoading(false);
		}
	};
	const fetchWeather = async ({ latitude, longitude }) => {
		if (!latitude || !longitude) {
			setModalWindow(prev => ({ ...prev, invalidCoordinates: true }))
			return;
		}
		const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${API_KEY}&units=metric`;

		const fetchCompleteWeatherData = async (lat, lon) => {
			try {
				const [weatherData, cityData] = await Promise.allSettled(
					[await axios.get(weatherUrl), await GetCurrentCity({ latitude: lat, longitude: lon })]
				);
				if (weatherData.status === "rejected" && cityData.status === "rejected") {
					setModalWindow(prev => ({ ...prev, invalidFetchingData: true }))
					return <Loader />
				} else if (cityData.status === "rejected") {
					setWeatherData(weatherData.value.data);

					setSearchCity("");
				} else {
					setWeatherData(weatherData.value.data);
					setSearchCity(cityData.value);
				}
			}
			catch (error) {
				setModalWindow(prev => ({ ...prev, invalidFetchingData: true }))
			}
		}
		fetchCompleteWeatherData(latitude, longitude);
	}
	return (
		<DataContext.Provider value={{ weatherData, isLoading, handleSubmit, searchCity, setModalWindow, modalWindow }}>
			{children}
		</DataContext.Provider>
	);
}




