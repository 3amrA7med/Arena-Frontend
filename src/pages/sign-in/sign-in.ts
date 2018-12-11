import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountProvider } from "../../providers/account/account";
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { PlayerSignupPage } from '../player-signup/player-signup';
import { ClubOwnerSignupPage } from '../club-owner-signup/club-owner-signup';
import { ClubOwnerAcademyPage } from '../club-owner-academy/club-owner-academy';
import { ClubOwnerMaintanancePage } from '../club-owner-maintanance/club-owner-maintanance';
import { ClubOwnerEventPage } from '../club-owner-event/club-owner-event';
import { ClubOwnerPitchPage } from '../club-owner-pitch/club-owner-pitch';
import { ClubOwnerAddacademyPage } from '../club-owner-addacademy/club-owner-addacademy';


import { DataProvider } from '../../providers/data/data';
import { PlayerProfilePage } from '../player-profile/player-profile';
import { ActiveProvider } from "../../providers/active/active";
import { ClubownerPage } from '../clubowner/clubowner';
/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  //VARIABLES
  username: string;
  password: string;
  testRadioResult: any;
  testRadioOpen: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public accountProvider: AccountProvider,
    public alertCtrl: AlertController,
    public dataProvider: DataProvider,
    public activeProvider: ActiveProvider) {
  }

  ionViewDidLoad() {
    this.activeProvider.set_component('signin');
  }
  signIn() {
    if (this.validate()) {


      this.accountProvider.signin(this.username, this.password).subscribe(data => {
        // Data returned in an array form so we must index the data
        // (in our case only one row are returned as a player or owner)
        console.log(data)
        if (data) {
          if(data[0].type=='player')
          {
            this.navCtrl.push(PlayerProfilePage); //to be added player main screen
          }
          if (data[0].type == 'owner') {
            this.navCtrl.push(ClubownerPage);//to be added ClubOwner main screen
          }
          this.dataProvider.set_user(data[0]);
          //Saving user info in provider so we can access it in any time in any ther component 
        }
        else {
          this.showAlert('Account not found ,Please retry.');
        }
      });
    }
    else {
      this.showAlert('Fill in username and password.');

    }
    //========================

  }
  showAlert(msg: any) {
    const alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
  //===============================
  validate() {
    if (!this.username) {
      return false;
    }
    else if (!this.password) {
      return false;
    }
    return true;
  }
  //===============================
  register() {
    if (this.testRadioResult == 'player')
      this.navCtrl.push(PlayerSignupPage);

    if (this.testRadioResult == 'club_owner')
      this.navCtrl.push(ClubOwnerSignupPage);
  }
  //=====================================
  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Sign up as player or club owner');

    alert.addInput({
      type: 'radio',
      label: 'Player',
      value: 'player',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Club Owner',
      value: 'club_owner',
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
        this.register();
      }
    });
    alert.present();
  }
}





