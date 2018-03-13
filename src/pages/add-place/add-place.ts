import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ModalController, LoadingController, ToastController } from "ionic-angular";


import { SetLocationPage } from "../set-location/set-location";
import { Location } from "../../models/location";
import { Geolocation } from '@ionic-native/geolocation'
import { Camera,CameraOptions } from '@ionic-native/camera'
//import { Geolocation } from 'ionic-native'

//import { GoogleMaps,GoogleMap,GoogleMapOptions,GoogleMapsEvent } from '@ionic-native/google-maps'
//import { PlacesService } from "../../services/places";

//declare var cordova: any;

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html'
})
export class AddPlacePage {

  //map : GoogleMap;
  location: Location = {
    lat: 19.097230, 
    lng:  72.913031
  };
  locationIsSet = false;
  imageUrl = '';

  constructor(private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private geoloc : Geolocation,
              private camera : Camera ) {
  }

  onSubmit(form: NgForm) {
    // this.placesService
    //   .addPlace(form.value.title, form.value.description, this.location, this.imageUrl);
    // form.reset();
    // this.location = {
    //   lat: 40.7624324,
    //   lng: -73.9759827
    // };
    // this.imageUrl = '';
    // this.locationIsSet = false;
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
    // let mapOptions: GoogleMapOptions = {
    //   camera: {
    //     target: {
    //       lat: 43.0741904,
    //       lng: -89.3809802
    //     },
    //     zoom: 18,
    //     tilt: 30
    //   }
    // };
    // this.map = GoogleMaps.create('first',mapOptions)

    // this.map.on(GoogleMapsEvent.MAP_READY).subscribe(()=>{
    //   this.map.getMyLocation().then(location=>{
    //    const toaster = this.toastCtrl.create({
    //       message : location.latLng.toString(),
    //       duration : 2500
    //     })
    //     toaster.present();
    //   })
    // })
    

    const loader = this.loadingCtrl.create({
      content: 'Getting your Location...'
    });
    loader.present();
    let options = {
      //timeout: 30000,
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
    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // }
    // this.camera.getPicture(options).then((imageData) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64:
    //   let base64Image = 'data:image/jpeg;base64,' + imageData;
    //  }, (err) => {
    //   // Handle error
    //  });
    

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
}
