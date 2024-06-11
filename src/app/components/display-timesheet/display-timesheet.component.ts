import { Component, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-display-timesheet',
  templateUrl: './display-timesheet.component.html',
  styleUrls: ['./display-timesheet.component.css']
})
export class DisplayTimesheetComponent {
  constructor(private _FormBuilder: FormBuilder, private _Renderer2: Renderer2) { }

  tiemSheet: FormGroup = this._FormBuilder.group({
    bigFormArray: this._FormBuilder.array([])
  })


  // customValidator
  isAbssent(id: number, status: boolean, parent: HTMLElement) {
    let MyForm = this.bigFormArray.controls[id]
    if (status == true) {
      MyForm.disable()
      MyForm.patchValue({
        workingTime: [],
        time1: [null],
        time2: [null],
        early: [null],
        late: [null],
        project: [null],
      })

      MyForm.get('abbsent')?.enable()
    }
    else {
      MyForm.enable()
      MyForm.get('name')?.enable()
    }

  }
  //لسة مخلتصش المفروض نروح نطبقها هناك

  get bigFormArray() {
    return this.tiemSheet.get('bigFormArray') as FormArray
  }


  ngOnInit(): void {
    for (let i = 0; i < 15; i++) {
      let newRow = this._FormBuilder.group({
        id: [null],
        img: [null],
        name: [null],
        date: [null],
        time1: [null],
        time2: [null],
        early: [null],
        late: [null],
        workingTime: [null],
        project: [null],
        abbsent: [null],
      })
      this.bigFormArray.push(newRow)
    }
  }

  addNow() {
    console.log(this.bigFormArray.value);
  }







  myData: any[] = [
    {
      id: 1321,
      img: "./assets/images/person1.jpg",
      name: 'محمود عبدالله سيد حكيم',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      project: 'dammam',
      total2: '$ 0,00 '
    },
    {
      id: 1654,
      img: "./assets/images/person2.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      project: 'jeddah',
      total2: '$ 0,00 '
    },
    {
      id: 9824,
      img: "./assets/images/person3.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      project: 'cairo',
      total2: '$ 0,00 '
    },
    {
      id: 1231,
      img: "./assets/images/person4.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      project: 'paris',
      total2: '$ 0,00 '
    },
    {
      id: 3123,
      img: "./assets/images/person5.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      project: 'mekka',
      total2: '$ 0,00 '
    },
    {
      id: 1783,
      img: "./assets/images/person1.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      project: 'aswan',
      total2: '$ 0,00 '
    },
    {
      id: 4432,
      img: "./assets/images/person2.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      project: 'sheets',
      total2: '$ 0,00 '
    },
    {
      id: 1231,
      img: "./assets/images/person3.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      project: 'ramadan',
      total2: '$ 0,00 '
    },
    {
      id: 1754,
      img: "./assets/images/person4.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      project: 'jeddah',
      total2: '$ 0,00 '
    },
    {
      id: 1441,
      img: "./assets/images/person4.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      project: 'dammam',
      total2: '$ 0,00 '
    },
    {
      id: 1380,
      img: "./assets/images/person4.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      project: 'cairo',
      total2: '$ 0,00 '
    },
    {
      id: 9131,
      img: "./assets/images/person4.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      project: 'cairo',
      total2: '$ 0,00 '
    },
    {
      id: 1464,
      img: "./assets/images/person4.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      project: 'dammam',
      total2: '$ 0,00 '
    },
    {
      id: 8728,
      img: "./assets/images/person4.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      project: 'paris',
      total2: '$ 0,00 '
    },
    {
      id: 4583,
      img: "./assets/images/person4.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      project: 'dammam',
      total2: '$ 0,00 '
    },
  ]

}

// شكل الداتا المطلوبة لجيت داتا تايم شيت ببعتها بودي جيسون
// {
//   "employeeId": "string",
//   "projectId": 0,
//   "fromDate": "2024-06-10T22:22:23.080Z",
//   "toDate": "2024-06-10T22:22:23.080Z"
// }