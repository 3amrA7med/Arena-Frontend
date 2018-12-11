import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import { AccountProvider } from "../../providers/account/account";
import { AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { FormControl, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the ClubOwnerEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-club-owner-event',
  templateUrl: 'club-owner-event.html',
})
export class ClubOwnerEventPage {

  clubownereventform: FormGroup;
  data_event_start_time: DateTime;
  data_event_end_time: DateTime;
  data_name: string;
  data_noofteams: number;
  data_noofteammembers: number;
  data_availableplaces: number;
  data_prize: Float32Array;
  data_priceperteam: Float32Array;
  data_clubid: number;
  data_username: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public accountProvider: AccountProvider,
    public alertCtrl: AlertController,
    public dataProvider: DataProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClubOwnerEventPage');
    let user = this.dataProvider.get_user()
    this.data_username = user.userName;
    console.log('getting owner club id');
    this.GetOwnwerClubId();

  }


  ngOnInit() {

    this.clubownereventform = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$'), Validators.minLength(3), Validators.maxLength(25)]),
      club_id: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(1), Validators.maxLength(16)]),
      noofteams: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(1), Validators.maxLength(3)]),
      event_start_time: new FormControl('', [Validators.required]),
      event_end_time: new FormControl('', [Validators.required]),
      noofteammembers: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(1), Validators.maxLength(2)]),
      availableplaces: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(1), Validators.maxLength(2)]),
      priceperteam: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(1), Validators.maxLength(10)]),
      prize: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(1), Validators.maxLength(10)]),

    });
  }

  save() {
    if (this.CheckDate()) {
      this.accountProvider.owner_event(this.data_clubid, this.data_name
        , this.data_event_start_time, this.data_event_end_time, this.data_noofteams, this.data_noofteammembers, this.data_noofteams
        , this.data_prize, this.data_priceperteam).subscribe(data => {
          if (data) {
            //TODO sent an confirmation email
            this.dataProvider.set_user(data[0]);

            //Saving user info in provider so we can access it in any time in any ther component 

            this.Inserted('Event is added successfully');

          }
          else {
            this.showAlert('Failed to add your event, please try again');

          }

        })
    }
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

  CheckDate() {
    if (this.data_event_start_time > this.data_event_end_time) {
      this.WrongDate('End date is before start date');
      return false;
    }
    return true;
  }

  WrongDate(msg: any) {
    const alert = this.alertCtrl.create({
      title: 'Wrong date',
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
        
      }
      else {
        this.showAlert('Failed to get clubid');

      }

    })
    console.log(this.data_clubid);
  }
}
