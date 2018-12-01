import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerSignupPage } from './player-signup';

@NgModule({
  declarations: [
    PlayerSignupPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayerSignupPage),
  ],
})
export class PlayerSignupPageModule {}
