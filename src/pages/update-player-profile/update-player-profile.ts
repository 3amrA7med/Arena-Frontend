import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountProvider } from "../../providers/account/account";
import { ActiveProvider } from "../../providers/active/active";
import { HomePage} from '../home/home';
import { AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { PlayerProfilePage } from '../player-profile/player-profile';
/**
 * Generated class for the UpdatePlayerProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-player-profile',
  templateUrl: 'update-player-profile.html',
})
export class UpdatePlayerProfilePage {

  data_username: string;
  data_password: string;
  data_fname: string;
  data_lname: string;
  data_email: string;
  data_bdate: Date;
  data_phone: number;
  data_visa: number;
  signupform: FormGroup;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public accountProvider:AccountProvider,
   public alertCtrl:AlertController,
   public dataProvider:DataProvider,
   public activeProvider: ActiveProvider) {
  }

  ionViewDidLoad() {
    

 
    let user =this.dataProvider.get_user();
          user['visa_number'] = user['visa#'];
  

    this.data_username=user.userName;
    this.data_phone=user.phone;
    this.data_visa=user.visa_number;
    this.data_fname=user.firstName;
    this.data_lname=user.lastName;
    this.data_email=user.email;
    this.data_password=user.password;
    this.data_bdate=user.birthdate;
  }
  ngOnInit() {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signupform = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9_]+$'), Validators.minLength(3), Validators.maxLength(25)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(45)]),
      name: new FormControl('', [Validators.required, Validators.pattern('^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$'), Validators.minLength(3), Validators.maxLength(25)]),
      email: new FormControl('',[Validators.required, Validators.pattern(EMAILPATTERN)]),
      lname: new FormControl('',[Validators.required, Validators.pattern('^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$'), Validators.minLength(3), Validators.maxLength(25)]),
      visa: new FormControl('',[Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(16), Validators.maxLength(16)]),
      phone:new FormControl('',[Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(10), Validators.maxLength(10)]),
      bdate:new FormControl('',[Validators.required]),
    });
  }


  save(){
    
    this.accountProvider.player_update(this.data_username,this.data_password
      ,this.data_fname,this.data_lname,this.data_email,this.data_phone,this.data_visa,
    this.data_bdate).subscribe(data =>{
      if(data){
        this.showAlert('Profile Updated Successfully');
        //TODO sent an confirmation email
        this.dataProvider.set_user(data[0]); 
        //Saving user info in provider so we can access it in any time in any ther component 
        this.navCtrl.push(PlayerProfilePage);
      }
      else{
        this.showAlert2('Already existing E-mail');
      }

    })
  }
  showAlert(msg:any) {
    const alert = this.alertCtrl.create({
      title: 'Update Succeeded !',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
  showAlert2(msg:any) {
    const alert = this.alertCtrl.create({
      title: 'Update Failed !',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }


}
