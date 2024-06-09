import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PassportInfo, Profile } from 'src/app/shared/interfaces/profile';
import { MyProfileService } from 'src/app/shared/services/my-profile.service';

@Component({
  selector: 'app-emp-passport',
  templateUrl: './emp-passport.component.html',
  styleUrls: ['./emp-passport.component.css']
})
export class EmpPassportComponent {
  constructor(private _MyProfileService: MyProfileService, private _router: Router) { }

  allDetails: Profile = {} as Profile
  passportDetails: PassportInfo = {} as PassportInfo
  passportNum: any = null
  passportEnd: string = ''


  ngOnInit(): void {
    this._MyProfileService.srcData.subscribe({
      next: (data) => {
        if (data != null) {
          this.allDetails = data
          this.passportDetails = this.allDetails.passportInfo
          this.passportNum = this.passportDetails.passportNumber
          this.passportEnd = this.passportDetails.expiredDate
          console.log(this.passportDetails);
        }
      }
    })
  }
}
