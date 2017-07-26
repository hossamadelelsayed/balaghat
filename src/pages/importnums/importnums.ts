import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service"; 
import { SMS } from '@ionic-native/sms';
import { CallNumber } from '@ionic-native/call-number';


@Component({
  selector: 'page-importnums',
  templateUrl: 'importnums.html',
})
export class ImportnumsPage {
  public importantNums : any ;
  public hot ;
  constructor(public userService:UserServiceProvider,
              public menuCtrl: MenuController,
              public navCtrl: NavController,
               private sms: SMS,
              private callNumber: CallNumber, 
              public navParams: NavParams) {

                this.getNums();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImportnumsPage');
  }
 openMenu() {
   this.menuCtrl.open();
 }

 getNums(){
       this.userService.getimportantnums().subscribe((res)=>{
       this.importantNums = res;
       this.hot=this.importantNums.HotLine;
       console.log(this.importantNums);
    });
  }
    sendSms(){
    this.sms.send('01221924616','Hello world');
  }

  callEmergancy(){
    this.callNumber.callNumber("01221924616" , true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
  }
}
