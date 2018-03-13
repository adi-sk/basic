import { Component } from '@angular/core';
import { NavController, NavParams,reorderArray } from 'ionic-angular';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage implements OnInit {
  items = ['Apples', 'Bananas', 'Berries'];
  name : String ;
  show : boolean = true

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){
    this.name = this.navParams.get('userName')
  }

  // ionViewCanEnter():boolean{
  //   // const ran = Math.random();
  //   // console.log(ran)
  //   // return ran >0.5;
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

  reorderItems(indexes){
    console.log(indexes)
    this.items = reorderArray(this.items, indexes);
    console.log(this.items)
}
  // ionViewCanLeave():boolean | Promise<any>{
  //   const promise = new Promise((resolve,reject)=>{
  //     setTimeout(()=>{
  //       resolve();
  //     },4000)
  //   })
  //   return promise
  // }

}
