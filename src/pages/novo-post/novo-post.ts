import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  NavParams, 
  AlertController
} from 'ionic-angular';
import { Post } from '../../models/post';
import { DaoProvider } from '../../providers/dao/dao';

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
export class NovoPostPage {

    public post : Post;
    private _db : DaoProvider;

    constructor(
        public navCtrl      : NavController, 
        public navParams    : NavParams,
        public alertCtrl    : AlertController) {

        this.post = new Post();
        this._db  = this.navParams.get('db');
        let data  = this.navParams.get('data');
        
        this.post.local.lat = data.lat;
        this.post.local.lng = data.lng;
    }

    public addPost(){
        console.log('Add Post Running...');

        this._db.push(this.post);
        this.navCtrl.pop();
    }
}
