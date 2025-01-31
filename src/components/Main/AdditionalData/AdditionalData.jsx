import React from "react";
import styles from "../main.module.scss";
import { WindDirection } from "../../../assets/WindDirection.jsx";

const { east, north, northEast, northWest, south, southEast, southWest, west } = WindDirection;
export const GetWindDirection = ({ wind_deg }) => {
	return (
		<>
			{wind_deg >= 0 && wind_deg < 23 ? (
				<>N <img className={styles.wind_direction_icon} src={WindDirection['north.png']} alt="North Direction" /></>
			) : wind_deg >= 23 && wind_deg < 68 ? (
				<>NE <img className={styles.wind_direction_icon} src={WindDirection['north-east.png']} alt="North-East Direction" /></>
			) : wind_deg >= 68 && wind_deg < 113 ? (
				<>E <img className={styles.wind_direction_icon} src={WindDirection['east.png']} alt="East Direction" /></>
			) : wind_deg >= 113 && wind_deg < 158 ? (
				<>SE <img className={styles.wind_direction_icon} src={WindDirection['south-east.png']} alt="South-East Direction" /></>
			) : wind_deg >= 158 && wind_deg < 203 ? (
				<>S <img className={styles.wind_direction_icon} src={WindDirection['south.png']} alt="South Direction" /></>
			) : wind_deg >= 203 && wind_deg < 248 ? (
				<>SW <img className={styles.wind_direction_icon} src={WindDirection['south-west.png']} alt="South-West Direction" /></>
			) : wind_deg >= 248 && wind_deg < 293 ? (
				<>W <img className={styles.wind_direction_icon} src={WindDirection['west.png']} alt="West Direction" /></>
			) : wind_deg >= 293 && wind_deg < 338 ? (
				<>NW <img className={styles.wind_direction_icon} src={WindDirection['north-west.png']} alt="North-West Direction" /></>
			) : (
				<>N <img className={styles.wind_direction_icon} src={WindDirection['north.png']} alt="North Direction" /></>
			)}
		</>
	);
};

export const Cloudly = ({ cloudies }) => {

	if (cloudies < 11) {
		return (
			<>
				<p className={styles.clouds}>Cloudless</p>
			</>
		)
	} else if (cloudies > 11 && cloudies < 25) {
		return (
			<>
				<p className={styles.clouds}>Few clouds</p>
			</>
		)
	} else if (cloudies > 25 && cloudies < 50) {
		return (
			<>
				<p className={styles.clouds}>Scattered clouds</p>
			</>
		)
	} else if (cloudies > 50 && cloudies < 84) {
		return (
			<>
				<p className={styles.clouds}>Broken clouds</p>
			</>
		)
	} else if (cloudies > 84) {
		return (
			<>
				<p className={styles.clouds}>Overcast</p>
			</>
		)
	}
};

export const UVIndex = ({ uvi }) => {
	if (0 < uvi && uvi <= 3) {
		return (
			<>
				<p className={styles.risk_of_harm}>Low</p>
			</>
		)
	} else if (3 < uvi && uvi <= 6) {
		return (
			<>
				<p className={styles.risk_of_harm}>Moderate</p>
			</>
		)
	} else if (6 < uvi && uvi <= 8) {
		return (
			<>
				<p className={styles.risk_of_harm}>High</p>
			</>
		)
	} else if (8 < uvi && uvi <= 11) {
		return (
			<>
				<p className={styles.risk_of_harm}>Very high</p>
			</>
		)
	} else if (uvi > 11) {
		return (
			<>
				<p className={styles.risk_of_harm}>Extreme</p>
			</>
		)
	}
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
	} else if (uvi >= 11) {
		return 'violet'
	} else {
		return;
	}
}

export const HumidityLevel = ({ humidity }) => {
	if (humidity <= 20) {
		return (
			<p className={styles.humidity_level}>Critically Low</p>
		)
	} else if (humidity > 20 && humidity <= 30) {
		return (
			<p className={styles.humidity_level}>Too Low</p>
		)
	} else if (30 < humidity && humidity <= 40) {
		return (
			<p className={styles.humidity_level}>Lower Limit of Normal</p>
		)
	} else if (40 < humidity && humidity <= 50) {
		return (
			<p className={styles.humidity_level}>Comfortable</p>
		)
	} else if (40 < humidity && humidity < 50) {
		return (
			<p className={styles.humidity_level}>Comfortable (in Summer)</p>
		)
	} else if (60 < humidity && humidity <= 70) {
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
	} else if (humidity > 1040) {
		return (
			<p className={styles.pressure_level} >Very high pressure</p>)
	}

}
