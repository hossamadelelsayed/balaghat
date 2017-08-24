import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { NativeStorage} from '@ionic-native/native-storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AboutusPage} from "../pages/aboutus/aboutus";
import {ActivePage} from "../pages/active/active";
import {BaladyaPage} from "../pages/baladya/baladya";
import {ConfirmPage} from "../pages/confirm/confirm";
import {ContactusPage} from "../pages/contactus/contactus";
import {EditaccountPage} from "../pages/editaccount/editaccount";
import {FindbalaghPage} from "../pages/findbalagh/findbalagh";
import {ImportnumsPage} from "../pages/importnums/importnums";
import {LangPage} from "../pages/lang/lang";
import {LoginPage} from "../pages/login/login";
import {MessagesPage} from "../pages/messages/messages";
import {MybalaghatPage} from "../pages/mybalaghat/mybalaghat";
import {NewbalaghPage} from "../pages/newbalagh/newbalagh";
import {SignupPage} from "../pages/signup/signup";
import {ForgetpassPage} from "../pages/forgetpass/forgetpass";
import {SuggestionPage} from "../pages/suggestion/suggestion";
import { MainServiceProvider } from '../providers/main-service';
import { UserServiceProvider } from '../providers/user-service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {Geolocation} from "@ionic-native/geolocation";
import {Http, HttpModule} from '@angular/http';
import {Camera} from "@ionic-native/camera";
import {MediaCapture} from "@ionic-native/media-capture";
import {File} from "@ionic-native/file";
import {FileTransfer} from "@ionic-native/file-transfer";
import {CommonService} from "../providers/common-service";
import {NativeGeocoder} from "@ionic-native/native-geocoder";
import { SMS } from '@ionic-native/sms';
import { CallNumber } from '@ionic-native/call-number';
import {DetailsPage} from "../pages/details/details";

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutusPage,
    ActivePage,
    BaladyaPage,
    ConfirmPage,
    ContactusPage,
    EditaccountPage,
    FindbalaghPage,
    ImportnumsPage,
    LangPage,
    LoginPage,
    MessagesPage,
    MybalaghatPage,
    NewbalaghPage,
    SignupPage,
    SuggestionPage,
    DetailsPage,
    ForgetpassPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutusPage,
    ActivePage,
    BaladyaPage,
    ConfirmPage,
    ContactusPage,
    EditaccountPage,
    FindbalaghPage,
    ImportnumsPage,
    LangPage,
    LoginPage,
    MessagesPage,
    MybalaghatPage,
    NewbalaghPage,
    SignupPage,
    SuggestionPage,
    DetailsPage,
    ForgetpassPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MainServiceProvider,
    UserServiceProvider,
    Camera,
    SMS,
    CallNumber,
    Geolocation,
    MediaCapture,
    File ,
    FileTransfer,
    CommonService,
    NativeGeocoder
  ]
})
export class AppModule {}
