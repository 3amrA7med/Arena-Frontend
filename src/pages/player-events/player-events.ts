import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActiveProvider } from "../../providers/active/active";
/**
 * Generated class for the PlayerEventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player-events',
  templateUrl: 'player-events.html',
})
export class PlayerEventsPage {
city:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public activeProvider : ActiveProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerEventsPage');
    this.activeProvider.set_component('playerevents');
  }

}
