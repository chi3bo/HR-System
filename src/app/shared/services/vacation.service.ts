import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VacationService {

  constructor(private _HttpClient: HttpClient) { }



  setHeadrs(): any {
    return { headers: { 'Authorization': localStorage.getItem('userToken') } }
  }


  basicvacationData(): Observable<any> {
    return this._HttpClient.get('https://hrapp.runasp.net/Api/Employee/GetBasicVacationInfo',  this.setHeadrs())
  }

  getAllvacations(): Observable<any> {
    return this._HttpClient.get('https://hrapp.runasp.net/Api/Employee/GetEmployeeVacations',  this.setHeadrs())
  }

  requestvacation(body:any): Observable<any> {
    return this._HttpClient.post('https://hrapp.runasp.net/Api/Employee/RequestVacation', body, this.setHeadrs())
  }
}
