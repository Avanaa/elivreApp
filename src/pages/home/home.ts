import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { NovoPostPage } from '../novo-post/novo-post';
import { Local } from '../../models/local';
import { FeedPage } from '../feed/feed';
   
declare var google : any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {

    @ViewChild('map') mapElement : ElementRef;
    public map : any;
    public local : Local;

    constructor( public  navCtrl: NavController, 
        public  platform        : Platform ) {

            this.local = new Local();
            platform.ready().then(() => { this.initMap() });
    }

    initMap(){
        this.map = new google.maps.Map( this.mapElement.nativeElement , {
            zoom : 16,
            center : { lat:41.85, lng:-87.65 }
        });
    }

    addMarker(){
        this.novoPost();
    }

    public novoPost(){
        this.navCtrl.push( NovoPostPage, { 'local' : this.local } );
    }

    public feed(){
        this.navCtrl.push( FeedPage );
    }
}