import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from 'src/app/shared/login-service.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
})
export class BudgetComponent implements OnInit {
  bugGetForm!: FormGroup;
name:any
  constructor(public fb: FormBuilder, public currencyPipe: CurrencyPipe,public http:LoginServiceService) {}

  ngOnInit(): void {
    this.bugGetForm = this.fb.group({
      searchNew: ['',Validators.required],
      youTube: [''],
      searchPreOwned:[''],
      ott:[''],
      searchService:[''],
      salesMail:[''],
      other:[''],
      socialSales:[''],
      serviceMail:[''],
      displayNew:[''],
      displayPreOwned:[''],
      socialService:[''],
      
    });
    this.http.getBilliing().subscribe((res)=>{
     
      res.forEach( (item:any) => {
    this.bugGetForm.value.searchNew=item.searchNew;
    this.bugGetForm.value.youTube=item.youTube;
    this.bugGetForm.value.searchPreOwned=item.searchPreOwned;
    this.bugGetForm.value.ott=item.ott;
    this.bugGetForm.value.searchService=item.searchService;
    this.bugGetForm.value.salesMail=item.salesMail;
    this.bugGetForm.value.other=item.other;
    this.bugGetForm.value.socialSales=item.socialSales;
    this.bugGetForm.value.serviceMail=item.serviceMail;
    this.bugGetForm.value.displayNew=item.displayNew;
    this.bugGetForm.value.displayPreOwned=item.displayPreOwned;
    this.bugGetForm.value.socialService=item.socialService
      
      });
      this.bugGetForm.patchValue({
      
        searchNew:this.bugGetForm.value.searchNew,
        youTube:this.bugGetForm.value.youTube,
        searchPreOwned:this.bugGetForm.value.searchPreOwned,
        ott:this.bugGetForm.value.ott,
        searchService:this.bugGetForm.value.searchService,
        salesMail:this.bugGetForm.value.salesMail,
        other:this.bugGetForm.value.other,
        socialSales:this.bugGetForm.value.socialSales,
        serviceMail:this.bugGetForm.value.serviceMail,
        displayNew:this.bugGetForm.value.displayNew,
        displayPreOwned:this.bugGetForm.value.displayPreOwned,
        socialService:this.bugGetForm.value.socialService
       
      })
    })
    
  
  }
  currencyipe(e: Event) {
    let data = (e.target as HTMLInputElement).value;
    let controlName = (e.target as HTMLInputElement).name;

    this.bugGetForm.patchValue({
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

 
    this.bugGetForm.patchValue({
      [controlName]: s.split(',').join(''),
    });
  }

  begGetSubmit() {
    
    this.http.postBilling(this.bugGetForm.value).subscribe((res)=>{

    })
    this.bugGetForm.reset()
  }
 
  
}
