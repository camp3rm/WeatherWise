import React, { useContext, useState } from "react";
import { WeatherContext } from "@providers/WeatherProvider";
import styles from "./main.module.scss";
import Loader from "@components/Loader/Loader";
import { CurrentWeather, AdditionalInformation, DailyWeather, HourlyWeather, SearchForm, ForecastToggleButtons } from "@pages/Main/components/index";


const Main = () => {
	const [searchingCity, setSearchingCity] = useState("");
	const [tabIndex, setTabIndex] = useState(1);
	const { weatherData, isLoading } = useContext(WeatherContext);
	const handleDailyTabClick = () => {
		setTabIndex(1);
	}
	const handleHourlyTabClick = () => {
		setTabIndex(2);
	}
	const currentCity = (e) => {
		const capitalizeCityName = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
		setSearchingCity(capitalizeCityName);
	}

	if (isLoading) {
		return (
			<Loader />
		);
	}
	if (!weatherData) {
		console.log("No data available");
		return null;
	};

	const { current, daily, hourly } = weatherData;

	return (
		<div className={styles.wrapper}>
			<SearchForm searchingCity={searchingCity} currentCity={currentCity} />
			<div className={styles.weather_forecast}>
				<CurrentWeather current={current} daily={daily} />
				<AdditionalInformation current={current} daily={daily} />
				<ForecastToggleButtons handleDailyTabClick={handleDailyTabClick} handleHourlyTabClick={handleHourlyTabClick} />
				{tabIndex === 1 && <DailyWeather daily={daily} />}
				{tabIndex === 2 && <HourlyWeather hourly={hourly} />}
			</div>
		</div>
	);
};


export default Main;