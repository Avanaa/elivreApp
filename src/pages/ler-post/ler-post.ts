import { Component, OnInit } from '@angular/core';
import { IonicPage,
  NavController,
  NavParams,
  AlertController
} from 'ionic-angular';
import { Post } from '../../models/post';
import { DaoProvider } from '../../providers/dao/dao';
import { HomePage } from '../home/home';

/**
 * Generated class for the LerPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ler-post',
  templateUrl: 'ler-post.html'
})
export class LerPostPage implements OnInit{

    public post : Post;
    private _db : DaoProvider;

    constructor(
        public navCtrl      : NavController,
        public navParams    : NavParams,
        public alertCtrl    : AlertController) {
    }

    ngOnInit(){
      this._db = this.navParams.get('db');
      const uuid = this.navParams.get('uuid');

      this._db.get(uuid).then( snapshot => {
        this.post = this._db.convertPost(snapshot);
      });
    }

    public goHome(){
        this.navCtrl.setRoot(HomePage);
    }
}
