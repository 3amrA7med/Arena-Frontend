import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActiveProvider } from "../../providers/active/active";
import { PlayerProvider } from "../../providers/player/player";
import { DataProvider } from "../../providers/data/data";
import { AlertController } from 'ionic-angular';
import { OwnerProvider } from "../../providers/owner/owner";
import { ClubownerPage } from '../clubowner/clubowner';
/**
 * Generated class for the ClubownerReservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clubowner-reservation',
  templateUrl: 'clubowner-reservation.html',
})
export class ClubownerReservationPage {
  selclub: any;
  date: any;
  date2: any;
  today: any;
  selpitch: any;
  selpitchno: any;
  hours: number[] = [];
  city: any[] = [];
  clubs: any[] = [];
  pitches: any[] = [];
  test: string = "";
  price: any;
  pricemin: any;
  Pay: any;
  secondary: any;
  user: any;
  unpaid: any;
  current_date;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public activeProvider: ActiveProvider,
    public playerProvider: PlayerProvider,
    public dataProvider: DataProvider,
    public alertCtrl: AlertController,
    public ownerProvider: OwnerProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClubownerReservationPage');
    this.user = this.dataProvider.get_user().userName;
    this.selclub = this.dataProvider.get_id();
    console.log(this.selclub)
    this.playerProvider.getPitches(this.selclub).subscribe(result => {
      for (let d of result)
        this.pitches.push({ pitch: d["pitch#"], price: d["price"] });
    })

  }


  pitchChanged() {
    this.date = null;
    this.date2 = null;
    console.log("sh8ala");
  }
  book() {
    this.unpaid = this.price - this.Pay;

    let hour = this.date2.split(":")[0];
    console.log(this.price);
    if (this.selclub && this.selpitch && this.date && this.date2) {
      this.playerProvider.book('ClubOwnerReservation', this.selclub, this.selpitchno,
        this.date, hour, this.Pay, this.unpaid).subscribe(data => {
          if (data)
            this.showAlert("Your reservation is done!", "Operation Successful");
          else this.showAlert("An error has occured, please retry later.", "Error!");
        });
    }
  }
  ngOnInit() { this.current_date = new Date().toISOString(); }
  dateChanged() {


    console.log(this.price);

    this.date2 = undefined;
    this.test = "Please choose an hour!";
    this.getReservations();
    this.Pay = this.price / 2;

  }
  dateChanged2() {
    this.test = "";
    console.log(this.date2);

  }
  getReservations() {

    this.price = parseInt(this.selpitch.split("Y")[1], 10);
    this.selpitchno = parseInt(this.selpitch.split("Y")[0], 10);
    this.pricemin = this.price / 4;
    this.playerProvider.getbooked(this.date, this.selclub, this.selpitchno).subscribe(data => {
      this.hours = [];
      if (data) {
        let iStr;
        for (let d of data) {
          d['startTime'] = d['startTime'].split(':')[0]
          d['startTime'] = d['startTime'].split('T')[1]
          // console.log(d['startTime']);

          //console.log(d);
        }
        for (let i = 0; i < 24; i++) {
          iStr = i.toString()
          if (i < 10)
            iStr = "0" + iStr;
          for (let d of data) {
            var indic = true;
            // console.log(iStr);
            // console.log(d['startTime']);
            if (iStr == d['startTime']) {
              indic = false;
              break;
            }

          }
          if (indic) {
            this.hours.push(i);
          }
        }


      } else {
        for (let i = 0; i < 24; i++)
          this.hours.push(i);

      } console.log("End----------------------------");
      console.log(this.hours);
    })


  }
  showAlert(msg: any, label: any) {
    const alert = this.alertCtrl.create({
      title: label,
      subTitle: msg,
      buttons: ['OK']

    });
    alert.present();
    this.navCtrl.push(ClubownerPage);
  }

}
