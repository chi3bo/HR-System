import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { Response } from 'src/app/shared/interfaces/response';
import { branch, employeeDetails, oneManage } from 'src/app/shared/interfaces/dashboard';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private _DashboardService: DashboardService, private _Router: Router, private _spinner: NgxSpinnerService, private _FB: FormBuilder) { }

  searchingForm: FormGroup = this._FB.group({
    searchInput: [null]
  })

  // ================= flags =================
  showModal: boolean = false
  noEmplyeFound: boolean = false
  noBranchFound: boolean = false
  loadingData: boolean = true
  setting: boolean = false
  // ================= flags =================


  tempList: string[] = Array(16).fill('0')
  originalEmployeeList: employeeDetails[] = []
  employeeList: employeeDetails[] = []
  randomColor: any[] = []
  managementList: oneManage[] = []
  originalBranchList: branch[] = []
  branchesList: branch[] = []
  searchCategory: string = 'موظف'
  searchKey: string = 'الاسم'

  ngOnInit(): void {
    // make a temp array of random color 
    for (let i = 0; i < this.employeeList.length; i++) {
      this.randomColor.push(this.getRandomColor())
    }

    this.getAllMangements()
    this.getAllData()
    this.searching()
    // سبسكرايب علي انبوت الاي دي عشان اسحب تغيراته لما اليوزر يكتب فيه

  }


  getAllData(id: string = '') {
    this.employeeList = []
    let body = { "manageId": id }
    this.loadingData = true
    this.searchCategory = 'موظف'
    this.searchKey = 'الاسم'
    // this._spinner.show()
    this._DashboardService.getAllDataSmall(body).subscribe({
      next: (data) => {
        console.log(data);
        this.loadingData = false
        this.originalEmployeeList = data.employees
        this.employeeList = this.originalEmployeeList
        this.totalPages = Math.ceil(this.employeeList.length / this.itemsPerPage);
        this.currentPage = 1
      },
      error: (err) => {
        this.loadingData = false
        this.noEmplyeFound = true
        console.log(err);
      }
    })
  }

  getAllMangements() {
    this._DashboardService.getAllManages().subscribe({
      next: (Response) => {
        console.log(Response);
        this.managementList = Response
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getOneManage(id: string) {
    this.getAllData(id)
  }

  getAllBranch() {
    this.loadingData = true
    this._DashboardService.getAllBranches().subscribe({
      next: (Response) => {
        console.log(Response);
        this.originalBranchList = Response
        this.branchesList = this.originalBranchList
        this.loadingData = false
        this.totalPages = Math.ceil(this.branchesList.length / this.itemsPerPage);
        this.currentPage = 1
      },
      error: (err) => {
        this.loadingData = false
        console.log(err);
      }
    })
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!
  getEmpDetails() {
    // this._DashboardService.getEmpData().subscribe({
    //   next:()=>{},
    //   error:()=>{}
    // })

    this.openModal()
  }
  // !!!!!!!!!!!!!!!!!!!!!!!!!













  // ==========================    start searching     =====================
  searching() {
    this.searchingForm.get('searchInput')?.valueChanges
      .pipe(debounceTime(300)).subscribe(value => {  // تأخير التنفيذ بـ 300 مللي ثانية لتحسين الأداء
        this.searchKey == 'الاسم' ? this.searchByName(value) : ''
        this.searchKey == 'الرقم التعريفي' ? this.searchById(value) : ''
        this.searchKey == 'الوظيفة' ? this.searchByJob(value) : ''
      });
  }

  setSearchCategory(key: string) {
    this.searchCategory = key
    if (key == 'موظف') {
      this.branchesList = []
      this.getAllData()
    }
    else if (key == 'فرع') {
      this.employeeList = []
      this.getAllBranch()
    }
  }

  setSearchKey(key: string) {
    this.searchKey = key
  }

  searchByName(value: string) {
    if (this.searchCategory == 'موظف') {
      this.employeeList = this.originalEmployeeList.filter((item) => { return item.employeeNameAr.includes(value) || String(item.employeeNameEn).toLowerCase().includes(value.toLowerCase()) })
      this.totalPages = Math.ceil(this.employeeList.length / this.itemsPerPage);
      this.currentPage = 1
      this.employeeList.length == 0 ? this.noEmplyeFound = true : this.noEmplyeFound = false
    }
    else if (this.searchCategory == 'فرع') {
      this.branchesList = this.originalBranchList.filter((item) => { return item.nameAr.includes(value) || String(item.nameEn).toLowerCase().includes(value.toLowerCase()) })
      this.totalPages = Math.ceil(this.branchesList.length / this.itemsPerPage);
      this.currentPage = 1
      this.branchesList.length == 0 ? this.noBranchFound = true : this.noBranchFound = false
    }
  }

  searchById(value: string) {
    if (this.searchCategory == 'موظف') {
      this.employeeList = this.originalEmployeeList.filter((item) => { return item.employeeId.includes(value) })
      this.totalPages = Math.ceil(this.employeeList.length / this.itemsPerPage);
      this.currentPage = 1
      this.employeeList.length == 0 ? this.noEmplyeFound = true : this.noEmplyeFound = false
    }
    else if (this.searchCategory == 'فرع') {
      this.branchesList = this.originalBranchList.filter((item) => { return item.id.includes(value) })
      this.totalPages = Math.ceil(this.branchesList.length / this.itemsPerPage);
      this.currentPage = 1
      this.branchesList.length == 0 ? this.noBranchFound = true : this.noBranchFound = false
    }
  }

  searchByJob(value: string) {
    this.employeeList = this.originalEmployeeList.filter((item) => { return item.jobNameAr.includes(value) || String(item.jobNameEn).toLowerCase().includes(value.toLowerCase()) })
  }
  // ==========================    end searching     ======================







  // ==========================    start moving and (open-close)    ======================
  closeImgModal() {
    this.showModal = false
  }
  openModal() {
    this.showModal = true
  }

  showSetting() {
    this.setting = !this.setting
  }

  getRandomColor(): string {
    const characters = '123CDE'
    let newColor = '#'
    for (let i = 0; i < 6; i++) {
      newColor += characters[Math.floor(Math.random() * characters.length)]
    }
    return newColor
  }

  scrollUp() {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }, 100)
  }
  // ==========================    end moving and (open-close)    ======================












  // ==========================   start pagination   ==========================
  currentPage = 1;
  itemsPerPage = 100; // عدد العناصر لكل صفحة
  totalPages = 0;
  maxPagesToShow = 5; // الحد الأقصى لعدد أزرار الصفحات 

  get paginatedResults() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.employeeList.slice(start, end);
  }
  get paginatedBranches() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.branchesList.slice(start, end);
  }
  goToPage(page: number) {
    this.currentPage = page;
    this.scrollUp()
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.scrollUp()
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.scrollUp()
    }
  }

  firstPage() {
    this.currentPage = 1;
    this.scrollUp()
  }

  lastPage() {
    this.currentPage = this.totalPages;
    this.scrollUp()
  }

  get pagesArray() {
    const startPage = Math.max(1, this.currentPage - Math.floor(this.maxPagesToShow / 2));
    const endPage = Math.min(this.totalPages, startPage + this.maxPagesToShow - 1);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }
  // ==========================   end pagination   ==========================

}
