import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalhostProvider } from "../localhost/localhost";
/*
  Generated class for the AccountProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  //192.168.1.5:8710/
*/
@Injectable()
export class AccountProvider {
  //localhost:string="http://localhost:8719/";


  constructor(public http: HttpClient,
  public localhostProvider:LocalhostProvider) {
    console.log('Hello AccountProvider Provider');
  }
/**
 *
 */
  signin(username,password){
     let header = new HttpHeaders();
     header.set('Access-Control-Allow-Origin', '*');
     header.set('withcredentials', 'true');
     
    console.log("Inside sign in ",this.localhostProvider.localhost+"api/DB")
   return this.http.post(this.localhostProvider.localhost+"api/DB",JSON.stringify(
   {'username':username,'password':password}), {headers:header});
  }
}
