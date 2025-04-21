import React, { useContext } from 'react';
import styles from '../main.module.scss';
import search_icon from '@assets/search-icon.svg';
import { WeatherContext } from '@providers/WeatherProvider';
export const SearchForm = ({ searchingCity, currentCity }) => {
	const { handleSubmit, searchCity } =
		useContext(WeatherContext);

	const handleSubmitButton = async (e) => {
		e.preventDefault();
		try {
			await handleSubmit(searchingCity);
		} catch (error) {
			console.log(error);
		}
	}
	console.log("SearchForm received searchCity:", searchCity);
	return (
		<div className={styles.form_field}>
			<h2>{searchCity}</h2>
			<form className={styles.form} onSubmit={handleSubmitButton}>
				<input
					className={styles.city_name}
					type="text"
					value={searchingCity}
					onChange={currentCity}
					placeholder="Enter city name"
				/>
				<button className={styles.search_button} type="submit">
					<img src={search_icon} alt="Search" />
				</button>
			</form>
		</div>
	)
}