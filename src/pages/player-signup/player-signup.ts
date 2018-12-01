import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the PlayerSignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player-signup',
  templateUrl: 'player-signup.html',
})
export class PlayerSignupPage {

  data_username: string;
  data_password: string;
  data_fname: string;
  data_lname: string;
  data_email: string;
  data_bdate: Date;
  data_phone: number;
  data_visa: number;
  signupform: FormGroup;
  //userData = { "username": "", "password": "", "email": "", "name": "" };
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerSignupPage');
  }


  ngOnInit() {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signupform = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z][0-9]*'), Validators.minLength(3), Validators.maxLength(25)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(45)]),
      name: new FormControl('', [Validators.required, Validators.pattern('^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$'), Validators.minLength(3), Validators.maxLength(25)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      lname: new FormControl('',[Validators.required, Validators.pattern('^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$'), Validators.minLength(3), Validators.maxLength(25)]),
      visa: new FormControl('',[Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(16), Validators.maxLength(16)]),
      phone:new FormControl('',[Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(11), Validators.maxLength(11)]),
      bdate:new FormControl('',[Validators.required]),
    });
  }


  save(){
    console.log(this.signupform.valid)
  }

}
