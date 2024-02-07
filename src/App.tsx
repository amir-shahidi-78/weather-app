import { useEffect, useState } from "react";
import weatherService, {
  WeatherData,
  CanceledError,
  CityNotFoundError,
} from "./services/weather-service";
import SearchForm from "./components/SearchForm";
import "./App.css";
import WeatherDetail from "./components/WeatherDetail";
import WeatherStatusIcon from "./components/WeatherStatusIcon";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import WeatherInfo from "./components/WeatherInfo";

function App() {
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

  return (
    <div className="container">
      <div className="card">
        <SearchForm onSearchCity={(city) => setSelectedCity(city)} />
        {error && <p>{error}</p>}

        {!error && (
          <div>
            <WeatherStatusIcon condition={weatherData?.weather?.[0]?.main} />
            <WeatherInfo
              status={weatherData?.weather[0].main}
              temperature={weatherData?.main.temp}
              city={weatherData?.name}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <WeatherDetail
                value={weatherData?.wind.speed}
                icon={<FaWind size={50} />}
                label="WindSpeed"
              />
              <WeatherDetail
                value={weatherData?.main.humidity}
                icon={<WiHumidity size={50} />}
                label="Humidity"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
