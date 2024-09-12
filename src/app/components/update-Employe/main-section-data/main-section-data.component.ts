import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { branch, empFullDetails } from 'src/app/shared/interfaces/dashboard';
import { UpdateDataService } from 'src/app/shared/services/update-data.service';
import { modifiedEmployee } from './../../../shared/interfaces/update-data';
import { oneEmployee } from 'src/app/shared/interfaces/update-data';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-main-section-data',
  templateUrl: './main-section-data.component.html',
  styleUrls: ['./main-section-data.component.css']
})
export class MainSectionDataComponent {
  constructor(private _FormBuilder: FormBuilder, private _UpdateDataService: UpdateDataService, private _Router: Router, private _Renderer2: Renderer2) { }
  oneEmpolyee: empFullDetails = {} as empFullDetails
  itemsList: any[] = []
  enableEdit: boolean = false
  showData: boolean = false
  modifiedEmployee: modifiedEmployee = this._UpdateDataService.newEmpData;
  originalAllGroups: branch[] = []
  allgroups: branch[] = []
  enableEditName: string = ''




  mainEmployeeData: FormGroup = this._FormBuilder.group({
    employeeNameAr: [{ value: null, disabled: true }],
    employeeNameEn: [{ value: null, disabled: true }],
    employeeId: [{ value: null, disabled: true }],
    employeePersonId: [{ value: null, disabled: true }],
    employeePersonExpireDate: [{ value: null, disabled: true }],
    birthDate: [{ value: null, disabled: true }],
    birthPlace: [{ value: null, disabled: true }],
    age: [{ value: null, disabled: true }],
    motherName: [{ value: null, disabled: true }],
    gender: [{ value: null, disabled: true }],
    marrige: [{ value: null, disabled: true }],

    // معلومات الكفيل
    kafilId: [{ value: null, disabled: true }],
    kafilNameAr: [{ value: null, disabled: true }],
    kafilNameEn: [{ value: null, disabled: true }],

    // معلومات الشركة
    companyId: [{ value: null, disabled: true }],
    companyNameAr: [{ value: null, disabled: true }],
    companyNameEn: [{ value: null, disabled: true }],
  })



  ngOnInit(): void {
    this.getEmpData()
  }


  equalizeData() {
    // نقوم بجلب الخصائص الموجودة في الـ partialObject فقط
    const updatedObject = Object.assign({}, ...Object.keys(this.modifiedEmployee)
      .filter(key => key in this.oneEmpolyee)
      .map(key => ({ [key]: this.oneEmpolyee[key as keyof empFullDetails] })));
    this.modifiedEmployee = updatedObject
  }


  getEmpData() {
    this._UpdateDataService.employeeData.subscribe(
      (value) => {
        console.log(value);
        this.oneEmpolyee = value
        this.mainEmployeeData.patchValue(this.oneEmpolyee)
      }
    )

  }


  getAllGroubOf(key: string) {
    this._UpdateDataService.getAllGroubOf(key).subscribe({
      next: (response) => {
        this.allgroups = response
        this.originalAllGroups = this.allgroups
        console.log(response);
        this.groubSearching()
        this.enableEditName = key
        // بديله اسم الخانة اللي بيتم التعديل عليها و دي اللي هيظهر الليست تحتها
      }
    })
  }

  groubSearching() {
    this.mainEmployeeData.get('kafilNameEn')?.valueChanges
      .pipe(debounceTime(300)).subscribe(value => {  // تأخير التنفيذ بـ 300 مللي ثانية لتحسين الأداء
        this.searchByName(value)
        // this.searchKey == 'الرقم التعريفي' ? this.searchById(value) : ''
        // this.searchKey == 'الوظيفة' ? this.searchByJob(value) : ''
      });
  }

  searchByName(value: any) {
    this.allgroups = this.originalAllGroups.filter((item) => { return item.nameAr.includes(value) || String(item.nameEn).toLowerCase().includes(value.toLowerCase()) })
    console.log(this.allgroups);


  }


  editSingleRow(element: any, target: any) {
    let x = this.mainEmployeeData.get(element)?.enable()

    const button = target as HTMLElement
    let updateButton = button.parentElement?.children[0] as HTMLElement
    let saveButton = button.parentElement?.children[1] as HTMLElement
    let cancelButton = button.parentElement?.children[2] as HTMLElement

    updateButton.style.display = 'none'
    saveButton.style.display = 'flex'
    cancelButton.style.display = 'flex'
  }

  closeEdittingInput(formCntrolName: any, target: any, originalValue: any, action: string) {
    let input = this.mainEmployeeData.get(formCntrolName)

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

    this.enableEditName = ''
  }

  setUpdates() {
    this.equalizeData()
    this.modifiedEmployee.employeeNameAr = this.mainEmployeeData.get('employeeNameAr')?.value
    this.modifiedEmployee.employeeNameEn = this.mainEmployeeData.get('employeeNameEn')?.value
    this.modifiedEmployee.employeeId = this.mainEmployeeData.get('employeeId')?.value
    this.modifiedEmployee.employeePersonId = this.mainEmployeeData.get('employeePersonId')?.value
    this.modifiedEmployee.employeePersonExpireDate = this.mainEmployeeData.get('employeePersonExpireDate')?.value
    this.modifiedEmployee.birthDate = this.mainEmployeeData.get('birthDate')?.value
    this.modifiedEmployee.birthPlace = this.mainEmployeeData.get('birthPlace')?.value
    this.modifiedEmployee.motherName = this.mainEmployeeData.get('motherName')?.value
    this.modifiedEmployee.gender = this.mainEmployeeData.get('gender')?.value
    this.modifiedEmployee.marrige = this.mainEmployeeData.get('marrige')?.value
    this.modifiedEmployee.kafilId = this.mainEmployeeData.get('kafilId')?.value
    this.modifiedEmployee.companyId = this.mainEmployeeData.get('companyId')?.value
  }

  sendUpdates() {
    this.setUpdates()
    console.log(this.modifiedEmployee);

  }

}

