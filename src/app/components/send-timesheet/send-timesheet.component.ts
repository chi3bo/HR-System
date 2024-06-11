import { Time } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { TimesheetService } from 'src/app/shared/services/timesheet.service';
import { Router } from '@angular/router';
import { CalcEarlyPipe } from 'src/app/shared/calc-early.pipe';
import { Response } from './../../shared/interfaces/response';

@Component({
  selector: 'app-send-timesheet',
  templateUrl: './send-timesheet.component.html',
  styleUrls: ['./send-timesheet.component.css']
})
export class SendTimesheetComponent {
  constructor(private _FormBuilder: FormBuilder, private _Renderer2: Renderer2, private _TimesheetService: TimesheetService, private _Router: Router) { }


  empName: any = ''
  empId: any = ''
  doneSent:boolean = false

  tiemSheet: FormGroup = this._FormBuilder.group({
    bigFormArray: this._FormBuilder.array([])
  })

  settingSheet: FormGroup = this._FormBuilder.group({
    rowNumbers: [15, Validators.max(30)],
    fixedDate: [false]
  })













  // =========== start customValidator
  startAndLeave(myform: FormGroup) {
    let start = myform.get('start')?.value
    let leave = myform.get('leave')?.value
    if (start >= leave && start && leave) {
      myform.get('leave')?.setErrors({ leaveSmaller: true })
    }
  }

  isAbssent(id: number, status: boolean, parent: HTMLElement) {
    let MyForm = this.bigFormArray.controls[id]
    if (status == true) {
      MyForm.get('start')?.disable()
      MyForm.get('leave')?.disable()
      MyForm.get('earlyByMinute')?.disable()
      MyForm.get('lateByMinute')?.disable()
      MyForm.get('workingTimeByMinute')?.disable()
      MyForm.patchValue({
        workingTimeByMinute: null,
        start: null,
        leave: null,
        earlyByMinute: null,
        lateByMinute: null,
      })

      MyForm.get('absent')?.enable()
    }
    else {
      MyForm.enable()
      MyForm.get('name')?.enable()
    }

  }
  // =========== end customValidator








  get bigFormArray() {
    return this.tiemSheet.get('bigFormArray') as FormArray
  }


