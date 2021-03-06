import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import { AccountProvider } from "../../providers/account/account";
import { OwnerProvider } from "../../providers/owner/owner"
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
  currentDate:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public accountProvider: AccountProvider,
    public ownerProvider: OwnerProvider,
    public alertCtrl: AlertController,
    public dataProvider: DataProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClubOwnerEventPage');
    let user = this.dataProvider.get_user()
    this.data_username = user.userName;
    console.log('getting owner club id');
    let id = this.dataProvider.get_id();
    this.data_clubid = id;
    console.log(this.data_clubid);
    console.log(this.data_clubid);
    this.currentDate = new Date().toISOString();
    console.log(this.clubownereventform.invalid);
  }


  ngOnInit() {
    
    this.clubownereventform = new FormGroup({
      name: new FormControl('', [Validators.minLength(3), Validators.maxLength(100)]),
      noofteams: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(1), Validators.maxLength(3)]),
      event_start_time: new FormControl('', [Validators.required]),
      event_end_time: new FormControl('', [Validators.required]),
      noofteammembers: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(1), Validators.maxLength(2)]),
      priceperteam: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(1), Validators.maxLength(10)]),
      prize: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(1), Validators.maxLength(10)]),

    });
  }

  save() {
    console.log(this.clubownereventform.invalid);
    if (this.CheckDate()) {
      this.ownerProvider.owner_event(this.data_clubid, this.data_name
        , this.data_event_start_time, this.data_event_end_time, this.data_noofteams, this.data_noofteammembers, this.data_noofteams
        , this.data_prize, this.data_priceperteam).subscribe(data => {
          if (data) {
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

    this.ownerProvider.owner_clubid(this.data_username).subscribe(data => {
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
