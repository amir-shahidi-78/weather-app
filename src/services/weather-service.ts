import axios, { AxiosInstance } from "axios";
export { CanceledError } from "axios";

export type WeatherCondition = "Clear" | "Rain" | "Snow" | "Clouds";

export interface WeatherData {
  weather: {
    main: WeatherCondition;
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
    const response = this.client.get<T>("", {
      signal: this.controller.signal,
      params: { q: cityName },
    });
    return response
      .then((res) => res.data)
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          throw new CityNotFoundError("City not found");
        }
        throw err;
      });
  };

  cancelRequest = () => {
    this.controller.abort;
  };
}

const weatherService = new WeatherService<WeatherData>(apiKey, baseUrl);
export default weatherService;
export class CityNotFoundError extends Error {}
