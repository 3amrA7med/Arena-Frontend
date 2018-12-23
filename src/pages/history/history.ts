import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { PlayerProvider } from '../../providers/player/player';
import { AlertController } from 'ionic-angular';
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
     public playerProvider:PlayerProvider,
     public alertCtrl: AlertController
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
    this.playerProvider.getPlayerPastEvents(this.dataProvider.get_user().userName).subscribe(data => {
      if(data)
      {
        this.events=data;
      }
    })
  }
  view(item, type) {
    let msg: string;

    console.log('type is ', type)

    switch (type) {
      case 'Event':
        msg = `<ul>
        <li>Date: ${item.startTime.split('T')[0]}</li>
        <li>Start Time: ${item.startTime.split('T')[1]}</li>
        <li>Club Name: ${item.clubName}</li>
        <li>Adress: ${item.city}, ${item.street}</li>
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
    <li>Club Name: ${item.name}</li>
    <li>Pitch Number: ${item.pitchNumber}</li>
    <li>Adress: ${item.city}, ${item.street}</li>
    <li>Rating: ${item.rating}</li>
    <li>Number of Reviews: ${item.reviewCount}</li>
    <li>Capacity: ${item.capacity}</li>
    <li>Type: ${item.type}</li>
    <li>Paid: ${item.paid + item.unpaid}</li>
    <li>Unpaid: ${0}</li>
    </ul>`
        this.showConfirm1(item, type, msg)
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
showConfirm1(item, type, msg) {
  const confirm = this.alertCtrl.create({
    title: type,
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