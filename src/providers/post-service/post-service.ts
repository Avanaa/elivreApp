import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Post } from '../../models/post';
import { firebaseConfig } from '../../util/config';
import { Avaliacao } from '../../models/avaliacao';
import { Local } from '../../models/local';

/*
  Generated class for the PostServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostServiceProvider {

  private _query : firebase.database.Query;
  private _ref   : firebase.database.Reference;
  private _posts : Post[];

  constructor() {

    firebase.initializeApp(firebaseConfig);

    this._ref = firebase.database().ref('/posts');
    this._query = this._ref.orderByChild('ativo').equalTo(true);
    this.list();
  
    }

  public getList() {
    return this._posts;
  }

  private list() {

    this._posts = new Array<Post>();

    this._query.on('value', snapshot => {
      this.convert(snapshot);
    });
  }

  public update(post : Post) : void {
    if(post){
      this._ref.update(post)
    }
  }

  public set(post : Post) : void {
    this._ref.set({
      uuid : post.uuid,
      value : post
    });
  }

  public push(post : Post) : void {
    post.ativo    = true;
    post.data_hora = new Date();

    this._ref.push(post);
  }

  public get(uuid : string){
    let post : Post = new Post();
    if(uuid){
      let query = this._ref.orderByChild('uuid').equalTo(uuid);
      query.on('value', snapshot =>{
        /**
         * ...
         */
      });
      return post;
    }
  }

  public delete(post : Post){
    this._ref.set({
      uuid : post.uuid,
      ativo : false
    });
  }

  private convert(snapshot : any) : void {
    
    snapshot.forEach(childSnapshot => {
    
    let post  : Post  = new Post();
    let local : Local = new Local();

    local.rua       = childSnapshot.val().local.rua;
    local.numero    = childSnapshot.val().local.numero;
    local.bairro    = childSnapshot.val().local.bairro;
    local.cidade    = childSnapshot.val().local.cidade;
    local.estado    = childSnapshot.val().local.estado;
    local.pais      = childSnapshot.val().local.pais;
    local.lat       = childSnapshot.val().local.lat;
    local.lng       = childSnapshot.val().local.lng;

    post.uuid       = childSnapshot.val().uuid
    post.titulo     = childSnapshot.val().titulo;
    post.descricao  = childSnapshot.val().descricao;
    post.ativo      = childSnapshot.val().ativo;
    post.data_hora  = childSnapshot.val().data_hora;

    post.local      = local;

    this._posts.push(post);

    });
  }

}
