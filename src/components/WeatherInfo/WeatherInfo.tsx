import styles from "./styles.module.css";

interface Props {
  city: string | undefined;
  temperature: number | undefined;
  status: string | undefined;
}
const WeatherInfo = ({ status, temperature, city }: Props) => {
  if (!status || !temperature || !city) return null;
  return (
    <div className={styles["weather-info"]}>
      <h2>{status}</h2>
      <p className={styles["weather-info__temp"]}>{temperature}&deg;C</p>
      <p>{city}</p>
    </div>
  );
};

export default WeatherInfo;
