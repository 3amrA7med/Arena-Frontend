import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActiveProvider } from "../../providers/active/active";
import { OwnerProvider } from "../../providers/owner/owner";
import { DataProvider } from "../../providers/data/data";


/**
 * Generated class for the ClubOwnerStatisticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-club-owner-statistics',
  templateUrl: 'club-owner-statistics.html',
})
export class ClubOwnerStatisticsPage {
  table1: any[] = [];
  table2: any[] = [];
  cid: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public activeProvider: ActiveProvider,
    public ownerProvider: OwnerProvider,
    public dataProvider: DataProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClubOwnerStatisticsPage');
    let id = this.dataProvider.get_id();
    this.cid = id.id;
    this.ownerProvider.getHourStats(this.cid).subscribe(data => {
      for (let d of data) this.table1.push({ hour: d['hour'], num: d['num'] })
    })
    this.ownerProvider.getPitchStats(this.cid).subscribe(data => {
      console.log(data);
      for (let d of data) this.table2.push({ pitchno: d['pitchno'], num: d['num'] })
    })
  }

}
