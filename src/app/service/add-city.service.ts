import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AddCityService {

  constructor(private http: Http) { }

  addCityFn(city){ 
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=c51223c219d6aec8cb8c5210449bd859'
    
    return this.http.get(url)
    .pipe(map(response => {
      return response;
    }))
  }

}
