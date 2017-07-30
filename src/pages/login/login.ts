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
 exeEmail(){
    this.userService.translateArray(
      ['Enetr Your Email to Reset password',
      'Email',
      'ok']).subscribe((translatedArray)=>{
        this.presentPrompt(translatedArray);
      });
 }
presentPrompt(translatedArray : string[]) {
  let alert = this.alertCtrl.create({
  
    title: translatedArray[0],
    inputs: [
      {
        name: 'email',
        placeholder: translatedArray[1],
        type:'email'
      }
    ],
    buttons: [
      {
        text: translatedArray[2],
        role: 'submit',
        
        handler:data=>{
          if(data.email != null)
           this.userForget(data.email);
          else
           {
              this.translateService.get('You must enter Your email').subscribe(
                value => {
                  // value is our translated string
                  this.presentToast(value);
                }
              );
           } 
        } 
      }
    ]
  });
  alert.present();
}

 userForget(email :any)
  {
    this.userService.userForgetPassword(email).subscribe((data)=>{
      if(data.error)
      {
        this.presentToast(data.error);
      }
      else
      {
        this.translateService.get('new password sent to your email').subscribe(
          value => {
            // value is our translated string
            this.presentToast(value);
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
