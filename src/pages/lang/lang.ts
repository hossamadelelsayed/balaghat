import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {BaladyaPage} from "../baladya/baladya";
import {EditaccountPage} from "../editaccount/editaccount";
import {TranslateService} from '@ngx-translate/core';
import {MainServiceProvider} from "../../providers/main-service";
import { Platform } from 'ionic-angular';
@Component({
  selector: 'page-lang',
  templateUrl: 'lang.html',
})
export class LangPage {

  constructor(public platform: Platform,private translate: TranslateService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LangPage');
  }
 
  changeLang(type){
  this.translate.setDefaultLang(type);
   MainServiceProvider.lang = type;
   if(type == 'en')
     this.platform.setDir('ltr', true);
   else
     this.platform.setDir('rtl', true);

    
   
    this.navCtrl.push(BaladyaPage);
  }
}
