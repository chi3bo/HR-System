import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControlOptions, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.css']
})
export class TimeSheetComponent {
  constructor(private _FormBuilder: FormBuilder) { }
  tiemSheet: FormGroup = this._FormBuilder.group({
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
    lessons: this._FormBuilder.array([])
  }, { validators: [this.isAbssent] } as FormControlOptions)


  get lessons() {
    return this.tiemSheet.controls['lessons'] as FormArray
  }

  adding() {
    const x = this._FormBuilder.group({
      id: [9999],
      img: [null],
      name: ['haaaaaamed'],
      date: [null],
      time1: [null],
      time2: [null],
      early: [null],
      late: [null],
      workingTime: [null],
      project: [null],
      abbsent: [null],
    })
    this.lessons.push(x)
  }





  ngOnInit(): void {
  }


  myData: any[] = [
    {
      id: 1,
      img: "./assets/images/person1.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      total1: '$ 0,00 ',
      total2: '$ 0,00 '
    },
    {
      id: 1,
      img: "./assets/images/person2.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      total1: '$ 0,00 ',
      total2: '$ 0,00 '
    },
    {
      id: 1,
      img: "./assets/images/person3.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      total1: '$ 0,00 ',
      total2: '$ 0,00 '
    },
    {
      id: 1,
      img: "./assets/images/person4.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      total1: '$ 0,00 ',
      total2: '$ 0,00 '
    },
    {
      id: 1,
      img: "./assets/images/person5.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      total1: '$ 0,00 ',
      total2: '$ 0,00 '
    },
    {
      id: 1,
      img: "./assets/images/person1.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      total1: '$ 0,00 ',
      total2: '$ 0,00 '
    },
    {
      id: 1,
      img: "./assets/images/person2.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      total1: '$ 0,00 ',
      total2: '$ 0,00 '
    },
    {
      id: 1,
      img: "./assets/images/person3.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      total1: '$ 0,00 ',
      total2: '$ 0,00 '
    },
    {
      id: 1,
      img: "./assets/images/person4.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      total1: '$ 0,00 ',
      total2: '$ 0,00 '
    },
    {
      id: 1,
      img: "./assets/images/person4.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      total1: '$ 0,00 ',
      total2: '$ 0,00 '
    },
    {
      id: 1,
      img: "./assets/images/person4.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      total1: '$ 0,00 ',
      total2: '$ 0,00 '
    },
    {
      id: 1,
      img: "./assets/images/person4.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      total1: '$ 0,00 ',
      total2: '$ 0,00 '
    },
    {
      id: 1,
      img: "./assets/images/person4.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      total1: '$ 0,00 ',
      total2: '$ 0,00 '
    },
    {
      id: 1,
      img: "./assets/images/person4.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      total1: '$ 0,00 ',
      total2: '$ 0,00 '
    },
    {
      id: 1,
      img: "./assets/images/person4.jpg",
      name: 'ahmed sayed',
      date: '25-6-2024',
      time1: '03:00 hrs',
      time2: '03:00 hrs',
      time3: '00:00 hrs',
      time4: '00:00 hrs',
      total1: '$ 0,00 ',
      total2: '$ 0,00 '
    },
  ]

  display() {
    console.log(this.tiemSheet);

  }

  isAbssent(myForm: FormGroup) {
    if (myForm.get('abbsent')?.value == true) {
      myForm.setErrors({ heabsent: true })
    }
  }//لسة مخلتصش المفروض نروح نطبقها هناك

  setNewRow() {
    let newRow = {
      id: this.tiemSheet.get('id')?.value,
      img: './assets/images/person2.jpg',
      name: this.tiemSheet.get('name')?.value,
      date: this.tiemSheet.get('date')?.value,
      time1: this.tiemSheet.get('time1')?.value + 'hrs',
      time2: this.tiemSheet.get('time2')?.value + 'hrs',
      time3: this.tiemSheet.get('time3')?.value + 'hrs',
      time4: this.tiemSheet.get('time4')?.value + 'hrs',
      total1: '$ ' + this.tiemSheet.get('total1')?.value + ',00',
      total2: '$ ' + this.tiemSheet.get('total2')?.value + ',00',
    }
    this.myData.push(newRow)
    this.tiemSheet.reset('null')
  }
}
