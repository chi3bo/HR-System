import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { adminOrderLoan, loanInterface } from 'src/app/shared/interfaces/response';
import { AdminService } from 'src/app/shared/services/admin.service';
import { LoanService } from 'src/app/shared/services/loan.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private _AdminService: AdminService, private _router: Router) { }

  ordersCount: number = 0
  LoanordersList:adminOrderLoan[] = []

  ngOnInit(): void {
    this._AdminService.getAllRequestLoan().subscribe({
      next: (data) => {
        this.ordersCount = data.count
        this.LoanordersList = data.requestAdvancePayments
        console.log(this.ordersCount);
        console.log(this.LoanordersList);
      },
      error: (err) => {
        console.log(err);
        if (err.error.message == 'Unauthorized') {
          localStorage.clear()
          this._router.navigate(['login'])
        }
      },
    })
  }



}
