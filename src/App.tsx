import { useEffect, useState } from "react";
import weatherService, {
  WeatherData,
  CanceledError,
} from "./services/weather-service";
import SearchForm from "./components/SearchForm";
import "./App.css";

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
      </div>
    </div>
  );
}

export default App;
