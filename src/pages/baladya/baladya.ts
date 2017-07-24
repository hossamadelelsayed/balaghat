import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {UserServiceProvider} from "../../providers/user-service";
import {MainServiceProvider} from "../../providers/main-service";

@Component({
  selector: 'page-baladya',
  templateUrl: 'baladya.html',
})
export class BaladyaPage {
  public areas : any;
  public mucicpality : any ;
  public towns : any;
  public areaid;
  public townid;
  public munid;



  constructor(public userService :UserServiceProvider ,
              public mainService:MainServiceProvider ,
              public navCtrl: NavController,
              public navParams: NavParams)
               {
                      this.getAreas();
                      this.getMucicpality();
                      this.getTowns();
               }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BaladyaPage');
  }


  login(){

    this.areas.AreaID = this.areaid;
    this.mucicpality.MucicpalityID = this.munid;
    console.log(this.areas.AreaID);
    console.log(this.mucicpality.MucicpalityID);
    this.navCtrl.push(LoginPage,{
      areaId: this.areaid ,
      munId :this.munid,
      townId : this.townid
    })
  }

  getAreas(){
       this.userService.getArea().subscribe((res)=>{
       this.areas = res;
    });
  }

  getTowns(){
    this.userService.getTown().subscribe((res)=>{
      this.towns=res;
    });
  }

  getMucicpality(){
    this.userService.getMucicpality().subscribe((res)=>{
      this.mucicpality=res;
    });
  }
}
