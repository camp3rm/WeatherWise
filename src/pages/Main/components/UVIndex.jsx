import { uvLevels } from '@src/constants/weatherParameters.jsx';
import styles from '@pages/Main/main.module.scss';

export const UVIndex = ({ uvi }) => {
  const level = uvLevels.find(({ min, max }) => uvi >= min && uvi < max);
  return (
    <div className={styles.risk_of_harm_box}>
      <p className={styles.risk_of_harm}>{level?.label || 'Unknown'}</p>
    </div>
  );
};
