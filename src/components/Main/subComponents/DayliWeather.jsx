import React from "react";
import { weatherConditionImages } from "@assets/weather-images/weather-condition-images/index.jsx";
import styles from "../main.module.scss";

export const DailyWeather = ({ daily }) => {
	return (
		<div className={styles.weather_forecast_daily}>
			<ul className={styles.daily_forecast_list_items}>
				{daily.map((day, daily_index) => (
					<li className={styles.daily_forecast_item} key={daily_index}>
						<time className={styles.daily_forecast_date}>
							{new Date(day.dt * 1000).toLocaleDateString("uk-UA", {
								month: "numeric",
								day: "numeric",
							})}
						</time>
						<img
							className={styles.daily_forecast_icon}
							src={weatherConditionImages[day.weather[0].icon]}
							alt="Weather Icon"
						/>
						<p className={styles.daily_forecast_temp}>
							{day.temp.max.toFixed(1)}&deg;C
						</p>
					</li>
				))}
			</ul>
		</div>
	)
}