import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import {UserServiceProvider} from '../../providers/user-service';


@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  public messages : any ;
  constructor(public userService : UserServiceProvider , 
              public menuCtrl: MenuController,
              public navCtrl: NavController, 
              public navParams: NavParams) {


                this.getMessages();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }
 openMenu() {
   this.menuCtrl.open();
 }
 
  getMessages(){
  this.userService.getMessage().subscribe((res)=>{
       this.messages= res;
       console.log(this.messages);
    });
    
  }

  deleteMessage(MessageID : number){
    this.userService.deleteMessage(MessageID).subscribe((res)=>{
      if(res.state == '202'){
       this.getMessages();
      }
    });
  }
  sendMessage(FID :number,TID :number,Title :string,Body :string)
  {
      this.userService.sendMessage(FID,TID,Title,Body).subscribe((res)=>{
        
      });
  }
}
