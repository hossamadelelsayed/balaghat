import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ContactusPage} from "../contactus/contactus";
import { MenuController } from 'ionic-angular';
import {UserServiceProvider} from '../../providers/user-service';

@Component({
  selector: 'page-suggestion',
  templateUrl: 'suggestion.html',
})
export class SuggestionPage {
  public suggest : any = {};
  constructor(public userService :UserServiceProvider, public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuggestionPage');
  }
gocontact(){
  this.navCtrl.push(ContactusPage);
}
openMenu() {
   this.menuCtrl.open();
 }

 sendSugesstion(){
      this.userService.sentSuggestion(this.suggest.mobile,this.suggest.body).subscribe((res)=>{
        console.log(res);
       });
 }
}
