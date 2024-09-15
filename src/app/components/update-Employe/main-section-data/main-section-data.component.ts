import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  oneEmployee: empFullDetails = {} as empFullDetails
  itemsList: any[] = []
  enableEdit: boolean = false
  showData: boolean = false
  modifiedEmployee: modifiedEmployee = this._UpdateDataService.newEmpData;
  originalAllGroups: branch[] = []
  allgroups: branch[] = []
  enableEditName: string = ''
  branchChosen : boolean = true





  mainEmployeeData: FormGroup = this._FormBuilder.group({
    employeeNameAr: [{ value: null, disabled: true }],
    employeeNameEn: [{ value: null, disabled: true }],
    employeeId: [{ value: null, disabled: true }],
    employeePersonId: [{ value: null, disabled: true }],
    employeePersonExpireDate: [{ value: null, disabled: true }],
    birthDate: [{ value: null, disabled: true }],
    birthPlace: [{ value: null, disabled: true }],
    // age: [{ value: null, disabled: true }, [Validators.max(80) ,Validators.min(18)]],
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
      .filter(key => key in this.oneEmployee)
      .map(key => ({ [key]: this.oneEmployee[key as keyof empFullDetails] })));
    this.modifiedEmployee = updatedObject
  }


  getEmpData() {
    this._UpdateDataService.employeeData.subscribe(
      (value) => {
        console.log(value);
        this.oneEmployee = value
        this.mainEmployeeData.patchValue(this.oneEmployee)

      this.oneEmployee.birthDate ? this.oneEmployee.birthDate = new Date(this.oneEmployee.birthDate).toISOString().substring(0, 10) : ''
      this.oneEmployee.employeePersonExpireDate ? this.oneEmployee.employeePersonExpireDate = new Date(this.oneEmployee.employeePersonExpireDate).toISOString().substring(0, 10) : ''
      }
    )

  }


// =========================== start ===========================
// تعديل احد الخانات الاختيارية مثل الشركة او الفرع .. الخ
  getAllGroubOf(key: string , control:string) {
    this._UpdateDataService.getAllGroubOf(key).subscribe({
      next: (response) => {
        this.allgroups = response
        this.allgroups = this.allgroups.sort((a, b) => Number(a.id) - Number(b.id))
        this.originalAllGroups = this.allgroups
        console.log(response);
        this.groubSearching(control)
        this.enableEditName = control
        // بديله اسم الخانة اللي بيتم التعديل عليها و دي اللي هيظهر الليست تحتها
      }
    })
  }

  groubSearching(control:string) {
    this.mainEmployeeData.get(control)?.valueChanges
      .pipe(debounceTime(300)).subscribe(value => {  // تأخير التنفيذ بـ 300 مللي ثانية لتحسين الأداء
        this.searchByName(value)
        this.branchChosen = false
      });
  }

  searchByName(value: string) {
    this.allgroups = this.originalAllGroups.filter((item) => { return item.nameAr.includes(value) || (item.nameEn ? (item.nameEn).toLocaleLowerCase().includes(value.toLocaleLowerCase()) :'')|| item.id.includes(value) })
    console.log(this.allgroups);


  }

  setChosenValue(item:branch , ControlNameAr:string , ControlNameEn:string , ControlID:string , target: any , thisControl:string){
    this.mainEmployeeData.get(ControlNameAr)?.setValue(item.nameAr);
    this.mainEmployeeData.get(ControlNameEn)?.setValue(item.nameEn);
    this.mainEmployeeData.get(ControlID)?.setValue(item.id);
    this.enableEditName = ''
    this.branchChosen = true

   this.closeEdittingInput(thisControl , target , '' , 'save')
    // this.mainEmployeeData.get(ControlNameAR)?.disable();
    // this.mainEmployeeData.get(ControlNameEN)?.disable();
    // this.mainEmployeeData.get(ControlID)?.disable();
    console.log( item );
    
  }
  // تعديل احد الخانات الاختيارية مثل الشركة او الفرع .. الخ
// =========================== end ===========================





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

