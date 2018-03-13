import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-issues',
  templateUrl: 'issues.html',
})
export class IssuesPage{
  Locations : any[]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssuesPage');
  }

  ionViewWillEnter(){
    const ref = firebase.database().ref().child('issues');
    ref.on('value',(snapshot)=>{
        //console.log(snapshot.val())
        let data = snapshot.val();
        let dataWithKeys = Object.keys(data).map((key) => {
        var obj = data[key];
        obj._key = key;
        return obj;
      });
    
      this.Locations = dataWithKeys;

    })
  }

 
}
