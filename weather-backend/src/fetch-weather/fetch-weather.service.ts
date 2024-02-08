import { Injectable } from '@nestjs/common';
import { weatherApiUrl } from 'config';
import { fetchWeatherApi } from 'openmeteo';

@Injectable()
export class FetchWeatherService {

    params = {
        "latitude": 0,
        "longitude": 0,
        "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day", "precipitation", "rain", "showers", "snowfall", "weather_code", "cloud_cover", "wind_speed_10m", "wind_direction_10m"],
        "hourly": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation_probability", "precipitation", "rain", "showers", "snowfall", "snow_depth", "weather_code", "cloud_cover", "visibility", "wind_speed_10m", "wind_direction_10m", "temperature_80m", "soil_moisture_1_to_3cm", "uv_index", "is_day", "sunshine_duration"],
        "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "sunrise", "sunset", "daylight_duration", "sunshine_duration", "uv_index_max", "precipitation_sum", "rain_sum", "showers_sum", "snowfall_sum", "precipitation_hours", "precipitation_probability_max", "wind_speed_10m_max", "wind_direction_10m_dominant"],
        "timezone": "",
        "forecast_days": 0
    };

    async fetchWeather(lat: number, long: number, forecastDays: number, timez: string) {
        this.params.latitude = lat;
        this.params.longitude = long;
        this.params.forecast_days = forecastDays;
        this.params.timezone = timez;
        const responses = await fetchWeatherApi(weatherApiUrl, this.params);

        const range = (start: number, stop: number, step: number) =>
            Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

        const response = responses[0];

        const utcOffsetSeconds = response.utcOffsetSeconds();
        const timezone = response.timezone();
        const timezoneAbbreviation = response.timezoneAbbreviation();
        const latitude = response.latitude();
        const longitude = response.longitude();

        const current = response.current()!;
        const hourly = response.hourly()!;
        const daily = response.daily()!;

        const weatherData = {
            current: {
                time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                temperature2m: current.variables(0)!.value(),
                relativeHumidity2m: current.variables(1)!.value(),
                apparentTemperature: current.variables(2)!.value(),
                isDay: current.variables(3)!.value(),
                precipitation: current.variables(4)!.value(),
                rain: current.variables(5)!.value(),
                showers: current.variables(6)!.value(),
                snowfall: current.variables(7)!.value(),
                weatherCode: current.variables(8)!.value(),
                cloudCover: current.variables(9)!.value(),
                windSpeed10m: current.variables(10)!.value(),
                windDirection10m: current.variables(11)!.value(),
            },
            hourly: {
                time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                    (t) => new Date((t + utcOffsetSeconds) * 1000)
                ),
                temperature2m: hourly.variables(0)!.valuesArray()!,
                relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
                apparentTemperature: hourly.variables(2)!.valuesArray()!,
                precipitationProbability: hourly.variables(3)!.valuesArray()!,
                precipitation: hourly.variables(4)!.valuesArray()!,
                rain: hourly.variables(5)!.valuesArray()!,
                showers: hourly.variables(6)!.valuesArray()!,
                snowfall: hourly.variables(7)!.valuesArray()!,
                snowDepth: hourly.variables(8)!.valuesArray()!,
                weatherCode: hourly.variables(9)!.valuesArray()!,
                cloudCover: hourly.variables(10)!.valuesArray()!,
                visibility: hourly.variables(11)!.valuesArray()!,
                windSpeed10m: hourly.variables(12)!.valuesArray()!,
                windDirection10m: hourly.variables(13)!.valuesArray()!,
                temperature80m: hourly.variables(14)!.valuesArray()!,
                soilMoisture1To3cm: hourly.variables(15)!.valuesArray()!,
                uvIndex: hourly.variables(16)!.valuesArray()!,
                isDay: hourly.variables(17)!.valuesArray()!,
                sunshineDuration: hourly.variables(18)!.valuesArray()!,
            },
            daily: {
                time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                    (t) => new Date((t + utcOffsetSeconds) * 1000)
                ),
                weatherCode: daily.variables(0)!.valuesArray()!,
                temperature2mMax: daily.variables(1)!.valuesArray()!,
                temperature2mMin: daily.variables(2)!.valuesArray()!,
                sunrise: daily.variables(3)!.valuesArray()!,
                sunset: daily.variables(4)!.valuesArray()!,
                daylightDuration: daily.variables(5)!.valuesArray()!,
                sunshineDuration: daily.variables(6)!.valuesArray()!,
                uvIndexMax: daily.variables(7)!.valuesArray()!,
                precipitationSum: daily.variables(8)!.valuesArray()!,
                rainSum: daily.variables(9)!.valuesArray()!,
                showersSum: daily.variables(10)!.valuesArray()!,
                snowfallSum: daily.variables(11)!.valuesArray()!,
                precipitationHours: daily.variables(12)!.valuesArray()!,
                precipitationProbabilityMax: daily.variables(13)!.valuesArray()!,
                windSpeed10mMax: daily.variables(14)!.valuesArray()!,
                windDirection10mDominant: daily.variables(15)!.valuesArray()!,
            },
        };

        return weatherData;
    }
}
