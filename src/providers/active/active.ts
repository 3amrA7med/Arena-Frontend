import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ActiveProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ActiveProvider {

  component_name = 'signup';
  constructor(public http: HttpClient) {
  }

  set_component(name){
    this.component_name = name;
  }

  get_component(){
    return this.component_name;
  }

}
