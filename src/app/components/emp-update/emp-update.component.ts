import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, Event } from '@angular/router';
import { debounceTime } from 'rxjs';
import { empFullDetails } from 'src/app/shared/interfaces/dashboard';
import { oneEmployee } from 'src/app/shared/interfaces/update-data';
import { UpdateDataService } from 'src/app/shared/services/update-data.service';

@Component({
  selector: 'app-emp-update',
  templateUrl: './emp-update.component.html',
  styleUrls: ['./emp-update.component.css']
})
export class EmpUpdateComponent implements OnInit {
  constructor(private _FormBuilder: FormBuilder, private _UpdateDataService: UpdateDataService, private _Router: Router) { }

  searchingForm: FormGroup = this._FormBuilder.group({
    searchInput: [null]
  })

  employeeData: FormGroup = this._FormBuilder.group({
    empName: [{ value: null, disabled: true }],
    empJob: [{ value: null, disabled: true }],
    empCompany: [{ value: null, disabled: true }],
    empBranch: [{ value: null, disabled: true }],
    empManage: [{ value: null, disabled: true }],
  })


  showList: boolean = false
  employeeList: oneEmployee[] = []
  oneEmplyee: empFullDetails = {} as empFullDetails
  enableEdit: boolean = false


  ngOnInit(): void {
    this.searchingForm.get('searchInput')?.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      if (value) {
        console.log(value, 'there is value');
        this.searchEmp(value)
        this.showList = true
      }
      else {
        console.log(value, 'there is no value');
        this.employeeList = []
        this.showList = false
      }

    })

  }


  searchEmp(key: string) {
    this._UpdateDataService.searchEmployee(key).subscribe({
      next: (data) => {
        console.log(data);
        this.employeeList = data.employees
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getEmployeeDetails(empID: string) {
    this._UpdateDataService.getEmpFullData(empID).subscribe({
      next: (data) => {
        console.log(data);
        this.oneEmplyee = data
        this.showList = false
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  editSingleRow(element: any, target: any) {
    let x = this.employeeData.get(element)?.enable()
    const button = target as HTMLElement
    let updateButton = button.parentElement?.children[0] as HTMLElement
    let saveButton = button.parentElement?.children[1] as HTMLElement
    let cancelButton = button.parentElement?.children[2] as HTMLElement
    updateButton.style.display = 'none'
    saveButton.style.display = 'flex'
    cancelButton.style.display = 'flex'
  }

  closeEdittingInput(element: any , target: any ) {
    let x = this.employeeData.get(element)?.disable()
    const button = target as HTMLElement
    let updateButton = button.parentElement?.children[0] as HTMLElement
    let saveButton = button.parentElement?.children[1] as HTMLElement
    let cancelButton = button.parentElement?.children[2] as HTMLElement
    updateButton.style.display = 'flex'
    saveButton.style.display = 'none'
    cancelButton.style.display = 'none'
  }


}
