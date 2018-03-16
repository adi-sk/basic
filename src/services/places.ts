import { Injectable } from "@angular/core";
import { Place } from "../models/place";
import { Location } from "../models/location";
import { SMS } from '@ionic-native/sms'

import firebase from 'firebase'
import { LoadingController } from "ionic-angular";



@Injectable()
export class PlacesService {
  

  constructor(private loadCtrl: LoadingController,
              private sms : SMS) {}

  addPlace(title: string,
           description: string,
           location: Location,
           imageUrl: string,
           isOnline : Boolean) {
    
    
    const newFileName = Math.floor(Date.now() / 1000)+'_';
    const load = this.loadCtrl.create({
      content: 'Submitting your Issue '
    })
    
          
   if(isOnline){
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

   else if(!isOnline){
      load.present();
      const place = new Place(title,description,location,'');

      this.sms.send('9664099305','first message').then(data=>{
        load.dismiss();
        
      }).catch(err=>{
        load.dismiss();
        console.log('message was not sent')
      })


  }

            



      
  }

  loadPlaces() {
    
  }

  fetchPlaces() {
   
  }

  

  
}
