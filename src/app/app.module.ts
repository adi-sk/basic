import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http'
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage'


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
    SMS
  ]
})
export class AppModule {}
