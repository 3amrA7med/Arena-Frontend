import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActiveProvider } from "../../providers/active/active";
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

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public activeProvider : ActiveProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewsPage');
    this.activeProvider.set_component('reviews');
  }

}
