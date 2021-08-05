export class FavoriteCityWeather{
    name:string
    key:string
    currentWeatherText:string
    currentWeatherValue:string
    constructor(_name:string,_key:string) {
        this.name=_name
        this.key=_key
    }
}