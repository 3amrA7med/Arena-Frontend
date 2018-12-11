import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAcademyPage } from './my-academy';

@NgModule({
  declarations: [
    MyAcademyPage,
  ],
  imports: [
    IonicPageModule.forChild(MyAcademyPage),
  ],
})
export class MyAcademyPageModule {}
