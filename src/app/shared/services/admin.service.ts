import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) { }

  setHeadrs(): any {
    return { headers: { 'Authorization': localStorage.getItem('userToken') } }
  }


  getAllRequestLoan(userId: any = ''): Observable<any> {
    return this._HttpClient.get(`https://hrapp.runasp.net/Api/Admin/GetPindingAdvancePayments?Search=${userId}`)
  }

  getAllRequestVacation(userId: any = ''): Observable<any> {
    return this._HttpClient.get(`https://hrapp.runasp.net/Api/Admin/GetPindingRequestVacations?Search=${userId}`)
  }

  getAllAssets(userId: any = ''): Observable<any> {
    return this._HttpClient.get(`https://hrapp.runasp.net/Api/Admin/GetPindingRequestCustodies?Search=${userId}`)
  }
  getAllLetters(userId: any = ''): Observable<any> {
    return this._HttpClient.get(`https://hrapp.runasp.net/Api/Admin/GetPindingRequestLetters?Search=${userId}`)
  }
  getAllPermissions(userId: any = ''): Observable<any> {
    return this._HttpClient.get(`https://hrapp.runasp.net/Api/Admin/GetPindingRequestPermissions?Search=${userId}`)
  }

  LoanAction(orderId: number, Action: boolean): Observable<any> {
    return this._HttpClient.post(`https://hrapp.runasp.net/Api/Admin/DecisionOfAdvancePayment`,
      {
        "id": orderId,
        "accepted": Action
      },
      )
  }

  vacationAction(orderId: number, action: boolean, details: string): Observable<any> {
    return this._HttpClient.post(`https://hrapp.runasp.net/Api/Admin/DecisionOfVacation`,
      {
        id: orderId,
        accepted: action,
        note: details
      }
    )
  }

  AssetsAction(orderId: number, action: boolean, details: string): Observable<any> {
    return this._HttpClient.post(`https://hrapp.runasp.net/Api/Admin/DecisionOfCustody`,
      {
        id: orderId,
        accepted: action,
        note: details
      }
    )
  }

  LettersAction(orderId: number, action: boolean, details: string): Observable<any> {
    return this._HttpClient.post(`https://hrapp.runasp.net/Api/Admin/DecisionOfLetter`,
      {
        id: orderId,
        accepted: action,
        note: details
      }
    )
  }

  PermissionsAction(orderId: number, action: boolean, details: string): Observable<any> {
    return this._HttpClient.post(`https://hrapp.runasp.net/Api/Admin/DecisionOfPermission`,
      {
        id: orderId,
        accepted: action,
        note: details
      }
    )
  }

}
