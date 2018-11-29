import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountProvider } from "../../providers/account/account";
import { HomePage} from '../home/home';
import { AlertController } from 'ionic-angular';
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
      this.navCtrl.push(HomePage);//replace with signup page 
    }
  }


