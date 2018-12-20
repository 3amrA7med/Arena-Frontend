import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SignInPage } from '../pages/sign-in/sign-in';
import { PlayerSignupPage } from '../pages/player-signup/player-signup';
import { MenuController } from 'ionic-angular';
import { ClubOwnerMaintanancePage } from '../pages/club-owner-maintanance/club-owner-maintanance'
import { ClubOwnerEventPage } from '../pages/club-owner-event/club-owner-event'
import { ClubOwnerAcademyPage } from '../pages/club-owner-academy/club-owner-academy'
import { ClubOwnerAddacademyPage } from '../pages/club-owner-addacademy/club-owner-addacademy'
import { ClubOwnerPitchPage } from '../pages/club-owner-pitch/club-owner-pitch'
import { PlayerProfilePage } from '../pages/player-profile/player-profile';
import { ActiveProvider } from '../providers/active/active';
import { Title } from '@angular/platform-browser';
import { PlayerReservationsPage } from '../pages/player-reservations/player-reservations';
import { PlayerEventsPage } from '../pages/player-events/player-events';
import { PlayerAcademiesPage } from '../pages/player-academies/player-academies';
import { ReviewsPage } from '../pages/reviews/reviews';
import { ClubownerPage } from '../pages/clubowner/clubowner';
import { DataProvider } from '../providers/data/data';
import { ClubOwnerStatisticsPage } from '../pages/club-owner-statistics/club-owner-statistics';
import { ClubownerReservationPage } from '../pages/clubowner-reservation/clubowner-reservation'
import { DailyReportPage } from '../pages/daily-report/daily-report';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SignInPage;
  // pages1: Array<{title: string, component: any}>;
  // pages2: Array<{title: string, component: any}>;

  component_pages;
  active_component;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    public activeProvider: ActiveProvider,
    public dataProvider: DataProvider) {
    this.initializeApp();
    this.active_component = this.activeProvider.get_component();
    this.component_pages = {
      'signup': [
        { title: 'Sign in', component: SignInPage }],
      'signin': [],
      'owner': [
        { title: 'Home', component: ClubownerPage },
        { title: 'Maintanance', component: ClubOwnerMaintanancePage },
        { title: 'Statistics', component: ClubOwnerStatisticsPage },
        { title: 'Create Academy', component: ClubOwnerAddacademyPage },
        { title: 'View Academy', component: ClubOwnerAcademyPage },
        { title: 'Insert Event', component: ClubOwnerEventPage },
        { title: 'Add Pitch', component: ClubOwnerPitchPage },
        { title: 'Add Reservation', component: ClubownerReservationPage},
        { title: 'Daily Report', component: DailyReportPage},
        { title: 'Log Out', component: SignInPage }
      ],
      'playerprofile': [
        { title: 'Home', component: PlayerProfilePage },
        { title: 'Reservations', component: PlayerReservationsPage },
        { title: 'Events', component: PlayerEventsPage },
        { title: 'Academies', component: PlayerAcademiesPage },
        { title: 'Reviews', component: ReviewsPage },
        { title: 'Log Out', component: SignInPage }
      ],
      'playerreservations': [
        { title: 'Home', component: PlayerProfilePage },
        { title: 'Reservations', component: PlayerReservationsPage },
        { title: 'Events', component: PlayerEventsPage },
        { title: 'Academies', component: PlayerAcademiesPage },
        { title: 'Reviews', component: ReviewsPage },
        { title: 'Log Out', component: SignInPage }
      ],
      'playerevents': [
        { title: 'Home', component: PlayerProfilePage },
        { title: 'Reservations', component: PlayerReservationsPage },
        { title: 'Events', component: PlayerEventsPage },
        { title: 'Academies', component: PlayerAcademiesPage },
        { title: 'Reviews', component: ReviewsPage },
        { title: 'Log Out', component: SignInPage }
      ],
      'playeracademies': [
        { title: 'Home', component: PlayerProfilePage },
        { title: 'Reservations', component: PlayerReservationsPage },
        { title: 'Events', component: PlayerEventsPage },
        { title: 'Academies', component: PlayerAcademiesPage },
        { title: 'Reviews', component: ReviewsPage },
        { title: 'Log Out', component: SignInPage }
      ],
      'reviews': [
        { title: 'Home', component: PlayerProfilePage },
        { title: 'Reservations', component: PlayerReservationsPage },
        { title: 'Events', component: PlayerEventsPage },
        { title: 'Academies', component: PlayerAcademiesPage },
        { title: 'Reviews', component: ReviewsPage },
        { title: 'Log Out', component: SignInPage }
      ],
    };


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
    if (page.title == 'Log Out') {
      this.dataProvider.set_user([]);
      this.nav.popToRoot();
    }
    else if (page.title == 'owner')
      this.nav.setRoot(page.component);
    else if (page.title == 'playerprofile')
      this.nav.setRoot(page.component);
    else
      this.nav.push(page.component);
  }




}
