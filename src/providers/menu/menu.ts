import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { MyApp } from '../../app/app';
/*
  Generated class for the MenuProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MenuProvider {


  test(){}
  constructor(public http: HttpClient) {
    console.log('Hello MenuProvider Provider');
    console.log("ay 7aga");
  }

}
