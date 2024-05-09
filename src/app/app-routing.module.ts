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

const routes: Routes = [
  { path:'' , component:AuthComponent , title:'auth' ,children:[
    { path:'login', component:LoginComponent , title:'home'},
    { path:'register', component:SignupComponent , title:'Signup'},
  ]},

  { path:'' , component:MainComponent , title:'main' , children:[
    { path:'home' , component:HomeComponent , title:'home'},
    { path:'loan' , component:LoanComponent , title:'loan'},
    { path:'vacations' , component:VacationComponent , title:'vacations'},
    { path:'terminate' , component:TerminationComponent , title:'terminations'},
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
