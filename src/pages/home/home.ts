import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { NovoPostPage } from '../novo-post/novo-post';
import { Local } from '../../models/local';
import { FeedPage } from '../feed/feed';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { Post } from '../../models/post';
   
declare var google : any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage implements OnInit {

    @ViewChild('map') mapElement : ElementRef;
    public map : any;
    public list : Post[];

    constructor( public navCtrl : NavController, 
        public  platform        : Platform,
        private _geolocation    : GeolocationProvider,
        private _db             : PostServiceProvider ) {}


    ngOnInit(): void {

        this.list = this._db.getList();

        this._geolocation.getCurrentPosition()
        .then((success) => {
            this.initMap();
            this.list.forEach((post) => { this.addMarker(post) });
        });
    }

    public initMap(){

        console.log('Init Map Running...');

        this.map = new google.maps.Map( this.mapElement.nativeElement , {
            zoom    : 18,
            center  : { 
                lat : this._geolocation.getLocal().lat,
                lng : this._geolocation.getLocal().lng }
        });
    }

    public addMarker(post : Post){

        console.log('Add Marker Running...');

        let marker : google.maps.Marker = new google.maps.Marker({
            position    : new google.maps.LatLng(post.local.lat, post.local.lng),
            map         : this.map,
            icon        : {
                'url' : 'assets/icon/cone.png'
            },
            animation   : google.maps.Animation.DROP
        });

        let infowindow : google.maps.InfoWindow = new google.maps.InfoWindow({
            content : post.descricao
        });

        marker.addListener('click', () => {
            infowindow.open(this.map, marker);
        });
    }

    public newPost(){

        this.navCtrl.push( NovoPostPage, {
            'local' : this._geolocation.getLocal(),
            'db'    : this._db
        });
    }
}