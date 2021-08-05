import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { query } from '@angular/animations';
import { FavoriteCityWeather } from 'src/app/models/favoriteCityWeather.model';
import { flatMap } from 'rxjs/operators';
import { ErrorMessageComponent } from '../other/error-message/error-message.component';
import { MatDialog } from '@angular/material/dialog';

const API_KEY:string="HOXo0AOzySptQ1ARA6acEflCJKWaeRGo"
@Injectable()
export class MainService {

  constructor(private _http:HttpClient,public dialog: MatDialog) { }

  getAutoComplete(key_to_search: string): Observable<any> {
    const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${key_to_search}`;
    return this._http.get<any>(url)
  }

  getCurrentConditions(idCurrentCity:string):Observable<any>{
    return this._http.get<any>(`http://dataservice.accuweather.com/currentconditions/v1/${idCurrentCity}?apikey=${API_KEY}`)
  }
  
  get5DaysOfDailyForecasts(key_to_search:string,is_metric:string):Observable<any>{
    return this._http.get<any>(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key_to_search}?apikey=${API_KEY}&metric=${is_metric}`)
  }

  getGeoposition(lat:number,lon:number):Observable<any>{
    return this._http.get<any>(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat}%2C${lon}`)
  }

   //error message
   openDialogError(errorMessageToSend:string): void {
    const dialogRef = this.dialog.open(ErrorMessageComponent, {
      width: '250px',
      data: {errorMessage:errorMessageToSend}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
