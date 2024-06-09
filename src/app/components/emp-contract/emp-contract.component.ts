import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarInfo, ContractInfo, Profile } from 'src/app/shared/interfaces/profile';
import { MyProfileService } from 'src/app/shared/services/my-profile.service';

@Component({
  selector: 'app-emp-contract',
  templateUrl: './emp-contract.component.html',
  styleUrls: ['./emp-contract.component.css']
})
export class EmpContractComponent {
  constructor(private _MyProfileService: MyProfileService, private _router: Router) { }

  allDetails: Profile = {} as Profile
  contractDetails: ContractInfo = {} as ContractInfo
  startDate: any = null
  endDate: string = ''


  ngOnInit(): void {
    this._MyProfileService.srcData.subscribe({
      next: (data) => {
        if (data != null) {
          this.allDetails = data
          this.contractDetails = this.allDetails.contractInfo
          this.startDate = this.contractDetails.startDate
          this.endDate = this.contractDetails.endDate
          console.log(this.contractDetails);
        }
      }
    })
  }
}
