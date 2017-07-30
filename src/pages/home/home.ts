import { Component,ElementRef ,ViewChild} from '@angular/core';
import { NavController,NavParams,ToastController} from 'ionic-angular';
import {NewbalaghPage} from "../newbalagh/newbalagh";
import {Geolocation} from "@ionic-native/geolocation";
import {UserServiceProvider} from "../../providers/user-service"
import { MenuController } from 'ionic-angular';
import {Location} from "../../models/location";
import {TranslateService} from '@ngx-translate/core';
import {BaladyaPage} from "../baladya/baladya";
import { SMS } from '@ionic-native/sms';
import { CallNumber } from '@ionic-native/call-number';

declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public autocompleteItems: any ;
  public autocomplete: any;
  public acService:any;
  placesService:any;
  placedetails: any;
  @ViewChild('map') mapElement:ElementRef;
  public map :any;
  public markers =[];
  constructor(public menuCtrl: MenuController,
              public navCtrl: NavController,
              private sms: SMS,
              private callNumber: CallNumber,
              private geolocation: Geolocation,
              private translateService : TranslateService,
              private toastCtrl : ToastController,
              private userService:UserServiceProvider) {
    this.acService = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
    this.placedetails = {
      address: '',
      lat: '',
      lng: ''
    };
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
  if(this.userService.user == null){
    this.translateService.get("You must login to make a Report").subscribe(
               value => {
        // value is our translated string
                   this.presentToast(value);

            });  
  }
  else
  this.navCtrl.push(BaladyaPage);
}
openMenu() {
   this.menuCtrl.open();
 }
  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let self = this;
    let config = {
      types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
      input: this.autocomplete.query,
      componentRestrictions: { country: 'EG' }
    }
    this.acService.getPlacePredictions(config, function (predictions, status) {
      self.autocompleteItems = [];
      predictions.forEach(function (prediction) {
        self.autocompleteItems.push(prediction);
      });
    });
  }
  chooseItem(item: any) {
   this.autocomplete.query = item.description ;
   this.autocompleteItems = [] ;
   console.log(item);
   this.getPlaceDetail(item.place_id);

  }
  public getPlaceDetail(place_id:string):void {
    var self = this;
    var request = {
      placeId: place_id
    };
    this.placesService = new google.maps.places.PlacesService(this.map);
    this.placesService.getDetails(request, callback);
    function callback(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        // set full address
        self.placedetails.address = place.formatted_address;
        self.placedetails.lat = place.geometry.location.lat();
        self.placedetails.lng = place.geometry.location.lng();

        // set place in map
        self.map.setCenter(place.geometry.location);
        self.setMapOnAll(null);
        self.addMarker(place.geometry.location);
        // populate
        console.log('page > getPlaceDetail > details > ', self.placedetails);
      }else{
        console.log('page > getPlaceDetail > status > ', status);
      }
    }
  }
  sendSms(){
    this.sms.send('01221924616','Hello world');
  }

  callEmergancy(){
    this.callNumber.callNumber("01221924616" , true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
  }
}
