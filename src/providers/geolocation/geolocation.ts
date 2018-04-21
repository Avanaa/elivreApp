import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
/*
  Generated class for the GeolocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeolocationProvider {

  constructor( private _geolocation : Geolocation) {}

  public getCurrentPosition() : Promise<any> {
    
    return this._geolocation.getCurrentPosition({
      maximumAge : 3000,
      timeout : 5000,
      enableHighAccuracy : true
    });
  }
}
