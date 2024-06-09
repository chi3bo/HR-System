import { formatDate } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from 'src/app/shared/interfaces/profile';
import { MyProfileService } from 'src/app/shared/services/my-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private _MyProfileService: MyProfileService, private _router: Router, private _FormBuilder: FormBuilder) { }

  @ViewChild('imgInputEl') imgElement!: ElementRef

  imgForm: FormGroup = this._FormBuilder.group({
    imgInput: [null]
  })



  allDetails: Profile = {} as Profile
  empName: string = ''
  empID: string = ''
  empImg: any = null

  ngOnInit(): void {
    this._MyProfileService.getProfileDetails().subscribe({
      next: (data) => {
        this.allDetails = data
        this._MyProfileService.srcData.next(this.allDetails)
        this.empName = this.allDetails.employeeInfo.name
        this.empImg = this.allDetails.employeeInfo.image
        this.empID = this.allDetails.employeeInfo.id
        console.log(this.allDetails);

      },
      error: (err) => {
        console.log(err);
        if (err.error.message == 'Unauthorized') {
          localStorage.clear()
          this._router.navigate(['login'])
        }
      },
    })

  }

  setFormData() {
    let myBody = new FormData()
    const fileInput = this.imgElement.nativeElement;
    if (fileInput.files.length > 0) {
      myBody.append('image', fileInput.files[0]);
    } else {
      console.log('No file selected');
    }
    return myBody
  }

  sendImg() {
    this._MyProfileService.updateImg(this.setFormData()).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      }

    })
  }


}
