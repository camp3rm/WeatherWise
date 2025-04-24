import { pressureLevels } from "@src/constants/weatherParameters.jsx";
import styles from "@pages/Main/main.module.scss";

export const PressureLevel = ({ pressure }) => {
	const level = pressureLevels.find(({ min, max }) => pressure >= min && pressure < max);
	return <p className={styles.pressure_level}>{level?.label || "Unknown pressure"}</p>;
};