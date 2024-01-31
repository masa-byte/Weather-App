import { Controller, Get, Query } from '@nestjs/common';
import { FetchWeatherService } from './fetch-weather.service';

@Controller('fetch-weather')
export class FetchWeatherController {
    constructor(private readonly fetchWeatherService: FetchWeatherService) { }

    @Get()
    fetchWeather(
        @Query('lat') latitude: number, 
        @Query('lon') longitude: number,
        @Query('forecastDays') forecastDays: number,
        @Query('timezone') timezone: string
        ): Promise<any> {
        return this.fetchWeatherService.fetchWeather(latitude, longitude, forecastDays, timezone);
    }
}
