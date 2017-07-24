import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import {ActivePage} from "../active/active";
import {UserServiceProvider} from '../../providers/user-service';
import {HomePage} from "../home/home";


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public user = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private userService:UserServiceProvider,
              private toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
 

 gotoactive(){
   this.navCtrl.push(ActivePage);
 }

 gotolog(){
  this.userService.userRegister(this.user).subscribe(
    (user)=>{
      if(user.Erorr){
        this.presentToast(user.Erorr);
       
      }
      else{
        this.userService.user = user;
        this.userService.userStorageSave(user);
        console.log(this.userService.user);
        this.presentToast("Sucess Register");
        this.navCtrl.setRoot(ActivePage);
      }
    }

  );
 }


   presentToast(txt:string) {
    let toast = this.toastCtrl.create({
      message: txt,
      duration: 3000
    });
    toast.present();
  }
}
