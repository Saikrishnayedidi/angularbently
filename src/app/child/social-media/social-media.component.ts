
import { Component, DoCheck, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, FormGroupName } from '@angular/forms';
import { ToggleServiceService } from 'src/app/shared/toggle-service.service';
@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent implements OnInit {

  @Input('isexpand') isexpand!:boolean
  constructor(public fb:FormBuilder,public _toggle:ToggleServiceService) { }
socialForm!:FormGroup
  ngOnInit(): void {
this.socialForm=this.fb.group({
  seoPlus:this.fb.group({
    monthlyFee:['']
  }),
  seoPro:this.fb.group({
    monthlyFee:['']
  })

})
  }

 
display:{[x:string]:any}={}
digitalFun(e:any,formGroupName:string,formControlName:string,lineAmount:string){

this.display[lineAmount]=parseInt( e.target.value)
if(e.target.value.length>0){
  this.socialForm.patchValue({
    [formGroupName]:{
      [formControlName]:"$"+e.target.value
    }
  })
}
 
}

@ViewChild('check1') check1!:ElementRef
@ViewChild('check2') check2!:ElementRef
digitalCheck(e:any){
  if('defaultCheck1'==e.target.id){

    this.check2.nativeElement.checked=false
    this.socialForm.get(['seoPro','monthlyFee'])?.disable()
    this.display.lineAmount2=0

    if(e.target.checked){
      this.socialForm.get(['seoPlus','monthlyFee'])?.enable()
       let data=this.socialForm.value.seoPlus.monthlyFee
       this.display.lineAmount1=this.remove(data) 
    }
    else{
      this.socialForm.get(['seoPlus','monthlyFee'])?.disable()
      this.display.lineAmount1=0
    }
  }
  if('defaultCheck2'==e.target.id){
    this.check1.nativeElement.checked=false
    this.display.lineAmount1=0
    this.socialForm.get(['seoPlus','monthlyFee'])?.disable()
    if(e.target.checked){
      this.socialForm.get(['seoPro','monthlyFee'])?.enable()
       let data=this.socialForm.value.seoPro.monthlyFee
       this.display.lineAmount2=this.remove(data) 
    }
    else{
      this.socialForm.get(['seoPro','monthlyFee'])?.disable()
      this.display.lineAmount2=0
    }
  }

}

  remove(data:any){
    let m = data.substring(1, data.length);
    let s = parseFloat(m);
    return s
  }
  totalDigital!:number
  ngDoCheck(){
this.totalDigital=(this.display.lineAmount1||0)+(this.display.lineAmount2||0)

this._toggle.getSocial(this.totalDigital)
  }

}