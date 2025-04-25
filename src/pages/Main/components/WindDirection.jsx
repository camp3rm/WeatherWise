import { images } from '@assets/index.jsx';
import { windDirections } from '@src/constants/weatherParameters.jsx';
import styles from '@pages/Main/main.module.scss';

export const GetWindDirection = ({ wind_deg }) => {
  const direction = windDirections.find(({ min, max }) => wind_deg >= min && wind_deg < max);
  const label = direction?.label || 'N';
  const image = direction?.image || 'north.png';

  return (
    <div className={styles.wind_direction_description}>
      <span>{label}</span>
      <img className={styles.wind_direction_icon} src={images.windDirection[image]} alt={`Wind from the ${label}`} />
    </div>
  );
};
