import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActiveProvider } from "../../providers/active/active";
import { DataProvider } from "../../providers/data/data";
import { PlayerProvider } from '../../providers/player/player';
import { AlertController } from 'ionic-angular';
import { PlayerProfilePage } from '../player-profile/player-profile';
/**
 * Generated class for the ReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html',
})
export class ReviewsPage {
username : string;
clubs: Array<any>;
revSum:any;
count:any;
rate:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public activeProvider : ActiveProvider,
    public dataprovider : DataProvider,
    public playerProvider:PlayerProvider,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewsPage');
    this.activeProvider.set_component('reviews');
    let user = this.dataprovider.get_user();
    this.username=user.firstName;
    this.getclubs();
    this.revSum=0;
    this.count=0;
  }
  getclubs()
  {
    this.playerProvider.getRevClubs(this.dataprovider.get_user().userName).subscribe (data => {
      if (data)
      {
        this.clubs=data;
      }
    })
  }
  showAlert(item) {
    this.getRevSum(item.clubId);
 
    const alert = this.alertCtrl.create({
      title: item.name,
      subTitle: 'Rate This Club',
      cssClass: 'alertstar',
      enableBackdropDismiss:true,
      buttons: [
           { text: '1', handler: data => { this.resolveRec(1,item);}},
           { text: '2', handler: data => { this.resolveRec(2,item);}},
           { text: '3', handler: data => { this.resolveRec(3,item);}},
           { text: '4', handler: data => { this.resolveRec(4,item);}},
           { text: '5', handler: data => { this.resolveRec(5,item);}}
      ]
 });
 alert.present();
  }

  resolveRec(x,item)
  {
    this.revSum=this.revSum+x;
    //console.log(item.clubId);
    
    this.playerProvider.getRevCount(item.clubId).subscribe (data => {
      if(data)
      {
        this.count=data[0].reviewCount;
        console.log(this.count);
        this.count= this.count + 1;
        console.log(this.count);
        this.rate=parseFloat(this.revSum) / parseFloat(this.count);
        console.log(this.rate)
        this.playerProvider.addrev(x,this.dataprovider.get_user().userName,item.clubId).subscribe()
        this.playerProvider.updateRate(this.rate,this.count,item.clubId).subscribe()
        this.navCtrl.push(PlayerProfilePage)
      }
    })
    


  }
  getRevSum(id)
  {
    this.playerProvider.getRevSum(id).subscribe (data => {
      if(data)
      {
      //  console.log('ionViewDidLoad');
        this.revSum=data;
      }
      //console.log(this.revSum);
    })
  }

}
