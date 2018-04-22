import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, Platform, AlertController, Alert, LoadingController, Loading } from 'ionic-angular';
import { NovoPostPage } from '../novo-post/novo-post';
import { LerPostPage } from '../ler-post/ler-post';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { Post } from '../../models/post';
import {
    GoogleMap,
    GoogleMaps,
    GoogleMapOptions,
    LatLng,
    GoogleMapsEvent,
    MarkerClusterOptions,
    MarkerCluster,
    MarkerOptions,
    Marker
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
    public loader                   : Loading;
    public locOn                    : boolean;
    public locations                : Array<any> = [];

    constructor(
        public navCtrl          : NavController,
        public alertCtrl        : AlertController,
        public loadingCtrl      : LoadingController,
        public  platform        : Platform,
        private _geolocation    : GeolocationProvider,
        private _db             : DaoProvider,
        private _googleMaps     : GoogleMaps) { }

    ngOnInit() : void {

        this.loader = this.loadingCtrl.create({
            dismissOnPageChange : false,
            content : 'Aguarde enquanto os dados são carregados...'
        });
        this.loader.present();

        this.list = this._db.list();

        this._geolocation.getCurrentPosition()
        .then((data) => {
            this.locOn = true;
            this.initMap(data);
        })
        .catch((err) => {

            this.locOn = false;

            let alert : Alert = this.alertCtrl.create({
                title : 'Não foi encontrado seu local atual',
                subTitle : 'Uma localização padrão foi carregada e você poderá consultar as postagens recentes. '
                + 'Conecte-se a internet e ative a localização do seu aparelho para poder inserir posts',
                buttons : ['Ok']
            });
            alert.present();

            // localizacao default
            const localizacao = {
              coords: {
                latitude: -8.0629562,
                longitude: -34.8720158
              }
            };
            this.initMap(localizacao);
        });
    }

    initMap(data : any){
        let element = this.mapElement.nativeElement;

        let options : GoogleMapOptions = {
            mapType : 'MAP_TYPE_ROADMAP',
            controls : {
                compass : true,
                myLocation : true,
                myLocationButton : this.locOn,
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

        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {

            /*
            this.createMarkers(this.map);
            */
           
            ///*
            this.map.addMarkerCluster(this.createCluster())
                .then((markerCluster : MarkerCluster) => {
                    console.log(markerCluster);
                })
                .catch((err) => {
                    console.log(err);
                });
            //*/

            this.map.on(GoogleMapsEvent.MY_LOCATION_BUTTON_CLICK)
                .subscribe(() => {
                    this.map.moveCamera({
                        target : new LatLng(data.coords.latitude, data.coords.longitude),
                        zoom : 18,
                        duration : 3000
                    });
                });

            this.map.on(GoogleMapsEvent.MAP_CLICK)
                .subscribe((data : LatLng) =>{

                    if (this.locOn) {
                        let dataJson = JSON.parse(data.toString());

                        let local : Local = new Local();
                        local.lat = dataJson.lat;
                        local.lng = dataJson.lng;
    
                        this.newPost(local);    
                    } else {
                        let alert = this.alertCtrl.create({
                            title : 'Não conseguimos saber onde você está',
                            subTitle : 'Sua localização atual não foi encontrada, verifique se seu GPS está ligado'
                                + ' e seu dispositivo tem acesso a rede e tente novamente',
                            buttons : [
                                {
                                    text : 'Tentar novamente',
                                    role : 'try',
                                    handler : () => { this.refresh() }
                                },
                                {
                                    text : 'Cancelar',
                                    role : 'cancel',
                                    handler : () => { console.log('cancel action') }
                                }
                            ]
                        });
                        alert.present();
                    }
                });
 
            this.map.on(GoogleMapsEvent.MAP_LONG_CLICK)
                .subscribe((data : LatLng) =>{
                    if (this.locOn) {

                        let dataJson = JSON.parse(data.toString());
    
                        let local : Local = new Local();
                        local.lat = dataJson.lat;
                        local.lng = dataJson.lng;
        
                        this.newPost(local);    
                    
                    } else {
                        let alert = this.alertCtrl.create({
                            title : 'Não conseguimos saber onde você está',
                            subTitle : 'Sua localização atual não foi encontrada, verifique se seu GPS está ligado'
                                + ' e seu dispositivo tem acesso a rede e tente novamente',
                            buttons : [
                                {
                                    text : 'Tentar novamente',
                                    role : 'try',
                                    handler : () => { this.refresh() }
                                },
                                {
                                    text : 'Cancelar',
                                    role : 'cancel',
                                    handler : () => { console.log('cancel action') }
                                }
                            ]
                        });
                        alert.present();
                    }
                });
        });
        this.loader.dismiss();
    }

    private createMarkers(map : GoogleMap){
        
        this.list.forEach((post) => {

            let options : MarkerOptions = {
                position : new LatLng(post.local.lat, post.local.lng),
                icon : 'blue',
                animation : 'DROP',
                disableAutoPan : false,
                title : post.titulo
            };
            
            map.addMarker(options)
                .then(marker => {
                    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                        let uuid = post.uuid;
                        this.openPost(uuid);
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }

    newPost(data : Local){
       this.navCtrl.setRoot(NovoPostPage, {
        'data'  : data,
        'db'    : this._db
        });
    }

    openPost(uuid : string) {
      this.navCtrl.setRoot(LerPostPage, {
        'uuid': uuid,
        'db': this._db
      });
    }

    public refresh(){
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }

    private createCluster() : MarkerClusterOptions {

        this.list.forEach((post : Post) => {

            let markerOptions : MarkerOptions = {
                position : { lat : post.local.lat, lng : post.local.lng },
                icon : 'blue',
                animation : 'DROP',
                disableAutoPan : false,
                title : post.titulo
            };
            
            this.locations.push(markerOptions);
        });

        let options : MarkerClusterOptions = {
            maxZoomLevel : 18,
            markers : this.locations,
            icons : [{
                min: 2, 
                max: 100, 
                url: "./assets/icon/m1.png", 
                anchor: {x: 16, y: 16},
                label : {
                    bold : true,
                    color : 'white'
                },
                size : {
                    width : 70,
                    height : 70
                }
            }]
        };
        return options;
    }

}
