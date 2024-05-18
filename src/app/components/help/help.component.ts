import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit{

  pageOpenOne:boolean = false


  ngOnInit(): void {
    setTimeout(() => { this.pageOpenOne = true }, 100);
  }
}
