import { Component } from '@angular/core';

import { HomePage } from "../home/home";
import { UsersPage } from "../users/users";

@Component({
  selector: 'page-tabs',
  template: `
    <ion-tabs [tabsPlacement]="top">
      <ion-tab [root]="homePage" tabTitle="Home" tabIcon="home"></ion-tab>
      <ion-tab [root]="usersPage" tabTitle="Users" tabIcon="people"></ion-tab>
    </ion-tabs>
  `
})
export class TabsPage {
    homePage = HomePage;
    usersPage = UsersPage;
}
