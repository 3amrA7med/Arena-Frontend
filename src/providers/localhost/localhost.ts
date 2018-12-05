import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LocalhostProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  http://localhost:8719/
  http://792be99d.ngrok.io/
*/
@Injectable()
export class LocalhostProvider {
  localhost:string=" http://localhost:8719/";

  constructor(public http: HttpClient) {
    console.log('Hello LocalhostProvider Provider');
  }

}
