import { Component, Input } from '@angular/core';
import { hourlyWeatherData } from '../forecast.model';

@Component({
  selector: 'app-hour',
  templateUrl: './hour.component.html',
  styleUrl: './hour.component.scss'
})
export class HourComponent {

  @Input() hourlyWeather!: hourlyWeatherData;

  expanded: boolean = false;

  toggleDetails(): void {
    this.expanded = !this.expanded;
  }

  get iconUrl(): string {
    let url = "../../../assets/";
    switch (this.hourlyWeather?.weatherCode) {
      case 0:
        this.hourlyWeather?.isDay ? url += "sunny.png" : url += "night.png";
        break;
      case 1:
      case 2:
        this.hourlyWeather?.isDay ? url += "cloudy-sun.png" : url += "cloudy-night.png";
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
