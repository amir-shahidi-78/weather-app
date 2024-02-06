import { ReactNode } from "react";
import styles from "./styles.module.css";

interface Props {
  value?: number | string;
  label: string;
  icon: ReactNode;
}

const WeatherDetail = ({ icon, value, label }: Props) => {
  return (
    <div className={styles["weather-detail"]}>
      <div className={styles["weather-detail__icon"]}>{icon}</div>
      <div className={styles["weather-detail__details"]}>
        {value && <span>{value}</span>}
        <span>{label}</span>
      </div>
    </div>
  );
};

export default WeatherDetail;
