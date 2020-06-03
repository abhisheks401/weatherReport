import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class GetWeatherService {

  constructor(private http: Http) { }

  singleCityDetails(city){
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=c51223c219d6aec8cb8c5210449bd859'
    
    return this.http.get(url)
    .pipe(map(response => {
      return response;
    }))
  }

  fiveDaysReport(city){
    const url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&cnt=5&appid=c51223c219d6aec8cb8c5210449bd859'
    
    return this.http.get(url)
    .pipe(map(response => {
      return response;
    }))
  }


}
