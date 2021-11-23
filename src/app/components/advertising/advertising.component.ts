import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.scss']
})
export class AdvertisingComponent implements OnInit {
 stock=[{
select:1
 },
{
  select:2
},
{
  select:3
},{
  select:4
},{
  select:5
},{
  select:6
},
{
  select:7
},
{
  select:8
},
{
  select:9
},
{
  select:10
},]
    advInputObj=[
      {value:'Airconditioning'},
      {value:'Battery'},
      {value:'Brakes'},
      {value:'CabinAirFilter'},
       {value:'EmissionsTesting'},
       {value:'EngineAirFilter'},
       {value:'EMultiPointInspection'},
       {value:'SafetyInspection'},
       {value:'TireRotation'},
       {value:'Tires'},
       {value:'Transmission'},
       {value:' WheelAlignment'},
       {value:'Wiper Blades'},
    ]

    inputData=[
      {value:'input1' ,id:1},
      {value:'input2' ,id:2},
      {value:'input3' ,id:3},
      {value:'input4' ,id:4},
      {value:'input5' ,id:5}
    ]
  constructor(public fb:FormBuilder) { }
  advForm!:FormGroup
  ngOnInit(): void {
    this.advForm=this.fb.group({
      Airconditioning:[''],
      Battery:[''],
      Brakes:[''],
      CabinAirFilter:[''],
      EmissionsTesting:[''],
      EngineAirFilter:[''],
      MultiPointInspection:[''],
      SafetyInspection:[''],
      TireRotation:[''],
      Tires:[''],
      Transmission:[''],
      WheelAlignment:[''],
      WiperBlades:[''],
      input:this.fb.group({
        input1:[''],
        input2:[''],
        input3:[''],
        input4:[''],
        input5:['']
      })



    })
  }
advSub(){
  console.log(this.advForm.value)
}
}
