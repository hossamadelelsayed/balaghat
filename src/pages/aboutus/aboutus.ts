import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import {UserServiceProvider} from '../../providers/user-service';
@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html',
})
export class AboutusPage {
  public about : any = {
  };
  constructor(public userService :UserServiceProvider,public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams) {

    this.getAbout();
  }

  openMenu() {
   this.menuCtrl.open();
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutusPage');
  }
  getAbout() {
    this.userService.aboutUs().subscribe((res)=>{
       console.log(res);
       this.about = res ;
       });
 }
}
