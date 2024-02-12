import SearchForm from "./components/SearchForm";
import "./App.css";
import WeatherDetail from "./components/WeatherDetail";
import WeatherStatusIcon from "./components/WeatherStatusIcon";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import WeatherInfo from "./components/WeatherInfo";
import useWeather from "./hooks/useWeather";

function App() {
  const { weatherData, error, setSelectedCity } = useWeather();

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
