import { Injectable } from "@angular/core";
import { Place } from "../models/place";
import { Location } from "../models/location";

import firebase from 'firebase'
import { LoadingController } from "ionic-angular";



@Injectable()
export class PlacesService {
  

  constructor(private loadCtrl: LoadingController) {}

  addPlace(title: string,
           description: string,
           location: Location,
           imageUrl: string) {
    
    
    const newFileName = Math.floor(Date.now() / 1000)+'_';
    const load = this.loadCtrl.create({
      content: 'Submitting your Issue'
    })
    
          
   
    var storageRef = firebase.storage().ref();
    var url = 'issue/'+newFileName +firebase.auth().currentUser.uid+'.jpg'
    var imgref = storageRef.child(url);


    load.present();
    imgref.putString(imageUrl, firebase.storage.StringFormat.DATA_URL).then(snapshot=>{
      
      const place = new Place(title,description,location,snapshot.downloadURL)

      firebase.database().ref().child('issues').push(place).then(data=>{
          load.dismiss();
          
      })
      

    })        



      
  }

  loadPlaces() {
    
  }

  fetchPlaces() {
   
  }

  

  
}
