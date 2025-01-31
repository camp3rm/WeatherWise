import React from "react";
import logo from "../../assets/logo.svg";
import styles from "./header.module.scss";
import { Images } from "../../assets/social-icons/socialMedia.jsx";
const Header = () => {
	return (
		<div className={styles.wrapper}>
			<header className={styles.header}>
				<div className={styles.weather_name}>
					<img className={styles.logo} src={logo} alt="Logo OWeather" />
					<h3><span>Weather</span>Wise</h3>
				</div>
				<div className={styles.social_media}>
					<a href="/"><img src={Images.facebook} alt="Facebook" /></a>
					<a href="/"><img src={Images.instagram} alt="Instagram" /></a>
					<a href="/"><img src={Images.linkedin} alt="LinkedIn" /></a>
					<a href="/"><img src={Images.x} alt="X" /></a>
				</div>
			</header>
		</div>
	)
}

export default Header 