import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ContactusPage} from "../contactus/contactus";
import { MenuController } from 'ionic-angular';
@Component({
  selector: 'page-suggestion',
  templateUrl: 'suggestion.html',
})
export class SuggestionPage {

  constructor(public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuggestionPage');
  }
gocontact(){
  this.navCtrl.push(ContactusPage);
}
openMenu() {
   this.menuCtrl.open();
 }
}
