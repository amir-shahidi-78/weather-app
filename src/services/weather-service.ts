import axios, { AxiosInstance } from "axios";
export { CanceledError } from "axios";

export interface WeatherData {
  weather: {
    main: "Rain" | "Snow" | "Clouds";
    description: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  sys: {
    country: string;
  };
  name: string;
}

const apiKey = "4415c30a7437590d86bedabc5a837c92";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

class WeatherService<T> {
  private readonly baseUrl;
  private readonly apiKey: string;
  private readonly client: AxiosInstance;
  private readonly controller: AbortController;

  constructor(apiKey: string, baseUrl: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.controller = new AbortController();
    this.client = axios.create({
      baseURL: this.baseUrl,
      params: {
        appid: this.apiKey,
        units: "metric",
      },
    });
  }
  getCurrentWeather = (cityName: string) => {
    return this.client.get<T>("", {
      signal: this.controller.signal,
      params: { q: cityName },
    });
  };

  cancelRequest = () => {
    this.controller.abort;
  };
}

const weatherService = new WeatherService<WeatherData>(apiKey, baseUrl);
export default weatherService;
