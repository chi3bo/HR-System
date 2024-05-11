import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient  ) { }

  login( body:any ):Observable<any>{
    return this._HttpClient.post('https://hrapp.runasp.net/Api/Auth/SignIn' , body )
  }
}
