import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, Platform, AlertController, Alert } from 'ionic-angular';
import { NovoPostPage } from '../novo-post/novo-post';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { Post } from '../../models/post';
import { 
    GoogleMap, 
    GoogleMaps, 
    GoogleMapOptions, 
    LatLng, 
    GoogleMapsEvent, 
    MarkerOptions
    } from '@ionic-native/google-maps';
import { DaoProvider } from '../../providers/dao/dao';
import { Local } from '../../models/local';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage implements OnInit {

    @ViewChild('map') mapElement    : ElementRef;
    public map                      : GoogleMap;
    public list                     : Post[];
    public currentLocation          : Local;

    constructor( 
        public navCtrl          : NavController, 
        public alertCtrl        : AlertController,
        public  platform        : Platform,
        private _geolocation    : GeolocationProvider,
        private _db             : DaoProvider,
        private _googleMaps     : GoogleMaps
    ){}

    ngOnInit() : void {

        this.list = this._db.list();
        
        this._geolocation.getCurrentPosition()
        .then((data) => {

            // Comentar depois que localização for retornada pelo click no mapa
            this.currentLocation = new Local();
            this.currentLocation.lat = data.coords.latitude;
            this.currentLocation.lng = data.coords.longitude;

            this.initMap(data);
        })
        .catch((err) => {
            let alert : Alert = this.alertCtrl.create({
                title : 'Erro na localização',
                subTitle : 'Verifique conexão com a internet e GPS',
                buttons : ['Ok']
            });
            alert.present();
        });
    }

    initMap(data : any){
        
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
                    lat: data.coords.latitude,
                    lng: data.coords.longitude,
                },
                zoom : 18
            }
        };

        this.map = this._googleMaps.create(element, options);
        
        this.map.on(GoogleMapsEvent.MAP_READY)
            .subscribe(() => {
                
                this.createMarkers();

                this.map.on(GoogleMapsEvent.MAP_CLICK)
                    .subscribe((data : LatLng) =>{
                        this.newPost(data);
                    });
            })
    }

    createMarkers(){
        this.list.forEach((post) => {
            
            let options : MarkerOptions = {
                position : new LatLng(post.local.lat, post.local.lng),
                icon : 'blue',
                animation : 'DROP',
                disableAutoPan : false,
                title : post.titulo
            };
            this.map.addMarker(options);
        });
    }

    newPost(data : LatLng){

        // Descomentar depois que localização for retornada pelo click no mapa
        /*
        this.navCtrl.push(NovoPostPage, {
            'data' : data,
            'db'  : this._db
        });
        */
       
       this.navCtrl.push(NovoPostPage, {
        'data' : this.currentLocation,
        'db'  : this._db
        });
    }
}