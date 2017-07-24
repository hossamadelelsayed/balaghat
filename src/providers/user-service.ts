import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import {MainServiceProvider} from "./main-service";
import {NativeStorage} from '@ionic-native/native-storage';
import {TranslateService} from "@ngx-translate/core";
import {Observable, Subscriber} from "rxjs";

@Injectable()
export class UserServiceProvider {
    public user:any = null;
    public userRegisterUrl : string = MainServiceProvider.baseUrl+"/register/";
    public userLoginUrl : string = MainServiceProvider.baseUrl+"/login/";
    public userUpdateUrl : string = MainServiceProvider.baseUrl+"/updateuser/";
    public userForgetUrl :string = MainServiceProvider.baseUrl+"/forgetpassword/";
    public getAreaUrl :string = MainServiceProvider.baseUrl+"/getarea?lang=";
    public getTownUrl :string =MainServiceProvider.baseUrl+"/getcity/2?lang=";
    public getMucicpalityUrl :string = MainServiceProvider.baseUrl+"/getmuncpality/2?lang=";
    public getNotesUrl :string = MainServiceProvider.baseUrl+"/getnoticetype?lang=";
    public insertNewReportUrl :string = MainServiceProvider.baseUrl+"/insertnewreport/";
    public showMyReportsUrl :string = MainServiceProvider.baseUrl+"/getmyreports/1?lang=";
    public sentMessageUrl :string = MainServiceProvider.baseUrl+"/sendmessage"
    public getMessageUrl :string = MainServiceProvider.baseUrl+"/getmessage/1";
    public searchBalaghUrl: string = MainServiceProvider.baseUrl+"/searchinreports?lang=";
    public importantNumsUrl : string = MainServiceProvider.baseUrl+"/contact";
    public suggestionUrl : string = MainServiceProvider.baseUrl+"/suggest";
    public contactUrl : string = MainServiceProvider.baseUrl+"/contactus"
    public aboutusUrl : string = MainServiceProvider.baseUrl+"/aboutus?lang=";
    public userLocationSendUrl : string = MainServiceProvider.baseUrl+"/newLocation";

    headers = new Headers({'Content-Type': 'application/json'});
    postOptions = new RequestOptions({headers: this.headers, method: "post"});
    deleteOptions = new RequestOptions({headers: this.headers, method: "delete"});
    getOptions = new RequestOptions({headers: this.headers, method: "get"});
    putOptions = new RequestOptions({headers: this.headers, method: "put"});

  constructor(public translateService : TranslateService,public http: Http,private nativeStorage:NativeStorage) {
    console.log('Hello UserServiceProvider Provider');

  }

  userRegister(user:any)
  {
    user.lang = MainServiceProvider.lang;
    return this.http.post(this.userRegisterUrl+user.lang,user).map((res) => res.json());
  }

  userLogin(user:any)
  {
    user.lang = MainServiceProvider.lang;
    return this.http.post(this.userLoginUrl+user.lang,user).map((res) => res.json());
  }

  userUpdate(personalid,email,mobile,password,img)
  {   let user = {
      user_id : this.user.UserID ,
      PersonalID : personalid ,
      Mobile : mobile ,
      Email : email ,
      Password : password ,
      Image: img ,

    };
   return this.http.put(this.userUpdateUrl+this.user.UserID,user).map((res) => res.json());
  }
  userLocationSend(inputs)
  {
    inputs.lang = MainServiceProvider.lang;
    return this.http.post(this.userLocationSendUrl,inputs).map((res) => res.json());
  }
  userForgetPassword(email) {
    return this.http.post(this.userForgetUrl+MainServiceProvider.lang , JSON.stringify({'email': email}),
    this.postOptions)
      .map(res => res.json());
  }

  getArea()
  {
    return this.http.get(this.getAreaUrl+MainServiceProvider.lang).map((res) => res.json());
  }

  getMucicpality(){
    return this.http.get(this.getMucicpalityUrl+MainServiceProvider.lang).map((res) => res.json());
  }
   getTown(){
    return this.http.get(this.getTownUrl+MainServiceProvider.lang).map((res) => res.json());
   }
   getNotes(){
     return this.http.get(this.getNotesUrl+MainServiceProvider.lang).map((res) => res.json());
   }

   insertReport(muncicpalityid,areaid,othernote,video,audio,images){
     let report = {
       UserID : this.user.UserID,
       MuncicpalityID: muncicpalityid,
       AreaID : areaid ,
       Note : othernote ,
       Video : video ,
       Voice : audio ,
       State : 0,
       Images:images
     };
      return this.http.post(this.insertNewReportUrl+MainServiceProvider.lang,report).map((res) => res.json());
   }

  getMyReports(){
      return this.http.get(this.showMyReportsUrl + MainServiceProvider.lang).map((res) => res.json());
    }


  sendMessage(message: any){
      message.lang = MainServiceProvider.lang;
      return this.http.post(this.sentMessageUrl,message).map((res) => res.json());
   }

  getMessage(){
     return this.http.get(this.getMessageUrl+MainServiceProvider.lang).map((res) => res.json());
   }

  searchBy(UserID) {

    return this.http.post(this.searchBalaghUrl + MainServiceProvider.lang, UserID, this.postOptions)
      .map(res => res.json());
  }

  getimportantnums(){
    return this.http.get(this.importantNumsUrl).map((res) => res.json());
   }


  sentSuggestion(suggestion:any){
      suggestion.lang = MainServiceProvider.lang;
      return this.http.post(this.suggestionUrl,suggestion).map((res) => res.json());
  }

    contactus(message:any){
      message.lang = MainServiceProvider.lang;
      return this.http.post(this.contactUrl+ MainServiceProvider.lang,message).map((res) => res.json());
   }

   aboutus(about){
     return this.http.post(this.aboutusUrl+ MainServiceProvider.lang,about).map((res) => res.json());
   }

 userStorageSave(user:any){
    this.nativeStorage.setItem('user', user)
      .then(
        () => {
          this.user = user;
          console.log('User Is Stored!');
        },
        error => console.error('Error storing item', error)
      );
  }



  userStorageErase(){
    this.nativeStorage.remove('user')
      .then(
        () => {
          this.user = null;
          console.log('User Is Erased!');
        },
        error => console.error(error)
      );
  }
   userStorageGet(){
    this.nativeStorage.getItem('user')
      .then(
        (user) => {
          this.user = user;
          console.log('User Is Geted!');
          //return customer
        },
        error => console.error(error)
      );
  }

 public translateArray(words : string[])
  {
    let values = [];
    for (let i = 0; i < words.length; i++) {
      this.translateService.get(words[i]).subscribe(
        value => {
          // value is our translated string
          values.push(value);
        }
      );
    }
    return Observable.create((observer: Subscriber<any>) => {
      observer.next(values);
      observer.complete();
    });
  }


 getTranslation(word : string)
  {
    this.translateService.get(word).subscribe(
      value => {
        // value is our translated string
        return value;

      }
    );
  }
}
