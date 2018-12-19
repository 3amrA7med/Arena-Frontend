import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SignInPage } from '../pages/sign-in/sign-in';
import { AccountProvider } from '../providers/account/account';
import { HttpClientModule } from '@angular/common/Http';
import { LocalhostProvider } from '../providers/localhost/localhost';
import { PlayerSignupPage } from '../pages/player-signup/player-signup';
import { MenuProvider } from '../providers/menu/menu';
import { ClubOwnerSignupPage } from '../pages/club-owner-signup/club-owner-signup'
import { DataProvider } from '../providers/data/data';
import { ActiveProvider } from '../providers/active/active';
import { PlayerEventsPage } from '../pages/player-events/player-events';
import { PlayerReservationsPage } from '../pages/player-reservations/player-reservations';
import { PlayerAcademiesPage} from '../pages/player-academies/player-academies';
import { ReviewsPage } from '../pages/reviews/reviews';
import { PlayerProfilePage } from '../pages/player-profile/player-profile'
import { OwnerProvider } from '../providers/owner/owner';
import { ClubownerPage } from '../pages/clubowner/clubowner';
import { UpdatePlayerProfilePage } from '../pages/update-player-profile/update-player-profile';
import { MyAcademyPage } from '../pages/my-academy/my-academy'
import { PlayerProvider } from '../providers/player/player';
import { HistoryPage } from '../pages/history/history';
import { UpcomingPage } from '../pages/upcoming/upcoming';

import { ClubOwnerMaintanancePage } from '../pages/club-owner-maintanance/club-owner-maintanance'
import { ClubOwnerEventPage } from '../pages/club-owner-event/club-owner-event'
import { ClubOwnerAcademyPage } from '../pages/club-owner-academy/club-owner-academy'
import { ClubOwnerPitchPage } from '../pages/club-owner-pitch/club-owner-pitch'
import { ClubOwnerAddacademyPage } from '../pages/club-owner-addacademy/club-owner-addacademy'
import { ClubOwnerStatisticsPage } from '../pages/club-owner-statistics/club-owner-statistics'
import { ClubownerReservationPage } from '../pages/clubowner-reservation/clubowner-reservation'
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SignInPage,
    PlayerSignupPage,
    PlayerProfilePage,
    PlayerEventsPage,
    PlayerReservationsPage,
    PlayerAcademiesPage,
    ReviewsPage,
    UpdatePlayerProfilePage,
    MyAcademyPage,
    HistoryPage,
    UpcomingPage,
    ClubownerPage,
    ClubOwnerSignupPage,
    ClubOwnerMaintanancePage,
    ClubOwnerEventPage,
    ClubOwnerAcademyPage,
    ClubOwnerPitchPage,
    ClubOwnerAddacademyPage,
    ClubOwnerAddacademyPage,
    ClubOwnerStatisticsPage,
    ClubownerReservationPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SignInPage,
    PlayerSignupPage,
    ClubOwnerSignupPage,
    ClubOwnerMaintanancePage,
    ClubOwnerEventPage,
    ClubOwnerAcademyPage,
    ClubOwnerPitchPage,
    ClubOwnerAddacademyPage,
    PlayerProfilePage,
    PlayerEventsPage,
    PlayerReservationsPage,
    PlayerAcademiesPage,
    ReviewsPage,
    UpdatePlayerProfilePage,
    MyAcademyPage,
    UpcomingPage,
    HistoryPage,
    ClubownerPage,
    ClubOwnerStatisticsPage,
    ClubownerReservationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AccountProvider,
    LocalhostProvider,
    MenuProvider,
    DataProvider,
    ActiveProvider,
    OwnerProvider,
    PlayerProvider 
  ]
})
export class AppModule {}
