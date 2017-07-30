import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MybalaghatPage} from "../mybalaghat/mybalaghat";
import {MessagesPage} from "../messages/messages";
import {HomePage} from "../home/home";
import { MenuController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';


@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {
   public balaghnum : any ;
   public created : any ;


  constructor(public menuCtrl: MenuController,
              public navCtrl: NavController, 
              public navParams: NavParams,
              private callNumber: CallNumber) {

     this.balaghnum = this.navParams.data.balaghID;
     this.created = this.navParams.data.creatededAt;
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
 callEmergancy(){
    this.callNumber.callNumber("01221924616" , true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
  }
}
