import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { empFullDetails } from '../interfaces/dashboard';


@Injectable({
  providedIn: 'root'
})
export class UpdateDataService {

  constructor(private _HttpClient: HttpClient, private _Router: Router , private _FormBuilder: FormBuilder) { }
  employeeData:BehaviorSubject<empFullDetails> = new BehaviorSubject({} as empFullDetails)


  // searchingForm: FormGroup = this._FormBuilder.group({
  //   searchInput: [null]
  // })

  setHeadrs(): any {
    return { headers: { 'Authorization': localStorage.getItem('userToken') } }
  }

  searchEmployee(searchKey: string): Observable<any> {
    return this._HttpClient.get(`https://hrapp.runasp.net/Api/Employee/GetSearch?searchKey=${searchKey}`, this.setHeadrs())
  }

  getEmpFullData(id: any): Observable<any> {
    return this._HttpClient.post(`https://hrapp.runasp.net/Api/Dashboard/GetEmployeeTreeById?employeeId=${id}`,'', this.setHeadrs())
  }

  getAllGroubOf(groubName: string): Observable<any> {
    return this._HttpClient.post(`https://hrapp.runasp.net/Api/${groubName}/GetAll`, '', this.setHeadrs())
  }

}
