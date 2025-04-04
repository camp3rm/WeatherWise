import React, { useContext, useEffect, useState, useRef } from "react";
import { DataContext } from "@FetchingAPI/FetchingWeatherData";
import styles from "./main.module.scss";
import search_icon from "@assets/search-icon.svg";
import Loader from "@components/Loader/Loader";
import ModalWindow from "@components/Modal/Modal";
import { currentWeatherIcons } from "@assets/weather-icons/current-weather-icons/index.jsx";
import { weatherConditionIcons } from "@assets/weather-icons/weather-condition-icons/index.jsx";
import { Cloudly, GetWindDirection, UVIndex, UVIColorCodding, HumidityLevel, VisibilityLevel, PressureLevel } from "./AdditionalData/AdditionalData"
export const CurrentWeather = ({ current, daily }) => {
	const { weatherData } = useContext(DataContext);
	const [currentTime, setCurrentTime] = useState("");
	const getLocalTime = (timezone_offset) => {
		const nowUtc = Math.floor(Date.now() / 1000);
		const localTime = new Date((nowUtc + timezone_offset) * 1000);
		return localTime.toLocaleTimeString('uk-UA', {
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	useEffect(() => {
		const updateTime = () => {
			const updatedTime = getLocalTime(weatherData.timezone_offset);
			setCurrentTime(updatedTime);
		};

		updateTime();
		const interval = setInterval(updateTime, 60000);

		return () => clearInterval(interval);
	}, [weatherData.timezone_offset]);;
	const getLocalWeekday = (timezone_offset) => {
		const nowUtc = Math.floor(Date.now() / 1000);
		return new Date((nowUtc + timezone_offset) * 1000).toLocaleDateString('en-US', {
			weekday: "long"
		});
	};

	const weekday = getLocalWeekday(weatherData.timezone_offset);

	const icon = weatherConditionIcons[current.weather[0].icon];
	return (
		<div className={styles.current_container}>
			<img
				className={styles.current_container_icon}
				src={icon}
				alt="Weather Icon"
			/>
			<h2 className={styles.current_temp}>{current.temp.toFixed(1)}&deg;C</h2>
			<div className={styles.current_date}>
				<span className={styles.current_day}>{weekday},</span>
				<span className={styles.current_time}>{currentTime}</span>
			</div>
			<div className={styles.clouds_precipitation_info}>
				<p className={styles.feels_like}>Feels like: {current.feels_like.toFixed(1)}&deg;C</p>
				<Cloudly className={styles.clouds} cloudies={current.clouds} />
				<p className={styles.precipitation}>Chance of precipitation: {daily[0].pop * 100}%</p>
				<span className={styles.daily_rain}>Rain: {daily[0].rain ? daily[0].rain : 0} mm</span>
				<span className={styles.daily_snow}>Snow: {daily[0].snow ? daily[0].snow : 0} mm</span>
			</div>
		</div>
	);
};
export const AdditionalInformation = ({ current, daily }) => {
	const UVIColorClass = UVIColorCodding({ uvi: daily[0].uvi });
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
				<img className={styles.uv_index_icon} src={currentWeatherIcons["uvi"]} alt="UV Index" />
				<span className={styles.daily_value}>{daily[0].uvi}</span>
				<UVIndex uvi={daily[0].uvi} />
			</div>
			<div className={styles.wind_status}>
				<h4 className={styles.wind_status_title}>Wind Status</h4>
				<img className={styles.wind_icon} src={currentWeatherIcons["wind"]} alt="Wind" />
				<span className={styles.speed_of_wind}>{(current.wind_speed * 3.6).toFixed(2)}<span className={styles.unit_of_speed}>km/h</span></span>
				<div className={styles.wind_direction_box}><GetWindDirection wind_deg={current.wind_deg} /></div>
			</div>
			<div className={styles.day_transition}>
				<h4 className={styles.day_transition_title}>Sunrise & Sunset</h4>
				<div className={styles.day_transition_box}>
					<div className={styles.sunrise}>
						<img className={styles.sunrise_icon} src={currentWeatherIcons["sunrise"]} alt="Sunrise" />
						<img className={styles.sunrise_small} src={currentWeatherIcons["sunrise-small"]} alt="Sunrise" />
						<time>{sunriseTime}</time>
					</div>
					<div className={styles.sunset}>
						<img className={styles.sunset_icon} src={currentWeatherIcons["sunset"]} alt="Sunset" />
						<img className={styles.sunset_small} src={currentWeatherIcons["sunset-small"]} alt="Sunset" />
						<time>{sunsetTime}</time>
					</div>
				</div>
			</div>
			<div className={styles.humidity} >
				<h4 className={styles.humidity_title}>Humidity</h4>
				<img className={styles.humidity_icon} src={currentWeatherIcons["humidity"]} alt="Humidity" />
				<p className={styles.humidity_value}>{current.humidity}<span className={styles.humidity_unit}>%</span></p>
				<HumidityLevel humidity={current.humidity} />
			</div>
			<div className={styles.visibility}>
				<h4 className={styles.visibility_title}>Visibility</h4>
				<img className={styles.visibility_icon} src={currentWeatherIcons["visibility"]} alt="Visibility" />
				<p className={styles.visibility_value}>{correctValueVisibility}<span className={styles.visibility_unit}>km</span></p>
				<VisibilityLevel className={styles.visibility_level} visibility={current.visibility} />
			</div>
			<div className={styles.pressure} >
				<h4 className={styles.pressure_title}>Pressure</h4>
				<img className={styles.pressure_icon} src={currentWeatherIcons["pressure"]} alt="Pressure" />
				<p className={styles.pressure_value}>{current.pressure}<span className={styles.pressure_unit}>hPa</span></p>
				<PressureLevel humidity={current.pressure} />
			</div>
		</div>
	)
}

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
							src={weatherConditionIcons[day.weather[0].icon]}
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
						<img className={styles.hourly_forecast_icon} src={weatherConditionIcons[hour.weather[0].icon]} alt="Weather Icon" />
						<p className={styles.hourly_forecast_temp}>{hour.temp.toFixed(1)}&deg;C</p>
					</li>
				))}
			</ul>
			<button onClick={scrollRight} className={styles.hourly_forecast_arrow_next}></button>
		</div>
	)
}

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
	if (isLoading || !weatherData) {
		return (
			<Loader />
		);
	}
	const { current, daily, hourly } = weatherData;
	return (
		<div className={styles.wrapper}>
			{modalWindow.invalidCityName ? <ModalWindow onClose={onClose} text="Please enter a valid city name" /> :
				modalWindow.invalidCoordinates ? <ModalWindow onClose={onClose} text="Could not find coordinates. Please check your input or try again later." /> :
					modalWindow.invalidFetchingData ? <ModalWindow onClose={onClose} text="Something went wrong. Please try your request again in a few minutes." /> :
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