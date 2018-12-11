import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { SignInPage } from '../sign-in/sign-in';
import { DataProvider } from '../../providers/data/data';
import { Page } from 'ionic-angular/umd/navigation/nav-util';
import { PlayerEventsPage } from '../../pages/player-events/player-events';
import { PlayerReservationsPage } from '../../pages/player-reservations/player-reservations';
import { PlayerAcademiesPage} from '../../pages/player-academies/player-academies';
import { ReviewsPage } from '../../pages/reviews/reviews';
import { ActiveProvider } from "../../providers/active/active";
import { UpdatePlayerProfilePage } from '../../pages/update-player-profile/update-player-profile';
import { MyAcademyPage } from '../../pages/my-academy/my-academy';
/**
 * Generated class for the PlayerProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player-profile',
  templateUrl: 'player-profile.html',
})
export class PlayerProfilePage {
  name:string;
  type:string;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
      public dataProvider:DataProvider,
        public activeProvider : ActiveProvider) {
  }



  ionViewDidLoad(){
    let user =this.dataProvider.get_user() 
    this.name=user.firstName;
   // this.type=this.dataProvider.get_user().type; 
   // this.myApp.enableMenu1();
   this.activeProvider.set_component('playerprofile');
  }
  openPage(x:any)
  {
    if(x==0)
    this.navCtrl.push(UpdatePlayerProfilePage);
    if(x==1)
    this.navCtrl.push(MyAcademyPage);
    if(x==2)
    this.navCtrl.push(PlayerEventsPage);
    if(x==3)
    this.navCtrl.push(PlayerAcademiesPage);
    if(x==4)
    this.navCtrl.push(ReviewsPage);
  }

  LogOut()
  {
    this.navCtrl.popToRoot()
  };

}
