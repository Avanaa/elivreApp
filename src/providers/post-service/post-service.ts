import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Post } from '../../models/post';
import { firebaseConfig } from '../../util/config';

/*
  Generated class for the PostServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostServiceProvider {

  private _query : firebase.database.Query;

  constructor() {
    firebase.initializeApp(firebaseConfig);
    this._query = firebase.database().ref('/posts')
      .orderByChild('ativo')
      .equalTo(true);

      this.list();
  }

  public list() : Post[] {
    let posts : Post[];
    this._query.on('value', snapshot => {
      posts = snapshot.val()
    });
    return posts;
  }

  public update(post : Post) : void {
    if(post){
      firebase.database().ref('/posts').update(post)
    }
  }

  public set(post : Post) : void {
    firebase.database().ref('/posts').set({
      uuid : post.uuid,
      ativo : post.ativo
    });
  }

  public push(post : Post) : void {
    post.ativo = true;
    console.log(post);
    firebase.database().ref('/posts').push(post);
  }

  public get(uuid : string){
    let post : Post = new Post();
    if(uuid){
      let query = firebase.database().ref('/posts').orderByChild('uuid').equalTo(uuid);
      query.on('value', snapshot =>{
        let value = snapshot.val();
        post.titulo = value.titulo;
        post.descricao = value.descricao;
        // ...
      });
      return post;
    }
  }

  public delete(post : Post){
    firebase.database().ref('/posts').set({
      uuid : post.uuid,
      ativo : post.ativo
    });
  }
}
