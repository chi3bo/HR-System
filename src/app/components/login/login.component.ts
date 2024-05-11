import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Response } from 'src/app/shared/interfaces/response';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService, private _Router: Router) { }

  loginForm: FormGroup = this._FormBuilder.group({
    Username: [null, Validators.required],
    Password: [null, Validators.required]
  })

  wrongMsg: boolean = false
  isloading: boolean = false
  myresponse: Response = {} as Response





  setFormData(): FormData {
    let myNewBody: FormData = new FormData()
    myNewBody.append('Username', this.loginForm.get('Username')?.value)
    myNewBody.append('Password', this.loginForm.get('Password')?.value)
    return myNewBody
  }

  setLoging() {
    this.isloading = true
    this._AuthService.login(this.setFormData()).subscribe({
      next: (response) => {
        if (response.accessToken) {
          this.isloading = false
          this.myresponse = response
          localStorage.setItem('userToken', this.myresponse.accessToken )
          localStorage.setItem('employeeName', this.myresponse.employeeInfo.name )
          localStorage.setItem('employeeId', this.myresponse.employeeInfo.empId )
          console.log(this.myresponse);
          
          this._Router.navigate(['home'])
        }
      },

      error: (err) => {
        console.log(err);
        this.wrongMsg = true
        this.isloading = false
      }
    })
  }

  hideErrMsg() {
    this.wrongMsg = false
  }
}
