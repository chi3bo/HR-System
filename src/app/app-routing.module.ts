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

const routes: Routes = [

  { path:'' , component:MainComponent , title:'main' , canActivate:[myGuardGuard], children:[
    { path:'home' , component:HomeComponent , title:'home'},
    { path:'loan' , component:LoanComponent , title:'loan'},
    { path:'vacations' , component:VacationComponent , title:'vacations'},
    { path:'terminate' , component:TerminationComponent , title:'terminations'},
    { path:'help' , component:AdminComponent , title:'help'},
    { path:'allOrders' , component:AllOrdersComponent , title:'my orders' , children :[
      { path:'loan' , component:OrderloanComponent , title:'loan orders'},
      { path:'vacation' , component:OrderVacComponent , title:'vacation orders'},
      { path:'other' , component:OrderotherComponent , title:'other orders'},
      { path:'' , component:BlankComponent , title:'my orders'},
    ] },
  ]},

  { path:'' , component:AuthComponent , title:'auth' ,children:[
    { path:'login', component:LoginComponent , title:'home'},
    { path:'register', component:SignupComponent , title:'Signup'},
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
