import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { LoadingController, AlertController, NavController } from "ionic-angular";

import { AuthService } from "../../services/auth";
import { Storage } from '@ionic/storage'

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  tabsPage : any = TabsPage;
  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private navCtrl:NavController,
              private storage : Storage) {
  }

  onSignup(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();
    this.authService.signup(form.value.email, form.value.password)
      .then(data => {
        console.log(data);
        this.storage.set('uid',data.uid);
        loading.dismiss();

        this.navCtrl.setRoot(this.tabsPage)
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signup failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }
}
