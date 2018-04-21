import { Component, OnInit } from '@angular/core';
import { IonicPage, 
  NavController, 
  NavParams, 
  AlertController,
  Platform
} from 'ionic-angular';
import { Post } from '../../models/post';
import { DaoProvider } from '../../providers/dao/dao';
import { HomePage } from '../home/home';
import { Local } from '../../models/local';

/**
 * Generated class for the NovoPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-novo-post',
  templateUrl: 'novo-post.html',
})
export class NovoPostPage implements OnInit {

    public post : Post;
    private _db : DaoProvider;

    constructor(
        public navCtrl      : NavController, 
        public navParams    : NavParams,
        public alertCtrl    : AlertController,
        public platform     : Platform) {

            this.platform.registerBackButtonAction(() => {
                this.goHome();
            });
    }

    ngOnInit(){

        this.post = new Post();
        this._db  = this.navParams.get('db');
        let data : Local = this.navParams.get('data');
        
        this.post.local.lat = data.lat;
        this.post.local.lng = data.lng;
    }

    public addPost(){
        this._db.push(this.post);
        this.goHome();
    }

    public goHome(){
        this.navCtrl.setRoot(HomePage);
    }
}
