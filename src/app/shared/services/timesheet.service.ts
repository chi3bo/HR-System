import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor(private _HttpClient: HttpClient, private _Router: Router) { }

  setHeadrs(): any {
    return { headers: { 'Authorization': localStorage.getItem('userToken') } }
  }

  getBasicData(): Observable<any> {
    return this._HttpClient.get('https://hrapp.runasp.net/Api/Employee/GetBasicAdvancePaymentInfo', this.setHeadrs())
  }


  sendData(body: any): Observable<any> {
    return this._HttpClient.post('https://hrapp.runasp.net/Api/EmployeeAttendance/InsertEmployeeAttendance', body, this.setHeadrs())
  }

  getData(body: any): Observable<any> {
    return this._HttpClient.post('https://hrapp.runasp.net/Api/EmployeeAttendance/GetEmployeeAttendance', body, this.setHeadrs())
  }


}
