import { ChartOptions } from "chart.js";

export const url = "http://localhost:3000/";

export const colors = {
    skyBlue: '#61b2d8',
    midBlue: '#219EBC',
    darkBlue: '#023047',
    sand: '#E1D89F',
    yellow: '#FFB703',
    orange: '#FB8500',
}

export const envLineChartOptions: ChartOptions<'line'> = {
    responsive: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '',
        font: { size: 18 }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: '',
          font: { size: 16 }
        },
        ticks: {
          font: { size: 14 }
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Day',
          font: { size: 16 }
        },
        ticks: {
          font: { size: 14 }
        }
      }
    },
  };

export const weatherCodes: { [key: number]: string } = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog and depositing rime fog',
    48: 'Fog and depositing rime fog',
    51: 'Drizzle: Light intensity',
    52: 'Drizzle: Moderate intensity',
    53: 'Drizzle: Dense intensity',
    56: 'Freezing Drizzle: Light intensity',
    57: 'Freezing Drizzle: Dense intensity',
    61: 'Rain: Slight intensity',
    63: 'Rain: Moderate intensity',
    65: 'Rain: Heavy intensity',
    66: 'Freezing Rain: Light intensity',
    67: 'Freezing Rain: Heavy intensity',
    71: 'Snow fall: Slight intensity',
    73: 'Snow fall: Moderate intensity',
    75: 'Snow fall: Heavy intensity',
    77: 'Snow grains',
    80: 'Rain showers: Slight intensity',
    81: 'Rain showers: Moderate intensity',
    82: 'Rain showers: Violent intensity',
    85: 'Snow showers: Slight intensity',
    86: 'Snow showers: Heavy intensity',
    95: 'Thunderstorm: Slight or moderate',
    96: 'Thunderstorm with hail: Slight intensity',
    99: 'Thunderstorm with hail: Heavy intensity',
  };