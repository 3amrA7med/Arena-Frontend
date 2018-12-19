import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

            // localStorage.setItem('User', JSON.stringify(data))
          // this.userPr
         
*/
@Injectable()
export class DataProvider {
public user:any;
  public id: any;
  constructor(public http: HttpClient) {
 
  }

  public set_user(user){
    this.user=user;
  }
  public get_user(){
    return this.user;
  }

  public set_id(id) {
    this.id = id;
  }
  public get_id() {
    return this.id;
  }

}
