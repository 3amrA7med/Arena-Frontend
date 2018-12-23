import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountProvider } from "../../providers/account/account";
import { OwnerProvider } from "../../providers/owner/owner";
import { AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { FormControl, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the ClubOwnerAcademyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-club-owner-academy',
  templateUrl: 'club-owner-academy.html',
})
export class ClubOwnerAcademyPage {

  data_academyname: string;
  data_noofplayers: number;
  data_subscription: Float32Array;
  data_subscription2: Float32Array;
  data_clubid: number;
  clubowneracademy: FormGroup;
  data_username: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public accountProvider: AccountProvider,
    public ownerProvider: OwnerProvider,
    public alertCtrl: AlertController,
    public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClubOwnerAcademyPage');
    let user = this.dataProvider.get_user()
    this.data_username = user.userName;
    console.log('getting owner club id');
    console.log(this.data_username);
    //this.GetOwnwerClubId();
    let id = this.dataProvider.get_id();
    this.data_clubid = id;
    console.log(this.data_clubid);
    console.log(this.data_clubid);
    this.viewacademy();
  }

  ngOnInit() {

    this.clubowneracademy = new FormGroup({
      subscription: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(1), Validators.maxLength(20)]),
    });
  }

  viewacademy() {
    console.log(this.data_clubid);
    console.log(this.clubowneracademy.invalid);
    console.log(this.clubowneracademy.valid);
    this.ownerProvider.owner_viewacademy(this.data_clubid).subscribe(data => {
        if (data) {
          //TODO sent an confirmation email
          this.data_academyname = data[0].name;
          this.data_subscription = data[0].monthlySubscription;
          this.data_noofplayers = data[0].noofplayers;
          //Saving user info in provider so we can access it in any time in any ther component 

          console.log(this.data_academyname);
          console.log(this.data_noofplayers);
          console.log(this.data_subscription);

          //this.Inserted('Pitch maintanance is added successfully');

        }
        else {
          this.showAlert('Failed to view your academy');

        }

      })
  }


  UpdateMonthlySubscription() {
    console.log(this.clubowneracademy.invalid);
    this.ownerProvider.owner_updateacademy(this.data_clubid, this.data_subscription).subscribe(data => {
      if (data) {

        this.Inserted('Updated succefully');

      }
      else {
        this.showAlert('Failed to update');

      }

    })
  }

  showAlert(msg: any) {
    const alert = this.alertCtrl.create({
      title: 'Failed !',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  Inserted(msg: any) {
    const alert = this.alertCtrl.create({
      title: 'Succeded !',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  AcademyName() {
    this.Academy(this.data_academyname);
  }

  AcademyNoOfPlayers() {
    this.Academy(this.data_noofplayers);
  }

  AcademySubscription() {
    this.Academy(this.data_subscription);
  }

  Academy(msg: any) {
    const alert = this.alertCtrl.create({
      title: 'Academy',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  GetOwnwerClubId() {

    this.ownerProvider.owner_clubid(this.data_username).subscribe(data => {
      if (data) {
        //TODO sent an confirmation email
        console.log(data[0]);
        this.data_clubid = data[0].id;
        console.log('booooogiiiiiii');
        console.log(this.data_clubid);
        //Saving user info in provider so we can access it in any time in any ther component 
        this.viewacademy();
      }
      else {
        this.showAlert('Failed to get clubid');

      }

    })
    console.log(this.data_clubid);
  }

}
