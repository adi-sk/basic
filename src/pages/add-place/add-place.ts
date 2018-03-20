import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ModalController, LoadingController, ToastController, AlertController } from "ionic-angular";
import { Subscription } from 'rxjs/Subscription';


import { SetLocationPage } from "../set-location/set-location";
import { Location } from "../../models/location";
import { Geolocation } from '@ionic-native/geolocation'
import { Camera,CameraOptions } from '@ionic-native/camera'
//import { Geolocation } from 'ionic-native'

//import { GoogleMaps,GoogleMap,GoogleMapOptions,GoogleMapsEvent } from '@ionic-native/google-maps'
import { PlacesService } from "../../services/places";
import { Storage } from '@ionic/storage'
import { Network } from '@ionic-native/network'


import firebase from 'firebase'

//declare var cordova: any;

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html'
})
export class AddPlacePage {

  connected: Subscription;
  disconnected: Subscription;
  isOnline : Boolean = true;
  //map : GoogleMap;
  location: Location = {
    lat: 19.097230, 
    lng:  72.913031
  };
  locationIsSet = false;
  imageUrl = '';
  imgFile : File;

  constructor(private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private geoloc : Geolocation,
              private camera : Camera,
              private placesService : PlacesService,
              private alertCtrl : AlertController,
              private storage : Storage,
              private network : Network) {

                if (network.type == 'unknown' || network.type == 'none' || network.type == 'cellular' ){
                    this.isOnline = false;   
                }

                firebase.database().ref('demo').push({dummy:'dummy'}).then;
  }

  onSubmit(form: NgForm) {


    this.placesService
      .addPlace(form.value.title, form.value.description, this.location, this.imageUrl,this.isOnline);
    form.reset();
    this.location = {
      lat: 40.7624324,
      lng: -73.9759827
    };
    this.imageUrl = '';
    this.locationIsSet = false;
  }
  

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage,
      {location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    );
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your Location...'
    });
    loader.present();
    let options = {
      timeout: 30000,
      enableHighAccuracy: true
      }
  
    this.geoloc.watchPosition(options)
      .subscribe(
        location => {
          loader.dismiss();
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
        },error=>{
          loader.dismiss();
        }
      )
      
  }

  onTakePhoto() {
    const options: CameraOptions = {
      //quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      //mediaType: this.camera.MediaType.PICTURE
      correctOrientation : true
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      
      this.imageUrl = base64Image;
      
     }, (err) => {
      // Handle error
      const alert = this.alertCtrl.create({
        title: 'something went wrong!',
        message: 'Try clicking picture again',
        buttons: ['Ok']
      });
      alert.present();
     });
    

    // Camera.getPicture({
    //   encodingType: Camera.EncodingType.JPEG,
    //   correctOrientation: true
    // })
    //   .then(
    //     imageData => {
    //       const currentName = imageData.replace(/^.*[\\\/]/, '');
    //       const path = imageData.replace(/[^\/]*$/, '');
    //       const newFileName = new Date().getUTCMilliseconds() + '.jpg';
    //       File.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
    //         .then(
    //           (data: Entry) => {
    //             this.imageUrl = data.nativeURL;
    //             Camera.cleanup();
    //             // File.removeFile(path, currentName);
    //           }
    //         )
    //         .catch(
    //           (err: FileError) => {
    //             this.imageUrl = '';
    //             const toast = this.toastCtrl.create({
    //               message: 'Could not save the image. Please try again',
    //               duration: 2500
    //             });
    //             toast.present();
    //             Camera.cleanup();
    //           }
    //         );
    //       this.imageUrl = imageData;
    //     }
    //   )
    //   .catch(
    //     err => {
    //       const toast = this.toastCtrl.create({
    //         message: 'Could not take the image. Please try again',
    //         duration: 2500
    //       });
    //       toast.present();
    //     }
    //   );
  }
  displayNetworkUpdate(connectionState: string){
    let networkType = this.network.type;

    this.toastCtrl.create({
      message: `You are now ${connectionState} via ${networkType}`,
      duration: 10000
    }).present();
  }

  ionViewDidEnter() {
    if(!this.isOnline){
      this.toastCtrl.create({
        message: 'You are Offline',
        duration: 10000
      }).present();
    }

    this.connected = this.network.onConnect().subscribe(data => {
      if(data.type == 'online'){
        this.isOnline = true;
      }
      //console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
   
    this.disconnected = this.network.onDisconnect().subscribe(data => {
      //console.log(data)
      if(data.type == 'offline'){
        this.isOnline = false;  
      }
      
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
  }
}
