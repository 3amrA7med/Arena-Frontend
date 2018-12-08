import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalhostProvider } from "../localhost/localhost";
/*
  Generated class for the OwnerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OwnerProvider {

  constructor(public http: HttpClient,
    public localhostProvider: LocalhostProvider) {
    console.log('Hello OwnerProvider Provider');
  }


  getEvents(username, date) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');
    let params = new HttpParams();
    params.set('username', username)
    params.set('date', date)
    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/GetEvents/"+username+"/"+date,
      { headers: header, params: params });

  }

  getReservations(username,date){
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/GetReservations/"+username+"/"+date,
    { headers: header});
  }

  getMaint(username,date){
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/GetMaint/"+username+"/"+date,
    { headers: header});

  }
}
