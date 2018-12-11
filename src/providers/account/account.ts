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

  owner_pitch(clubid, pitch_no, creation_date, price, capacity,type) {
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
    return this.http.post(this.localhostProvider.localhost + "api/DB/PostOwnerViewAcadamy", JSON.stringify({
      'clubid': clubid
    }), { headers: header });
  }

  owner_addacademy(clubid,name,subscription) {
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
    return this.http.post(this.localhostProvider.localhost + "api/DB/PostOwnerPitchNumber", JSON.stringify({
      'clubid': clubid
    }), { headers: header });
  }
 
  owner_updateacademy(clubid,subscription) {
    let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin', '*');
    header.set('withcredentials', 'true');
    return this.http.post(this.localhostProvider.localhost + "api/DB/PostOwnerUpdateAcademy", JSON.stringify({
      'clubid': clubid, 'subscription': subscription
    }), { headers: header });
  }

  owner_event(clubid, name, event_start_time, event_end_time, noofteams,noofteammembers,availableplaces,prize,priceperteam) {
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
    return this.http.post(this.localhostProvider.localhost + "api/DB/PostOwnerClubId", JSON.stringify({
      'username': username
    }), { headers: header });
  }
}
