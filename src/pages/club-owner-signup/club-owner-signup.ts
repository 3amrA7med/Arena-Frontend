import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountProvider } from "../../providers/account/account";
import { HomePage} from '../home/home';
import { AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ClubownerPage } from '../clubowner/clubowner';


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
  data_officeHours:string;
  data_clubName:string;
  data_clubCity:string;
  data_clubStreet:string;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public accountProvider:AccountProvider,
     public alertCtrl:AlertController,
     public dataProvider:DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClubOwnerSignupPage');
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
      phone:new FormControl('',[Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(10), Validators.maxLength(10)]),
      clubName:new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      clubCity:new FormControl('',[Validators.required, Validators.minLength(3),Validators.maxLength(15)]),
      clubStreet:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
      officeHours:new FormControl('',[Validators.minLength(3),Validators.maxLength(100)]),
    });
  }


  //when click on sign up function
  save(){

    this.accountProvider.owner_signup(this.data_username,this.data_password
      ,this.data_fname,this.data_lname,this.data_email,this.data_phone,this.data_officeHours,
      this.data_clubName,this.data_clubCity,this.data_clubStreet).subscribe(data =>{
      if(data){
         //TODO sent an confirmation email
         this.dataProvider.set_user(data[0]); 
         //Saving user info in provider so we can access it in any time in any ther component 
         this.navCtrl.push(ClubownerPage); // Adding Owner main screen here
      }
      else{
        this.showAlert('Username is taken or already existing E-mail');
      }

    })
  }
  showAlert(msg:any) {
    const alert = this.alertCtrl.create({
      title: 'Sign up failed !',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
