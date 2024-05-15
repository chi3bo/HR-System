import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/shared/services/loan.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent {
  constructor(private _LoanService: LoanService, private _Router: Router) { }
  employeeName: any = ''
  ngOnInit(): void {
    this._LoanService.basicLoanData().subscribe({
      next: (Response) => {
        this.employeeName = Response.name.split(' ',1)
        
      },

      error: (err) => {
        console.log(err);
        if (err.error.message == 'Unauthorized') {
          localStorage.clear()
          this._Router.navigate(['login'])
        }
      }
    })
  }

}




