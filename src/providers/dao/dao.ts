import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Post } from '../../models/post';
import { firebaseConfig } from '../../util/config';
import { LatLng } from '@ionic-native/google-maps';
/*
  Generated class for the DaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DaoProvider {

  private _posts : Post[];

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

  public get(uuid : string){
    let post : Post = new Post();
    if(uuid){
      let query = firebase.database().ref('/posts').orderByChild('uuid').equalTo(uuid);
      query.on('value', snapshot =>{
        /**
         * ...
         */
      });
      return post;
    }
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

    post.titulo     = childSnapshot.val().titulo;
    post.descricao  = childSnapshot.val().descricao;
    post.ativo      = childSnapshot.val().ativo;
    post.data_hora  = childSnapshot.val().data_hora;
    post.local      = new LatLng(childSnapshot.val().local.lat, childSnapshot.val().local.lng);

    this._posts.push(post);

    });
  }
}
