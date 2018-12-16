import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountProvider } from "../../providers/account/account";
import { OwnerProvider } from "../../providers/owner/owner"
import { AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { FormControl, FormGroup, Validators } from '@angular/forms';


/**
 * Generated class for the ClubOwnerAddacademyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-club-owner-addacademy',
  templateUrl: 'club-owner-addacademy.html',
})
export class ClubOwnerAddacademyPage {

  clubowneraddacademyform: FormGroup;
  data_name: string;
  data_clubid: number;
  data_subscription: Float32Array;
  data_username: string;
  testRadioResult: any;
  testRadioOpen: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public accountProvider: AccountProvider,
    public ownerProvider: OwnerProvider,
    public alertCtrl: AlertController,
    public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClubOwnerAddacademyPage');
    let user = this.dataProvider.get_user()
    this.data_username = user.userName;
    console.log('getting owner club id');
    console.log(this.data_username);
    this.GetOwnwerClubId();
  }


  ngOnInit() {

    this.clubowneraddacademyform = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$'), Validators.minLength(3), Validators.maxLength(25)]),
      subscription: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.minLength(1), Validators.maxLength(20)]),
    });
  }

  save() {
    console.log(this.clubowneraddacademyform.invalid);
    console.log(this.clubowneraddacademyform.valid);

    this.ownerProvider.owner_addacademy(this.data_clubid, this.data_name
      , this.data_subscription).subscribe(data => {
          if (data) {
            this.Inserted('Academy is added successfully');
          }
          else {
            this.showAlert('Failed to add your academy,you already have an academy');
          }

        })
    
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
