import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service"; 

@Component({
  selector: 'page-importnums',
  templateUrl: 'importnums.html',
})
export class ImportnumsPage {
  public importantNums : any ;
  public hot ;
  constructor(public userService:UserServiceProvider,
              public menuCtrl: MenuController,
              public navCtrl: NavController, 
              public navParams: NavParams) {

                this.getNums();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImportnumsPage');
  }
 openMenu() {
   this.menuCtrl.open();
 }

 getNums(){
       this.userService.getimportantnums().subscribe((res)=>{
       this.importantNums = res;
       this.hot=this.importantNums.HotLine;
       console.log(this.importantNums);
    });
  }
}
