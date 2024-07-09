import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _HttpClient: HttpClient, private _Router: Router) { }

  setHeadrs(): any {
    return { headers: { 'Authorization': localStorage.getItem('userToken') } }
  }


  getAllDataSmall(body: any = {}): Observable<any> {
    return this._HttpClient.post('https://hrapp.runasp.net/Api/Dashboard/GetEmployeesTree', body, this.setHeadrs())
  }

  getEmpFullData(id: any): Observable<any> {
    return this._HttpClient.post(`https://hrapp.runasp.net/Api/Dashboard/GetEmployeeTreeById?employeeId=${id}`,'', this.setHeadrs())
  }


  getAllManages(): Observable<any> {
    return this._HttpClient.post('https://hrapp.runasp.net/Api/Manage/GetAllManage', '', this.setHeadrs())
  }

  getAllGroubOf(groubName: string): Observable<any> {
    return this._HttpClient.post(`https://hrapp.runasp.net/Api/${groubName}/GetAll`, '', this.setHeadrs())
  }

  getOneGroup(groubName: string, groubID: String): Observable<any> {
    return this._HttpClient.post(`https://hrapp.runasp.net/Api/${groubName}/GetById?id=${groubID}`, '', this.setHeadrs())
  }



  // ======== !!!!! not ready !!!!! =========
  getEmpData(body: any = ''): Observable<any> {
    return this._HttpClient.post('', body, this.setHeadrs())
  }



}
