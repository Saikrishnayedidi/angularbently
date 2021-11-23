import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/shared/login-service.service';

@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styleUrls: ['./geo.component.scss']
})
export class GeoComponent implements OnInit {
isValid=false
isValid1=false
  constructor(public http:LoginServiceService) { }
imgurl:string=''
selectedFile!:File
  ngOnInit(): void {
  }
  toggle(){
  this.isValid=!this.isValid
  }
  toggle1(){
    this.isValid1=!this.isValid1
  }
  selectFile(event:any){
     this.selectFile=event.target.files[0]
    
  }
  upload(){
   
  }


}
