import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from'../../providers/data/data';
import { ListPage } from '../../pages/list/list';
import { Nav, Platform } from 'ionic-angular';
// import { MyApp } from '../../app/app.component';
// import { MenuController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  name:string;
  type:string;
  
  

  constructor(public navCtrl: NavController,
  public dataProvider:DataProvider,
  // public menuCtrl:MenuController
 // public myApp:MyApp
  ) {

  }
  // }
  // public enableMenu1(){
  //   this.menuCtrl.enable(true, 'menu1');
  //   this.menuCtrl.enable(false, 'menu2');
  
  // }

  ionViewDidLoad(){
    let user =this.dataProvider.get_user() 
    this.name=user.firstName;
    this.type=this.dataProvider.get_user().type; 
   // this.myApp.enableMenu1();
  }


}
