import { Component ,ViewChild} from '@angular/core';
import {Platform, NavController, Nav, MenuController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LangPage }from "../pages/lang/lang";
import { HomePage } from '../pages/home/home';
import {AboutusPage} from "../pages/aboutus/aboutus";
import {ActivePage} from "../pages/active/active";
import {BaladyaPage} from "../pages/baladya/baladya";
import {ConfirmPage} from "../pages/confirm/confirm";
import {ContactusPage} from "../pages/contactus/contactus";
import {EditaccountPage} from "../pages/editaccount/editaccount";
import {FindbalaghPage} from "../pages/findbalagh/findbalagh";
import {ImportnumsPage} from "../pages/importnums/importnums";
import {LoginPage} from "../pages/login/login";
import {MessagesPage} from "../pages/messages/messages";
import {MybalaghatPage} from "../pages/mybalaghat/mybalaghat";
import {NewbalaghPage} from "../pages/newbalagh/newbalagh";
import {SignupPage} from "../pages/signup/signup";
import {SuggestionPage} from "../pages/suggestion/suggestion";
import {UserServiceProvider} from "../providers/user-service";
import {MainServiceProvider} from "../providers/main-service";
import { SMS } from '@ionic-native/sms';
import { CallNumber } from '@ionic-native/call-number';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LangPage;
  public  MainService = MainServiceProvider;
  //  private popcall=this.showAlert();
   public visitorPages : Array<{title: string, icon: string, component: any}>;
  constructor(  private sms: SMS,
                private callNumber: CallNumber,
                public userService: UserServiceProvider,
                public alertCtrl: AlertController,platform: Platform,
                statusBar: StatusBar, splashScreen: SplashScreen ,
                public menuCtrl : MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.initLists();
  }


    initLists()
  {
    this.visitorPages = [
      // { title: 'Map', icon: 'map',component: HomePage},
      { title: 'Login', icon: 'log-in',component: LoginPage },
      { title: 'Sign up', icon: 'person-add',component: SignupPage},
      { title: 'Balaghaty', icon: 'albums',component: MybalaghatPage },
      { title: 'Messages Box', icon: 'mail',component: MessagesPage },
      // { title: 'Balaghat 940', icon: 'contacts',component: this.popcall },
      { title: 'Search old balagh', icon: 'warning',component: FindbalaghPage },
      { title: 'Important Numbers', icon: 'call',component: ImportnumsPage },
      { title: 'Help', icon: 'help-circle',component: ImportnumsPage },

    ];
  }
  openHome(){
    this.nav.push(HomePage);
    }
  openLoginPage(){
    this.nav.push(LoginPage);
    }
  openSignupPage(){
    this.nav.push(SignupPage);
    }
  openMybalaghatPage(){
    this.nav.push(MybalaghatPage);
    }
  openMessagesPage(){
    this.nav.push(MessagesPage);
    }
  openFindbalaghPage(){
    this.nav.push(FindbalaghPage);
    }
  openImportnumsPage(){
    this.nav.push(ImportnumsPage);
    }
    openLang(){
     this.nav.push(LangPage);
   }
  gotoLoginPage()
  {
    this.nav.push(LoginPage);
  }
  goOut(){
    this.userService.userStorageErase();
    this.nav.push(HomePage);
  }
  openEditaccountPage(){
    this.nav.push(EditaccountPage);
    this.menuCtrl.toggle();
  }
  exeEmergancy(){
      this.userService.translateArray(
      ['Emergancy Calls',
      'Call Emergancy',
      'Send Message']).subscribe((translatedArray)=>{
        this.showEmergancy(translatedArray);
      });
  }

      
  showEmergancy(translatedArray : string[] ) {
  let alert = this.alertCtrl.create({
     title:translatedArray[0],
     cssClass:'totalcalls',
     buttons: [
      { text:translatedArray[1],
        cssClass:'whatCall',
        handler: () => {
          console.log('Cancel clicked');
         this.callNumber.callNumber("01221924616" , true)
          .then(() => console.log('Launched dialer!'))
          .catch(() => console.log('Error launching dialer'));
        }
      },
      {
        text:translatedArray[2],
        cssClass:'sendMessage',
        handler: () => {
           console.log('Buy clicked');
           this.sms.send('01221924616','Hello world');
        }
      }
    ]
  });
  alert.present();
}

  exeHelp(){
      this.userService.translateArray(
      ['Help',
      'Suggestions',
      'Contact us',
      'About us']).subscribe((translatedArray)=>{
        this.help(translatedArray);
      });
  }


help(translatedArray : string[]) {
  
  let alert = this.alertCtrl.create({
    title:translatedArray[0],
    cssClass:'totalcalls',
    buttons: [
      {
        text: translatedArray[1],
        cssClass:'helpclass',
        handler: () => {
          this.nav.push(SuggestionPage);
        }
      },
      {
        text: translatedArray[2],
        cssClass:'helpclass',
        handler: () => {
            this.nav.push(ContactusPage);
      }
      },
      {
        text: translatedArray[3],
        cssClass:'helpclass',
        handler: () => {
          this.nav.push(AboutusPage);
      }
      }
    ]
  });
  alert.present();
}
}

