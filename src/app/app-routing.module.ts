import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { LoanComponent } from './components/loan/loan.component';
import { VacationComponent } from './components/vacation/vacation.component';
import { TerminationComponent } from './components/termination/termination.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { myGuardGuard } from './shared/my-guard.guard';
import { HelpComponent } from './components/help/help.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { OrderloanComponent } from './components/orderloan/orderloan.component';
import { OrderVacComponent } from './components/order-vac/order-vac.component';
import { OrderotherComponent } from './components/orderother/orderother.component';
import { BlankComponent } from './components/blank/blank.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminVacationComponent } from './components/admin-vacation/admin-vacation.component';
import { AdminLoanComponent } from './components/admin-loan/admin-loan.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { roleGuardGuard } from './shared/role-guard.guard';
import { LeavePermissionComponent } from './components/leave-permission/leave-permission.component';
import { LettersComponent } from './components/letters/letters.component';
import { AssetRequestComponent } from './components/asset-request/asset-request.component';
import { EmpAssetsComponent } from './components/emp-assets/emp-assets.component';
import { EmpLettersComponent } from './components/emp-letters/emp-letters.component';
import { EmpPermissionsComponent } from './components/emp-permissions/emp-permissions.component';
import { AdminAssetsComponent } from './components/admin-assets/admin-assets.component';
import { AdminLettersComponent } from './components/admin-letters/admin-letters.component';
import { AdminLeaveComponent } from './components/admin-leave/admin-leave.component';
import { TimeSheetComponent } from './components/time-sheet/time-sheet.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EmpContractComponent } from './components/emp-contract/emp-contract.component';
import { EmpCarComponent } from './components/emp-car/emp-car.component';
import { EmpIdentityComponent } from './components/emp-identity/emp-identity.component';
import { EmpPassportComponent } from './components/emp-passport/emp-passport.component';

const routes: Routes = [

  {
    path: '', component: MainComponent, title: 'main', canActivate: [myGuardGuard], children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'home' },
      { path: 'loan', component: LoanComponent, title: 'loan' },
      { path: 'vacations', component: VacationComponent, title: 'vacations' },
      { path: 'terminate', component: TerminationComponent, title: 'terminations' },
      { path: 'help', component: HelpComponent, title: 'help' },
      { path: 'leave', component: LeavePermissionComponent, title: 'leave' },
      { path: 'letters', component: LettersComponent, title: 'Letters' },
      { path: 'asset', component: AssetRequestComponent, title: 'Asset Request' },
      {
        path: 'allOrders', component: AllOrdersComponent, title: 'my orders', children: [
          { path: 'loan', component: OrderloanComponent, title: 'loan orders' },
          { path: 'vacation', component: OrderVacComponent, title: 'vacation orders' },
          { path: 'assets', component: EmpAssetsComponent, title: 'Assets' },
          { path: 'letters', component: EmpLettersComponent, title: 'Letters' },
          { path: 'permissions', component: EmpPermissionsComponent, title: 'Permissions' },
          { path: 'other', component: OrderotherComponent, title: 'other orders' },
          { path: '', component: BlankComponent, title: 'my orders' },
        ]
      },

    ]
  },
  { path: 'help', component: HelpComponent, title: 'help' },
  {
    path: 'my-profile', component: ProfileComponent, title: 'my Profile', children: [
      { path: 'contract', component: EmpContractComponent, title: '' },
      { path: 'car', component: EmpCarComponent, title: '' },
      { path: 'identity', component: EmpIdentityComponent, title: '' },
      { path: 'passport', component: EmpPassportComponent, title: '' },
    ]
  },

  {
    path: '', component: AuthComponent, title: 'auth', children: [
      { path: 'login', component: LoginComponent, title: 'home' },
      { path: 'register', component: SignupComponent, title: 'Signup' },
    ]
  },

  {
    path: '', component: AdminComponent, title: 'Admin', canActivate: [roleGuardGuard], children: [
      { path: 'admin-home', component: AdminHomeComponent, title: 'admin home' },
      { path: 'admin-loan', component: AdminLoanComponent, title: 'loan orders' },
      { path: 'admin-vacation', component: AdminVacationComponent, title: 'vacation orders' },
      { path: 'admin-assets', component: AdminAssetsComponent, title: 'assets orders' },
      { path: 'admin-letters', component: AdminLettersComponent, title: 'letters orders' },
      { path: 'admin-permissions', component: AdminLeaveComponent, title: 'permissions orders' },
      { path: 'admin-timesheet', component: TimeSheetComponent, title: 'Time Sheet' },
      { path: 'admin-blank', component: BlankComponent, title: 'my orders' },

    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
