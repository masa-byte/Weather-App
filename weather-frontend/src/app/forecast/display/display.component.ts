import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { currentWeatherData, dailyWeatherData } from '../forecast.model';
import { selectCurrentWeather, selectDailyWeather } from '../../store/selectors/weather.selector';
import { envLineChartOptions } from '../../environment/environment';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss'
})
export class DisplayComponent implements OnInit {

  currentWeather: currentWeatherData | null = null;
  dailyWeather: dailyWeatherData[] | null = null;
  selectedViewMode: 'day' | 'hour' = 'day';

  // chart configuration
  tempLineChartOptions: ChartOptions<'line'> = JSON.parse(JSON.stringify(envLineChartOptions));;
  precipitationLineChartOptions: ChartOptions<'line'> = envLineChartOptions;
  lineChartLegend = true;

  tempLineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };
  precipitationLineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };

  constructor(
    private store: Store,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.tempLineChartOptions.plugins!.title!.text = 'Temperature chart';
    this.tempLineChartOptions.scales!['y']!.title!.text = 'Temperature (°C)';
    this.precipitationLineChartOptions.plugins!.title!.text = 'Precipitation chart';
    this.precipitationLineChartOptions.scales!['y']!.title!.text = 'Precipitation (mm)';

    this.store.select(selectCurrentWeather).subscribe((currentWeather) => {
      if (currentWeather)
        this.currentWeather = currentWeather!;
    });
    this.store.select(selectDailyWeather).subscribe((dailyWeather) => {
      if (dailyWeather) {
        this.dailyWeather = dailyWeather!;
        this.tempLineChartData = {
          datasets: [
            { data: dailyWeather!.map((day) => day.temperature2mMax), label: 'Max °C', borderColor: 'red', fill: false },
            { data: dailyWeather!.map((day) => day.temperature2mMin), label: 'Min °C', borderColor: 'blue', fill: false }
          ],
          labels: dailyWeather!.map((day) => this.formatDate(day.time))
        };

        this.precipitationLineChartData = {
          datasets: [
            { data: dailyWeather!.map((day) => day.showersSum), label: 'Showers (mm)', borderColor: 'blue', fill: false },
            { data: dailyWeather!.map((day) => day.snowfallSum), label: 'Snow (cm)', borderColor: 'purple', fill: false },
            { data: dailyWeather!.map((day) => day.rainSum), label: 'Rain (mm)', borderColor: 'green', fill: false }
          ],
          labels: dailyWeather!.map((day) => this.formatDate(day.time))
        };
      }
    });
  }

  toggleViewMode(mode: 'day' | 'hour'): void {
    this.selectedViewMode = mode;
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd-MM') as string;
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
