import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { NovoPostPage } from '../novo-post/novo-post';
import { Local } from '../../models/local';
import { FeedPage } from '../feed/feed';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { PostServiceProvider } from '../../providers/post-service/post-service';
   
declare var google : any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {

    @ViewChild('map') mapElement : ElementRef;
    public map : any;

    constructor( public  navCtrl: NavController, 
        public  platform     : Platform,
        private _geolocation : GeolocationProvider,
        private _db          : PostServiceProvider ) {

            platform.ready().then(() => { 
                this._geolocation.getCurrentPosition()
                    .then(() => {
                        this.initMap();
                    })
                });
    }

    initMap(){

        console.log('Init Map Running...');

        this.map = new google.maps.Map( this.mapElement.nativeElement , {
            zoom : 16,
            center : { 
                lat: this._geolocation.getLocal().lat,
                lng: this._geolocation.getLocal().lng }
        });
    }

    addMarker(){
        this.novoPost();
    }

    public novoPost(){
        this.navCtrl.push( NovoPostPage, {
            'local' : this._geolocation.getLocal(),
            'db' : this._db
        } );
    }

    public feed(){
        this.navCtrl.push( FeedPage );
    }
}