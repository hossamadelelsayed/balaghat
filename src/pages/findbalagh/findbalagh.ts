import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ImportnumsPage} from "../importnums/importnums"; 
import {SuggestionPage} from "../suggestion/suggestion";
import { MenuController } from 'ionic-angular';
import {MybalaghatPage} from "../mybalaghat/mybalaghat";
@Component({

  selector: 'page-findbalagh',
  templateUrl: 'findbalagh.html',
})
export class FindbalaghPage {

  constructor(public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindbalaghPage');
  }
 
 goto(){
   this.navCtrl.push(ImportnumsPage);
 }
 gotobalaghaty(){
   this.navCtrl.push(MybalaghatPage);
 }
 gotosugg(){
   this.navCtrl.push(SuggestionPage);
 }
  openMenu() {
   this.menuCtrl.open();
 }
}
