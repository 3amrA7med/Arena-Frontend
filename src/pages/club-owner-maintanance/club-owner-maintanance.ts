import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import { AccountProvider } from "../../providers/account/account";
import { OwnerProvider } from "../../providers/owner/owner"
import { AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { FormControl, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the ClubOwnerMaintanancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-club-owner-maintanance',
  templateUrl: 'club-owner-maintanance.html',
})
export class ClubOwnerMaintanancePage {

  data_maintanance_start_date: DateTime;
  data_maintanance_end_date: DateTime;
  data_pitch_no: number;
  clubownermaintananceform: FormGroup;
  data_cost: Float32Array;
  data_description: string;
  data_clubid: number;
  data_username: string;
  testRadioResult: any;
  testRadioOpen: boolean;
  index: number;
  check: boolean

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public accountProvider: AccountProvider,
    public ownerProvider: OwnerProvider,
    public alertCtrl: AlertController,
    public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClubOwnerMaintanancePage');
    let user = this.dataProvider.get_user()
    this.data_username = user.userName;
    console.log('getting owner club id');
    let id = this.dataProvider.get_id();
    this.data_clubid = id;
    console.log(this.data_clubid);
    console.log(this.data_clubid);

    console.log(this.clubownermaintananceform.invalid);
  }

  ngOnInit() {

    this.clubownermaintananceform = new FormGroup({
      description: new FormControl('', [Validators.minLength(3), Validators.maxLength(100)]),
      cost: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(1), Validators.maxLength(20)]),
      pitch_no: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(1), Validators.maxLength(16)]),
      maintanance_start_date: new FormControl('', [Validators.required]),
      maintanance_end_date: new FormControl('', [Validators.required]),
    });
  }


  save() {
    console.log(this.clubownermaintananceform.invalid);
    if (this.CheckDate()) {
      this.ownerProvider.owner_maintanance(this.data_clubid, this.data_pitch_no
        , this.data_cost, this.data_description, this.data_maintanance_start_date, this.data_maintanance_end_date).subscribe(data => {
          if (data) {
            //TODO sent an confirmation email
            this.dataProvider.set_user(data[0]);

            //Saving user info in provider so we can access it in any time in any ther component 

            this.Inserted('Pitch maintanance is added successfully');

          }
          else {
            this.showAlert('Failed to add Pitch maintanance, please try again');

          }

        })
    }
  }


  GetPitchNo() {
    console.log('1111111111');

    this.ownerProvider.owner_pitchno(this.data_clubid).subscribe(data => {
      if (data) {
        //Saving user info in provider so we can access it in any time in any ther component
        let alert = this.alertCtrl.create();
        alert.setTitle('Select pitch number');
        this.data_pitch_no = data[0].pitchno;
        this.check = true;

        this.index = 0;
        console.log('2aaaablll');
        while (data[this.index]) {
          console.log('baaaa3d');
          alert.addInput({
            type: 'radio',
            label: data[this.index].pitchno,
            value: data[this.index].pitchno,
            checked: this.check

          });
          console.log(this.check);
          this.index = this.index + 1;
          this.check = false;
        }
        alert.addButton('Cancel');
        alert.addButton({
          text: 'OK',
          handler: data => {
            this.testRadioOpen = false;
            this.data_pitch_no = data;
            
            console.log('222222222');
          }
        });
        alert.present();
        console.log('33333333');
      }
      else {
        this.showAlert('Failed to add show pitch number');
      }

    })
    console.log('4444444');
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
    if (this.data_maintanance_start_date > this.data_maintanance_end_date) {
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
          this.data_clubid = data[0].id;
          console.log('booooogiiiiiii');
          console.log(this.data_clubid);
          
          //Saving user info in provider so we can access it in any time in any ther component 

        }
        else {
          this.showAlert('Failed to get clubid');

        }

    })
  }
}
