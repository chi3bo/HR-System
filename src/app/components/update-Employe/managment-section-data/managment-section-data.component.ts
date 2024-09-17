import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { branch, empFullDetails } from 'src/app/shared/interfaces/dashboard';
import { modifiedEmployee } from 'src/app/shared/interfaces/update-data';
import { UpdateDataService } from 'src/app/shared/services/update-data.service';

@Component({
  selector: 'app-managment-section-data',
  templateUrl: './managment-section-data.component.html',
  styleUrls: ['./managment-section-data.component.css']
})
export class ManagmentSectionDataComponent {
  constructor(private _FormBuilder: FormBuilder, private _UpdateDataService: UpdateDataService, private _Router: Router, private _Renderer2: Renderer2) { }
  oneEmployee: empFullDetails = {} as empFullDetails
  itemsList: any[] = []
  enableEdit: boolean = false
  showData: boolean = false
  modifiedEmployee: modifiedEmployee = this._UpdateDataService.newEmpData;
  originalAllGroups: branch[] = []
  allgroups: branch[] = []
  enableEditName: string = ''
  branchChosen: boolean = true

  ManagementFormData: FormGroup = this._FormBuilder.group({
    // معلومات الفروع والإدارة
    branchId: [{ value: null, disabled: true }],
    branchNameAr: [{ value: null, disabled: true }],
    branchNameEn: [{ value: null, disabled: true }],
    jobId: [{ value: null, disabled: true }],
    jobNameAr: [{ value: null, disabled: true }],
    jobNameEn: [{ value: null, disabled: true }],
    manageId: [{ value: null, disabled: true }],
    manageNameAr: [{ value: null, disabled: true }],
    manageNameEn: [{ value: null, disabled: true }],
    departmentId: [{ value: null, disabled: true }],
    departmentNameAr: [{ value: null, disabled: true }],
    departmentNameEn: [{ value: null, disabled: true }],
    employeeCategoryId: [{ value: null, disabled: true }],
    employeeCategoryNameAr: [{ value: null, disabled: true }],
    employeeCategoryNameEn: [{ value: null, disabled: true }],

  })



  ngOnInit(): void {
    this.getEmpData()
  }



  getEmpData() {
    this._UpdateDataService.employeeData.subscribe(
      (value) => {
        console.log(value);
        this.oneEmployee = value
        this.ManagementFormData.patchValue(this.oneEmployee)

      }
    )

  }


  editSingleRow(element: any, target: any) {
    let x = this.ManagementFormData.get(element)?.enable()

    const button = target as HTMLElement
    let updateButton = button.parentElement?.children[0] as HTMLElement
    let saveButton = button.parentElement?.children[1] as HTMLElement
    let cancelButton = button.parentElement?.children[2] as HTMLElement

    updateButton.style.display = 'none'
    saveButton.style.display = 'flex'
    cancelButton.style.display = 'flex'
  }

  closeEdittingInput(formCntrolName: any, target: any, originalValue: any, action: string) {
    let input = this.ManagementFormData.get(formCntrolName)

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




  editJobs(key: string) {
    this._UpdateDataService.getAllGroubOf(key).subscribe({
      next: (Response) => {
        console.log(Response, 'get all group of');
        this.itemsList = Response
        this.itemsList = this.itemsList.sort((a, b) => Number(a.id) - Number(b.id))
      },
      error: (err) => {
        console.log(err);
      }
    })

  }


  equalizeData() {
    // نقوم بجلب الخصائص الموجودة في الـ partialObject فقط
    const updatedObject = Object.assign({}, ...Object.keys(this.modifiedEmployee)
      .filter(key => key in this.oneEmployee)
      .map(key => ({ [key]: this.oneEmployee[key as keyof empFullDetails] })));
    this.modifiedEmployee = updatedObject
  }

  // =========================== start ===========================
  // تعديل احد الخانات الاختيارية مثل الشركة او الفرع .. الخ
  getAllGroubOf(key: string, control: string) {
    this._UpdateDataService.getAllGroubOf(key).subscribe({
      next: (response) => {
        this.allgroups = response
        this.allgroups = this.allgroups.sort((a, b) => Number(a.id) - Number(b.id))
        this.originalAllGroups = this.allgroups
        this.groubSearching(control)
        this.enableEditName = control
        // بديله اسم الخانة اللي بيتم التعديل عليها و دي اللي هيظهر الليست تحتها
      }
    })
  }

  groubSearching(control: string) {
    this.ManagementFormData.get(control)?.valueChanges
      .pipe(debounceTime(300)).subscribe(value => {  // تأخير التنفيذ بـ 300 مللي ثانية لتحسين الأداء
        this.searchByName(value)
        this.branchChosen = false
      });
  }

  searchByName(value: string) {
    this.allgroups = this.originalAllGroups.filter((item) => { return ((item.nameAr ? (item.nameAr).includes(value) : '') || (item.nameEn ? (item.nameEn).toLocaleLowerCase().includes(value.toLocaleLowerCase()) : '') || item.id.includes(value)) })
    console.log(this.allgroups);
  }

  setChosenValue(item: branch, ControlNameAr: string, ControlNameEn: string, ControlID: string, target: any, thisControl: string) {
    this.ManagementFormData.get(ControlNameAr)?.setValue(item.nameAr);
    this.ManagementFormData.get(ControlNameEn)?.setValue(item.nameEn);
    this.ManagementFormData.get(ControlID)?.setValue(item.id);
    this.enableEditName = ''
    this.branchChosen = true

    this.closeEdittingInput(thisControl, target, '', 'save')

    console.log(item);

  }
  // تعديل احد الخانات الاختيارية مثل الشركة او الفرع .. الخ
  // =========================== end ===========================

  setUpdates() {
    this.equalizeData()
    this.modifiedEmployee.branchId = this.ManagementFormData.get('branchId')?.value
    this.modifiedEmployee.jobId = this.ManagementFormData.get('jobId')?.value
    this.modifiedEmployee.manageId = this.ManagementFormData.get('manageId')?.value
    this.modifiedEmployee.departmentId = this.ManagementFormData.get('departmentId')?.value
    this.modifiedEmployee.employeeCategoryId = this.ManagementFormData.get('employeeCategoryId')?.value
  }

  sendUpdates() {
    this.setUpdates()
    console.log(this.modifiedEmployee);

    this._UpdateDataService.AddOrUpdateEmployee(this.modifiedEmployee).subscribe({
      next:(res)=>{console.log(res)},
      error:(err)=>{console.log(err)}
    })
  }

}
