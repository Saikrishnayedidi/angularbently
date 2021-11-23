import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/shared/login-service.service';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit {
accessForm!:FormGroup  
isValid:boolean=true
  constructor(public fb:FormBuilder,public http:LoginServiceService) { }

  ngOnInit(): void {
this.accessForm=this.fb.group({
  facebook:[''],
  google:[''],
  googleAnalytics:[''],
  radio:this.fb.group({
    googleAds:[''],
    googleAdsInput:['']
   
  }),
  
 
});

 this.http.getAccess().subscribe((res)=>{
   console.log(res)
   res.forEach( (data:any) => {
     this.accessForm.value.facebook=data.facebook
     this.accessForm.value.google=data.google
     this.accessForm.value.googleAnalytics=data.googleAnalytics
     this.accessForm.value.radio.googleAds=data.radio.googleAds
     this.accessForm.value.radio.googleAdsInput=data.radio.googleAdsInput

   });

   this.accessForm.patchValue({
    facebook:this.accessForm.value.facebook,
    google:this.accessForm.value.google,
    googleAnalytics:this.accessForm.value.googleAnalytics,
    radio:{
      googleAds:this.accessForm.value.radio.googleAds,
      googleAdsInput:this.accessForm.value.radio.googleAdsInput,
  
    },
   });
 });


  }
  radioBtn(){
    this.accessForm.get(["radio","googleAdsInput"])?.enable()
  }
  radioBtn1(){
   this.accessForm.get(["radio","googleAdsInput"])?.disable()
  }
  accessSubmit(){
  // this.http.postAccess(this.accessForm.value).subscribe((res)=>{

  // })

  console.log(this.accessForm.value)
  }

}
