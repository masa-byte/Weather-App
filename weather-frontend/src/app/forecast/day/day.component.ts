import { Component, Input, OnInit } from '@angular/core';
import { dailyWeatherData } from '../forecast.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss'
})
export class DayComponent implements OnInit {
  
  @Input() dailyWeather!: dailyWeatherData;
  
  expanded: boolean = false;
  alerts: Set<string> = new Set();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.makeAlerts();
  }

  toggleDetails(): void {
    this.expanded = !this.expanded;
  }

  get iconUrl(): string {
    let url = "../../../assets/";
    switch (this.dailyWeather?.weatherCode) {
      case 0:
        url += "sunny.png";
        break;
      case 1:
      case 2:
        url += "cloudy-sun.png";
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

  makeAlerts() {
    if (this.dailyWeather.weatherCode == 95 || this.dailyWeather.weatherCode == 96 || this.dailyWeather.weatherCode == 97) {
      this.alerts.add(`There will be a storm on this day! Visit our shop for storm products!`);
    }
    if (this.dailyWeather.temperature2mMin < -5) {
      this.alerts.add(`Temperature will be below -10°C on this day! Visit our shop for winter products!`);
    }
    if (this.dailyWeather.precipitationSum > 15) {
      this.alerts.add(`There will be a lot of precipitation on this day! Visit our shop for rain products!`);
    }
    if (this.dailyWeather.windSpeed10mMax > 35) {
      this.alerts.add(`There will be strong wind on this day! Visit our shop for wind products!`);
    }
    if (this.dailyWeather.uvIndexMax > 7) {
      this.alerts.add(`UV index will be high on this day! Visit our shop for sun protection products!`);
    }
    if (this.dailyWeather.snowfallSum > 2) {
      this.alerts.add(`There will be snow on this day! Visit our shop for snow products!`);
    }
    if (this.dailyWeather.temperature2mMax > 30) {
      this.alerts.add(`Temperature will be above 30°C on this day! Visit our shop for summer products!`);
    }
  }

  hasAlerts(): boolean { 
    return this.alerts.size > 0;
  }

  getAlerts(): string[] {
    return Array.from(this.alerts);
  }

  goToShop(): void {
    this.router.navigate(['signInUser']);
  }
}
