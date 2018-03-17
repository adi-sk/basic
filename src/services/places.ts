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

      var filter = {
        box : 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
        
        // following 4 filters should NOT be used together, they are OR relationship
        //read : 0, // 0 for unread SMS, 1 for SMS already read
        _id : 1234, // specify the msg id
        address : '+918097187303', // sender's phone number
        body : 'Book', // content to match
        
        // following 2 filters can be used to list page up/down
        indexFrom : 0, // start from index 0
        maxCount : 10, // count of SMS to return each time
      };
      this.sms.listSMS(filter).then(data=>{
        console.log(data);
        load.dismiss();
      }).catch(err=>{
        load.dismiss();
        console.log('something went wrong');
      })


  }

            



      
  }

  loadPlaces() {
    
  }

  fetchPlaces() {
   
  }

  

  
}
