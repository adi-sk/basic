import { Component } from '@angular/core';
import { NavController, PopoverController,Platform } from 'ionic-angular';
import { UsersPage } from '../users/users';
import { PopOver } from '../../components/popover';
// import { AuthService } from '../../services/auth';

import firebase from 'firebase';
import { AddPlacePage } from '../add-place/add-place';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userP = UsersPage;
  addPlace = AddPlacePage;
  constructor(public navCtrl: NavController,
              private popCtrl : PopoverController,
              private platform : Platform) {

  }

  clicked(event){
    this.navCtrl.push(UsersPage,{"userName":"Aditya"});
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
