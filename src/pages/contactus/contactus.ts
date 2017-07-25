import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AboutusPage} from "../aboutus/aboutus";
import { MenuController } from 'ionic-angular';
import {UserServiceProvider} from '../../providers/user-service';
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage {

  public contact: any = {};

  constructor(public userService :UserServiceProvider,public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams) {
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

 sendMess(){
    this.userService.contactUs(this.contact.mobile,this.contact.body).subscribe((res)=>{
        console.log(res);
       });
 }
}
