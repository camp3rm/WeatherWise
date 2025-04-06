import React from "react";
import styles from "../components/Main/main.module.scss";
import axios from "axios";
import { windDirectionImages } from "@assets/weather-images/wind-direction-images/index.jsx";

const API_KEY = "f9db56c6edd22f0c7a44a291f2d6d8a4";
export const GetWindDirection = ({ wind_deg }) => {
	if (wind_deg >= 0 && wind_deg < 23) {
		return (
			<div className={styles.wind_direction_description}>
				<span>N</span><img className={styles.wind_direction_icon} src={windDirectionImages['north.png']} alt="North Direction" />
			</div>
		);
	} else if (wind_deg >= 23 && wind_deg < 68) {
		return (
			<div className={styles.wind_direction_description}>
				<span>NE</span><img className={styles.wind_direction_icon} src={windDirectionImages['north-east.png']} alt="North-East Direction" />
			</div>
		);
	} else if (wind_deg >= 68 && wind_deg < 113) {
		return (
			<div className={styles.wind_direction_description}>
				<span>E</span><img className={styles.wind_direction_icon} src={windDirectionImages['east.png']} alt="East Direction" />
			</div>
		);
	} else if (wind_deg >= 113 && wind_deg < 158) {
		return (
			<div className={styles.wind_direction_description}>
				<span>SE</span><img className={styles.wind_direction_icon} src={windDirectionImages['south-east.png']} alt="South-East Direction" />
			</div>
		);
	} else if (wind_deg >= 158 && wind_deg < 203) {
		return (
			<div className={styles.wind_direction_description}>
				<span>S</span><img className={styles.wind_direction_icon} src={windDirectionImages['south.png']} alt="South Direction" />
			</div>
		);
	} else if (wind_deg >= 203 && wind_deg < 248) {
		return (
			<div className={styles.wind_direction_description}>
				<span>SW</span><img className={styles.wind_direction_icon} src={windDirectionImages['south-west.png']} alt="South-West Direction" />
			</div>
		);
	} else if (wind_deg >= 248 && wind_deg < 293) {
		return (
			<div className={styles.wind_direction_description}>
				<span>W</span><img className={styles.wind_direction_icon} src={windDirectionImages['west.png']} alt="West Direction" />
			</div>
		);
	} else if (wind_deg >= 293 && wind_deg < 338) {
		return (
			<div className={styles.wind_direction_description}>
				<span>NW</span><img className={styles.wind_direction_icon} src={windDirectionImages['north-west.png']} alt="North-West Direction" />
			</div>
		);
	} else {
		return (
			<div className={styles.wind_direction_description}>
				<span>N</span><img className={styles.wind_direction_icon} src={windDirectionImages['north.png']} alt="North Direction" />
			</div>
		);
	};
};

export const Cloudly = ({ cloudies }) => {

	if (cloudies < 11) {
		return (
			<div>
				<p className={styles.clouds}>Cloudless</p>
			</div>
		)
	} else if (cloudies > 11 && cloudies < 25) {
		return (
			<div>
				<p className={styles.clouds}>Few clouds</p>
			</div>
		)
	} else if (cloudies > 25 && cloudies < 50) {
		return (
			<div>
				<p className={styles.clouds}>Scattered clouds</p>
			</div>
		)
	} else if (cloudies > 50 && cloudies < 84) {
		return (
			<div>
				<p className={styles.clouds}>Broken clouds</p>
			</div>
		)
	} else {
		return (
			<div>
				<p className={styles.clouds}>Overcast</p>
			</div>
		)
	};
};
export const UVIndex = ({ uvi }) => {
	if (0 <= uvi && uvi <= 3) {
		return (
			<div className={styles.risk_of_harm_box}>
				<p className={styles.risk_of_harm}>Low</p>
			</div>
		)
	} else if (3 < uvi && uvi <= 6) {
		return (
			<div className={styles.risk_of_harm_box}>
				<p className={styles.risk_of_harm}>Moderate</p>
			</div>
		)
	} else if (6 < uvi && uvi <= 8) {
		return (
			<div className={styles.risk_of_harm_box}>
				<p className={styles.risk_of_harm}>High</p>
			</div>
		)
	} else if (8 < uvi && uvi <= 11) {
		return (
			<div className={styles.risk_of_harm_box}>
				<p className={styles.risk_of_harm}>Very high</p>
			</div>
		)
	} else {
		return (
			<div className={styles.risk_of_harm_box}>
				<p className={styles.risk_of_harm}>Extreme</p>
			</div>
		)
	};
}
export const UVIColorCodding = ({ uvi }) => {
	if (0 <= uvi && uvi < 3) {
		return 'green'
	} else if (3 <= uvi && uvi < 6) {
		return 'yellow'
	} else if (6 <= uvi && uvi < 8) {
		return 'orange'
	} else if (8 <= uvi && uvi < 11) {
		return 'red'
	} else {
		return 'violet'
	};
};
export const HumidityLevel = ({ humidity }) => {
	if (humidity <= 20) {
		return (
			<p className={styles.humidity_level}>Critically Low</p>
		)
	} else if (humidity > 20 && humidity <= 30) {
		return (
			<p className={styles.humidity_level}>Too Low</p>
		)
	} else if (humidity > 30 && humidity <= 40) {
		return (
			<p className={styles.humidity_level}>Lower bound</p>
		)
	} else if (humidity > 40 && humidity <= 50) {
		return (
			<p className={styles.humidity_level}>Comfortable</p>
		)
	} else if (humidity > 50 && humidity <= 60) {
		return (
			<p className={styles.humidity_level}>Comfortable (in Summer)</p>
		)
	} else if (humidity > 60 && humidity <= 70) {
		return (
			<p className={styles.humidity_level}>Too High</p>
		)
	} else {
		return (
			<p className={styles.humidity_level}>Critically High</p>
		)
	}
}
export const VisibilityLevel = ({ visibility }) => {
	const visibilityInKm = visibility / 1000;

	if (visibilityInKm > 10) {
		return <p className={styles.visibility_level}>Clear</p>;
	} else if (visibilityInKm >= 5) {
		return <p className={styles.visibility_level}>Good</p>;
	} else if (visibilityInKm >= 1) {
		return <p className={styles.visibility_level}>Average</p>;
	} else if (visibilityInKm >= 0.5) {
		return <p className={styles.visibility_level}>Poor</p>;
	} else {
		return <p className={styles.visibility_level}>Dangerous</p>;
	}
};
export const PressureLevel = ({ humidity }) => {
	if (humidity <= 980) {
		return (
			<p className={styles.pressure_level} >Very low pressure</p>)
	} else if (humidity > 980 && humidity <= 1010) {
		return (
			<p className={styles.pressure_level} >Low pressure</p>)
	} else if (1010 < humidity && humidity <= 1020) {
		return (
			<p className={styles.pressure_level} >Normal pressure</p>)
	} else if (1020 < humidity && humidity <= 1040) {
		return (
			<p className={styles.pressure_level} >High pressure</p>)
	} else {
		return (
			<p className={styles.pressure_level} >Very high pressure</p>)
	};
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

