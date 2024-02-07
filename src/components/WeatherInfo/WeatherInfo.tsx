interface Props {
  city: string | undefined;
  temperature: number | undefined;
  status: string | undefined;
}
const WeatherInfo = ({ status, temperature, city }: Props) => {
  if (!status || !temperature || !city) return null;
  return (
    <div>
      <h2>{status}</h2>
      <p>{temperature}&deg;C</p>
      <p>{city}</p>
    </div>
  );
};

export default WeatherInfo;
