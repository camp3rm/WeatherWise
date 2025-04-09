import React, { use, useContext, useEffect, useState } from "react";
import { DataContext } from "@FetchingAPI/FetchingWeatherData";
import styles from "./main.module.scss";
import search_icon from "@assets/search-icon.svg";
import Loader from "@components/Loader/Loader";
import ModalWindow from "@components/Modal/Modal";
import { CurrentWeather } from "@components/Main/subComponents/CurrentWeather";
import { AdditionalInformation } from "@components/Main/subComponents/AdditionalInformation";
import { DailyWeather } from "@components/Main/subComponents/DailyWeather";
import { HourlyWeather } from "@components/Main/subComponents/HourlyWeather";


const Main = () => {
	const [searchingCity, setSearchingCity] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [tabIndex, setTabIndex] = useState(1);
	const { weatherData, isLoading, handleSubmit, searchCity, modalWindow } =
		useContext(DataContext);


	const handleSubmitButton = async (e) => {
		e.preventDefault();
		try {
			await handleSubmit(searchingCity);
		} catch (error) {
			console.log(error);
		}
	}
	const currentCity = (e) => {
		const capitalizeCityName = e.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
		setSearchingCity(capitalizeCityName);
	}
	const handleDailyTabClick = () => {
		setTabIndex(1);
	}
	const handleHourlyTabClick = () => {
		setTabIndex(2);
	}

	const onClose = () => {
		setIsOpen(prev => !prev);
	};



	const getModalWindow = () => {
		if (modalWindow.invalidCityName) return "Please enter a valid city name";
		if (modalWindow.invalidCoordinates) return "Could not find coordinates. Please check your input or try again later.";
		if (modalWindow.invalidFetchingData) return "Something went wrong. Please try your request again in a few minutes.";
		return null;
	};
	const modalWindowText = getModalWindow();

	if (isLoading || !weatherData) {
		return (
			<Loader />
		);
	}

	// 	if ( !weatherData) {
	// 		return (
	// 			ModalWindow
	// 		);

	const { current, daily, hourly } = weatherData;

	return (
		<div className={styles.wrapper}>
			{modalWindowText ? <ModalWindow onClose={onClose} text={modalWindowText} /> :
				isLoading ? <Loader /> :
					<>
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
						<div className={styles.weather_forecast}>
							<CurrentWeather current={current} daily={daily} />
							<AdditionalInformation current={current} daily={daily} />
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
							{tabIndex === 1 && <DailyWeather daily={daily} />}
							{tabIndex === 2 && <HourlyWeather hourly={hourly} />}
						</div>
					</>
			}
		</div>
	);
};


export default Main;