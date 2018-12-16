import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import { AccountProvider } from "../../providers/account/account";
import { OwnerProvider } from "../../providers/owner/owner";
import { AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the ClubOwnerPitchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-club-owner-pitch',
  templateUrl: 'club-owner-pitch.html',
})
export class ClubOwnerPitchPage {


  data_creation_date: Date;
  data_pitch_no: number;
  clubownerpitchform: FormGroup;
  data_price: Float32Array;
  data_clubid: number;
  data_capacity: number;
  data_capacity2: string;
  data_type: number;
  data_type2: string;
  testRadioResult: any;
  testRadioOpen: boolean;
  data_username: string;
  index: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public accountProvider: AccountProvider,
    public ownerProvider: OwnerProvider,
    public alertCtrl: AlertController,
    public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClubOwnerPitchPage');
    let user = this.dataProvider.get_user()
    this.data_username = user.userName;
    console.log('getting owner club id');
    console.log(this.data_username);
    this.GetOwnwerClubId();
    console.log(this.clubownerpitchform.invalid);
  }

  ngOnInit() {

    this.clubownerpitchform = new FormGroup({
      price: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(1), Validators.maxLength(20)]),
      pitch_no: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(1), Validators.maxLength(16)]),
      creation_date: new FormControl('', [Validators.required]),
      capacity: new FormControl('', [Validators.required, Validators.pattern('^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$'), Validators.minLength(3), Validators.maxLength(25)]),
      type: new FormControl('', [Validators.required, Validators.pattern('^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$'), Validators.minLength(3), Validators.maxLength(25)]),

    });
  }

  save() {
    console.log(this.clubownerpitchform.invalid);
    this.ownerProvider.owner_pitch(this.data_clubid, this.data_pitch_no
      , this.data_creation_date, this.data_price, this.data_capacity, this.data_type).subscribe(data => {
        if (data) {
          //TODO sent an confirmation email
          this.dataProvider.set_user(data[0]);

          //Saving user info in provider so we can access it in any time in any ther component


          this.Inserted('Pitch is added successfully');


        }
        else {
          this.showAlert('Failed to add Pitch ,Pitch number already exist.');

        }

      })
  }


  GetPitchNo() {

    this.ownerProvider.owner_pitchno(this.data_clubid).subscribe(data => {
      if (data) {
        //Saving user info in provider so we can access it in any time in any ther component
        this.index = 0;
        let msg: string = "<ul>";
        console.log(data)
        while (data[this.index]) {
          msg = msg +"<li>" + data[this.index].pitchno + "</li>  "
          this.index = this.index + 1;
          console.log(this.index)

        }
        msg = msg + "</ul>"
        this.presentConfirm("Pitch Numbers", msg);
      }
      else {
          this.showAlert('Failed to show pitch number');
           }
     
    })
  }
  presentConfirm(Title,Msg) {
    let alert = this.alertCtrl.create({
      title: Title,
      message: Msg,
      buttons: [
        {
          text: 'OK',
          role: 'ok',
          handler: () => {
            
          }
        }
      ]
    });
    alert.present();
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

  capacityvalues() {
    console.log('gowaaaa');
    if (this.testRadioResult == 'khomasy') {
      this.data_capacity = 5;
      this.data_capacity2 = 'khomasy'
    }

      if (this.testRadioResult == 'sobaey') {
        this.data_capacity = 7;
        this.data_capacity2 ='sobaey'
    }
    if (this.testRadioResult == 'hedashar') {
      this.data_capacity = 11;
      this.data_capacity2 = 'hedashar';
    }
  }
  //=====================================
  SelectCapacity() {
    this.data_capacity2 = 'khomasy'
    let alert = this.alertCtrl.create();
    alert.setTitle('Select pitch capacity');

    alert.addInput({
      type: 'radio',
      label: 'khomasy',
      value: 'khomasy',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'sobaey',
      value: 'sobaey',
      checked: false
    });

      alert.addInput({
      type: 'radio',
      label: 'hedashar',
      value: 'hedashar',
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
        this.capacityvalues();
      }
    });
    alert.present();
  }



  typevalues() {
    if (this.testRadioResult == 'asphalt') {
      this.data_type = 0;
      this.data_type2 = 'asphalt';
    }
    if (this.testRadioResult == 'negela tabe3e') {
      this.data_type = 1;
      this.data_type2 = 'negelatabee';
    }
    if (this.testRadioResult == 'negela sena3i') {
      this.data_type = 2;
      this.data_type2 = 'negelasenai';
    }
  }
  //=====================================
  SelectType() {
    this.data_type2='asphalt'
    let alert = this.alertCtrl.create();
    alert.setTitle('Select pitch type');

    alert.addInput({
      type: 'radio',
      label: 'asphalt',
      value: 'asphalt',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'negela sena3i',
      value: 'negela sena3i',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'negela tabe3e',
      value: 'negela tabe3e',
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
        this.typevalues();
      }
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
    console.log(this.data_clubid);
  }
}

