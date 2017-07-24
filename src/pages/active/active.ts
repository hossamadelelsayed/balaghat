import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";

@Component({
  selector: 'page-active',
  templateUrl: 'active.html',
})
export class ActivePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivePage');
  }
 
 gotohome(){
   this.navCtrl.push(HomePage);
 }
 gotoactive(){
   this.navCtrl.push(HomePage);
 }
}
