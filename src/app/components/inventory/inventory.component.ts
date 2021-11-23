import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { LoginServiceService } from 'src/app/shared/login-service.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  
   yearobj=[
   
    {years:2000},
    {years:1999},
    {years:1998},
    
  ]
  makeObj=[
    {make:'select Make'},
    {make:'Bently'}
  ]
  modelObj=[
    
    {model:'Bently'}
  ]
inventryForm!:FormGroup
  constructor(public fb:FormBuilder,public api:LoginServiceService ,public  currencyPipe:CurrencyPipe) { }
  ngOnInit(): void {
   
this.inventryForm=this.fb.group({
  stockNumber:[''],
  year:['Select Year'],
  make:['Select Make'],
  model:['Select Model'],
  MSRP:[''],
  sellingPrice:[''],
  invoicePrice:[''],
  stockNumber2:[''],
  year1:['Select Year'],
  make2:['Select Make'],
  model2:['Select Model'],
  MSRP2:[''],
  sellingPrice2:[''],
  invoicePrice2:[''],
  stockNumber3:[''],
  year3:['Select Year'],
  make3:['Select Make'],
  model3:['Select Model'],
  MSRP3:[''],
  sellingPrice3:[''],
  invoicePrice3:[''],
})



  }
  inventorySubmit(){
    console.log(this.inventryForm.value.MSRP)
  //  this.api.postInventry(this.inventryForm.value).subscribe((e)=>{
  //    console.log(e)
  //  })
  }
  currencyipe(e: Event) {
    let data = (e.target as HTMLInputElement).value;
    let controlName = (e.target as HTMLInputElement).name;

    this.inventryForm.patchValue({
      [controlName]: this.currencyPipe.transform(
        data.replace(/\D/g, '').replace(/^0+/, ''),
        'USD',
        'symbol',
        '1.0-0'
      ),
    });
  }

  focus(e: Event) {
    let data = (e.target as HTMLInputElement).value;
    let s = data.substring(1, data.length);
    let controlName = (e.target as HTMLInputElement).name;

 
    this.inventryForm.patchValue({
      [controlName]: s.split(',').join(''),
    });
  }
 

}
