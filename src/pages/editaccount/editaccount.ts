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
  public image:string = null;
  public user : any ;
  public dis : boolean;
  constructor(private toastCtrl : ToastController,
              private translateService: TranslateService,
              public menuCtrl: MenuController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public userService:UserServiceProvider,
              public camera: Camera,
              public alertCtrl : AlertController)
              {
                 console.log(this.userService.user);

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
      inputs.Password,inputs.ConfirmPassword,this.image).subscribe((res)=>{
        if (inputs.Password != inputs.ConfirmPassword){
             this.translateService.get("Plaese Write Retype Identical Password").subscribe(
               value => {
                   this.presentToast(value);
            }); 
        }
        else if (inputs.Password == "") {
         this.translateService.get("Plaese enter password").subscribe(
               value => {
                   this.presentToast(value);
            });
       }  
       else if (res.Erorr){
         this.presentToast(res.Erorr);
       }
       else{ 
        if(res.UserID == this.userService.user.UserID)
        {
          this.userService.user = res ;
          console.log(this.userService.user);
          this.navCtrl.pop();
        }
        else
          this.navCtrl.pop();
      }
      
    })
    
  }

   presentToast(txt:string) {
    let toast = this.toastCtrl.create({
      message: txt,
      duration: 3000
    });
    toast.present();
  }

   exeCamera(){
      this.userService.translateArray(
      ['Choose method',
      'Choose picture from gallery or camera ?',
      'Gallery',
      'Camera']).subscribe((translatedArray)=>{
        this.galleryOrCamera(translatedArray);
      });
  }



   galleryOrCamera(translatedArray : string[]) {
    let confirm = this.alertCtrl.create({
      title: translatedArray[0] ,
      message: translatedArray[1] ,
      buttons: [
        {
          text: translatedArray[2] ,
          handler: () => {
            this.pickPicture();
          }
        },
        {
          text:translatedArray[3],
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
