import React from "react";
import logo from "@assets/logo.svg";
import styles from "./header.module.scss";
const Header = () => {
	return (
		<div className={styles.wrapper}>
			<header className={styles.header}>
				<div className={styles.app_name}>
					<img className={styles.logo} src={logo} alt="Logo WeatherWise" />
					<h3><span>Weather</span>Wise</h3>
				</div>
			</header>
		</div>
	)
}

export default Header 