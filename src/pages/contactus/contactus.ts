import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AboutusPage} from "../aboutus/aboutus";
import { MenuController } from 'ionic-angular';
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage {

  constructor(public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactusPage');
  }
gotoabout(){
  this.navCtrl.push(AboutusPage);
}
 openMenu() {
   this.menuCtrl.open();
 }
}
