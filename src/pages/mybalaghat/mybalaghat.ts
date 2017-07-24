import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import {UserServiceProvider} from '../../providers/user-service';


@Component({
  selector: 'page-mybalaghat',
  templateUrl: 'mybalaghat.html',
})
export class MybalaghatPage {
  public reports : any;
  constructor(public userService:UserServiceProvider,
              public menuCtrl: MenuController,
              public navCtrl: NavController, 
              public navParams: NavParams) {

                 this.getReports();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MybalaghatPage');
  }
 openMenu() {
   this.menuCtrl.open();
 }

 getReports(){
       this.userService.getMyReports().subscribe((res)=>{
       this.reports = res;
       console.log(this.reports);
    });
  }
}
