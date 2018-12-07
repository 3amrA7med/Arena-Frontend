import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerReservationsPage } from './player-reservations';

@NgModule({
  declarations: [
    PlayerReservationsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayerReservationsPage),
  ],
})
export class PlayerReservationsPageModule {}
