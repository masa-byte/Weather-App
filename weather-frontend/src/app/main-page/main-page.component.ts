import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WeatherService } from '../weather/weather.service';
import { switchMap, of } from 'rxjs';
import { currentWeatherData, dailyWeatherData, hourlyWeatherData } from '../forecast/forecast.model';
import { weatherCodes } from '../environment/environment';
import { Store } from '@ngrx/store';
import * as WeatherActions from '../store/weather.actions';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {

  cityName: string = 'Nis';

  constructor(
    private weatherService: WeatherService,
    private snackBar: MatSnackBar,
    private store: Store
  ) { }

  ngOnInit() {
    this.weatherService.getCityParams(this.cityName).pipe(
      switchMap((cityParamsResponse) => {
        if (cityParamsResponse.body.error) {
          this.openSnackBar(cityParamsResponse.body.error);
          return of(null);
        } else {
          return this.weatherService.getWeatherData(
            cityParamsResponse.body.results[0].latitude,
            cityParamsResponse.body.results[0].longitude,
            7,
            cityParamsResponse.body.results[0].timezone
          );
        }
      })
    ).subscribe((weatherDataResponse) => {
      if (weatherDataResponse && weatherDataResponse.body.error) {
        this.openSnackBar(weatherDataResponse.body.error);
      } else {
        this.mapWeatherDataToCurrentWeather(weatherDataResponse?.body);
        this.mapWeatherDataToDailyWeather(weatherDataResponse?.body);
      }
    });
  }

  mapWeatherDataToCurrentWeather(weatherData: any) {
    const cur = weatherData.current;
    let currentWeather: currentWeatherData = {
      cityName: this.cityName,
      time: cur.time,
      temperature2m: Math.round(cur.temperature2m),
      relativeHumidity2m: cur.relativeHumidity2m,
      apparentTemperature: Math.round(cur.apparentTemperature),
      isDay: cur.isDay == 1 ? true : false,
      precipitation: Math.round(cur.precipitation),
      rain: Math.round(cur.rain),
      showers: Math.round(cur.showers),
      snowfall: Math.round(cur.snowfall),
      weatherCode: cur.weatherCode,
      weatherDescription: weatherCodes[cur.weatherCode],
      cloudCover: cur.cloudCover,
      windSpeed10m: Math.round(cur.windSpeed10m),
      windDirection10m: Math.round(cur.windDirection10m)
    };
    this.store.dispatch(WeatherActions.setCurrentWeather({ currentWeather: currentWeather }));
  }

  mapWeatherDataToDailyWeather(weatherData: any) {
    const days = weatherData.daily;
    let dailyWeather: dailyWeatherData[] = [];
    for (let i = 0; i < days.time.length; i++) {
      let dailyWeatherData: dailyWeatherData = {
        cityName: this.cityName,
        time: days.time[i],
        weatherCode: days.weatherCode[i],
        weatherDescription: weatherCodes[days.weatherCode[i]],
        temperature2mMin: Math.round(days.temperature2mMin[i]),
        temperature2mMax: Math.round(days.temperature2mMax[i]),
        sunrise: days.sunrise != null ? days.sunrise[i] : null,
        sunset: days.sunset != null ? days.sunset[i] : null,
        daylightDuration: Math.round(days.daylightDuration[i]),
        sunshineDuration: Math.round(days.sunshineDuration[i]),
        uvIndexMax: Math.round(days.uvIndexMax[i]),
        precipitationSum: Math.round(days.precipitationSum[i]),
        rainSum: Math.round(days.rainSum[i]),
        showersSum: Math.round(days.showersSum[i]),
        snowfallSum: Math.round(days.snowfallSum[i]),
        precipitationHours: days.precipitationHours[i],
        precipitationProbabilityMax: days.precipitationProbabilityMax[i],
        windSpeed10mMax: Math.round(days.windSpeed10mMax[i]),
        windDirection10mDominant: Math.round(days.windDirection10mDominant[i]),
        hours: []
      };
      let hours = weatherData.hourly;
      for (let j = i * 24; j < 24 + i * 24; j++) {
        let hourlyWeatherData: hourlyWeatherData = {
          time: hours.time[j],
          temperature2m: Math.round(hours.temperature2m[j]),
          relativeHumidity2m: hours.relativeHumidity2m[j],
          apparentTemperature: Math.round(hours.apparentTemperature[j]),
          precipitationProbability: hours.precipitationProbability[j],
          precipitation: Math.round(hours.precipitation[j]),
          rain: Math.round(hours.rain[j]),
          showers: Math.round(hours.showers[j]),
          snowfall: Math.round(hours.snowfall[j]),
          snowDepth: Math.round(hours.snowDepth[j]),
          weatherCode: hours.weatherCode[j],
          weatherDescription: weatherCodes[hours.weatherCode[j]],
          cloudCover: hours.cloudCover[j],
          visibility: Math.round(hours.visibility[j]),
          windSpeed10m: Math.round(hours.windSpeed10m[j]),
          windDirection10m: Math.round(hours.windDirection10m[j]),
          temperature80m: Math.round(hours.temperature80m[j]),
          soilMoisture1To3cm: Math.round(hours.soilMoisture1To3cm[j]),
          uvIndex: Math.round(hours.uvIndex[j]),
          isDay: hours.isDay[j] == 1 ? true : false,
          sunshineDuration: Math.round(hours.sunshineDuration[j])
        };
        dailyWeatherData.hours.push(hourlyWeatherData);
      }
      dailyWeather.push(dailyWeatherData);
    }
    this.store.dispatch(WeatherActions.setDailyWeather({ dailyWeather: dailyWeather }));
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
