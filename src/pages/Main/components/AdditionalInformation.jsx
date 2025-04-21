import React from "react";
import { currentWeatherImages } from "@assets/weather-images/current-weather-images/index.jsx";
import { GetWindDirection, UVIndex, HumidityLevel, VisibilityLevel, PressureLevel } from "@utils/WeatherUtils";
import styles from "../main.module.scss";

export const AdditionalInformation = ({ current, daily }) => {
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
			<div className={styles.uv_index}>
				<h4 className={styles.uv_index_title}>UV Index</h4>
				<img className={styles.uv_index_icon} src={currentWeatherImages["uvi"]} alt="UV Index" />
				<span className={styles.daily_value}>{daily[0].uvi}</span>
				<UVIndex uvi={daily[0].uvi} />
			</div>
			<div className={styles.wind_status}>
				<h4 className={styles.wind_status_title}>Wind Status</h4>
				<img className={styles.wind_icon} src={currentWeatherImages["wind"]} alt="Wind" />
				<span className={styles.speed_of_wind}>{(current.wind_speed * 3.6).toFixed(2)}<span className={styles.unit_of_speed}>km/h</span></span>
				<div className={styles.wind_direction_box}><GetWindDirection wind_deg={current.wind_deg} /></div>
			</div>
			<div className={styles.day_transition}>
				<h4 className={styles.day_transition_title}>Sunrise & Sunset</h4>
				<div className={styles.day_transition_box}>
					<div className={styles.sunrise}>
						<img className={styles.sunrise_icon} src={currentWeatherImages["sunrise"]} alt="Sunrise" />
						<img className={styles.sunrise_small} src={currentWeatherImages["sunrise-small"]} alt="Sunrise" />
						<time>{sunriseTime}</time>
					</div>
					<div className={styles.sunset}>
						<img className={styles.sunset_icon} src={currentWeatherImages["sunset"]} alt="Sunset" />
						<img className={styles.sunset_small} src={currentWeatherImages["sunset-small"]} alt="Sunset" />
						<time>{sunsetTime}</time>
					</div>
				</div>
			</div>
			<div className={styles.humidity} >
				<h4 className={styles.humidity_title}>Humidity</h4>
				<img className={styles.humidity_icon} src={currentWeatherImages["humidity"]} alt="Humidity" />
				<p className={styles.humidity_value}>{current.humidity}<span className={styles.humidity_unit}>%</span></p>
				<HumidityLevel humidity={current.humidity} />
			</div>
			<div className={styles.visibility}>
				<h4 className={styles.visibility_title}>Visibility</h4>
				<img className={styles.visibility_icon} src={currentWeatherImages["visibility"]} alt="Visibility" />
				<p className={styles.visibility_value}>{correctValueVisibility}<span className={styles.visibility_unit}>km</span></p>
				<VisibilityLevel className={styles.visibility_level} visibility={current.visibility} />
			</div>
			<div className={styles.pressure} >
				<h4 className={styles.pressure_title}>Pressure</h4>
				<img className={styles.pressure_icon} src={currentWeatherImages["pressure"]} alt="Pressure" />
				<p className={styles.pressure_value}>{current.pressure}<span className={styles.pressure_unit}>hPa</span></p>
				<PressureLevel pressure={current.pressure} />
			</div>
		</div>
	)
}