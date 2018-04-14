import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Post } from '../../models/post';
import { PostServiceProvider } from '../../providers/post-service/post-service';

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

  constructor(public navCtrl: NavController, 
    public navParams        : NavParams,
    public alertCtrl        : AlertController) {

      this.post       = new Post();
      this.post.local = this.navParams.get('local');
      this._db        = this.navParams.get('db');
  }

  public addNovoPost(){
    console.log("addNovoPost()");
    this._db.push(this.post);

    this.post = new Post();

    let alert = this.alertCtrl.create({
      title : 'Criado',
      subTitle : 'Novo post criado com sucesso!',
      buttons : ['Ok']
    });
    alert.present();

    this.navCtrl.pop();
  }
}
