import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountProvider } from "../../providers/account/account";
import { ActiveProvider } from "../../providers/active/active";
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ClubownerPage } from '../clubowner/clubowner';
import { OwnerProvider } from '../../providers/owner/owner';


/**
 * Generated class for the ClubOwnerSignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-club-owner-signup',
  templateUrl: 'club-owner-signup.html',
})
export class ClubOwnerSignupPage {
  signupform: FormGroup;
  data_username: string;
  data_password: string;
  data_fname: string;
  data_lname: string;
  data_email: string;
  data_phone: number;
  data_officeHours: string;
  data_clubName: string;
  data_clubCity: string;
  data_clubStreet: string;
  currentDate;
  data_clubid:any;
  data_creation_date: Date;
  data_price: Float32Array;
  data_capacity: number;
  data_capacity2: string;
  data_type: number;
  data_type2: string;
  testRadioResult: any;
  testRadioOpen: boolean;
  index: number;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public accountProvider: AccountProvider,
    public alertCtrl: AlertController,
    public dataProvider: DataProvider,
    public activeProvider: ActiveProvider,
    public ownerProvider:OwnerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClubOwnerSignupPage');
    this.currentDate = new Date().toISOString();
    this.activeProvider.set_component('signup')
  }

  ngOnInit() {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signupform = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9_]+$'), Validators.minLength(3), Validators.maxLength(25)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(45)]),
      name: new FormControl('', [Validators.required, Validators.pattern('^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$'),
      Validators.minLength(3), Validators.maxLength(25)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      lname: new FormControl('', [Validators.required, Validators.pattern('^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$'),
      Validators.minLength(3), Validators.maxLength(25)]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(10), Validators.maxLength(10)]),
      clubName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      clubCity: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      clubStreet: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      officeHours: new FormControl('', [Validators.minLength(3), Validators.maxLength(100)]),
      price: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(1), Validators.maxLength(20)]),
      creation_date: new FormControl('', [Validators.required]),
      capacity: new FormControl('', [Validators.required,  Validators.minLength(3), Validators.maxLength(25)]),
      type: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    });
  }


  //when click on sign up function
  save() {

    this.accountProvider.owner_signup(this.data_username, this.data_password
      , this.data_fname, this.data_lname, this.data_email, this.data_phone, this.data_officeHours,
      this.data_clubName, this.data_clubCity, this.data_clubStreet).subscribe(data => {
        if (data) {
          //TODO sent an confirmation email
          this.dataProvider.set_user(data[0]);
            console.log(data[0])
           this.ownerProvider.owner_clubid(this.dataProvider.get_user().userName).subscribe(
             IDD=>{
              this.dataProvider.set_id(data[0].id);
              this.data_clubid=this.dataProvider.get_id();
               this.ownerProvider.owner_pitch(this.data_clubid, 1,
                 this.data_creation_date, this.data_price, this.data_capacity, this.data_type).subscribe(
                 data => {
                   console.log(data);
                 })
             
                }
 
            );
          // , this.data_creation_date, this.data_price, this.data_capacity, this.data_type
          //Saving user info in provider so we can access it in any time in any ther component 
          this.navCtrl.setRoot(ClubownerPage); // Adding Owner main screen here
        }
        else {
          console.log(data[0])
         // this.showAlert('Username is taken or already existing E-mail');
        }

      })
  }
  showAlert(msg: any) {
    const alert = this.alertCtrl.create({
      title: 'Sign up failed !',
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
        this.data_capacity2='';
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
  SelectCity() {
    this.data_clubCity='Giza'
    let alert = this.alertCtrl.create();
    alert.setTitle('Select club city');

    alert.addInput({
      type: 'radio',
      label: 'Giza',
      value: 'Giza',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Cairo',
      value: 'Cairo',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Alexandria',
      value: 'Alexandria',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Hurghada',
      value: 'Hurghada',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Faiyum',
      value: 'Faiyum',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Luxor',
      value: 'Luxor',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Aswan',
      value: 'Aswan',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Port Said',
      value: 'Port Said',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Ismailia',
      value: 'Ismailia',
      checked: false
    });
    alert.addButton({
      text: 'Cancel',
      handler: data => {
        this.data_clubCity='';
      }
    });
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.data_clubCity = data;
      }
    });
    alert.present();
  }

}
