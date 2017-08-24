import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import {ImportnumsPage} from "../importnums/importnums"; 
import {SuggestionPage} from "../suggestion/suggestion";
import {TranslateService} from "@ngx-translate/core";
import { MenuController } from 'ionic-angular';
import {MybalaghatPage} from "../mybalaghat/mybalaghat";
import {UserServiceProvider} from "../../providers/user-service";
import {DetailsPage} from "../details/details";
import {MainServiceProvider} from "../../providers/main-service";
@Component({

  selector: 'page-findbalagh',
  templateUrl: 'findbalagh.html',
})
export class FindbalaghPage {
   public search : any;
   public balaId : number;
   public createdTime : string; 
   public mainService: MainServiceProvider;
   constructor(private toastCtrl:ToastController,public translateService : TranslateService,public userService : UserServiceProvider,public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindbalaghPage');
  }


 goto(){
   this.navCtrl.push(ImportnumsPage);
 }
 gotobalaghaty(){
   this.navCtrl.push(MybalaghatPage);
 }
 gotosugg(){
   this.navCtrl.push(SuggestionPage);
 }
  openMenu() {
   this.menuCtrl.open();
 }
  getBalagh(){
    this.userService.searchBy(this.balaId,this.createdTime).subscribe((res:any[])=>{
   
    if(res.length != 0){
      this.search = res ;
      console.log(this.search);
      console.log(this.search.NoticeID);
      this.navCtrl.push(DetailsPage,{
          noticeId : this.search.NoticeID,
          createdAt : this.search.created_at,
          areaName : this.search.area.area,
          mun : this.search.muncicpality.muncicpality,
          city : this.search.city.city,
          noticeType : this.search.notice_type.notice_typename,
          notes : this.search.Note
    });
    }
   else{
    this.translateService.get("This balahgh not found").subscribe(
               value => {
        // value is our translated string
                   this.presentToast(value);

            });  
   }
  });
}

presentToast(txt :string) {
    let toast = this.toastCtrl.create({
      message:txt,
      duration: 3000
    });
    toast.present();
  }
}
