import { MdSunny } from "react-icons/md";
import { FaRegSnowflake } from "react-icons/fa";
import { IoMdRainy } from "react-icons/io";
import { BsCloudSunFill } from "react-icons/bs";

interface Props {
  condition: "Clear" | "Snow" | "Rain" | "Clouds";
  size?: number;
}

interface WeatherIconMapping {
  [label: string]: (size: number) => React.ReactNode;
}

const weatherIconMapping: WeatherIconMapping = {
  Clear: (size: number) => <MdSunny size={size} />,
  Snow: (size: number) => <FaRegSnowflake size={size} />,
  Rain: (size: number) => <IoMdRainy size={size} />,
  Clouds: (size: number) => <BsCloudSunFill size={size} />,
};

const WeatherStatusIcon = ({ condition, size = 70 }: Props) => {
  const icon = weatherIconMapping[condition];
  return <div>{icon(size)}</div>;
};

export default WeatherStatusIcon;
