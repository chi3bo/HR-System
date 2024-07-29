import { Component, OnInit } from '@angular/core';
import { TaskDetails } from 'src/app/shared/interfaces/task';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-admin-work-task',
  templateUrl: './admin-work-task.component.html',
  styleUrls: ['./admin-work-task.component.css']
})
export class AdminWorkTaskComponent implements OnInit {
constructor( private _TaskService:TaskService){}
taskList:TaskDetails[]=[]


ngOnInit(): void {
this.getAlldata()
}

getAlldata(){
this._TaskService.getAdminRequests().subscribe({
  next:(data)=>{
    console.log(data);
    this.taskList = data.requestJobMissions
  },
  error:(err)=>{console.log(err);
  }

})
}
}
