import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { PlayerProvider } from '../../providers/player/player';
/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  reservations:Array<any>=[];
  events:Array<any>=[];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public dataProvider:DataProvider,
     public playerProvider:PlayerProvider
   ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
    this.events=null;
    this.reservations=null;
    this.getEvents();
    this.getReservations();
  }
  getReservations()
  {
    this.playerProvider.getPlayerPastReservations(this.dataProvider.get_user().userName).subscribe(data => {
      if(data)
      {
        this.reservations=data;
      }
    })
  }
  getEvents()
  {
    this.playerProvider.getPlayerPastEvents(this.dataProvider.get_user().username).subscribe(data => {
      if(data)
      {
        this.events=data;
      }
    })
  }

}
