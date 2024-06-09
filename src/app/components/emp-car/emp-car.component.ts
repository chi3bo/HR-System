import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarInfo, Profile } from 'src/app/shared/interfaces/profile';
import { MyProfileService } from 'src/app/shared/services/my-profile.service';

@Component({
  selector: 'app-emp-car',
  templateUrl: './emp-car.component.html',
  styleUrls: ['./emp-car.component.css']
})
export class EmpCarComponent implements OnInit {
  constructor(private _MyProfileService: MyProfileService, private _router: Router) { }

  allDetails: Profile = {} as Profile
  carDetails: CarInfo = {} as CarInfo
  carNumber: any = null
  checkCarEndDate: string = ''
  contractCarEndDate: string = ''


  ngOnInit(): void {
    this._MyProfileService.srcData.subscribe({
      next: (data) => {
        if (data != null) {
          this.allDetails = data
          this.carDetails = this.allDetails.carInfo
          this.carNumber = this.carDetails.carNumber
          this.checkCarEndDate = this.carDetails.checkCarEndDate
          this.contractCarEndDate = this.carDetails.contractCarEndDate
          console.log(this.carDetails);
        }
      }
    })
  }
}
