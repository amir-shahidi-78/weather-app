import clear from "../../assets/images/clear.png";
import clouds from "../../assets/images/clouds.png";
import snow from "../../assets/images/snow.png";
import rain from "../../assets/images/rain.png";
import { ReactNode } from "react";
import { WeatherCondition } from "../../services/weather-service";

interface Props {
  condition: WeatherCondition | undefined;
}

interface WeatherIconMapping {
  [label: string]: ReactNode;
}

const weatherIconMapping: WeatherIconMapping = {
  Clear: <img src={clear} />,
  Snow: <img src={snow} />,
  Rain: <img src={rain} />,
  Clouds: <img src={clouds} />,
};

const WeatherStatusIcon = ({ condition }: Props) => {
  if (!condition) return null;

  return <div>{weatherIconMapping[condition]}</div>;
};

export default WeatherStatusIcon;
