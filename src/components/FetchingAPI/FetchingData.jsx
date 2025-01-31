import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const FetchingDataProvider = ({ children }) => {
	const [latlon, setLatLon] = useState({
		lat: "51.5085",
		lon: "-0.1257",
	});
	const [city, setCity] = useState("London");
	const [weatherData, setWeatherData] = useState(null);
	const { lat, lon } = latlon;
	const [isLoading, setIsLoading] = useState(false);

	// const API_KEY_VERSION_2_5
	const API_KEY = "fe0e5fbebd0207bd3ff834abe401e8ee";
	const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
	const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${API_KEY}&units=metric`;

	const fetchCoordinates = async () => {
		try {
			setIsLoading(true);
			const response = await axios.get(geoUrl);
			setLatLon(response.data.coord);
			setWeatherData((prevWeather) => ({
				...prevWeather,
				city: response.data.name,
			}));
		} catch (error) {
			console.error("Error fetching coordinates:", error);
		} finally {
			setIsLoading(false);
		}
	};


	const fetchWeather = async () => {
		try {
			setIsLoading(true);
			const response = await axios.get(weatherUrl);
			setWeatherData((prevWeather) => ({
				...prevWeather,
				...response.data,
			}));


			localStorage.setItem("weatherData", JSON.stringify(response.data));
		} catch (error) {
			console.error("Error fetching weather data:", error);
		} finally {
			setIsLoading(false);
		}
	};


	useEffect(() => {
		const savedCity = localStorage.getItem("city");
		if (savedCity) {
			setCity(savedCity);
		}

		const savedWeather = localStorage.getItem("weatherData");
		if (savedWeather) {
			setWeatherData(JSON.parse(savedWeather));
		}
	}, []);


	useEffect(() => {
		if (lat && lon) {
			fetchWeather();
		}
	}, [lat, lon]);


	const handleCityChange = (e) => {
		setCity(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (city) {
			localStorage.setItem("city", city);
			fetchCoordinates();
		}
	};

	return (
		<DataContext.Provider value={{ weatherData, city, handleCityChange, handleSubmit, isLoading }}>
			{children}
		</DataContext.Provider>
	);
};
