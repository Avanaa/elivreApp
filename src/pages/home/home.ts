import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, LoadingController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    CameraPosition,
    MarkerOptions,
    Marker,
    LatLng
    } from '@ionic-native/google-maps';
   
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {

    @ViewChild('map') mapElement : ElementRef;
    private _map : GoogleMap;
    private _myLocation : LatLng;

    constructor( public  navCtrl: NavController, 
        public  platform        : Platform,
        private _geolocation    : Geolocation,
        private _loadingCtrl    : LoadingController,
        private _alertCtrl      : AlertController ) {

        platform.ready().then(() => {
            this.initMap();
        });
    }

    getLocation() {

        let loader = this._loadingCtrl.create({
            content : 'Carregando localização... Aguarde...'
        });
        loader.present();

        this._geolocation.getCurrentPosition()
            .then((data) => {
                loader.dismiss();

                let alert = this._alertCtrl.create({
                    title : 'Localização encontrada',
                    subTitle : 'Sua Localização atual é lat: ' + 
                        data.coords.latitude + 
                        ' lng: ' + data.coords.longitude,
                    buttons : ['Ok']
                });
                alert.present();

                this._myLocation = new LatLng(data.coords.latitude, data.coords.longitude);
                this.initMap();
            })
            .catch((err) => {
                let alert = this._alertCtrl.create({
                    title : 'Erro na localização',
                    subTitle : 'Não foi encontrada a localização atual',
                    buttons : ['Ok']
                });
                alert.present();
            });        
    }

    initMap(){

        let mapOptions : GoogleMapOptions;

        let element = this.mapElement.nativeElement;
        this._map = GoogleMaps.create(element);
        
        this._map.one(GoogleMapsEvent.MAP_READY)
            .then(() => {
                let mapOptions = {
                    target : this._myLocation,
                    zoom : 18
                };

                this._map.moveCamera(mapOptions);

            });
    }
}