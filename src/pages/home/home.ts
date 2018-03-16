import { Component } from '@angular/core';
import { NavController, PopoverController,Platform, AlertController } from 'ionic-angular';
import { UsersPage } from '../users/users';
import { PopOver } from '../../components/popover';
// import { AuthService } from '../../services/auth';

import firebase from 'firebase';
import { AddPlacePage } from '../add-place/add-place';
import { Storage } from '@ionic/storage'

import * as CryptoJS from 'crypto-js'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userP = UsersPage;
  addPlace = AddPlacePage;
  constructor(public navCtrl: NavController,
              private popCtrl : PopoverController,
              private platform : Platform,
              private alertCtrl : AlertController,
              private storage : Storage) {

  }

  clicked(){

    const key = 'Ravens'
    //const iv = CryptoJS.enc.Utf8.parse('Ravens');

    let place = {
      uid :'123445',
      name : 'Aditya Kurhade'
    }

    this.storage.get('uid').then(value=>{
      console.log('this is uid = '+ value)
    })
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(place), key);

    const decrypted = CryptoJS.AES.decrypt(encrypted,key);
    let decrypted_1 = decrypted.toString(CryptoJS.enc.Utf8);

        console.log('Encrypted :' + encrypted.toString());

        console.log('Decrypted : ' + decrypted_1);
        //console.log('utf8 = ' + decrypted.toString(CryptoJS.enc.Utf8));

    //this.navCtrl.push(UsersPage,{"userName":"Aditya"});
  }

  exit(){
    this.platform.exitApp();
  }

  onShowOption(event : MouseEvent){
    const popOver = this.popCtrl.create(PopOver);
    popOver.present({
      ev:event
    });

    popOver.onDidDismiss(data =>{
      if(data){
        if(data.action == 'save'){
          if(firebase.auth().currentUser){
              console.log(firebase.auth().currentUser)
          
              const alert = this.alertCtrl.create({
                title : 'You have clicked save',
                buttons : ['OK'],
            
              })
              alert._cssClass = 'alert'
              alert.present();
            
          }
        }
        else{
          let ref = firebase.database().ref();
          ref.push({'name':'Aditya'},
              (e:Error)=>{
                console.log(e)
              })
        }
      }
        
    })
  }

}
