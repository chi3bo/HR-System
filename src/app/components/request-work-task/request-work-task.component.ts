import { Component } from '@angular/core';
import { FormBuilder, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from './../../shared/services/task.service';

@Component({
  selector: 'app-request-work-task',
  templateUrl: './request-work-task.component.html',
  styleUrls: ['./request-work-task.component.css']
})
export class RequestWorkTaskComponent {
  constructor(private _FormBuilder: FormBuilder, private _router: Router , private _TaskService:TaskService) { }
  todayDate: any = new Date().toISOString().split('T')[0]

  taskForm: FormGroup = this._FormBuilder.group({
    isInternal: [null, Validators.required],
    directionName: [null, Validators.required], // جهة مهمة العمل
    taskDuration: [null, Validators.required], // مدة المهمة
    taskType: [null, Validators.required], // نوع المهمة
    startingDate: [null, Validators.required], //  تاريخ البدء
    EndingDate: [null, Validators.required],// تاريخ الانتهاء
    taskDetails: [null, Validators.required],//  تفاصيل المهمة
    TaskLoan: [null],//  سلفة للمهمة
    tickit: [null],//  تذكرة سفر للمهمة
    visa1: [null],// تأشيرة سفر 1
    visa2: [null],// تأشيرة سفر 2
    visa3: [null],// تأشيرة سفر 3
    visa4: [null],// تأشيرة سفر 4
  })

  get directionNameInput (){
    return this.taskForm.get('directionName')
  }
  get taskDurationInput (){
    return this.taskForm.get('taskDuration')
  }
  get taskTypeInput (){
    return this.taskForm.get('taskType')
  }
  get startingDateInput (){
    return this.taskForm.get('startingDate')
  }
  get EndingDateInput (){
    return this.taskForm.get('EndingDate')
  }
  get taskDetailsInput (){
    return this.taskForm.get('taskDetails')
  }

  nameAr: any = localStorage.getItem('employeeNameAR')
  nameEN: any = localStorage.getItem('employeeNameEN')
  empId: any = ''

  page1: boolean = true
  page2: boolean = false
  moreVisa: boolean = false

  
  ngOnInit(): void {
    this._TaskService.getBasicData().subscribe({
      next: (Response) => {
        this.nameAr = Response.nameAr
        this.nameEN = Response.nameEn
        this.empId = Response.empId
        console.log(Response);
      },

      error: (err) => {
        console.log(err);
        if (err.error.message == 'Unauthorized') {
          localStorage.clear()
          this._router.navigate(['login'])
        }
      }
    })
  }


  nextPage() {
    this.page1 = false
    this.page2 = true
  }

  prevPage() {
    this.page2 = false
    this.page1 = true
  }

  addMoreVisa() {
    this.moreVisa = !this.moreVisa
  }


  requestTask(){
    let formStatus= this.taskForm.valid 
    if (formStatus) {
      console.log(' all right done sent ');
    }

    else{
      console.log('error my bro >> check inbuts');
      this.taskForm.markAllAsTouched()
    }
  }

}
