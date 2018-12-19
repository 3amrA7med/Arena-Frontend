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
  getHourStats(cid) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/getHourStats/" + cid ,
      { headers: header });
  }
  getPitchStats(cid) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/getPitchStats/" + cid,
      { headers: header });
  }
  getMaint(username,date){
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.get<any>(this.localhostProvider.localhost + "api/DB/GetMaint/"+username+"/"+date,
    { headers: header});

  }

  deleteEvent(id,username){
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.delete(this.localhostProvider.localhost + "api/DB/DeleteEvent/"+id+"/"+username);
  }

  deleteReservation(date, time,pitch,username){
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.delete(this.localhostProvider.localhost + "api/DB/DeleteReservation/"+pitch+
    "/"+username+ '/'+ date+ "/"+ time);
  }

  deleteMaint(date,time,pitch,username,minutes){
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    return this.http.delete(this.localhostProvider.localhost + "api/DB/DeleteMaint/"+pitch+
    "/"+username+ '/'+ date+ "/"+ time+"/"+minutes);
  }


  owner_maintanance(clubid, pitch_no, cost, description, maintanance_start_date, maintanance_end_date) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');
    return this.http.post(this.localhostProvider.localhost + "api/DB/PostOwnerMaintanance", JSON.stringify({
      'clubid': clubid,
      'pitch_no': pitch_no, 'cost': cost, 'description': description, 'maintanance_start_date': maintanance_start_date,
      'maintanance_end_date': maintanance_end_date
    }), { headers: header });
  }

  owner_pitch(clubid, pitch_no, creation_date, price, capacity, type) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');
    return this.http.post(this.localhostProvider.localhost + "api/DB/PostOwnerPitch", JSON.stringify({
      'clubid': clubid,
      'pitch_no': pitch_no, 'creation_date': creation_date, 'price': price, 'capacity': capacity,
      'type': type
    }), { headers: header });
  }

  owner_viewacademy(clubid) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');
    return this.http.get(this.localhostProvider.localhost + "api/DB/GetOwnerViewAcadamy/" + clubid, { headers: header });
  }

  owner_addacademy(clubid, name, subscription) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');
    return this.http.post(this.localhostProvider.localhost + "api/DB/PostOwnerAddAcadamy", JSON.stringify({
      'clubid': clubid, 'name': name, 'subscription': subscription
    }), { headers: header });
  }

  owner_pitchno(clubid) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');
    return this.http.get(this.localhostProvider.localhost + "api/DB/GetOwnerPitchNumber/" + clubid, { headers: header });
  }

  owner_updateacademy(clubid, subscription) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');
    return this.http.post(this.localhostProvider.localhost + "api/DB/PostOwnerUpdateAcademy", JSON.stringify({
      'clubid': clubid, 'subscription': subscription
    }), { headers: header });
  }

  owner_event(clubid, name, event_start_time, event_end_time, noofteams, noofteammembers, availableplaces, prize, priceperteam) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');

    console.log('ionViewDidLoad PlayerSignupPage');
    return this.http.post(this.localhostProvider.localhost + "api/DB/PostOwnerEvent", JSON.stringify({
      'clubid': clubid,
      'name': name, 'event_start_time': event_start_time, 'event_end_time': event_end_time, 'noofteams': noofteams,
      'noofteammembers': noofteammembers, 'availableplaces': availableplaces, 'prize': prize, 'priceperteam': priceperteam
    }), { headers: header });
  }


  owner_clubid(username) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');
    console.log(username);
    return this.http.get(this.localhostProvider.localhost + "api/DB/GetOwnerClubId/" + username, { headers: header });
  }


}
