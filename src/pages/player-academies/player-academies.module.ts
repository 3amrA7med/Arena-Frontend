import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerAcademiesPage } from './player-academies';

@NgModule({
  declarations: [
    PlayerAcademiesPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayerAcademiesPage),
  ],
})
export class PlayerAcademiesPageModule {}
