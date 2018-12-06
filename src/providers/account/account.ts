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
     
   return this.http.post(this.localhostProvider.localhost+"api/DB",JSON.stringify(
   {'username':username,'password':password}), {headers:header});
  }

  player_signup(username,password,fname,lname,email,phone,visa,bdate){
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');
    
    return this.http.post(this.localhostProvider.localhost+"api/DB/PostPlayer",JSON.stringify({'username':username,
    'password':password,'fname':fname,'lname':lname,'email':email,
    'phone':phone,'visa':visa,'bdate':bdate}),{headers:header});
  }
//======================================================================
  owner_signup(username,password,fname,lname,email,phone,officehours,clubName,clubCity,clubStreet){
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');
    
    return this.http.post(this.localhostProvider.localhost+"api/DB/PostOwner",JSON.stringify({'username':username,
    'password':password,'fname':fname,'lname':lname,'email':email,
    'phone':phone,'officeHours':officehours,'clubName':clubName,'clubCity':clubCity
    ,'clubStreet':clubStreet}),{headers:header});
  }
}
