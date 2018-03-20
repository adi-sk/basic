import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http'
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage'
import { AngularFireModule } from 'angularfire2';
//import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule,AngularFireDatabase } from 'angularfire2/database'


import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UsersPage } from '../pages/users/users'
import { TabsPage } from '../pages/tabs/tabs'
import { SignupPage } from '../pages/signup/signup';
import { SigninPage } from '../pages/signin/signin';
import { SetLocationPage } from '../pages/set-location/set-location';
import { IssuesPage } from '../pages/issues/issues'


import { PopOver } from '../components/popover'

import { AuthService } from "../services/auth";
import { PlacesService } from '../services/places'
import { AddPlacePage } from '../pages/add-place/add-place';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import {GoogleMaps} from '@ionic-native/google-maps';
import { Network } from '@ionic-native/network';
import { SMS } from '@ionic-native/sms'


import { AgmCoreModule } from '@agm/core';

const environment ={
  production:false,
  firebase:{
    apiKey: "AIzaSyBXtKT8C2d53fKzizznKFefOVqC5M46mSw",
    authDomain: "sih-2-3e356.firebaseapp.com",
    databaseURL: "https://sih-2-3e356.firebaseio.com",
    projectId: "sih-2-3e356",
    storageBucket: "sih-2-3e356.appspot.com",
    messagingSenderId: "693586778503"
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UsersPage,
    TabsPage,
    SignupPage,
    SigninPage,
    PopOver,
    AddPlacePage,
    SetLocationPage,
    IssuesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    IonicModule.forRoot(MyApp,{
      tabsPlacement: 'top',
    }),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD7lvSpXWaKkxLRS4Sq4EbYuIDuU1OdERk'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UsersPage,
    TabsPage,
    SignupPage,
    SigninPage,
    PopOver,
    AddPlacePage,
    SetLocationPage,
    IssuesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    Geolocation,
    Camera,
    GoogleMaps,
    PlacesService,
    Network,
    SMS,
    AngularFireDatabase
  ]
})
export class AppModule {}
