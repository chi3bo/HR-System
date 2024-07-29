import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskDetails } from 'src/app/shared/interfaces/task';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-admin-work-task',
  templateUrl: './admin-work-task.component.html',
  styleUrls: ['./admin-work-task.component.css']
})
export class AdminWorkTaskComponent implements OnInit {
  constructor(private _FormBuilder: FormBuilder, private _router: Router, private _TaskService: TaskService) { }
  todayDate: any = new Date().toISOString().split('T')[0]
  nameAr: any = localStorage.getItem('employeeNameAR')
  nameEN: any = localStorage.getItem('employeeNameEN')
  empId: any = ''

  taskList: TaskDetails[] = []
  showTaskDetails: boolean = true

  oneTask: TaskDetails = {} as TaskDetails
  visasArray: any[] = []


  confirmationForm: FormGroup = this._FormBuilder.group({
    readAllDetails: [null, Validators.requiredTrue],
    addDetails: [null],
    aprovmentResponse: [null, Validators.required]
  })


  ngOnInit(): void {
    this.getAlldata()
  }

  getAlldata() {
    this._TaskService.getAdminRequests().subscribe({
      next: (data) => {
        console.log(data);
        this.taskList = data.requestJobMissions
      },
      error: (err) => {
        console.log(err);
      }

    })
  }

  getOneTask(item: TaskDetails) {
    console.log(item);
    this.oneTask = item
    this.oneTask.visas ? this.visasArray = this.oneTask.visas.split(',') : ''
    // make true to hide and show 
  }

  taskDetailsHideShow() {
    this.showTaskDetails = !this.showTaskDetails
  }

  respondToMission(data: any) {
    if (this.confirmationForm.valid) {
      // logic to confirm even it's agree or reject
      this._TaskService.sendResponse(data).subscribe({
        next: (Response) => {
          console.log(Response);

        },
        error: (err) => {
          console.log(err);

        }
      })
    }
    else {
      // error with inputs validation
      this.confirmationForm.markAllAsTouched()
    }
  }
}