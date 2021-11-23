import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-expectations',
  templateUrl: './expectations.component.html',
  styleUrls: ['./expectations.component.scss']
})
export class ExpectationsComponent implements OnInit {
 monthly=["0","1-5","6-10","11-15","16 or more"]
 yearly=["0%","1-5%","6-10%","11-15%","16% or more"]
 market=["0%",".5-1%","1.1-1.5%","1.6-2%","Over 2%"]
 district=["0","1","2","3","4 or higher"]
 trafficIncrease=["0%","1-2%","3-5%","6-10%","11% or more"]
 leadIncrease=["0%","1-2%","3-5%","6-10%","11% or more"]
 engagementRate=["0%","1-5%","6-10%","11-15%","16% or more"]
 transactionRate=["0%","1-5%","6-10%","11-15%","16% or more"]
 expectationsForm!:FormGroup
  constructor(public fb:FormBuilder) { }

  ngOnInit(): void {
  this.expectationsForm=this.fb.group({
    monthly:[''],
    yearly:[''],
    market:[''],
    district:[''],
    customerPayRo:this.fb.group({
      monthly:[''],
      yearly:[''],
      market:[''],
      district:[''],

    }),
    website:this.fb.group({
      trafficIncrease:[''],
      leadIncrease:[''],
      engagementRate:[''],
      transactionRate:[''],

    })

  })
  }

}
