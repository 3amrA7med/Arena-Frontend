import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountProvider } from "../../providers/account/account";
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
  data_clubid: number;
  clubowneracademy: FormGroup;
  data_username: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public accountProvider: AccountProvider,
    public alertCtrl: AlertController,
    public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClubOwnerAcademyPage');
    let user = this.dataProvider.get_user()
    this.data_username = user.userName;
    console.log('getting owner club id');
    this.GetOwnwerClubId();
    
  }

  ngOnInit() {

    this.clubowneracademy = new FormGroup({
      academyname: new FormControl('', [Validators.required, Validators.pattern('^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$'), Validators.minLength(3), Validators.maxLength(25)]),
      subscription: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(1), Validators.maxLength(20)]),
      club_id: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(1), Validators.maxLength(16)]),
      noofplayers: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(1), Validators.maxLength(16)]),
    });
  }

  viewacademy() {
    console.log(this.data_clubid);
    this.accountProvider.owner_viewacademy(this.data_clubid).subscribe(data => {
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
    this.accountProvider.owner_updateacademy(this.data_clubid, this.data_subscription).subscribe(data => {
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
      title: 'Insertion failed !',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  Inserted(msg: any) {
    const alert = this.alertCtrl.create({
      title: 'Insertion succeded !',
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

    this.accountProvider.owner_clubid(this.data_username).subscribe(data => {
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