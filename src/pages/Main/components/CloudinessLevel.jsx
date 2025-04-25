import { cloudinessLevels } from '@src/constants/weatherParameters.jsx';
import styles from '@pages/Main/main.module.scss';

export const CloudinessLevel = ({ cloudies }) => {
  const level = cloudinessLevels.find(({ min, max }) => cloudies >= min && cloudies < max);
  return <p className={styles.clouds}>{level?.label || 'Unknown cloudiness'}</p>;
};
