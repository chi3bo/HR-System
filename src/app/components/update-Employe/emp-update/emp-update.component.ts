import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
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
export class EmpUpdateComponent implements OnInit , OnDestroy {
  constructor(private _FormBuilder: FormBuilder, private _UpdateDataService: UpdateDataService, private _Router: Router, private _Renderer2: Renderer2) { }

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
  showData:boolean = false


  ngOnInit(): void {
    this.searchingForm.get('searchInput')?.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      if (value) {
        console.log(value, 'there is value');
        this.searchEmp(value)
        this.showList = true
        this.showData = false
      }
      else {
        console.log(value, 'there is no value');
        this.employeeList = []
        this.showList = false
      }

    })

    this.isNewEmployee()

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
        this._UpdateDataService.employeeData.next(data)
        this.oneEmplyee = data
        this.showList = false
        this.showData= true
        
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

  closeEdittingInput(formCntrolName: any, target: any, originalValue: any, action: string) {
    let input = this.employeeData.get(formCntrolName)

    action == 'cancel' ? input?.setValue(originalValue) : ''

    input?.disable()
    // input?.value != originalValue ? this._Renderer2.addClass(input , 'is-valid') : '' مش هينفع عشان ده فورم كنترول وليس انبوت

    const button = target as HTMLElement
    let updateButton = button.parentElement?.children[0] as HTMLElement
    let saveButton = button.parentElement?.children[1] as HTMLElement
    let cancelButton = button.parentElement?.children[2] as HTMLElement
    updateButton.style.display = 'flex'
    saveButton.style.display = 'none'
    cancelButton.style.display = 'none'

  }

isNewEmployee(){
  // مهمة الفانكشن هي اذا كان هذا موظف جديد اي تم توجيهه من صفحة اضافة موظف
  //  ان ياخذ الاي دي من التخزين المحلي و يجلب بياناته و يجعله جاهز للتعديل
  if (localStorage.getItem('createdEmpID')) {
    this.getEmployeeDetails(localStorage.getItem('createdEmpID')!)
  }
}

ngOnDestroy(): void {
  localStorage.removeItem('createdEmpID')
}
}
