import { humidityLevels } from "@src/constants/weatherParameters.jsx";
import styles from "@pages/Main/main.module.scss";

export const HumidityLevel = ({ humidity }) => {
	const level = humidityLevels.find(({ min, max }) => humidity >= min && humidity < max);
	return <p className={styles.humidity_level}>{level?.label || "Unknown humidity"}</p>;
};
