import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    public pag: number = 0;
    public usuario = {email:"", senha:"", nome: ""}

    constructor(public navCtrl: NavController, public navParams: NavParams) {}

    proxima(){
        this.pag = 1;
        console.log(this.usuario)
    }
    login(){ this.navCtrl.setRoot(HomePage) }
}
