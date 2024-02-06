import { useEffect, useState } from "react";
import weatherService, {
  WeatherData,
  CanceledError,
} from "./services/weather-service";
import SearchForm from "./components/SearchForm";
import "./App.css";
import WeatherDetail from "./components/WeatherDetail";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { MdSunny } from "react-icons/md";
function App() {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [selectedCity, setSelectedCity] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedCity) return;

    weatherService
      .getCurrentWeather(selectedCity)
      .then((res) => setWeatherData(res.data))
      .catch((err) => {
        if (!(err instanceof CanceledError)) setError(err.message);
      });

    return () => weatherService.cancelRequest();
  }, [selectedCity]);

  return (
    <div className="container">
      <div className="card">
        <SearchForm onSearchCity={(city) => setSelectedCity(city)} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <WeatherDetail icon={<FaWind size={60} />} label="WindSpeed" />
          <WeatherDetail icon={<WiHumidity size={60} />} label="Humidity" />
        </div>
      </div>
    </div>
  );
}

export default App;
