import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { NovoPostPage } from '../novo-post/novo-post';
import { Local } from '../../models/local';
import { FeedPage } from '../feed/feed';
   
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {

    @ViewChild('map') mapElement : ElementRef;
    public local : Local;

    constructor( public  navCtrl: NavController, 
        public  platform        : Platform ) {

            this.local = new Local();
            platform.ready().then(() => {

            });
    }

    addMarker(){
        // Marcar local no mapa
        //this.local.lat = Latitude Selecionada no Mapa;
        //this.local.lng = Longitude Selecionada no Mapa;
        this.novoPost();
    }

    public novoPost(){
        this.navCtrl.push( NovoPostPage, { 'local' : this.local } );
    }

    public feed(){
        this.navCtrl.push( FeedPage );
    }
}