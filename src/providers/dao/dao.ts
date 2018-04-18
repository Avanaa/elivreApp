import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Post } from '../../models/post';
import { firebaseConfig } from '../../util/config';
/*
  Generated class for the DaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DaoProvider {

  private _posts : Post[];
  private _post: Post;

  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

  public list() : Post[] {

    this._posts = new Array<Post>();

    firebase.database().ref('/posts').on('value', snapshot => {
      this.convert(snapshot);
    });

    return this._posts;
  }

  public update(post : Post) : void {
    if(post){
      firebase.database().ref('/posts').update(post)
    }
  }

  public set(post : Post) : void {
    firebase.database().ref('/posts').set({
      uuid : post.uuid,
      value : post
    });
  }

  public push(post : Post) : void {
    post.ativo    = true;
    post.data_hora = new Date();

    firebase.database().ref('/posts').push(post);
  }

  public get(uuid : string) : any {
    return firebase.database().ref('posts/'+uuid).once('value');
  }

  public delete(post : Post){
    firebase.database().ref('/posts').set({
      uuid : post.uuid,
      ativo : false
    });
  }

  private convert(snapshot : any) : void {

    snapshot.forEach(childSnapshot => {

    let post  : Post  = new Post();

    post.uuid       = childSnapshot.key;
    post.titulo     = childSnapshot.val().titulo;
    post.descricao  = childSnapshot.val().descricao;
    post.ativo      = childSnapshot.val().ativo;
    post.data_hora  = childSnapshot.val().data_hora;
    post.local.lat  = childSnapshot.val().local.lat;
    post.local.lng  = childSnapshot.val().local.lng;

    this._posts.push(post);

    });
  }

  public convertPost(snapshot: any): Post {
      let post: Post = new Post();
      post.uuid = snapshot.key;
      post.titulo = snapshot.val().titulo;
      post.descricao = snapshot.val().descricao;
      post.ativo = snapshot.val().ativo;
      post.data_hora = snapshot.val().data_hora;
      post.local.lat = (snapshot.val().local) ? snapshot.val().local.lat : null;
      post.local.lng = (snapshot.val().local) ? snapshot.val().local.lng : null;

      // this._post = post;
      return post;
  }

}
