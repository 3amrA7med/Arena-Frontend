import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActiveProvider } from "../../providers/active/active";
/**
 * Generated class for the PlayerAcademiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player-academies',
  templateUrl: 'player-academies.html',
})
export class PlayerAcademiesPage {

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public activeProvider : ActiveProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerAcademiesPage');
    this.activeProvider.set_component('playeracademies');
  }

}
