import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdatePlayerProfilePage } from './update-player-profile';

@NgModule({
  declarations: [
    UpdatePlayerProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(UpdatePlayerProfilePage),
  ],
})
export class UpdatePlayerProfilePageModule {}
