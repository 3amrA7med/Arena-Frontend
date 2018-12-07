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
import { PlayerEventsPage } from '../pages/player-events/player-events';
import { PlayerReservationsPage } from '../pages/player-reservations/player-reservations';
import { PlayerAcademiesPage} from '../pages/player-academies/player-academies';
import { ReviewsPage } from '../pages/reviews/reviews';
import { PlayerProfilePage } from '../pages/player-profile/player-profile'
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SignInPage,
    PlayerSignupPage,
    ClubOwnerSignupPage,
    PlayerProfilePage,
    PlayerEventsPage,
    PlayerReservationsPage,
    PlayerAcademiesPage,
    ReviewsPage
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
    PlayerProfilePage,
    PlayerEventsPage,
    PlayerReservationsPage,
    PlayerAcademiesPage,
    ReviewsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AccountProvider,
    LocalhostProvider,
    MenuProvider,
    DataProvider 
  ]
})
export class AppModule {}
