import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { LoginServiceService } from 'src/app/shared/login-service.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  yearobj = [{ years: 2000 }, { years: 1999 }, { years: 1998 }];
  makeObj = [{ make: 'select Make' }, { make: 'Bently' }];
  modelObj = [{ model: 'Bently' }];
  inventryForm!: FormGroup;
  constructor(
    public fb: FormBuilder,
    public api: LoginServiceService,
    public currencyPipe: CurrencyPipe
  ) {}
  ngOnInit(): void {
    this.inventryForm = this.fb.group({
      stockNumber: [''],
      year: [2000],
      make: ['select Make'],
      model: ['Bently'],
      MSRP: [''],
      sellingPrice: [''],
      invoicePrice: [''],
      stockNumber2: [''],
      year2: [2000],
      make2: ['select Make'],
      model2: ['Bently'],
      MSRP2: [''],
      sellingPrice2: [''],
      invoicePrice2: [''],
      stockNumber3: [''],
      year3: [2000],
      make3: ['select Make'],
      model3: ['Bently'],
      MSRP3: [''],
      sellingPrice3: [''],
      invoicePrice3: [''],
    });

    this.api.getInventary().subscribe((res) => {
      res.forEach((res) => {
        this.inventryForm.patchValue({
          stockNumber: res.stockNumber,
          year: res.year,
          make: res.make,
          model: res.model,
          MSRP: res.MSRP,
          sellingPrice: res.sellingPrice,
          invoicePrice: res.invoicePrice,
          stockNumber2: res.stockNumber2,
          year2: res.year2,
          make2: res.make2,
          model2: res.model2,
          MSRP2: res.MSRP2,
          sellingPrice2: res.sellingPrice2,
          invoicePrice2: res.invoicePrice2,
          stockNumber3: res.stockNumber3,
          year3: res.year3,
          make3: res.make3,
          model3: res.model3,
          MSRP3: res.MSRP3,
          sellingPrice3: res.sellingPrice3,
          invoicePrice3: res.invoicePrice3,
        });
      });
    });
  }
  inventorySubmit() {
    console.log(this.inventryForm.value.MSRP);
    this.api.postInventry(this.inventryForm.value).subscribe((e) => {
      console.log(e);
    });
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
