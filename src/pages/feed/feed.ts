import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostServiceProvider } from '../../providers/post-service/post-service';
import { Post } from '../../models/post';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  private posts : Post[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _db : PostServiceProvider) { }
}
