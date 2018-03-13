import { Component } from '@angular/core';

import { HomePage } from "../home/home";
//import { UsersPage } from "../users/users";
import { IssuesPage } from '../issues/issues';

@Component({
  selector: 'page-tabs',
  template: `
    <ion-tabs [tabsPlacement]="top">
      <ion-tab [root]="homePage" tabTitle="Home" tabIcon="home"></ion-tab>
      <ion-tab [root]="usersPage" tabTitle="Issues" tabIcon="list-box"></ion-tab>
    </ion-tabs>
  `
})
export class TabsPage {
    homePage = HomePage;
    usersPage = IssuesPage;
}
