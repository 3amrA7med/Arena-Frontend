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
  academySubscribe(username, cid, aname) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.post(this.localhostProvider.localhost + "api/DB/SubscribeAcademy", JSON.stringify({
      'username': username, 'cid': cid, 'aname': aname
    }), { headers: header });
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
  getAvailableEvents(username,city) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');
    
   

    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/GetAvailableEvents/" + username + "/" + city,
      { headers: header });


  }
  academyUnsubscribe(username,password)
  {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.post(this.localhostProvider.localhost + "api/DB/UnsubscribeAcademy", JSON.stringify({
      'username': username, 'password': password
    }), { headers: header });
  }
  getPlayerPastReservations(username)
  {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/GetPastReservations/"+username,
      { headers: header});
  }
  getPlayerPastEvents(username)
  {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/GetPastEvents/"+username,
      { headers: header});
  }
  getPlayerUpcomingReservations(username)
  {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/GetUpcomingReservations/"+username,
      { headers: header});
  }
  getPlayerUpcomingEvents(username)
  {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/GetUpcomingEvents/"+username,
      { headers: header});
  }

  book(user, selclub, selpitchno, date, date2, paid, unpaid) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');
    return this.http.post(this.localhostProvider.localhost + "api/DB/Book/insertBooking", JSON.stringify({
      'user': user, 'selclub': selclub
      , 'selpitchno': selpitchno, 'date': date, 'date2': date2,
      'paid': paid, 'unpaid': unpaid
    }), { headers: header });
  }
  enroll(cid, eid, username) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');
    return this.http.post(this.localhostProvider.localhost + "api/DB/Enroll", JSON.stringify({
      'username': username,
      'eid': eid, 'cid': cid
    }), { headers: header });

  }
  getbooked(date, cid, pid) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/Book/" + date + "/" + cid + "/" + pid,
      { headers: header });
  }
  getPitches(id) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/Book/getPitches/" + id,
      { headers: header });
  }
  getClubs(city: string) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');
    console.log("we're in" + city);
    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/Book/getClubs/" + city,
      { headers: header });
  }
  getAcadAllClubs() {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');
    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/Book/getAcadAllClubs",
      { headers: header });
  }

  getCities() {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/Book/getCity",
      { headers: header });
  }
}
