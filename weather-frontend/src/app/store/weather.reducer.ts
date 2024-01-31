import { createReducer, on } from "@ngrx/store";
import { WeatherState } from "./weather.state";
import * as WeatherActions from './weather.actions';

const initialState: WeatherState = {
    currentWeather: null,
    dailyWeather: null,
    selectedDay: null
};

export const weatherReducer = createReducer(
    initialState,
    on(WeatherActions.setCurrentWeather, (state, { currentWeather }) => ({
        ...state,
        currentWeather: currentWeather
    })),
    on(WeatherActions.setDailyWeather, (state, { dailyWeather }) => ({
        ...state,
        dailyWeather: dailyWeather
    })),
    on(WeatherActions.setSelectedDay, (state, { selectedDay }) => ({
        ...state,
        selectedDay: selectedDay
    }))
);