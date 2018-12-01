import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountProvider } from "../../providers/account/account";
import { HomePage} from '../home/home';
import { AlertController } from 'ionic-angular';
import { PlayerSignupPage } from '../player-signup/player-signup';
/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  //VARIABLES
  username: string;
  password: string;
  testRadioResult: any;
  testRadioOpen: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public accountProvider: AccountProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }
  signIn() {
    if (this.validate()) {
      console.log('inside signin()')          
      this.accountProvider.signin(this.username, this.password).subscribe(data => {
        console.log(data)
        console.log("jimy.....")
        if (data) {
          
          // console.log((<any>data).length)
          console.log('Account found')
         
          this.navCtrl.push(HomePage);
          
        }
        else {
          console.log('Account not found');
          this.showAlert('Account not found ,Please retry.');
        }
      });
    }
      else {
        this.showAlert('Fill in username and password.');
        
      }

      
    }
    showAlert(msg:any) {
      const alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: msg,
        buttons: ['OK']
      });
      alert.present();
    }
    validate(){
      if (!this.username) {
        return false;
      }
      else if (!this.password) {
        return false;
      }
      return true;
    }

    register(){
      if(this.testRadioResult=='player')
        this.navCtrl.push(PlayerSignupPage); 
      
      if(this.testRadioResult=='club_owner')
        this.navCtrl.push(HomePage);
    }
    showRadio() {
      let alert = this.alertCtrl.create();
      alert.setTitle('Sign up as player or club owner');
  
      alert.addInput({
        type: 'radio',
        label: 'Player',
        value: 'player',
        checked: true
      });
  
      alert.addInput({
        type: 'radio',
        label: 'Club Owner',
        value: 'club_owner',
        checked: false
      });

      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: data => {
          this.testRadioOpen = false;
          this.testRadioResult = data;
          this.register();
        }
      });
      alert.present();
    }
  }


  


