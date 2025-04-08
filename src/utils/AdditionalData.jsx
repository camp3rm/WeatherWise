import React from "react";
import styles from "../components/Main/main.module.scss";
import axios from "axios";
import { windDirectionImages } from "@assets/weather-images/wind-direction-images/index.jsx";
import { pressureLevels, humidityLevels, uvLevels, visibilityLevels, cloudinessLevels, windDirections } from "./weatherParameters.jsx";
const API_KEY = "f9db56c6edd22f0c7a44a291f2d6d8a4";
export const PressureLevel = ({ pressure }) => {
	const level = pressureLevels.find(({ min, max }) => pressure >= min && pressure < max);
	return <p className={styles.pressure_level}>{level?.label || "Unknown pressure"}</p>;
};


export const HumidityLevel = ({ humidity }) => {
	const level = humidityLevels.find(({ min, max }) => humidity >= min && humidity < max);
	return <p className={styles.humidity_level}>{level?.label || "Unknown humidity"}</p>;
};

export const UVIndex = ({ uvi }) => {
	const level = uvLevels.find(({ min, max }) => uvi >= min && uvi < max);
	return (
		<div className={styles.risk_of_harm_box}>
			<p className={styles.risk_of_harm}>{level?.label || "Unknown"}</p>
		</div>
	);
};

export const UVIColorCoding = ({ uvi }) => {
	const level = uvLevels.find(({ min, max }) => uvi >= min && uvi < max);
	return level?.color || "gray";
};

export const VisibilityLevel = ({ visibility }) => {
	const visibilityInKm = visibility / 1000;
	const level = visibilityLevels.find(({ min, max }) => visibilityInKm >= min && visibilityInKm < max);
	return <p className={styles.visibility_level}>{level?.label || "Unknown visibility"}</p>;
};

export const CloudinessLevel = ({ cloudies }) => {
	const level = cloudinessLevels.find(({ min, max }) => cloudies >= min && cloudies < max);
	return <p className={styles.clouds}>{level?.label || "Unknown cloudiness"}</p>;
};

export const GetWindDirection = ({ wind_deg }) => {
	const direction = windDirections.find(({ min, max }) => wind_deg >= min && wind_deg < max);
	const label = direction?.label || "N";
	const image = direction?.image || "north.png";

	return (
		<div className={styles.wind_direction_description}>
			<span>{label}</span>
			<img
				className={styles.wind_direction_icon}
				src={windDirectionImages[image]}
				alt={`Wind from the ${label}`}
			/>
		</div>
	);
};

export const GetCurrentCoordinates = async () =>
	new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				resolve(position.coords)
			},
			(error) => reject(error)
		);
	});

export const GetCurrentCity = async ({ latitude, longitude }) => {
	const response = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${API_KEY}`);
	return response.data[0].name
}

export const GetCoordinates = async (value) => {
	const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`;
	const response = await axios.get(geoUrl);
	return response.data?.[0]
};

