import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getCityParams(name: string): Observable<HttpResponse<any>> {
    return this.http.get(url + 'fetch-city?name=' + name, { observe: 'response' });
  }

  getWeatherData(lat: number, lon: number, forecastDays: number, timezone: string): Observable<HttpResponse<any>> {
    return this.http.get(
      url +
      'fetch-weather?lat=' + lat + '&lon=' + lon + '&forecastDays=' + forecastDays + '&timezone=' + timezone,
      { observe: 'response' }
    );
  }
}
