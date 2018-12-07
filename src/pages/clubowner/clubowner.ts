import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActiveProvider } from "../../providers/active/active";


/**
 * Generated class for the ClubownerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clubowner',
  templateUrl: 'clubowner.html',
})
export class ClubownerPage {
  events: any='';
  events_items: Array<{ title: string, note: string }>;

  reservations: any='';
  reservations_items: Array<{ title: string, note: string }>;

  maint: any='';
  maint_items: Array<{ title: string, note: string }>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public activeProvider: ActiveProvider) {
  


    this.events_items = [];
    for (let i = 1; i < this.events.length(); i++) {
      this.events_items.push({
        title: 'Name ' + i,
        note: 'This is item #' + i
      });
    }

    this.reservations_items = [];
    for (let i = 1; i < this.reservations.length(); i++) {
      this.reservations_items.push({
        title: 'reservations ' + i,
        note: 'This is item #' + i
      });
    }

    this.maint_items = [];
    for (let i = 1; i < this.maint.length(); i++) {
      this.maint_items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i
      });
    }
  }

  ionViewDidLoad() {
    this.activeProvider.set_component('owner');
  }

}
