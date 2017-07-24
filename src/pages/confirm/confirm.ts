import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MybalaghatPage} from "../mybalaghat/mybalaghat";
import {MessagesPage} from "../messages/messages";
import {HomePage} from "../home/home";
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {

  constructor(public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
  }
 gobalaghat(){this.navCtrl.push(MybalaghatPage)}
 gomess(){
   this.navCtrl.push(MessagesPage);
 }
 gomain(){this.navCtrl.push(HomePage)}

 openMenu() {
   this.menuCtrl.open();
 }
}
