import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Loading, LoadingController} from "ionic-angular";

/*
  Generated class for the CommonServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CommonService {
  public loader : Loading;
  constructor(public http: Http , public loadingCtrl : LoadingController) {
    console.log('Hello CommonServiceProvider Provider');
  }
  presentLoading(txt:string) {
    this.loader = this.loadingCtrl.create({
      content: txt
    });
    this.loader.present();
  }
  dismissLoading(){
    this.loader.dismiss();
  };

}
