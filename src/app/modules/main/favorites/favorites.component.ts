import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { FavoriteCityWeather } from 'src/app/models/favoriteCityWeather.model';
import { FavoritesService } from '../favorites.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  constructor(private _service: MainService, private _router: Router, private _favoriteService: FavoritesService) { }

  ngOnInit(): void {
    this.storeFavorites = this._favoriteService.stateChanged.subscribe(state => {
      if (state) {
        this.favoriteFromService = state.favorites;
      }
    });
    this.getCurrentWeatherToAllFavoriteCity()
  }

  ngOnDisroy() {
    this.storeFavorites.unsubscribe()
  }

  storeFavorites: Subscription
  favoriteFromService: Array<FavoriteCityWeather> = []

  getCurrentWeatherToAllFavoriteCity() {
    this.favoriteFromService.forEach(favorite => {
      this._service.getCurrentConditions(favorite.key).subscribe(weatherDetails => {
        favorite["currentWeatherText"] = weatherDetails[0].WeatherText
        favorite["currentWeatherValue"] = weatherDetails[0].Temperature.Metric.Value
      },err=>{
        this._service.openDialogError("oops fault, please try later")
      })
    })
  }

  showFullWeather(key: string, name: string) {
    this._router.navigate(["/home", key, name])
  }

  removeFromFavorites(cityToRemove: FavoriteCityWeather) {
    this._favoriteService.remove(cityToRemove)
  }
}
