import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {UserServiceProvider} from "../../providers/user-service";
import {MainServiceProvider} from "../../providers/main-service";
import {NewbalaghPage} from "../newbalagh/newbalagh";

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


  goToNewBalagh(){
    this.navCtrl.push(NewbalaghPage,{
      areaId: this.areaid ,
      munId :this.munid,
      townId : this.townid
    });
    /*this.areas.AreaID = this.areaid;
    this.mucicpality.MucicpalityID = this.munid;
    console.log(this.areas.AreaID);
    console.log(this.mucicpality.MucicpalityID);
    this.navCtrl.push(LoginPage,{
      areaId: this.areaid ,
      munId :this.munid,
      townId : this.townid
    })*/
  }

  getAreas(){
       this.userService.getArea().subscribe((res)=>{
       this.areas = res;
       console.log(this.areas);
    });
  }

  getTowns(){
    this.userService.getTown(this.areaid).subscribe((res)=>{
      this.towns=res;
      console.log(this.towns);
    });
  }

  getMucicpality(){
    this.userService.getMucicpality().subscribe((res)=>{
      this.mucicpality=res;
      console.log(this.mucicpality);
    });
  }
}
