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

  capacities: any[] = [{ capacity: "5v5 playground", no: "5" }, { capacity: "7v7 playground", no: "7" }, { capacity: "11v11 playground", no: "11" }];
  types: any[] = [{ type: "Natrual turf", no: "1" }, { type: "Indoors", no: "0" }, { type: "Artificial turf", no: "2" }];
  data_creation_date: Date;
  data_pitch_no: number;
  clubownerpitchform: FormGroup;
  data_price: Float32Array;
  data_clubid: number;
  data_capacity: number;
  data_capacity2: string;
  currcapacity;
  currtype;
  data_type: number;
  data_type2: string;
  testRadioResult: any;
  testRadioOpen: boolean;
  data_username: string;
  index: number;
  currentDate:any;
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
    let id = this.dataProvider.get_id();
    this.data_clubid = id;
    console.log(this.data_clubid);
    console.log(this.data_clubid);
    this.currentDate = new Date().toISOString();
    console.log(this.clubownerpitchform.invalid);
    this.data_capacity = null;
    this.data_type = null;

  }

  ngOnInit() {

    this.clubownerpitchform = new FormGroup({
      pitchno: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(1), Validators.maxLength(20)]),
      price: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(1), Validators.maxLength(20)]),
      creation_date: new FormControl('', [Validators.required]),

    });
  }

  save() {
    console.log(this.clubownerpitchform.invalid);
    this.ownerProvider.owner_pitch(this.data_clubid, this.data_pitch_no
      , this.data_creation_date, this.data_price, this.data_capacity, this.data_type).subscribe(data => {
        if (data) {
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

  selcapacity(c) {
    console.log(this.clubownerpitchform.invalid);
    console.log(this.clubownerpitchform.valid);
    console.log(this.data_capacity);
    console.log(this.data_type);
    this.data_capacity = c;
  }

  seltype(c) {
    console.log(this.clubownerpitchform.invalid);
    console.log(this.clubownerpitchform.valid);
    console.log(this.data_capacity);
    console.log(this.data_type);
    this.data_type = c;
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

  capacityvalues() {
    console.log('gowaaaa');
    if (this.testRadioResult == '5v5 playground') {
      this.data_capacity = 5;
      this.data_capacity2 = '5v5 playground'
    }

    if (this.testRadioResult == '7v7 playground') {
        this.data_capacity = 7;
      this.data_capacity2 ='7v7 playground'
    }
    if (this.testRadioResult == '11v11 playground') {
      this.data_capacity = 11;
      this.data_capacity2 = '11v11 playground';
    }
  }
  //=====================================
  SelectCapacity() {
    this.data_capacity2 = '5v5 playground'
    let alert = this.alertCtrl.create();
    alert.setTitle('Select pitch capacity');

    alert.addInput({
      type: 'radio',
      label: '5v5 playground',
      value: '5v5 playground',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: '7v7 playground',
      value: '7v7 playground',
      checked: false
    });

      alert.addInput({
      type: 'radio',
        label: '11v11 playground',
        value: '11v11 playground',
      checked: false
    });

    alert.addButton({
      text: 'Cancel',
      handler: data => {
        this.testRadioResult='';
        this.data_capacity2 ='';
      }
    });
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
    if (this.testRadioResult == 'Indoors') {
      this.data_type = 0;
      this.data_type2 = 'Indoors';
    }
    if (this.testRadioResult == 'Natural turf') {
      this.data_type = 1;
      this.data_type2 = 'Natural turf';
    }
    if (this.testRadioResult == 'Artificial turf') {
      this.data_type = 2;
      this.data_type2 = 'Artificial turf';
    }
  }
  //=====================================
  SelectType() {
    this.data_type2 ='Indoors'
    let alert = this.alertCtrl.create();
    alert.setTitle('Select pitch type');

    alert.addInput({
      type: 'radio',
      label: 'Indoors',
      value: 'Indoors',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Natural turf',
      value: 'Natural turf',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Artificial turf',
      value: 'Artificial turf',
      checked: false
    });

    alert.addButton({
      text: 'Cancel',
      handler: data => {
        this.testRadioResult='';
        this.data_type2 ='';
      }
    });
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
        //Saving user info in provider so we can access it in any time in any ther component 

      }
      else {
        this.showAlert('Failed to get clubid');

      }

    })
    console.log(this.data_clubid);
  }
}

