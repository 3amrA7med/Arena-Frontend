import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActiveProvider } from "../../providers/active/active";
/**
 * Generated class for the PlayerReservationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player-reservations',
  templateUrl: 'player-reservations.html',
})
export class PlayerReservationsPage {
city : any;
date : any;
today :any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public activeProvider : ActiveProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerReservationsPage');
    this.activeProvider.set_component('playerreservations');
  }
  dateChanged()
  {

  }

}
