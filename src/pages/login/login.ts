import { Component } from '@angular/core';
import { NavController, NavParams ,ToastController} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import { AlertController } from 'ionic-angular';
import {SignupPage} from "../signup/signup";
import {HomePage} from "../home/home";
import {UserServiceProvider} from '../../providers/user-service';
import {ActivePage} from "../active/active";
import {Location} from "../../models/location";
import {MainServiceProvider} from "../../providers/main-service";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public user = {};
  constructor(  private userService: UserServiceProvider,
                private toastCtrl : ToastController,
                public navCtrl: NavController,
                private alertCtrl: AlertController ,
                public navParams: NavParams,
                public translateService : TranslateService) {
                  console.log(MainServiceProvider.lang);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

 gotolog(){
   
    this.userService.userLogin(this.user).subscribe(
      (user)=>{
        if(user.Error)
        {
          // return with errors
          this.presentToast(user.Error);
        }
        else 
        {   console.log(user);
            this.userService.user = user;
            this.userService.userStorageSave(user);
            this.navCtrl.setRoot(HomePage);
            this.translateService.get("Success Login").subscribe(
               value => {
        // value is our translated string
                   this.presentToast(value);

            });  
        } 
      });
 }

  presentToast(txt:string) {
    let toast = this.toastCtrl.create({
      message: txt,
      duration: 3000
    });
    toast.present();
  }
 
presentPrompt() {
  let alert = this.alertCtrl.create({
  
    title: 'Enetr Your Email to Reset password',
    inputs: [
      {
        name: 'email',
        placeholder: 'Email',
        type:'email'
      }
    ],
    buttons: [
      {
        text: 'ok',
        role: 'submit',
       
        handler:data=>{
           this.userForget(data.email);
           
        } 
      }
    ]
  });
  alert.present();
}


 userForget(email)
  {
    this.userService.userForgetPassword(email).subscribe((data)=>{
      if(data.error)
      {
        this.presentToast(data.error);
      }
      else
      {
        this.translateService.get('Message').subscribe(
          value => {
            // value is our translated string
            this.presentToast(value);
            this.navCtrl.push(ActivePage);
          }
        );
      }
    });
  }

gotonew(){
   this.navCtrl.push(SignupPage);
}
gotomain(){
  this.navCtrl.push(HomePage);
}
}
