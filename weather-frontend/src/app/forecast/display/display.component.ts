import { Component, Input, OnInit } from '@angular/core';
import { currentWeatherData, dailyWeatherData } from '../forecast.model';
import { Store } from '@ngrx/store';
import { selectCurrentWeather, selectDailyWeather } from '../../store/weather.selector';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss'
})
export class DisplayComponent implements OnInit {

  currentWeather: currentWeatherData | null = null;
  dailyWeather: dailyWeatherData[] | null = null;
  selectedViewMode: 'day' | 'hour' = 'day';

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.store.select(selectCurrentWeather).subscribe((currentWeather) => {
      this.currentWeather = currentWeather!;
    });
    this.store.select(selectDailyWeather).subscribe((dailyWeather) => {
      this.dailyWeather = dailyWeather!;
      console.log(this.dailyWeather);
    });
  }

  toggleViewMode(mode: 'day' | 'hour'): void {
    this.selectedViewMode = mode;
  }

  get iconUrl(): string {
    let url = "../../../assets/";
    switch (this.currentWeather?.weatherCode) {
      case 0:
        this.currentWeather?.isDay ? url += "sunny.png" : url += "night.png";
        break;
      case 1:
      case 2:
        this.currentWeather?.isDay ? url += "cloudy-sun.png" : url += "cloudy-night.png";
        break;
      case 3:
        url += "cloudy.png";
        break;
      case 45:
      case 48:
        url += "windy.png";
        break;
      case 51:
      case 52:
      case 53:
        url += "cloudy-rain-sun.png";
        break;
      case 56:
      case 57:
      case 61:
      case 63:
      case 65:
      case 80:
      case 81:
      case 82:
        url += "rainy.png";
        break;
      case 66:
      case 67:
      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86:
        url += "snowy.png";
        break;
      case 95:
      case 96:
      case 99:
        url += "stormy.png";
        break;
    }

    return url;
  }
}
