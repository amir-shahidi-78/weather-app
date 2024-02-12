import { useEffect, useState } from "react";
import weatherService, {
  CanceledError,
  CityNotFoundError,
  WeatherData,
} from "../services/weather-service";

const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [selectedCity, setSelectedCity] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedCity) return;

    weatherService
      .getCurrentWeather(selectedCity)
      .then((data) => {
        setWeatherData(data);
        setError("");
      })
      .catch((err) => {
        if (err instanceof CityNotFoundError) setError("City not found");
        else if (!(err instanceof CanceledError)) setError(err.message);
      });
    return () => weatherService.cancelRequest();
  }, [selectedCity]);

  return { weatherData, error, setSelectedCity };
};

export default useWeather;
