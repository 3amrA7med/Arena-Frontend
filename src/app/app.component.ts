import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SignInPage } from '../pages/sign-in/sign-in';
import { PlayerSignupPage } from '../pages/player-signup/player-signup';
import { MenuController } from 'ionic-angular';
import { PlayerProfilePage} from '../pages/player-profile/player-profile';
import { ActiveProvider } from '../providers/active/active';
import { ClubownerPage } from '../pages/clubowner/clubowner';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ClubownerPage;
  // pages1: Array<{title: string, component: any}>;
  // pages2: Array<{title: string, component: any}>;

  component_pages;
  active_component;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    public activeProvider: ActiveProvider) {
    this.initializeApp();
    this.active_component = this.activeProvider.get_component();
    this.component_pages = {
      'signup': [
        { title: 'Home-signup', component: HomePage },
        { title: 'List-signup', component: ListPage }],
      'signin': [
        { title: 'List-signin', component: ListPage }],
        'owner':[  //doda hat7ot el pages el enta 3amlha fel side menu hena
          {title: 'Maintance', component: ListPage}],
    };
    // used for an example of ngFor and navigation
    // this.pages1 = [
    //   { title: 'Home', component: HomePage },
    //   { title: 'List', component: ListPage }
    // ];

    // this.pages2 = [
    //   { title: 'Home', component: HomePage }
    // ];

    setInterval(() => { this.active_component = this.activeProvider.get_component(); }, 1000)
    // setTimeout(() =>{}, 1000)

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();

      this.splashScreen.hide();
      // this.disableAll();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  // public enableMenu1(){
  //   this.menuCtrl.enable(true, 'menu1');
  //   this.menuCtrl.enable(false, 'menu2');

  // }

  // public enableMenu2(){
  //   this.menuCtrl.enable(false, 'menu1');
  //   this.menuCtrl.enable(true, 'menu2');

  // }
  // public disableAll(){
  //   this.menuCtrl.enable(false, 'menu1');
  //   this.menuCtrl.enable(false, 'menu2');

  // }

}