  ngOnInit(): void {
    this._TimesheetService.getBasicData().subscribe({
      next: (Response) => {
        this.empName = Response.name
        this.empId = Response.empId
        console.log(Response);
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

  setSetting(number: any, fixedDate: any = null) {
    this.doneSent = false

    for (let i = 0; i < number; i++) {
      let newRow = this._FormBuilder.group({
        employeeId: [null, Validators.required],
        employeeName: [null, Validators.required],
        date: [fixedDate, Validators.required],
        start: [null, Validators.required],
        leave: [null, Validators.required],
        earlyByMinute: [null],
        lateByMinute: [null],
        workingTimeByMinute: [null],
        projectId: [null, Validators.required],
        absent: [false],
      }, { validators: [this.startAndLeave] } as FormControlOptions)
      this.bigFormArray.push(newRow)
    }
    console.log(this.bigFormArray.value);
  }

  prebData() {

    console.log(this.bigFormArray.value);
    return {
      "employeeAttendances": this.bigFormArray.value
    }
  }



  sendData() {
    console.log(this.prebData());

    this._TimesheetService.sendData(this.prebData()).subscribe({
      next: (Response) => {
        console.log(Response);
        if (Response == true) {
          this.bigFormArray.clear()
          this.doneSent = true
        }
      },

      error: (err) => {
        console.log(err);
      }
    })
  }












  // myData: any[] = [
  //   {
  //     id: 1,
  //     img: "./assets/images/person1.jpg",
  //     name: 'ahmed sayed',
  //     date: '25-6-2024',
  //     time1: '03:00 hrs',
  //     time2: '03:00 hrs',
  //     time3: '00:00 hrs',
  //     time4: '00:00 hrs',
  //     total1: '$ 0,00 ',
  //     total2: '$ 0,00 '
  //   },
  //   {
  //     id: 1,
  //     img: "./assets/images/person2.jpg",
  //     name: 'ahmed sayed',
  //     date: '25-6-2024',
  //     time1: '03:00 hrs',
  //     time2: '03:00 hrs',
  //     time3: '00:00 hrs',
  //     time4: '00:00 hrs',
  //     total1: '$ 0,00 ',
  //     total2: '$ 0,00 '
  //   },
  //   {
  //     id: 1,
  //     img: "./assets/images/person3.jpg",
  //     name: 'ahmed sayed',
  //     date: '25-6-2024',
  //     time1: '03:00 hrs',
  //     time2: '03:00 hrs',
  //     time3: '00:00 hrs',
  //     time4: '00:00 hrs',
  //     total1: '$ 0,00 ',
  //     total2: '$ 0,00 '
  //   },
  //   {
  //     id: 1,
  //     img: "./assets/images/person4.jpg",
  //     name: 'ahmed sayed',
  //     date: '25-6-2024',
  //     time1: '03:00 hrs',
  //     time2: '03:00 hrs',
  //     time3: '00:00 hrs',
  //     time4: '00:00 hrs',
  //     total1: '$ 0,00 ',
  //     total2: '$ 0,00 '
  //   },
  //   {
  //     id: 1,
  //     img: "./assets/images/person5.jpg",
  //     name: 'ahmed sayed',
  //     date: '25-6-2024',
  //     time1: '03:00 hrs',
  //     time2: '03:00 hrs',
  //     time3: '00:00 hrs',
  //     time4: '00:00 hrs',
  //     total1: '$ 0,00 ',
  //     total2: '$ 0,00 '
  //   },
  //   {
  //     id: 1,
  //     img: "./assets/images/person1.jpg",
  //     name: 'ahmed sayed',
  //     date: '25-6-2024',
  //     time1: '03:00 hrs',
  //     time2: '03:00 hrs',
  //     time3: '00:00 hrs',
  //     time4: '00:00 hrs',
  //     total1: '$ 0,00 ',
  //     total2: '$ 0,00 '
  //   },
  //   {
  //     id: 1,
  //     img: "./assets/images/person2.jpg",
  //     name: 'ahmed sayed',
  //     date: '25-6-2024',
  //     time1: '03:00 hrs',
  //     time2: '03:00 hrs',
  //     time3: '00:00 hrs',
  //     time4: '00:00 hrs',
  //     total1: '$ 0,00 ',
  //     total2: '$ 0,00 '
  //   },
  //   {
  //     id: 1,
  //     img: "./assets/images/person3.jpg",
  //     name: 'ahmed sayed',
  //     date: '25-6-2024',
  //     time1: '03:00 hrs',
  //     time2: '03:00 hrs',
  //     time3: '00:00 hrs',
  //     time4: '00:00 hrs',
  //     total1: '$ 0,00 ',
  //     total2: '$ 0,00 '
  //   },
  //   {
  //     id: 1,
  //     img: "./assets/images/person4.jpg",
  //     name: 'ahmed sayed',
  //     date: '25-6-2024',
  //     time1: '03:00 hrs',
  //     time2: '03:00 hrs',
  //     time3: '00:00 hrs',
  //     time4: '00:00 hrs',
  //     total1: '$ 0,00 ',
  //     total2: '$ 0,00 '
  //   },
  //   {
  //     id: 1,
  //     img: "./assets/images/person4.jpg",
  //     name: 'ahmed sayed',
  //     date: '25-6-2024',
  //     time1: '03:00 hrs',
  //     time2: '03:00 hrs',
  //     time3: '00:00 hrs',
  //     time4: '00:00 hrs',
  //     total1: '$ 0,00 ',
  //     total2: '$ 0,00 '
  //   },
  //   {
  //     id: 1,
  //     img: "./assets/images/person4.jpg",
  //     name: 'ahmed sayed',
  //     date: '25-6-2024',
  //     time1: '03:00 hrs',
  //     time2: '03:00 hrs',
  //     time3: '00:00 hrs',
  //     time4: '00:00 hrs',
  //     total1: '$ 0,00 ',
  //     total2: '$ 0,00 '
  //   },
  //   {
  //     id: 1,
  //     img: "./assets/images/person4.jpg",
  //     name: 'ahmed sayed',
  //     date: '25-6-2024',
  //     time1: '03:00 hrs',
  //     time2: '03:00 hrs',
  //     time3: '00:00 hrs',
  //     time4: '00:00 hrs',
  //     total1: '$ 0,00 ',
  //     total2: '$ 0,00 '
  //   },
  //   {
  //     id: 1,
  //     img: "./assets/images/person4.jpg",
  //     name: 'ahmed sayed',
  //     date: '25-6-2024',
  //     time1: '03:00 hrs',
  //     time2: '03:00 hrs',
  //     time3: '00:00 hrs',
  //     time4: '00:00 hrs',
  //     total1: '$ 0,00 ',
  //     total2: '$ 0,00 '
  //   },
  //   {
  //     id: 1,
  //     img: "./assets/images/person4.jpg",
  //     name: 'ahmed sayed',
  //     date: '25-6-2024',
  //     time1: '03:00 hrs',
  //     time2: '03:00 hrs',
  //     time3: '00:00 hrs',
  //     time4: '00:00 hrs',
  //     total1: '$ 0,00 ',
  //     total2: '$ 0,00 '
  //   },
  //   {
  //     id: 1,
  //     img: "./assets/images/person4.jpg",
  //     name: 'ahmed sayed',
  //     date: '25-6-2024',
  //     time1: '03:00 hrs',
  //     time2: '03:00 hrs',
  //     time3: '00:00 hrs',
  //     time4: '00:00 hrs',
  //     total1: '$ 0,00 ',
  //     total2: '$ 0,00 '
  //   },
  // ]

}

// شكل الداتا المطلوبة لأرسال التايم شيت في body json
// {
//   "employeeAttendances": [
//     {
//       "employeeId": "string",
//       "employeeName": "string",
//       "date": "2024-06-10",
//       "start": "string",
//       "leave": "string",
//       "earlyByMinute": 0,
//       "lateByMinute": 0,
//       "workingTimeByMinute": 0,
//       "projectId": 0,
//       "absent": true
//     }
//   ]
// }









// getting and display data
  // setNewRow() {
  //   let newRow = {
  //     id: this.tiemSheet.get('id')?.value,
  //     img: './assets/images/person2.jpg',
  //     name: this.tiemSheet.get('name')?.value,
  //     date: this.tiemSheet.get('date')?.value,
  //     time1: this.tiemSheet.get('time1')?.value + 'hrs',
  //     time2: this.tiemSheet.get('time2')?.value + 'hrs',
  //     time3: this.tiemSheet.get('time3')?.value + 'hrs',
  //     time4: this.tiemSheet.get('time4')?.value + 'hrs',
  //     total1: '$ ' + this.tiemSheet.get('total1')?.value + ',00',
  //     total2: '$ ' + this.tiemSheet.get('total2')?.value + ',00',
  //   }
  //   this.myData.push(newRow)
  //   this.tiemSheet.reset('null')
  // }
