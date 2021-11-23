import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginServiceService } from 'src/app/shared/login-service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
service!:FormGroup
  constructor(public fb:FormBuilder ,public api:LoginServiceService) { }

  ngOnInit(): void {

this.service=this.fb.group({
  sai:['']
})
  }
  saiSub() {
//  this.api.postAccounts(this.service.value).subscribe((e)=>{
//    console.log(e)
//  })
  }

}
