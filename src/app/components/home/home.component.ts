import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/shared/login-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
username:any
  constructor(private serv:LoginServiceService) { }

  ngOnInit(): void {
     this.serv.getLogin().subscribe((data)=>{
       data.forEach((e:any)=>{
         this.username=e.userName
       })
     })
  }
}
  
