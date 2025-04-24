import { visibilityLevels } from "@src/constants/weatherParameters.jsx";
import styles from "@pages/Main/main.module.scss";

export const VisibilityLevel = ({ visibility }) => {
	const visibilityInKm = visibility / 1000;
	const level = visibilityLevels.find(({ min, max }) => visibilityInKm >= min && visibilityInKm < max);
	return <p className={styles.visibility_level}>{level?.label || "Unknown visibility"}</p>;
};