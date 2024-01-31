import { currentWeatherData, dailyWeatherData } from "../forecast/forecast.model";

export interface WeatherState {
    currentWeather: currentWeatherData | null;
    dailyWeather: dailyWeatherData[] | null;
    selectedDay: number | null;
}