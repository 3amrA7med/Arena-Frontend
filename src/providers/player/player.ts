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
  academyUnsubscribe(username,password)
  {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.post(this.localhostProvider.localhost+"api/DB/UnsubscribeAcademy",JSON.stringify({'username':username,'password':password
    }),{headers:header});
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
  getCities() {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/Book/getCity",
      { headers: header });
  }
  getRevClubs(username) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/Rev/getClubs/"+ username,
      { headers: header });
  }
  getRevSum(id)
  {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/Rev/getSum/"+ id,
      { headers: header });
  }
  addrev(x,username,clubid)
  {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.post(this.localhostProvider.localhost+"api/DB/Rev/addRev",JSON.stringify({'rate':x,'username':username,'id':clubid,
    }),{headers:header});
  }
  getRevCount(id)
  {
    //console.log('get count called');
   // console.log(id);
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/Rev/getCount/"+ id,
      { headers: header });
  }
  updateRate(a,b,clubid)
  {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');
    console.log(a);
    return this.http.post(this.localhostProvider.localhost+"api/DB/Rev/updateRev",JSON.stringify({'count':b,'rating':a,'id':clubid,
    }),{headers:header});
  }



}
