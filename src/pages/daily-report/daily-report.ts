import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OwnerProvider } from "../../providers/owner/owner";
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the DailyReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-daily-report',
  templateUrl: 'daily-report.html',
})
export class DailyReportPage {
  maxData: any = '';
  minData: any = '';
  avgData: any = '';
  clubid: any = 0;
  public doughnutChartLabels: string[] = ['income', 'outcome'];
  public doughnutChartData: number[] = [0, 0];
  public doughnutChartType: string = 'doughnut';
  income: any;
  outcome: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ownerProvider: OwnerProvider,
    public dataProvider: DataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyReportPage');
    this.ownerProvider.owner_clubid(this.dataProvider.get_user().userName).subscribe(
      IDD => {
        this.clubid = IDD[0].id;
        console.log("*********************************************00")
        console.log(this.clubid)
        console.log("*********************************************00")

        this.ownerProvider.GetMaxCost(this.clubid).subscribe(
          data => {
            console.log("**************************************")
            console.log(data);
            if (data)
              this.maxData = data[0];

            else {
              this.maxData = '';
              // this.maxData['maxCost'] = 'No Maintenance today';
              //  this.maxData['pitchNum'] = 'No Maintenance today';
            }
          })
        this.ownerProvider.GetMinCost(this.clubid).subscribe(
          data => {
            console.log("**************************************")
            console.log(data);
            if (data)
              this.minData = data[0];
            else {
              this.minData = '';
              //this.minData['maxCost'] = 'No Maintenance today';
              //this.minData['pitchNum'] = 'No Maintenance today';
            }
          })
        this.ownerProvider.GetAvgCost(this.clubid).subscribe(
          data => {
            console.log("**************************************")
            console.log(data);
            if (data)
              this.avgData = data[0];
            else
              this.avgData = '';
            //this.minData['maxCost'] = 'No Maintenance today';            
          })
          this.ownerProvider.GetProfit(this.clubid).subscribe(
            data=>{
              if (data)
              {
                this.income = data[0].income;
                this.doughnutChartData=[];
                this.doughnutChartData.push(this.income);
                this.outcome= data[0].outcome;
                this.doughnutChartData.push(this.outcome);
                console.log(this.doughnutChartData)
              }
            else{
              this.income=0;
              this.outcome=0;
            }
            }
          )
      })
  }
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
