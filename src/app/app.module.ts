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
import { ClubOwnerMaintanancePage } from '../pages/club-owner-maintanance/club-owner-maintanance'
import { ClubOwnerEventPage } from '../pages/club-owner-event/club-owner-event'
import { ClubOwnerAcademyPage } from '../pages/club-owner-academy/club-owner-academy'
import { ClubOwnerPitchPage } from '../pages/club-owner-pitch/club-owner-pitch'
import { ClubOwnerAddacademyPage } from '../pages/club-owner-addacademy/club-owner-addacademy'
@NgModule({
  declarations: [
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
    ClubOwnerAddacademyPage
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
    ClubOwnerAddacademyPage
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
