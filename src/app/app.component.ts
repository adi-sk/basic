import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase'

import { TabsPage } from '../pages/tabs/tabs'
import { SignupPage } from '../pages/signup/signup';
import { SigninPage } from '../pages/signin/signin';
import { AuthService } from '../services/auth';
import { Storage } from '@ionic/storage'
// import { HomePage } from '../pages/home/home';
// import { UsersPage } from '../pages/users/users'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  signinPage:any = SigninPage;
  signupPage:any = SignupPage;
  isAuthenticated:boolean = false;

  @ViewChild('nav') nav : NavController;

  constructor(platform: Platform,
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private menuCtrl : MenuController,
              private auth : AuthService,
              private storage : Storage) {

    firebase.initializeApp({
      apiKey: "AIzaSyDInQMDcyc1oA_2z3PmqBItGD2Ug-IyYzU",
      authDomain: "ionic-practice-d37d2.firebaseapp.com",
      databaseURL: "https://ionic-practice-d37d2.firebaseio.com",
      projectId: "ionic-practice-d37d2",
      storageBucket: "ionic-practice-d37d2.appspot.com",
      messagingSenderId: "110294128106"
    })

    // let ref = firebase.database().ref();
    //       ref.push({'name':'kurhade'},
    //           (e:Error)=>{
    //             console.log(e)
    //           })

    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.isAuthenticated = true;
        this.rootPage = TabsPage
        this.storage.set('uid',user.uid);
      }
      else{
        this.isAuthenticated =false;
        this.rootPage = SigninPage;
      }
    })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogOut(){
    this.auth.logout();
    this.menuCtrl.close();
  }
}

