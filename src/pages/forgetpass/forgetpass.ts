import { Component } from '@angular/core';
import { ToastController, NavController, NavParams } from 'ionic-angular';
import {UserServiceProvider} from '../../providers/user-service';
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'page-forgetpass',
  templateUrl: 'forgetpass.html',
})
export class ForgetpassPage {
   public email:any;
  constructor(private userService: UserServiceProvider,public translateService : TranslateService, private toastCtrl : ToastController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpassPage');
  }
  presentToast(txt:string) {
    let toast = this.toastCtrl.create({
      message: txt,
      duration: 3000
    });

    toast.present();
  }
   userForget()
  { console.log(this.email);
    this.userService.userForgetPassword(this.email).subscribe((data)=>{
      console.log(data);
       if(data.Error)
      {
        this.presentToast(data.Error);
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
}
