import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

declare var google : any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {

    @ViewChild('map') mapElement : ElementRef;
    map : any;
    markers = [];

    constructor( public  navCtrl: NavController, 
        public  platform        : Platform,
        private _geolocation    : Geolocation) {

        platform.ready().then(() => {
            this.initMap();
        })
    }

    initMap() {

        let myLocation ;
        let watch;
        let updateLocation;
        let image;

        this._geolocation.getCurrentPosition(
            (data) => {
                myLocation = new google.maps.LatLng( data.coords.latitude, data.coords.longitude );
                this.map = new google.maps.Map(this.mapElement.nativeElement, {
                    zoom : 7,
                    center : { myLocation }
                });
            },
            (err) => {
                // Erro
            }
        )

        watch = this._geolocation.watchPosition(
            (data) => {
                this.deleteMarkers();
                updateLocation = new google.maps.LatLng( data.coords.latitude, data.coords.longitude );
                image = 'assets/imgs/blue-bike.png';
                this.addMarker( updateLocation, image );
                this.setMapOnAll( this.map );
            },
            (err) => {
                // Erro
            }
        )
    }

    private deleteMarkers(){
        this.setMapOnAll( null );
        this.markers = [];
    }

    private addMarker( location, image ){

        let marker = new google.maps.Marker({
            position : location,
            map : this.map,
            //icon : image
        });
        this.markers.push(marker);
    }

    private setMapOnAll( map ){
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    }
}
