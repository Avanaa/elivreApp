import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { NovoPostPage } from '../novo-post/novo-post';
import { Local } from '../../models/local';
import { FeedPage } from '../feed/feed';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { Post } from '../../models/post';
import { GoogleMap, GoogleMaps, GoogleMapOptions, LatLng, GoogleMapsEvent, MarkerOptions } from '@ionic-native/google-maps';

declare var google : any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage implements OnInit {

    @ViewChild('map') mapElement : ElementRef;
    //public map : any;
    public map : GoogleMap;
    public list : Post[];
    //public markerClusterer : MarkerClusterer;

    constructor( public navCtrl : NavController, 
        public  platform        : Platform,
        private _geolocation    : GeolocationProvider,
        private _db             : PostServiceProvider,
        private _googleMaps     : GoogleMaps ) {}


    ngOnInit(): void {

        this.list = this._db.getList();
        
        this._geolocation.getCurrentPosition()
        .then((success) => {
            this.initMap();
        });
    }

    initMap(){
        let element = this.mapElement.nativeElement;

        let options : GoogleMapOptions = {
            mapType : 'MAP_TYPE_ROADMAP',
            controls : {
                compass : true,
                myLocation : true,
                myLocationButton : true,
                mapToolbar : true
            },
            camera : {
                target : {
                    lat: this._geolocation.getLocal().lat,
                    lng: this._geolocation.getLocal().lng,
                },
                zoom : 18
            }
        };

        this.map = this._googleMaps.create(element, options);
        this.map.on(GoogleMapsEvent.MAP_READY)
            .subscribe(() => {
                this.createMarkers();
            })
    }

    createMarkers(){
        this.list.forEach((post) => {
            
            let local : LatLng = new LatLng(post.local.lat, post.local.lng);
            
            let options : MarkerOptions = {
                position : local,
                icon : 'red',
                animation : 'DROP'
            };

            this.map.addMarker(options);
        });
    }

    public newPost(){
        
        let local : LatLng = new LatLng(this._geolocation.getLocal().lat, this._geolocation.getLocal().lng);
        this.navCtrl.push( NovoPostPage, {
            'local' : local,
            'db'    : this._db
        });
    }
}