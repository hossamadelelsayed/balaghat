import { Component } from '@angular/core';
import { NavController, NavParams ,ToastController} from 'ionic-angular';
import { MenuController, AlertController } from 'ionic-angular';
import { FindbalaghPage} from "../findbalagh/findbalagh";
import {UserServiceProvider} from "../../providers/user-service";
import {TranslateService} from "@ngx-translate/core";
import {Camera,CameraOptions} from "@ionic-native/camera";
@Component({
  selector: 'page-editaccount',
  templateUrl: 'editaccount.html',
})
export class EditaccountPage {
  public image:string = "";
  public user : any ;
  constructor(private toastCtrl : ToastController,
              private translateService: TranslateService,
              public menuCtrl: MenuController,
              public navCtrl: NavController, 
              public navParams: NavParams,
              public userService:UserServiceProvider,
              public camera: Camera,
              public alertCtrl : AlertController) 
              {
                 
                if(userService.user != null)
                    {
                      this.user = userService.user;
                    }
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditaccountPage');
  }
openMenu() {
   this.menuCtrl.open();
 }

 gofind(){
   this.navCtrl.push(FindbalaghPage);
 }

userUpdate(inputs : any){
     console.log(inputs);
     this.userService.userUpdate(inputs.PersonalID,inputs.Mobile,inputs.Email,
      inputs.Password,this.image).subscribe((res)=>{
        console.log(res);
        if(res.user_id)
        {
          this.userService.user = res ;
          this.navCtrl.pop();
        }
        else
          this.navCtrl.pop("ERROR");
    })
  }

   presentToast(txt:string) {
    let toast = this.toastCtrl.create({
      message: txt,
      duration: 3000
    });
    toast.present();
  }
 

   galleryOrCamera() {
    let confirm = this.alertCtrl.create({
      title:  'Choose method',
      message: 'Choose picture from gallery or camera ?',
      buttons: [
        {
          text: 'Gallery',
          handler: () => {
            this.pickPicture();
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.takePicture();
          }
        }
      ]
    });
    confirm.present();
  }
  pickPicture() {
    //noinspection TypeScriptUnresolvedVariable
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.image_accommodation(imageData);
    }, (err) => {
      console.log(err);
    });
  }
  takePicture(){
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.image_accommodation(imageData);
    }, (err) => {
      console.log(err);
    });
  }
  image_accommodation(imageData:any)
  {
      this.image = "data:image/jpeg;base64," + imageData;
      this.user.Image = this.image; //imageData;
  }
}
