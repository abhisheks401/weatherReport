import { Component, OnInit } from '@angular/core'; 
import { AddCityService } from '../../service/add-city.service';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';  
import { DetailedWeatherComponent } from '../detailed-weather/detailed-weather.component';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit { 
  fSuccess = false;
  fFailed = false;
  updated = false;
  failedStatusText ='';
  listOfCity = [];

  constructor(private addCityAPI: AddCityService, private detailedWeather: DetailedWeatherComponent) {
    
  }

  addCityForm = new FormGroup({
    city: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.loadCities();
  }
  loadCities(){
    if(localStorage.getItem('listOfCity') == '')
    return false;

    this.listOfCity = JSON.parse(localStorage.getItem('listOfCity'));
    if(this.listOfCity == null)
    this.listOfCity = [];


  }
  updateWeather(city, cityID){ 
    this.listOfCity = JSON.parse(localStorage.getItem('listOfCity'));
    this.addCityAPI.addCityFn(city[0].city)
     .subscribe((response:any) =>{
      const resBody = JSON.parse(response._body);
      const celsius = resBody.main.temp - 273.15;  
      this.listOfCity[cityID].celsius = celsius.toFixed(2);
      this.listOfCity[cityID].type = resBody.weather[0].main;
      localStorage.setItem('listOfCity', JSON.stringify(this.listOfCity));
      
      this.updated = true;
      setTimeout(() =>{
        this.updated = false;
      },5000);
     });
  }
  removeCity(cityID){
    this.listOfCity = JSON.parse(localStorage.getItem('listOfCity'));
    if(this.listOfCity == null)
    return false;

    this.listOfCity.splice(cityID,1);
    localStorage.setItem('listOfCity', JSON.stringify(this.listOfCity));
  }
  removeAll(){
    this.listOfCity = null;
    localStorage.setItem('listOfCity', '');
  }
   addCity(){ 
    this.addCityForm.controls['city'].markAsTouched();
    if(!this.addCityForm.valid)
    return false;

    const formData = this.addCityForm;
     this.addCityAPI.addCityFn(formData.value.city)
     .subscribe((response:any) =>{
       const resBody = JSON.parse(response._body);
       if(response.status == 200){
        
        if(this.listOfCity.length >= 8){
          this.listOfCity.pop();
        }

        const celsisu = resBody.main.temp - 273.15;  
        this.listOfCity.unshift({
          city: this.addCityForm.value.city,
          celsius: celsisu.toFixed(2),
          type: resBody.weather[0].main 
        });
        localStorage.setItem('listOfCity', JSON.stringify(this.listOfCity));

        this.fSuccess = true;
        this.fFailed = false;
        setTimeout(() =>{
          this.fSuccess = false;
        },5000);
        this.addCityForm.reset();
       }
     }, error => { 
       console.log(error);
       
     })
   }

  get city(){
    return this.addCityForm.get('city');
  }
  loadWeatherReport(city){
    this.detailedWeather.loadWeatherReport(city);
    this.detailedWeather.loadFiveDaysReport(city)
  }

}
