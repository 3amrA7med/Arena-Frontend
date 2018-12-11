import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalhostProvider } from "../localhost/localhost";

/*
  Generated class for the PlayerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlayerProvider {

  constructor(public http: HttpClient,
    public localhostProvider: LocalhostProvider) {
    console.log('Hello PlayerProvider Provider');
  }

  getPlayerAcademy(username)
  {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');
    let params = new HttpParams();
    params.set('username', username)

    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/GetMyAcademy/"+username,
      { headers: header, params: params });


  }
  academyUnsubscribe(username)
  {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');
    let params = new HttpParams();
    params.set('username', username)

    return this.http.post(this.localhostProvider.localhost+"api/DB/UnsubscribeAcademy",JSON.stringify({'username':username,
    }),{headers:header});
  }
  getPlayerPastReservations(username)
  {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');
    let params = new HttpParams();
    params.set('username', username)

    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/GetPastReservations/"+username,
      { headers: header, params: params });
  }
  getPlayerPastEvents(username)
  {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');
    let params = new HttpParams();
    params.set('username', username)

    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/GetPastEvents/"+username,
      { headers: header, params: params });
  }


}
