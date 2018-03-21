import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth'
import firebase from 'firebase'

import { TabsPage } from '../pages/tabs/tabs'
import { SignupPage } from '../pages/signup/signup';
import { SigninPage } from '../pages/signin/signin';
import { AuthService } from '../services/auth';
import { Storage } from '@ionic/storage'
// import { HomePage } from '../pages/home/home';
// import { UsersPage } from '../pages/users/users'
declare var window:{
  PlSMS:any,
  CordovaCall:any,
  CallBlock: any
}





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
              private storage : Storage,
              private alertCtrl : AlertController,
              private au : AngularFireAuth) {

    

    // let ref = firebase.database().ref();
    //       ref.push({'name':'kurhade'},
    //           (e:Error)=>{
    //             console.log(e)
    //           })

    

    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.isAuthenticated = true;
        this.rootPage = TabsPage
        //this.storage.set('uid',user.uid);
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
      
      

  //     var filter = {
  //       box : 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
        
  //       // following 4 filters should NOT be used together, they are OR relationship
  //       //read : 0, // 0 for unread SMS, 1 for SMS already read
  //       //_id : 1234, // specify the msg id
  //       address : '+918097187303', // sender's phone number
  //       body : 'Book', // content to match
        
  //       // following 2 filters can be used to list page up/down
  //       indexFrom : 0, // start from index 0
  //       maxCount : 10, // count of SMS to return each time
  //     };
  //    window.PlSMS.listSMS(filter, (data) => {
  //        console.log(JSON.stringify(data));
  //      },
  //      (err) => {
  //        console.log('something went wrong');
  //        console.log(err);
  //      }
  //    )

  //    window.PlSMS.startWatch((data)=>{
  //      console.log('started watching sms');
  //    },
  //    (err)=>{
  //      console.log('failed watching');
  //    }
  //   )

  //   document.addEventListener('onSMSArrive',(data)=>{
  //     console.log(JSON.stringify(data))
  //     this.alertCtrl.create({
  //       title : JSON.stringify(data),
  //       buttons:['OK']
  //     }).present();
      
  //   }
  // );
  
  // window.CordovaCall.on('receiveCall', (data)=>{

  //   window.CordovaCall.endCall((data)=>{
  //     console.log('call ended successfully');
      
  //   });
  //});

  window.CallBlock.startWatch();



    
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

