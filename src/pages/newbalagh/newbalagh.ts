import { Component } from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {ConfirmPage} from "../confirm/confirm";
import { MenuController } from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service";
import {MainServiceProvider} from "../../providers/main-service";
import {Camera} from "@ionic-native/camera";
import {
  MediaCapture, MediaFile, CaptureError
} from '@ionic-native/media-capture';
import {File} from "@ionic-native/file";
import {FileTransfer} from "@ionic-native/file-transfer";
import {CommonService} from "../../providers/common-service";
import {ImageReport} from "../../models/image-report";


@Component({
  selector: 'page-newbalagh',
  templateUrl: 'newbalagh.html',
})
export class NewbalaghPage {
    public notes : any;
    public areaId : number ;
    public townId : number ;
    public munId : number ;
    public NoticeTypeID : number ;
    public video64 : string;
    public audio64 : string;
    public othernote : string;
    public imagesReport : ImageReport[] = [];
  constructor(public userService : UserServiceProvider ,
              public commonService : CommonService  ,
              public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams ,
              public camera : Camera , public alertCtrl : AlertController ,
              public mediaCapture : MediaCapture , public file: File , public transfer : FileTransfer) {
                  this.getNote();
                  this.areaId = this.navParams.data.areaId ;
                  this.townId = this.navParams.data.townId ;
                  this.munId =  this.navParams.data.munId ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewbalaghPage');
  }

 goconfirm(){
   this.navCtrl.push(ConfirmPage);
 }
 openMenu() {
   this.menuCtrl.open();
 }
   getNote(){
       this.userService.getNotes().subscribe((res)=>{
       this.notes = res;
    });
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
      destinationType: this.camera.DestinationType.DATA_URL ,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY ,
      allowEdit: true ,
      targetWidth: 1000 ,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.imagesReport.push({Image : "data:image/jpeg;base64," + imageData , NoticeID : ''});
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
      this.imagesReport.push({Image : "data:image/jpeg;base64," + imageData ,NoticeID : ''});
    }, (err) => {
      console.log(err);
    });
  }
  recordVideo()
  {
    //let options: CaptureVideoOptions = { limit: 3 };
    this.mediaCapture.captureVideo(/*options*/)
      .then(
        (data: MediaFile[]) => {
          console.log(data);
          this.readVideoFile(data[0].fullPath , data[0].name );
        },
        (err: CaptureError) => console.error(err)
      );
  }
  // upload(filePath : string , destination : string , fileName : string) {
  //   const fileTransfer: FileTransferObject = this.transfer.create();
  //   let options: FileUploadOptions = {
  //     fileKey: 'file',
  //     fileName: fileName ,
  //     mimeType: 'video/mp4',
  //     chunkedMode: false,
  //     headers: {
  //       'Content-Type': undefined
  //     }
  //   };
  //
  //   fileTransfer.upload(filePath, destination ,options,false)
  //     .then((data) => {
  //       // success
  //       console.log(data);
  //     }, (err) => {
  //       console.log(err);
  //     })
  // }
  recordAudio()
  {
    //let options: CaptureAudioOptions = { limit: 3 };
    this.mediaCapture.captureAudio(/*options*/)
      .then(
        (data: MediaFile[]) => {
          console.log(data);
          //this.upload(data[0].fullPath ,encodeURI('http://ar5ss.com/balghat/public/NoticeVideo/'),data[0].name);
          this.readAudioFile(data[0].fullPath , data[0].name );
        },
        (err: CaptureError) => console.error(err)
      );
  }
  readAudioFile(fullPath : string , fileName : string)
  {
    this.commonService.presentLoading('Please Wait ...');
    this.file.readAsDataURL(this.splitToLastBackSlash(fullPath),fileName).then((res)=>{
      console.log(res);
      this.audio64 = res;

      this.commonService.dismissLoading();
    }).catch((err :any) =>{
      console.log(err);
    });
  }
  readVideoFile(fullPath : string , fileName : string)
  {
    this.commonService.presentLoading('Please Wait ...');
    this.file.readAsDataURL(this.splitToLastBackSlash(fullPath),fileName).then((res)=>{
      console.log(res);
      this.video64 = res;
      this.commonService.dismissLoading();
    }).catch((err :any) =>{
      console.log(err);
    });
  }
  splitToLastBackSlash(str : string) : string
  {
    let target = str;
    let rest = target.substring(0, target.lastIndexOf("/"));
    console.log(rest);
    return rest ;
  }

  sendReport(){
       this.userService.insertReport(
         this.munId,this.areaId,this.townId,this.NoticeTypeID,this.othernote,this.video64,this.audio64,this.imagesReport).subscribe((res)=>{
          console.log(res);
       });
  }

}
