import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { Response } from 'src/app/shared/interfaces/response';
import { branch, empFullDetails, employeeDetails, oneManage } from 'src/app/shared/interfaces/dashboard';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, filter, map } from 'rxjs';

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
  showEmpModal: boolean = false
  showGroubModal: boolean = false
  noEmplyeFound: boolean = false
  noBranchFound: boolean = false
  loadingData: boolean = true
  GroubloadingData: boolean = true
  setting: boolean = false
  showBranch: boolean = false
  displayRows: boolean = false
  displayCards: boolean = true
  assignedWork: boolean = false

  acvtiveFilterJob: any = null
  acvtiveFilterCompany: any = null
  acvtiveFilterBranch: any = null
  acvtiveFilterNation: any = null
  acvtiveFilterAge: any = null
  acvtiveFilterGender: any = null
  theKey: any = null
  // ================= flags =================


  tempList: string[] = Array(16).fill('0')
  originalEmployeeList: employeeDetails[] = []
  employeeList: employeeDetails[] = []
  groubEmployeeList: employeeDetails[] = []
  randomColor: any[] = []
  managementList: oneManage[] = []
  originalBranchList: branch[] = []
  branchesList: branch[] = []
  searchCategory: string = 'موظف'
  searchKey: string = 'الاسم'
  groubNameKey: string = ''
  OneGroupName: string = 'مجموعة'
  employeeFullData: empFullDetails = {} as empFullDetails

  JobList: any
  CompanyList: any
  branchList: any
  genderList: any
  nationalityList: any
  ageList: any

  ngOnInit(): void {
    // make a temp array of random color 
    for (let i = 0; i < this.employeeList.length; i++) {
      this.randomColor.push(this.getRandomColor())
    }

    this.getAllMangements()
    this.getAllData()
    this.searching()
  }

  // =======================  start filtering function   =======================
  listOfHeaders() {
    this.JobList = new Set(this.employeeList.map(item => { return item.jobNameAr }))
    this.CompanyList = new Set(this.employeeList.map(item => { return item.companyNameAr }))
    this.branchList = new Set(this.employeeList.map(item => { return item.branchNameAr }))
    this.genderList = new Set(this.employeeList.map(item => { return item.gender }))
    this.ageList = new Set(this.employeeList.map(item => { return item.age }))
    this.ageList = Array.from(this.ageList).slice().sort((a, b) => Number(a) - Number(b))
    console.log(this.ageList);
    
    this.nationalityList = new Set(this.employeeList.map(item => { return item.nationNameAr }))
    console.log(this.CompanyList);
  }

  JobFilter(list: employeeDetails[], key: any) {
    console.log(key, 'llllllll');
    return list.filter((item) => { return item.jobNameAr == key })
  }

  companyFilter(list: employeeDetails[], key: any) {
    return list.filter((item) => { return item.companyNameAr == key })
  }

  BranchFilter(list: employeeDetails[], key: any) {
    return list.filter((item) => { return item.branchNameAr == key })
  }

  GenderFilter(list: employeeDetails[], key: any) {
    return list.filter((item) => { return item.gender == key })
  }

  nationaltyFilter(list: employeeDetails[], key: any) {
    return list.filter((item) => { return item.nationNameAr == key })
  }

  ageFilter(list: employeeDetails[], key: any) {
    return list.filter((item) => { return item.age == key })
  }


  avctiveFilter(type: any, event: any) {

    this.theKey = event.target.value

    if (type == 'job') {
      if (this.acvtiveFilterJob) {
        this.employeeList = this.originalEmployeeList
        this.acvtiveFilterCompany ? this.employeeList = this.companyFilter(this.employeeList, this.acvtiveFilterCompany) : ''
        this.acvtiveFilterBranch ? this.employeeList = this.BranchFilter(this.employeeList, this.acvtiveFilterBranch) : ''
        this.acvtiveFilterAge ? this.employeeList = this.ageFilter(this.employeeList, this.acvtiveFilterAge) : ''
        this.acvtiveFilterNation ? this.employeeList = this.nationaltyFilter(this.employeeList, this.acvtiveFilterNation) : ''
        this.acvtiveFilterGender ? this.employeeList = this.GenderFilter(this.employeeList, this.acvtiveFilterGender) : ''
        this.theKey == 'all' ? this.acvtiveFilterJob = null : this.acvtiveFilterJob = this.theKey
      }
      else {
        this.theKey == 'all' ? this.acvtiveFilterJob = null : this.acvtiveFilterJob = this.theKey
      }

    }

    if (type == 'company') {

      if (this.acvtiveFilterCompany) {
        this.employeeList = this.originalEmployeeList
        this.acvtiveFilterJob ? this.employeeList = this.JobFilter(this.employeeList, this.acvtiveFilterJob) : ''
        this.acvtiveFilterBranch ? this.employeeList = this.BranchFilter(this.employeeList, this.acvtiveFilterBranch) : ''
        this.acvtiveFilterAge ? this.employeeList = this.ageFilter(this.employeeList, this.acvtiveFilterAge) : ''
        this.acvtiveFilterNation ? this.employeeList = this.nationaltyFilter(this.employeeList, this.acvtiveFilterNation) : ''
        this.acvtiveFilterGender ? this.employeeList = this.GenderFilter(this.employeeList, this.acvtiveFilterGender) : ''
        this.theKey == 'all' ? this.acvtiveFilterCompany = null : this.acvtiveFilterCompany = this.theKey
      }
      else {
        this.theKey == 'all' ? this.acvtiveFilterCompany = null : this.acvtiveFilterCompany = this.theKey
      }

    }

    if (type == 'branch') {

      if (this.acvtiveFilterBranch) {
        this.employeeList = this.originalEmployeeList
        this.acvtiveFilterJob ? this.employeeList = this.JobFilter(this.employeeList, this.acvtiveFilterJob) : ''
        this.acvtiveFilterCompany ? this.employeeList = this.companyFilter(this.employeeList, this.acvtiveFilterCompany) : ''
        this.acvtiveFilterAge ? this.employeeList = this.ageFilter(this.employeeList, this.acvtiveFilterAge) : ''
        this.acvtiveFilterNation ? this.employeeList = this.nationaltyFilter(this.employeeList, this.acvtiveFilterNation) : ''
        this.acvtiveFilterGender ? this.employeeList = this.GenderFilter(this.employeeList, this.acvtiveFilterGender) : ''
        this.theKey == 'all' ? this.acvtiveFilterBranch = null : this.acvtiveFilterBranch = this.theKey
      }
      else {
        this.theKey == 'all' ? this.acvtiveFilterBranch = null : this.acvtiveFilterBranch = this.theKey
      }
    }

    if (type == 'nation') {

      if (this.acvtiveFilterNation) {
        this.employeeList = this.originalEmployeeList
        this.acvtiveFilterJob ? this.employeeList = this.JobFilter(this.employeeList, this.acvtiveFilterJob) : ''
        this.acvtiveFilterCompany ? this.employeeList = this.companyFilter(this.employeeList, this.acvtiveFilterCompany) : ''
        this.acvtiveFilterAge ? this.employeeList = this.ageFilter(this.employeeList, this.acvtiveFilterAge) : ''
        this.acvtiveFilterBranch ? this.employeeList = this.BranchFilter(this.employeeList, this.acvtiveFilterBranch) : ''
        this.acvtiveFilterGender ? this.employeeList = this.GenderFilter(this.employeeList, this.acvtiveFilterGender) : ''
        this.theKey == 'all' ? this.acvtiveFilterNation = null : this.acvtiveFilterNation = this.theKey
      }
      else {
        this.theKey == 'all' ? this.acvtiveFilterNation = null : this.acvtiveFilterNation = this.theKey
      }

    }

    if (type == 'age') {

      if (this.acvtiveFilterAge) {
        this.employeeList = this.originalEmployeeList
        this.acvtiveFilterJob ? this.employeeList = this.JobFilter(this.employeeList, this.acvtiveFilterJob) : ''
        this.acvtiveFilterCompany ? this.employeeList = this.companyFilter(this.employeeList, this.acvtiveFilterCompany) : ''
        this.acvtiveFilterNation ? this.employeeList = this.nationaltyFilter(this.employeeList, this.acvtiveFilterNation) : ''
        this.acvtiveFilterBranch ? this.employeeList = this.BranchFilter(this.employeeList, this.acvtiveFilterBranch) : ''
        this.acvtiveFilterGender ? this.employeeList = this.GenderFilter(this.employeeList, this.acvtiveFilterGender) : ''
        this.theKey == 'all' ? this.acvtiveFilterAge = null : this.acvtiveFilterAge = this.theKey
      }
      else {
        this.theKey == 'all' ? this.acvtiveFilterAge = null : this.acvtiveFilterAge = this.theKey
      }

    }

    if (type == 'gender') {

      if (this.acvtiveFilterGender) {
        this.employeeList = this.originalEmployeeList
        this.acvtiveFilterJob ? this.employeeList = this.JobFilter(this.employeeList, this.acvtiveFilterJob) : ''
        this.acvtiveFilterCompany ? this.employeeList = this.companyFilter(this.employeeList, this.acvtiveFilterCompany) : ''
        this.acvtiveFilterNation ? this.employeeList = this.nationaltyFilter(this.employeeList, this.acvtiveFilterNation) : ''
        this.acvtiveFilterBranch ? this.employeeList = this.BranchFilter(this.employeeList, this.acvtiveFilterBranch) : ''
        this.acvtiveFilterAge ? this.employeeList = this.ageFilter(this.employeeList, this.acvtiveFilterAge) : ''
        this.theKey == 'all' ? this.acvtiveFilterGender = null : this.acvtiveFilterGender = this.theKey
      }
      else {
        this.theKey == 'all' ? this.acvtiveFilterGender = null : this.acvtiveFilterGender = this.theKey
      }

    }

    console.log(this.theKey, 'active filter');
    // this.getAllData()

    this.acvtiveFilterCompany ? this.employeeList = this.companyFilter(this.employeeList, this.acvtiveFilterCompany) : ''
    this.acvtiveFilterBranch ? this.employeeList = this.BranchFilter(this.employeeList, this.acvtiveFilterBranch) : ''
    this.acvtiveFilterJob ? this.employeeList = this.JobFilter(this.employeeList, this.acvtiveFilterJob) : ''
    this.acvtiveFilterAge ? this.employeeList = this.ageFilter(this.employeeList, this.acvtiveFilterAge) : ''
    this.acvtiveFilterNation ? this.employeeList = this.nationaltyFilter(this.employeeList, this.acvtiveFilterNation) : ''
    this.acvtiveFilterGender ? this.employeeList = this.GenderFilter(this.employeeList, this.acvtiveFilterGender) : ''
    console.log(this.acvtiveFilterJob, 'active filter job');
    console.log(this.acvtiveFilterCompany, 'active filter Company');
    console.log(this.acvtiveFilterBranch, 'active filter Branch');
    console.log(this.acvtiveFilterAge, 'active filter Age');
    console.log(this.acvtiveFilterNation, 'active filter Nation');
    console.log(this.acvtiveFilterGender, 'active filter Gender');

    this.totalPages = Math.ceil(this.employeeList.length / this.itemsPerPage);
    this.currentPage = 1
  }
  // =======================  end filtering function   =======================




  getAllData(id: string = '') {
    this.employeeList = []
    let body = { "manageId": id }
    this.loadingData = true
    this.searchCategory = 'موظف'
    this.searchKey = 'الاسم'
    this._DashboardService.getAllDataSmall(body).subscribe({
      next: (data) => {
        console.log(data);
        this.loadingData = false
        this.originalEmployeeList = data.employees
        this.employeeList = this.originalEmployeeList.slice().sort((a, b) => Number(a.employeeId) - Number(b.employeeId))
        this.assignedWork ? this.employeeList = this.employeeList.filter((item) => { return item.state == 0 }) : ''
        this.listOfHeaders()


        // ======== filtering ==========

        // this.employeeList = this.BranchFilter(this.employeeList , '7000' )
        // this.acvtiveFilterCompany ? this.employeeList = this.companyFilter(this.employeeList, this.acvtiveFilterCompany) : ''
        // this.acvtiveFilterBranch ? this.employeeList = this.BranchFilter(this.employeeList,this.acvtiveFilterBranch) : ''
        // this.acvtiveFilterJob ? this.employeeList = this.JobFilter(this.employeeList, this.acvtiveFilterJob) : ''
        // this.acvtiveFilterAge ? this.employeeList = this.ageFilter(this.employeeList, this.acvtiveFilterAge) : ''
        // this.acvtiveFilterNation ? this.employeeList = this.nationaltyFilter(this.employeeList, this.acvtiveFilterNation) : ''
        // this.acvtiveFilterGender ? this.employeeList = this.GenderFilter(this.employeeList,this.acvtiveFilterGender) : ''
        // console.log(this.acvtiveFilterCompany , 'get all data');


        // ======== filtering ==========


        console.log(this.employeeList);

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

  getAllGroupOf(key: string) {
    this.branchesList = []
    this.loadingData = true
    this._DashboardService.getAllGroubOf(key).subscribe({
      next: (Response) => {
        console.log(Response);
        this.originalBranchList = Response
        this.branchesList = this.originalBranchList.slice().sort((a, b) => Number(a.id) - Number(b.id))
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
  getEmpDetails(empID: any) {
    this.employeeFullData = {} as empFullDetails
    let id = empID
    this._DashboardService.getEmpFullData(id).subscribe({

      next: (data) => {
        this.employeeFullData = data
        console.log(data);
        this.openEmpModal()
      },

      error: (err) => {
        console.log(err);
      }

    })


  }

  getOneGroubDetails(groubID: string = '', nameAR: any) {
    this.OneGroupName = nameAR
    this.groubEmployeeList = []
    this.GroubloadingData = true
    this._DashboardService.getOneGroup(this.groubNameKey, groubID).subscribe({
      next: (data) => {
        console.log(data);
        this.OneGroupName = data.nameAr
        this.groubEmployeeList = data.employees
        this.GroubloadingData = false
      },
      error: (err) => {
        this.GroubloadingData = false
        console.log(err);
      }
    })

    this.openGroubModal()
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

  setSearchCategory(key: string, groub: string) {
    this.searchCategory = key
    this.groubNameKey = groub
    if (key == 'موظف') {
      this.branchesList = []
      this.getAllData()
    }
    else if (key == 'فرع') {
      this.employeeList = []
      this.getAllGroupOf(groub)
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
  closeEmpModal() {
    this.showEmpModal = false
  }
  openEmpModal() {
    this.showEmpModal = true
  }
  closeGroubModal() {
    this.showGroubModal = false
  }
  openGroubModal() {
    this.showGroubModal = true
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

  tableView(){
    this.displayCards = false
    this.displayRows = true
  }
  cardsView(){
    this.displayCards = true
    this.displayRows = false
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
