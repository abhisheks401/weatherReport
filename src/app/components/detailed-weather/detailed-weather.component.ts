import { Component, OnInit } from '@angular/core';
import { GetWeatherService } from '../../service/get-weather.service';

@Component({
  selector: 'app-detailed-weather',
  templateUrl: './detailed-weather.component.html',
  styleUrls: ['./detailed-weather.component.css']
})
export class DetailedWeatherComponent implements OnInit {
  responseOK = false;
  responseFail = false; 
  weeklyResponseOK = false;
  responseBody = [];
  fiveDaysResponse = [];
  constructor(private getWeather: GetWeatherService) { }

  ngOnInit() {
    this.loadDefaultCityWeather();
  }

  loadDefaultCityWeather(){ 
    let defaultCity = ''; 
    if(localStorage.getItem('listOfCity') != '' && localStorage.getItem('listOfCity') != null && localStorage.getItem('listOfCity') != '[]'){
      const localHostData = JSON.parse(localStorage.getItem('listOfCity'));
      defaultCity = localHostData[0].city;
    }else{
      defaultCity = 'Mysore';
    }

    this.loadWeatherReport(defaultCity);
    this.loadFiveDaysReport(defaultCity);
  }

  loadWeatherReport(city){ 
    this.getWeather.singleCityDetails(city)
    .subscribe((response:any)=>{
      this.responseFail = false;
      this.responseOK = true; 
      this.responseBody = JSON.parse(response._body);

    },(error:any) =>{ 
      this.responseFail = true;
      this.responseOK = false;
    })
  }

  loadFiveDaysReport(city){
    this.getWeather.fiveDaysReport(city)
    .subscribe((response:any) => {
      const responseList = JSON.parse(response._body);
      this.fiveDaysResponse = responseList.list;
      this.weeklyResponseOK = true; 
    },(error:any)=>{
      this.weeklyResponseOK = false;
    });
  }

}
