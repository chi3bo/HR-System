import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlOptions, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.css']
})
export class TimeSheetComponent {
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

}






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