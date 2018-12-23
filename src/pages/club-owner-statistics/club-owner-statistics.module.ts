import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClubOwnerStatisticsPage } from './club-owner-statistics';

@NgModule({
  declarations: [
    ClubOwnerStatisticsPage,
  ],
  imports: [
    IonicPageModule.forChild(ClubOwnerStatisticsPage),
  ],
})
export class ClubOwnerStatisticsPageModule {}
