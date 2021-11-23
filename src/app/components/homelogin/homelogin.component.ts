import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/shared/login-service.service';

@Component({
  selector: 'app-homelogin',
  templateUrl: './homelogin.component.html',
  styleUrls: ['./homelogin.component.scss']
})
export class HomeloginComponent implements OnInit {
email:any;
password:any;
  constructor(private fb:FormBuilder,private api:LoginServiceService,private route:Router) { }
  loginForm!:FormGroup
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:[''],
      password:['']
    })
  }

  loginSubmit(){
   
  this.api.getLogin().subscribe((e:any)=>{
       e.forEach((e:any)=>{
         this.email=e.email
         this.password=e.password
       })
       if(this.loginForm.value.email==this.email && this.loginForm.value.password==this.password ){
        alert('sucess')
        this.route.navigateByUrl('/home/nav')
      }
      else{
       alert('error')
      }
      
  })


   
   

  }

}
