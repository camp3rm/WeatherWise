import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../FetchingAPI/FetchingData";
import styles from "./main.module.scss";
import search_icon from "../../assets/search-icon.svg";
import wind from "../../assets/weather-icons/wind-direction/wind.png";
import uvindex from "../../assets/weather-icons/uvi.png";
import sunrise from "../../assets/weather-icons/sunrise.png";
import sunset from "../../assets/weather-icons/sunset.png";
import humidity from "../../assets/weather-icons/humidity.png";
import visibility from "../../assets/weather-icons/visibility.png";
import pressure from "../../assets/weather-icons/pressure.png";
import { weatherIcons } from "../../assets/weatherIcons";
import { Cloudly, GetWindDirection, UVIndex, UVIColorCodding, HumidityLevel, VisibilityLevel, PressureLevel } from "./AdditionalData/AdditionalData"



export const CurrentWeather = ({ current, daily }) => {
	const weekday = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	][new Date(current.dt * 1000).getDay()];

	const [currentTime, setCurrentTime] = useState("");

	useEffect(() => {
		const updateTime = () => {
			const updatedTime = new Date().toLocaleTimeString("uk-UA", {
				hour: "2-digit",
				minute: "2-digit",
			});
			setCurrentTime(updatedTime);
		};

		updateTime();

		const interval = setInterval(() => {
			updateTime();
		}, 60000);

		return () => clearInterval(interval);
	}, []);


	const icon = weatherIcons[current.weather[0].icon];
	return (
		<div className={styles.current_container}>
			<img
				className={styles.current_container_icon}
				src={icon}
				alt="Weather Icon"
			/>
			<p className={styles.current_temp}>{current.temp.toFixed(1)}&deg;C</p>
			<div className={styles.current_date}>
				<span className={styles.current_day}>{weekday},</span>
				<span className={styles.current_time}>{currentTime}</span>
			</div>
			<div className={styles.clouds_precipitation_info}>
				<p className={styles.feels_like}>Feels like: {current.feels_like.toFixed(1)}&deg;C</p>
				<Cloudly className={styles.clouds} cloudies={current.clouds} />
				<p className={styles.precipitation}>Chance of precipitation: {daily[0].pop * 100}%</p>
			</div>
		</div>
	);
};

export const AdditionalInformation = ({ current, daily }) => {
	const UVIColorClass = UVIColorCodding({ uvi: daily[0].uvi }); // here
	const sunriseTime = new Date(current.sunrise * 1000).toLocaleTimeString("uk-UA", {
		hour: "2-digit",
		minute: "2-digit",
	});
	const sunsetTime = new Date(current.sunset * 1000).toLocaleTimeString("uk-UA", {
		hour: "2-digit",
		minute: "2-digit",
	});

	const correctValueVisibility = (current.visibility / 1000).toFixed(1);

	return (
		<div className={styles.additional_information_container}>
			<div className={`${styles.uv_index} ${styles[UVIColorClass]}`}>
				<h4 className={styles.uv_index_title}>UV Index</h4>
				<img className={styles.uv_index_icon} src={uvindex} alt="UV Index" />
				<span className={styles.daily_value}>{daily[0].uvi}</span>
				<UVIndex uvi={daily[0].uvi} />
			</div>
			<div className={styles.wind_status}>
				<h4 className={styles.wind_status_title}>Wind Status</h4>
				<img className={styles.wind_icon} src={wind} alt="Wind" />
				<span className={styles.speed_of_wind}>{(current.wind_speed * 3.6).toFixed(2)}<span className={styles.unit_of_speed}>km/h</span></span>
				<div className={styles.wind_direction_box}><GetWindDirection wind_deg={current.wind_deg} /></div>
			</div>
			<div className={styles.day_transition}>
				<h4 className={styles.day_transition_title}>Sunrise & Sunset</h4>
				<div className={styles.day_transition_box}>
					<div className={styles.sunrise}>
						<img className={styles.sunrise_icon} src={sunrise} alt="Sunrise" />
						<time>{sunriseTime}</time>
					</div>
					<div className={styles.sunset}>
						<img className={styles.sunset_icon} src={sunset} alt="Sunset" />
						<time>{sunsetTime}</time>
					</div>
				</div>
			</div>
			<div className={styles.humidity} >
				<h4 className={styles.humidity_title}>Humidity</h4>
				<img src={humidity} alt="Humidity" />
				<p className={styles.humidity_value}>{current.humidity}<span className={styles.humidity_unit}>%</span></p>
				<HumidityLevel humidity={current.humidity} />
			</div>
			<div className={styles.visibility}>
				<h4 className={styles.visibility_title}>Visibility</h4>
				<img src={visibility} alt="Visibility" />
				<p className={styles.visibility_value}>{correctValueVisibility}<span className={styles.visibility_unit}>km</span></p>
				<VisibilityLevel className={styles.visibility_level} visibility={current.visibility} />
			</div>
			<div className={styles.pressure} >
				<h4 className={styles.pressure_title}>Pressure</h4>
				<img src={pressure} alt="Pressure" />
				<p className={styles.pressure_value}>{current.pressure}<span className={styles.pressure_unit}>hPa</span></p>
				<PressureLevel humidity={current.pressure} />
			</div>
		</div>
	)
}




export const Main = () => {
	const { isLoading, weatherData, city, handleCityChange, handleSubmit } =
		useContext(DataContext);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (!weatherData) {
		return <>Weather Loading...</>;
	}
	const { current, hourly, daily } = weatherData;
	// console.log(current);
	// console.log(weatherData);

	return (
		<div className={styles.wrapper}>
			<div className={styles.form_field}>
				<h2>{weatherData.city}</h2>
				<form className={styles.form} onSubmit={handleSubmit}>
					<input
						className={styles.city_name}
						type="text"
						value={city}
						onChange={handleCityChange}
						placeholder="Enter city name"
					/>
					<button className={styles.search_button} type="submit">
						<img src={search_icon} alt="Search" />
					</button>
				</form>
			</div>
			<div className={styles.weather_forecast}>
				<CurrentWeather current={current} daily={daily} />
				<AdditionalInformation current={current} daily={daily} />

				<div className={styles.weather_forecast_v}>sad</div>
			</div>
		</div>
	);
};

export default Main;


