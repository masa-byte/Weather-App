
import { createAction, props } from "@ngrx/store";
import { currentWeatherData, dailyWeatherData } from "../../forecast/forecast.model";

export const setCurrentWeather = createAction(
    '[Weather] Set Current Weather',
    props<{ currentWeather: currentWeatherData }>()
);

export const setDailyWeather = createAction(
    '[Weather] Set Daily Weather',
    props<{ dailyWeather: dailyWeatherData[] }>()
);

export const setSelectedDay = createAction(
    '[Weather] Set Selected Day',
    props<{ selectedDay: number }>()
);