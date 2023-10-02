import axios, { AxiosResponse } from "axios";
import { WeatherType, nullWeather } from "../types/Weather";
import { CurrentWeatherRawResponseDto } from "./dto/weather-service.dto";

class WeatherService {
  static async fetchCurrentWeather(lat: number, lon: number): Promise<WeatherType>{
    return axios.get<CurrentWeatherRawResponseDto>('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat,
        lon,
        appid: '231a31bcaa0de0f3508d95a6ac89a209',
        units: 'metric'
      }
    }).then(WeatherService.formatCurrentWeatherResponse)
  }

  static async formatCurrentWeatherResponse(response: AxiosResponse<CurrentWeatherRawResponseDto>) {
    const { data } = response
    const weather = data?.weather[0]

    return {
      temperature: data?.main?.temperature,
      windSpeed: data?.wind?.speed,
      humidity: data?.main?.humidity,
      pressure: data?.main?.pressure,
      icon: weather ? `http://openweathermap.org/img/wn/${weather.icon}@4x.png` : null,
      description: weather ? weather.description : null,
      city: data?.name
    }
  }
}

export default WeatherService
