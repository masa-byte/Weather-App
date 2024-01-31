import { createFeatureSelector, createSelector } from "@ngrx/store";
import { WeatherState } from "./weather.state";

export const selectWeatherInfo = createFeatureSelector<WeatherState>('weather');

export const selectWeather = createSelector(
    selectWeatherInfo,
    (state: WeatherState) => state.currentWeather
);

export const selectCurrentWeather = createSelector(
    selectWeatherInfo,
    (state: WeatherState) => state.currentWeather
);

export const selectDailyWeather = createSelector(
    selectWeatherInfo,
    (state: WeatherState) => state.dailyWeather
);

export const selectSelectedDay = createSelector(
    selectWeatherInfo,
    (state: WeatherState) => state.selectedDay
);

export const selectSelectedDayWeather = createSelector(
    selectWeatherInfo,
    (state: WeatherState) => state.dailyWeather![state.selectedDay as number]
);

