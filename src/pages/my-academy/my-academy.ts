import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ActiveProvider } from "../../providers/active/active";
import { PlayerProvider } from '../../providers/player/player';
import { AlertController } from 'ionic-angular';
import { PlayerProfilePage } from '../player-profile/player-profile';
/**
 * Generated class for the MyAcademyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-academy',
  templateUrl: 'my-academy.html',
})
export class MyAcademyPage {

  
  academy: any;
  subscribed: boolean;
  unsubscribed:boolean;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public dataProvider:DataProvider,
     public playerProvider:PlayerProvider,
     public alertCtrl:AlertController,
     public activeProvider: ActiveProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAcademyPage');
    this.subscribed=false;
    this.unsubscribed=false;
  }

  getAcademy() {

    this.playerProvider.getPlayerAcademy(this.dataProvider.get_user().userName).subscribe(data => {
      if(data){
        this.academy=data;
        this.subscribed=true;
      }
      else this.unsubscribed=true;
    })
  }
  unsubscribe()
  {
    this.playerProvider.academyUnsubscribe(this.dataProvider.get_user().userName).subscribe(data => {
      if(data){
        this.showAlert('You have unsubscribed from the academy');
        this.dataProvider.set_user(data[0]);
        //this.navCtrl.push(PlayerProfilePage);
      }
    })
  }
  showAlert(msg:any) {
    const alert = this.alertCtrl.create({
      title: 'Unsubscribed !',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
}
