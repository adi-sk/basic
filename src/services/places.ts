import { Injectable } from "@angular/core";
import { SubPlace} from "../models/subPlace";
import { Location } from "../models/location";
import { SMS } from '@ionic-native/sms'
import { Storage } from '@ionic/storage'

import firebase from 'firebase'
import { LoadingController, AlertController } from "ionic-angular";

declare var window:{
  PlSMS : any
}

@Injectable()
export class PlacesService {
  

  constructor(private loadCtrl: LoadingController,
              private sms : SMS,
              private storage : Storage,
              private alertCtrl : AlertController) {}

  addPlace(title: string,
           description: string,
           location: Location,
           imageUrl: string,
           isOnline : Boolean) {
    
    this.storage.get('uid').then(uid=>{
      
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
        
        const place = new SubPlace(uid,title,description,location,snapshot.downloadURL)

        firebase.database().ref().child('issues').push(place).then(data=>{
            load.dismiss();
            console.log(JSON.stringify(data));
            
        })
        

      })
     
   }

   else if(!isOnline){
      load.present();
      const place = new SubPlace(uid,title,description,location,'');
      window.PlSMS.sendSMS(description,JSON.stringify(place),(data)=>{
        load.dismiss();
      },
      (err)=>{
        this.alertCtrl.create({
          title : 'Was not able to send Issue offline, check your SMS setings',
          buttons:['OK']
        }).present();
      }
    )

  }

    }).catch(err=>{
      this.alertCtrl.create({
        title : 'Try to login again',
        buttons:['OK']
      }).present();
    })
      
  }

  loadPlaces() {
    
  }

  fetchPlaces() {
   
  }

  

  
}
