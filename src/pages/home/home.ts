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

    initMap() {

        let mapOptions : GoogleMapOptions;

        let loader = this._loadingCtrl.create({
            content : 'Carregando localização... Aguarde...'
        });
        loader.present();

        this._geolocation.getCurrentPosition()
            .then((data) => {
                mapOptions = {
                    camera : {
                        target : {
                            lat : data.coords.latitude,
                            lng : data.coords.longitude
                        },
                    zoom : 18,
                    tilt : 30
                    }
                };
                let element = this.mapElement.nativeElement;
                this._map = GoogleMaps.create(element, mapOptions);
                loader.dismiss();
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
}