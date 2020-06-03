import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { DetailedWeatherComponent } from './components/detailed-weather/detailed-weather.component';
import { AddCityService } from './service/add-city.service';
import { GetWeatherService } from './service/get-weather.service';

@NgModule({
  declarations: [
    AppComponent,
    CityListComponent,
    DetailedWeatherComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule, FormsModule, HttpClientModule, HttpModule, ReactiveFormsModule
  ],
  providers: [AddCityService, GetWeatherService, DetailedWeatherComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
