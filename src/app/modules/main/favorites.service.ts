import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { FavoriteCityWeather } from 'src/app/models/favoriteCityWeather.model';
import { of } from 'rxjs';

export interface FavoritesState {
  favorites: Array<FavoriteCityWeather>
}
@Injectable({
  providedIn: 'root'
})
export class FavoritesService extends ObservableStore<FavoritesState> {

  constructor() {
    const initialState = {
      favorites: []
    }
    super({ trackStateHistory: true });
    this.setState(initialState, 'INIT_STATE');
  }

  get() {
    const favorites = this.getState().favorites;
    if (favorites) {
      return of(favorites)
    }
    else {
      return of(null)
    }
  }

  add(favoriteCity: FavoriteCityWeather) {
    let state = this.getState();
    state.favorites.push(favoriteCity);
    this.setState({ favorites: state.favorites }, 'add_favorite');
  }

  remove(favoriteCity: FavoriteCityWeather) {
    let state = this.getState();
    let index = state.favorites.indexOf(favoriteCity)
    state.favorites.splice(index, 1);
    this.setState({ favorites: state.favorites }, 'remove_favorite');
  }

  isInFavorite(idCity: string, nameCity: string) {
    let flag = false
    let state = this.getState()
    let match_fav=state.favorites.find(favorite_city=>favorite_city.name==nameCity)
    flag=match_fav!=undefined
    return of(flag)
  }
}
