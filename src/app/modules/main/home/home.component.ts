import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { currentCityWeather } from 'src/app/models/current-city-weather.model';
import { FavoriteCityWeather } from 'src/app/models/favoriteCityWeather.model';
import { ActivatedRoute } from '@angular/router';
import { FavoritesService } from '../favorites.service';

const DEFAULT_CITY_NAME = "Tel Aviv"
const DEFAULT_CITY_KEY = "215854"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _service: MainService, private _acr: ActivatedRoute,private _favoriteService:FavoritesService) { }

  ngOnInit() {
    this._acr.paramMap.subscribe(data => {
      if (data.has("key")) {
        this.initializeScreenWithParameters(data.get("key")||undefined, data.get("name")||undefined)
      }
      //get the position
      else {
        navigator.geolocation.getCurrentPosition((position) => {
          this._service.getGeoposition(position.coords.latitude, position.coords.longitude).subscribe(data => {
            this.initializeScreenWithParameters(data.Key, data.LocalizedName)
          })
        }), (_err: any) => {
          this.initializeScreenWithParameters()
        };
      }
    })
  }

  initializeScreenWithParameters(keyCity: string=DEFAULT_CITY_KEY, nameCity: string=DEFAULT_CITY_NAME) {
    this.currentCity = new currentCityWeather()
    this.getFiveDaysForecatst(keyCity)
    this.currentCity.name = nameCity
    this.currentCity.isCelsius = "true"
  }

  inputCityControl = new FormControl()
  currentCity: currentCityWeather
  isInFavorite: boolean
  cities$:Observable<any[]>

  onKeyPressInSearchCity() {
    this.cities$=this._service.getAutoComplete(this.inputCityControl.value).pipe(
      catchError(err=> this.errorOnKeyPress)
    )
  }

  errorOnKeyPress(){
    this._service.openDialogError("oops fault, please Enter data again")
  }

  displayNameCity(city: any): string {
    return city && city.LocalizedName ? city.LocalizedName : '';
  }

  selectedCity(value: any) {
    this.getFiveDaysForecatst(value.Key)
    this.currentCity.name = value.LocalizedName
  }

  unitTempChange(event: any) {
    this.getFiveDaysForecatst(this.currentCity.key)
  }

  getFiveDaysForecatst(_currentCityKey: string) {
    this._service.get5DaysOfDailyForecasts(_currentCityKey, this.currentCity.isCelsius).subscribe(data => {
      this.currentCity.fiveDaysDailyForecasts = data.DailyForecasts
      this.currentCity.key = _currentCityKey
      this._favoriteService.isInFavorite(this.currentCity.key, this.currentCity.name).subscribe(result=>{
        this.isInFavorite=result
      })
    },err=>{
      this._service.openDialogError("Oops, fault please try again")
    })
  }
  
  //add to favorites or remove from favorite
  addOrDeleteFavorites() {
    let currentCityFavorite = new FavoriteCityWeather(this.currentCity.name, this.currentCity.key)
    if (this.isInFavorite) {
      this._favoriteService.remove(currentCityFavorite)
    }
    else {
      this._favoriteService.add(currentCityFavorite)
    }
    this.isInFavorite = !this.isInFavorite
  }
}
