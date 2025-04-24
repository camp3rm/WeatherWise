import React from "react";
import logo from "@assets/svg/logo.svg";
import styles from "./footer.module.scss";

const Footer = () => {

	return (
		<div className={styles.wrapper}>
			<footer className={styles.footer}>
				<div className={styles.copyright}><p className={styles.copyright_text}>© 2025 WeatherWise App. All Rights Reserved.</p></div>
				<div className={styles.footer_logo}><img className={styles.logo} src={logo} alt="Logo WeatherWise" />
				</div>
				<div className={styles.footer_app_name}><h3>WeatherWise</h3></div>
			</footer>
		</div>
	)
}

export default Footer