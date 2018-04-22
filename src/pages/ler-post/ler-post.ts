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

    public post         : Post;
    private _db         : DaoProvider;

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
        this._db            = this.navParams.get('db');
        let uuid            = this.navParams.get('uuid');
        this.post           = this._db.get(uuid);
    }

    public gostei(){
        this.post.gostei++;
        this._db.update(this.post);
    }

    public goHome(){
        this.navCtrl.setRoot(HomePage);
    }
}
