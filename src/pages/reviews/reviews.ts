import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActiveProvider } from "../../providers/active/active";
import { DataProvider } from "../../providers/data/data";
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
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public activeProvider : ActiveProvider,
    public dataprovider : DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewsPage');
    this.activeProvider.set_component('reviews');
    let user = this.dataprovider.get_user();
    this.username=user.firstName;
  }

}
