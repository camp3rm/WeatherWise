import React, { useRef } from "react";
import { weatherConditionImages } from "@assets/weather-images/weather-condition-images/index.jsx";
import styles from "../main.module.scss";


export const HourlyWeather = ({ hourly }) => {
	const HourlyWeatherRef = useRef(null);

	const scrollLeft = () => {
		if (HourlyWeatherRef.current) {
			HourlyWeatherRef.current.scrollBy({ left: -150, behavior: 'smooth' });
		}
	};
	const scrollRight = () => {
		if (HourlyWeatherRef.current) {
			HourlyWeatherRef.current.scrollBy({ left: 150, behavior: 'smooth' });
		}
	};
	return (
		<div className={styles.weather_forecast_hourly}>
			<button onClick={scrollLeft} className={styles.hourly_forecast_arrow_prev}></button>
			<ul ref={HourlyWeatherRef} className={styles.hourly_forecast_list_items}>
				{hourly.map((hour, hourly_index) => (
					<li className={styles.hourly_forecast_item} key={hourly_index}>
						<time className={styles.hourly_forecast_date}>{new Date(hour.dt * 1000).toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })}</time>
						<img className={styles.hourly_forecast_icon} src={weatherConditionImages[hour.weather[0].icon]} alt="Weather Icon" />
						<p className={styles.hourly_forecast_temp}>{hour.temp.toFixed(1)}&deg;C</p>
					</li>
				))}
			</ul>
			<button onClick={scrollRight} className={styles.hourly_forecast_arrow_next}></button>
		</div>
	)
}