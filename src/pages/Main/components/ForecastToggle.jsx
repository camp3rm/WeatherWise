import React from "react";
import styles from "../main.module.scss";

export const ForecastToggleButtons = ({ handleDailyTabClick, handleHourlyTabClick }) => {
	return (
		<div className={styles.daily_hourly_forecast_button}>
			<button
				className={styles.handleDailyClick}
				type="button"
				onClick={handleDailyTabClick}>Daily</button>
			<button
				className={styles.handleHourlyClick}
				type="button"
				onClick={handleHourlyTabClick}>Hourly</button>
		</div>
	)
};