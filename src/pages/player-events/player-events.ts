import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActiveProvider } from "../../providers/active/active";
import { PlayerProvider } from "../../providers/player/player";
import { DataProvider } from "../../providers/data/data";
import { AlertController } from 'ionic-angular';
import { PlayerProfilePage } from "../../pages/player-profile/player-profile"
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
  selcity: any;
  selevent: any;
  seleventobj: any;
  city: any[] = [];
  events: any[] = [];
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public activeProvider: ActiveProvider,
    public playerProvider: PlayerProvider,
    public dataProvider: DataProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerEventsPage');
    this.activeProvider.set_component('playerevents');
    this.playerProvider.getCities().subscribe(data => {
      if (data)
        for (let d of data)
          this.city.push({ city: d['city'] });

    })
    console.log(this.city);
  }
  cityChanged(c) {
    this.events = [];
    console.log(this.selcity);
    this.playerProvider.getAvailableEvents(this.dataProvider.get_user().userName, c).subscribe(data => {
      console.log(data);  
      if (data)
        for (let d of data)
          this.events.push({ cname: d['cname'], cid: d['cid'], ename: d['ename'], ap: d['ap'], st: d['st'], eid: d['eid'], et: d['et'], pz: d['pz'], noot: d['noot'], nootm: d['nootm'], ppt: d['ppt'] });
      console.log(this.events);
    });
  }
  Enroll() {
    this.playerProvider.enroll(this.seleventobj.cid, this.seleventobj.eid, this.dataProvider.get_user().userName).subscribe(data => {
      if (data) {
        this.showAlert("Enrolled Successfully", "Congratulations!");
        this.seleventobj = null;
        this.selevent = null;
        this.selcity = null;
      }
      else this.showAlert("Failed to enroll.", "Error!");
    })
  }
  showAlert(msg: any, label: any) {
    const alert = this.alertCtrl.create({
      title: label,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
  eventChanged(e)
  {
    this.seleventobj = e;
    console.log(this.seleventobj);
  }
}
