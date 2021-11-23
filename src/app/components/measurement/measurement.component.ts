import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.scss']
})
export class MeasurementComponent implements OnInit {


measurementForm!:FormGroup
  constructor(public fb:FormBuilder) { }

  ngOnInit(): void {
    this.measurementForm=this.fb.group({
      check1:[''],
      
      textAreas:['']
		
    })
    
  }
  toggle(){
    // this.disabled=false
    this.measurementForm.get('textAreas')?.enable()
   
  }
  toggle1(){
  // this.disabled=true
  this.measurementForm.get('textAreas')?.disable()

  }
  measurementSubmit(){
    console.log(this.measurementForm.value);
  }

}
