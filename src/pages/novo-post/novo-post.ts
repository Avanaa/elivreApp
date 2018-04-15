import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Post } from '../../models/post';
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { LatLng } from '@ionic-native/google-maps';
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
export class NovoPostPage {

  public post : Post;
  private _db : PostServiceProvider;
  public latLng : LatLng;

  constructor(public navCtrl: NavController, 
    public navParams        : NavParams,
    public alertCtrl        : AlertController) {

      this.post   = new Post();
      this.latLng = this.navParams.get('local');
      this._db    = this.navParams.get('db');
  }

  public addPost(){

    console.log('Add Post Running...');

    this.post.local.lat = this.latLng.lat;
    this.post.local.lng = this.latLng.lng;

    this._db.push(this.post);

    let alert = this.alertCtrl.create({
      title : 'Criado',
      subTitle : 'Novo post criado com sucesso!',
      buttons : ['Ok']
    });
    alert.present();

    this.navCtrl.pop();
  }
}
