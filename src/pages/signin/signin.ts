import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { LoadingController, AlertController} from "ionic-angular";

import { AuthService } from "../../services/auth";
import { Storage } from '@ionic/storage'

import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

  tabsPage : any = TabsPage
  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private storage : Storage) {
  }

  onSignin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'loging you in...'
    });
    loading.present();
    this.authService.signin(form.value.email, form.value.password)
      .then(data => {
        console.log(data);
        this.storage.set('uid',data.uid);
        loading.dismiss();
        //this.navCtrl.setRoot(this.tabsPage)
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }
}
