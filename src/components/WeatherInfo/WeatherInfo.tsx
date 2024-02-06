interface Props {
  city: string;
  temperature: number;
  status: string;
}
const WeatherInfo = ({ status, temperature, city }: Props) => {
  return (
    <div>
      <h2>{status}</h2>
      <p>{temperature}&deg;C</p>
      <p>{city}</p>
    </div>
  );
};

export default WeatherInfo;
