import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActiveProvider } from "../../providers/active/active";
import { PlayerProvider } from "../../providers/player/player";
import { DataProvider } from "../../providers/data/data";
import { AlertController } from 'ionic-angular';
import { PlayerProfilePage } from "../../pages/player-profile/player-profile"
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
  clubs: any[] = [];
  selclub: any;
  selclubno;
  selacadname;
  academy: any;
  currSubs  = false;
  currUnsubs = false;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public activeProvider: ActiveProvider,
    public playerProvider: PlayerProvider,
    public dataProvider: DataProvider,
    public alertCtrl: AlertController) {
  } 

  ionViewDidLoad() {

    this.activeProvider.set_component('playeracademies');
 
    this.getAcademy();
    
    this.playerProvider.getAcadAllClubs().subscribe(data => {
      if (data)
        for (let d of data) {
          this.clubs.push({ cname: d['cname'], cid: d['cid'], aname: d['aname'], price:d['price'] });
        }

    });

   
  }
  getAcademy() {
    this.playerProvider.getPlayerAcademy(this.dataProvider.get_user().userName).subscribe(data => {
      console.log(data)
      if (data) {
        this.currSubs = true;
        this.academy = data[0]
      }
      else this.currUnsubs = true;
      console.log(data)
    })
  }
  unsubscribe() {
    console.log('unsubscribe');
    this.playerProvider.academyUnsubscribe(this.dataProvider.get_user().userName, this.dataProvider.get_user().password).subscribe(data => {
      if (data) {
        this.showAlert('You have unsubscribed from the academy.', "Unsubscribed!");
        this.currSubs = false;
        this.currUnsubs = true;
        this.selclub = null;
      }
    })
  }
  subscribe() {
    console.log(JSON.stringify(this.selclub));

    this.selacadname = this.selclub.split('\\')[0];
    this.selclubno = this.selclub.split('\\')[1];
    console.log(this.selclubno);
    console.log(this.selacadname);
    this.playerProvider.academySubscribe(this.dataProvider.get_user().userName, this.selclubno, this.selacadname).subscribe(data => {
      if (data) {
        this.showAlert('You have subscribed to a new academy.',"Subscribed!");
        this.dataProvider.set_user(data[0]);
        this.currSubs = true;
        this.currUnsubs = false;
        this.selclub = null;
        this.getAcademy();
      }
    })
  }
  showAlert(msg: any,label:any) {
    const alert = this.alertCtrl.create({
      title: label,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
  clubChanged() {

  }
}
