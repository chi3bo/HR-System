import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _HttpClient: HttpClient, private _Router: Router) { }

  
  setHeadrs(): any {
    return { headers: { 'Authorization': localStorage.getItem('userToken') } }
  }

  getBasicData(): Observable<any> {
    return this._HttpClient.get('https://hrapp.runasp.net/Api/Employee/GetBasicAdvancePaymentInfo', this.setHeadrs())
  }


}
