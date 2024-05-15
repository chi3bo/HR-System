import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
name:any = localStorage.getItem('employeeName')
pageOpenOne:boolean = false

ngOnInit(): void {
  setTimeout(() => {this.pageOpenOne = true}, 100);
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  
}
}
