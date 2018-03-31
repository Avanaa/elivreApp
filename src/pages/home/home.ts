import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google : any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {

    @ViewChild('map') mapElement : ElementRef;
    map : any;

    constructor( public  navCtrl: NavController, 
        public  platform        : Platform,
        private _geolocation    : Geolocation) {

        platform.ready().then(() => {
            this.initMap();
        })
    }

    initMap() {

        let myLocation ;

        this._geolocation.getCurrentPosition()
            .then(
                (data) => {
                    myLocation = new google.maps.LatLng( data.coords.latitude, data.coords.longitude );
                    this.map = new google.maps.Map(this.mapElement.nativeElement, {
                        zoom : 7,
                        center : { myLocation }  
                    });
                }
            )
            .catch((err) => {});
    }
}
