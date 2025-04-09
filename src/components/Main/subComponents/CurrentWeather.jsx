import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "@FetchingAPI/FetchingWeatherData";
import { weatherConditionImages } from "@assets/weather-images/weather-condition-images/index.jsx";
import { CloudinessLevel } from "@utils/AdditionalData";
import styles from "../main.module.scss";
export const CurrentWeather = ({ current, daily }) => {
	const { weatherData } = useContext(DataContext);
	const [currentTime, setCurrentTime] = useState("");

	const getLocalTime = (dt, timezone_offset) => {

		const localTime = new Date((dt + timezone_offset) * 1000);
		return localTime.toLocaleTimeString('uk-UA', {
			hour: '2-digit',
			minute: '2-digit',
			timeZone: 'UTC',
		});
	};

	const getLocalWeekday = (dt, timezone_offset) => {
		const localTime = new Date((dt + timezone_offset) * 1000);
		return localTime.toLocaleDateString('uk-UA', {
			weekday: 'long',
			timeZone: 'UTC',
		});
	};
	useEffect(() => {
		if (weatherData?.current?.dt && weatherData?.timezone_offset !== undefined) {
			const time = getLocalTime(weatherData.current.dt, weatherData.timezone_offset);
			setCurrentTime(time);
		}
	}, [weatherData]);

	const weekday = getLocalWeekday(weatherData.current.dt, weatherData.timezone_offset);

	const icon = weatherConditionImages[current.weather[0].icon];
	return (
		<div className={styles.current_container}>
			<img
				className={styles.current_container_icon}
				src={icon}
				alt="Weather Icon"
			/>
			<h2 className={styles.current_temp}>{current.temp.toFixed(1)}&deg;C</h2>
			<div className={styles.current_date}>
				<span className={styles.current_day}>{weekday},</span>
				<span className={styles.current_time}>{currentTime}</span>
			</div>
			<div className={styles.clouds_precipitation_info}>
				<p className={styles.feels_like}>Feels like: {current.feels_like.toFixed(1)}&deg;C</p>
				<CloudinessLevel className={styles.clouds} cloudies={current.clouds} />
				<p className={styles.precipitation}>Chance of precipitation: {daily[0].pop * 100}%</p>
				<span className={styles.daily_rain}>Rain: {daily[0].rain ? daily[0].rain : 0} mm</span>
				<span className={styles.daily_snow}>Snow: {daily[0].snow ? daily[0].snow : 0} mm</span>
			</div>
		</div>
	);
};