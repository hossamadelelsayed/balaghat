import { Component,ElementRef ,ViewChild} from '@angular/core';
import { NavController,NavParams,ToastController} from 'ionic-angular';
import {NewbalaghPage} from "../newbalagh/newbalagh";
import {Geolocation} from "@ionic-native/geolocation";
import {UserServiceProvider} from "../../providers/user-service"
import { MenuController } from 'ionic-angular';
import {Location} from "../../models/location";
import {TranslateService} from '@ngx-translate/core';

declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  @ViewChild('map') mapElement:ElementRef;
  public map :any;
  public markers =[];
  constructor(public menuCtrl: MenuController,
              public navCtrl: NavController,
              private navParams:NavParams,
              private geolocation: Geolocation,
              private translateService : TranslateService,
              private toastCtrl : ToastController,
              private userService:UserServiceProvider) {
                
  }
  ionViewDidLoad(){
   this.loadMap();
  }
    loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      google.maps.event.addListener(this.map, 'click', (event) => {
        this.setMapOnAll(null);
        var location  = event.latLng;
        this.addMarker(location);
        this.sendUserLocation(location);
      });
      this.addMarker(this.map.getCenter());
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


    sendUserLocation(location)
  {
    console.log(this.userService.user.UserID);
    console.log(location.lat());
    console.log(location.lng());

    let inputs = {
      UserID : this.userService.user.UserID ,
      Lat : location.lat(),
      Long : location.lng()
    };
    this.userService.userLocationSend(inputs).subscribe(()=>{
      this.translateService.get('Done').subscribe(
        value => {
          // value is our translated string
          this.presentToast(value);
        }
      );
    });
  }

  addMarker(LatLng){
    let marker  = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: LatLng
    });
    // let content = "<h4>Selected</h4>";
    // let infoWindow = new google.maps.InfoWindow({
    //   content: content
    // });
   // infoWindow.open(this.map,marker);
    this.markers.push(marker);
  }
  // Sets the map on all markers in the array.
  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  presentToast(txt:string) {
    let toast = this.toastCtrl.create({
      message: txt,
      duration: 3000
    });
    toast.present();
  }
gotobalagh(){
  this.navCtrl.push(NewbalaghPage)
}
openMenu() {
   this.menuCtrl.open();
 }
}
