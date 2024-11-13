import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private _HttpClient: HttpClient , private _Router:Router) { }



  setHeadrs(): any {
    return { headers: { 'Authorization': localStorage.getItem('userToken') } }
  }


  basicLoanData(): Observable<any> {
    if (localStorage.getItem('userToken') == null ){
      this._Router.navigate(['login'])
    }
    return this._HttpClient.get('https://hrapp.runasp.net/Api/Employee/GetBasicAdvancePaymentInfo')
  }

  getAllLoan(): Observable<any> {
    return this._HttpClient.get('https://hrapp.runasp.net/Api/Employee/GetEmployeeAdvancePayments')
  }

  requestLoan(body:any): Observable<any> {
    return this._HttpClient.post('https://hrapp.runasp.net/Api/Employee/RequestAdvancePayment', body)
  }

}
