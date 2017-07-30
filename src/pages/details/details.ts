import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  public balaghNumber : any ;
  public createdAt : any ;
  public areaName : any ;
  public mun : any ;
  public city : any ;
  public noticeType : any ;
  public notes : any ;
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
    this.balaghNumber = this.navParams.data.noticeId;
    this.createdAt = this.navParams.data.createdAt;
    this.areaName = this.navParams.data.areaName;
    this.mun = this.navParams.data.mun;
    this.city = this.navParams.data.city;
    this.noticeType = this.navParams.data.noticeType;
    this.notes = this.navParams.data.notes;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }
  
}
