import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Local } from '../../models/local';
import { HTTP } from '@ionic-native/http';
import { constantes } from '../../util/constantes';
import { mapkey } from '../../util/mapconfig';

/*
  Generated class for the GeolocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeolocationProvider {

  private _local : Local;

  constructor( private _geolocation : Geolocation, private _http : HTTP ) {
    this._local = new Local();
  }

  public getCurrentPosition() : Promise<any> {

    console.log('Get Current Position running...');

    return this._geolocation.getCurrentPosition({
      maximumAge : 3000,
      timeout : 5000,
      enableHighAccuracy : true
    })
    .then((data) => {
      this._local.lat = data.coords.latitude;
      this._local.lng = data.coords.longitude;

      console.log(data);

      this.getAddress();
    })
    .catch((err) => {
      console.log(err);
    });

  }

  public getAddress(){
    
    console.log('Get Address running...');

    let address : string = constantes.API_ADDRESS;
    
    address.replace( constantes.param1, this._local.lat.toString() );
    address.replace( constantes.param2, this._local.lng.toString() );
    address.replace( constantes.param3, mapkey.key );

    console.log(address);

    this._http.get( address, {}, {} )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public getLocal() : Local {
    return this._local;
  }
}
