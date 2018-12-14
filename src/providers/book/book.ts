import { Injectable } from '@angular/core';
import { LocalhostProvider } from "../localhost/localhost";
import { HttpClient, HttpHeaders } from '@angular/common/http';
/*
  Generated class for the BookProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookProvider {

  constructor(public http: HttpClient,
    public localhostProvider: LocalhostProvider) {
    console.log('Hello BookProvider Provider');
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
  getbooked(date,cid,pid) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/Book/" + date +"/"+cid+"/"+pid,
      { headers: header });
  }
  getPitches(id) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/Book/getPitches/" + id,
      { headers: header });
  }
  getClubs(city:string) {
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
}
