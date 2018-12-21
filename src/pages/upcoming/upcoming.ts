import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { PlayerProvider } from '../../providers/player/player';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the UpcomingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upcoming',
  templateUrl: 'upcoming.html',
})
export class UpcomingPage {

  reservations:Array<any>=[];
  events:Array<any>=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public dataProvider:DataProvider,
    public playerProvider:PlayerProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpcomingPage');
    this.events=null;
    this.reservations=null;
    this.getEvents();
    this.getReservations();
  }
  getReservations()
  {
    this.playerProvider.getPlayerUpcomingReservations(this.dataProvider.get_user().userName).subscribe(data => {
      if(data)
      {
        this.reservations=data;
      }
    })
  }
  getEvents()
  {
    this.playerProvider.getPlayerUpcomingEvents(this.dataProvider.get_user().userName).subscribe(data => {
      if(data)
      {
        this.events=data;
      }
    })
  }
  view(item, type) {
    let msg: string;
    console.log(item);
    console.log('type is ', type)

    switch (type) {
      case 'Event':
        msg = `<ul>
    <li>Date: ${item.startTime.split('T')[0]}</li>
    <li>Start Time: ${item.startTime.split('T')[1]}</li>
    <li>Number Of Teams: ${item.noOfTeams}</li>
    <li>Number Of Team Members: ${item.noOfTeamMembers}</li>
    <li>Prize: ${item.prize}</li>
    <li>Price Per Team: ${item.pricePerTeam}</li> 
    </ul>`
        this.showConfirm(item, type, msg);
        break;

      case 'Reservation':
        msg = `<ul>
    <li>Date: ${item.startTime.split('T')[0]}</li>
    <li>Start Time: ${item.startTime.split('T')[1]}</li>
    <li>Paid: ${item.paid}</li>
    <li>Unpaid: ${item.unpaid}</li>
    </ul>`
        this.showConfirm(item, type, msg)
        break;
    }
  }
showConfirm(item, type, msg) {
    const confirm = this.alertCtrl.create({
      title: item.name + ' ' + type,
      message: msg,
      buttons: [

        {
          text: 'Ok',
          handler: () => {
            console.log('Ok clicked');
          }
        }
      ]
    });
    confirm.present();
}

}
