import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerEventsPage } from './player-events';

@NgModule({
  declarations: [
    PlayerEventsPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayerEventsPage),
  ],
})
export class PlayerEventsPageModule {}
