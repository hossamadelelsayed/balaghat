import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import {HomePage} from "../home/home";
import {TranslateService} from '@ngx-translate/core';
import {MainServiceProvider} from "../../providers/main-service";

@Component({
  selector: 'page-active',
  templateUrl: 'active.html',
})
export class ActivePage {
  public main = MainServiceProvider;
  constructor( private translateService : TranslateService, private toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams) {
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

  presentToast() {
    let toast = this.toastCtrl.create({
      message:this.main.lang == 'en' ? 'Code Sending is Done' :'تم ارسال كود التفعيل',
      duration: 3000
    });
    toast.present();
  }
  
}
