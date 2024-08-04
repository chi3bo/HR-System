import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
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
  isValue: boolean = false
  employeeList: oneEmployee[] = []

  ngOnInit(): void {

    this.searchingForm.get('searchInput')?.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      if (value) {
        console.log(value, 'there is value');
        this.searchEmp(value)
        this.isValue = true
      }
      else {
        console.log(value, 'there is no value');
        this.employeeList = []
        this.isValue = false
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






}
