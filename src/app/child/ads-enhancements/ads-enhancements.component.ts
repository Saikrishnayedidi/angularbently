import { Component, DoCheck, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToggleServiceService } from 'src/app/shared/toggle-service.service';
import { UploadService } from 'src/app/shared/upload.service';

@Component({
  selector: 'app-ads-enhancements',
  templateUrl: './ads-enhancements.component.html',
  styleUrls: ['./ads-enhancements.component.scss'],
})
export class AdsEnhancementsComponent implements OnInit, DoCheck {
  constructor(
    public fb: FormBuilder,
    public _upload: UploadService,
    public _toggle: ToggleServiceService
  ) {}

  ngOnInit(): void {}
  adsEnhancementsForm = this.fb.group({
    optOutOfaApolloSocial: this.fb.group({
      aMothlyFee: [''],
    }),
    dmsIntegration: this.fb.group({
      aMothlyFee: [''],
    }),
    facebookMarketPlace: this.fb.group({
      aMothlyFee: [''],
    }),
    socialSales: this.fb.group({
      aPercentage: [''],
      aMonthlyBudget: [''],
    }),
    socialService: this.fb.group({
      aPercentage: [''],
      aMonthlyBudget: [''],
    }),
    customAdvidTemplate: this.fb.group({
      quantity: [''],
      pricePerFee: [''],
      monthlyBudget: [''],
    }),
  });
  display: { [x: string]: any } = {};
  data!: number;

  obj = [
    {
      fromGroupName: 'socialSales',
      title: 'Sales',
      formGroupName: 'socialSales',
      dataSetName1: 'percentage',
      dataSetName2: 'dollerP',
      name1: 'aPercentage',
      lineAmount: 'aLineAmount1',
      percentage: 'percentage',
      percentageFee: 'apercentageFee',
      monthlyBudget: 'monthlyBudget',
      name2: 'aMonthlyBudget',
    },
  ];
  adsEnancementsFun(
    e: any,
    formGroupName: string,
    formControlName: string,
    lineAmount: string,
    percentage: string,
    percentageFee: string,
    monthlyBudget: string
  ) {
    if ('doller' == e.target.dataset.name) {
      this.display[lineAmount] = parseFloat(e.target.value);
    }

    if ('percentage' == e.target.dataset.name) {
      this.display[percentage] = parseFloat(e.target.value) / 100;
      if (e.target.value.length > 0 && !e.target.value.includes('%')) {
        this.adsEnhancementsForm.patchValue({
          [formGroupName]: {
            [formControlName]: e.target.value + '%',
          },
        });
      }
    }
    if ('dollerP' == e.target.dataset.name) {
      this.display[monthlyBudget] = parseFloat(e.target.value);
      if (e.target.value.length > 0 && !e.target.value.includes('$')) {
        this.adsEnhancementsForm.patchValue({
          [formGroupName]: {
            [formControlName]: '$' + e.target.value + '.00',
          },
        });
      }
    }
    if (
      'percentage' == e.target.dataset.name ||
      'dollerP' == e.target.dataset.name
    ) {
      this.display[percentageFee] =
        this.display[percentage] * (this.display[monthlyBudget] || 0);
      this.display[lineAmount] =
        this.display[percentageFee] + (this.display[monthlyBudget] || 0);
    }
  }
  value!: any;
  adsSlide(e: any) {
    if ('optOut' == e.source.name) {
      if (e.source.checked) {
        this.adsEnhancementsForm
          .get(['optOutOfaApolloSocial', 'aMothlyFee'])
          ?.enable();
        let data =
          this.adsEnhancementsForm.value.optOutOfaApolloSocial.aMothlyFee;
        // this._upload.removeDoller(data).subscribe((res:number)=>{
        // this.value=res
        // })
        this.display.aLineAmount = this.remove(data);
        // this.display.aLineAmount=this.value
      } else {
        this.adsEnhancementsForm
          .get(['optOutOfaApolloSocial', 'aMothlyFee'])
          ?.disable();
        this.display.aLineAmount = 0;
      }
    }

    if ('DMS' == e.source.name) {
      if (e.source.checked) {
        this.adsEnhancementsForm
          .get(['dmsIntegration', 'aMothlyFee'])
          ?.enable();
        let data = this.adsEnhancementsForm.value.dmsIntegration.aMothlyFee;
        // this._upload.removeDoller(data).subscribe((res:number)=>{
        // this.value=res
        // })
        this.display.aLineAmount3 = this.remove(data);
        // this.display.aLineAmount=this.value
      } else {
        this.adsEnhancementsForm
          .get(['dmsIntegration', 'aMothlyFee'])
          ?.disable();
        this.display.aLineAmount3 = 0;
      }
    }

    if ('facebook' == e.source.name) {
      if (e.source.checked) {
        this.adsEnhancementsForm
          .get(['facebookMarketPlace', 'aMothlyFee'])
          ?.enable();
        let data =
          this.adsEnhancementsForm.value.facebookMarketPlace.aMothlyFee;
        // this._upload.removeDoller(data).subscribe((res:number)=>{
        // this.value=res
        // })
        this.display.aLineAmount4 = this.remove(data);
        // this.display.aLineAmount=this.value
      } else {
        this.adsEnhancementsForm
          .get(['facebookMarketPlace', 'aMothlyFee'])
          ?.disable();
        this.display.aLineAmount4 = 0;
      }
    }
  }
  remove(data: any) {
    let m = data.substring(1, data.length);
    let s = parseFloat(m);
    return s;
  }
  quantity!: number;
  pricePer!: number;
  custom(e: any) {
    if ('quantity' == e.target.dataset.name) {
      this.quantity = e.target.value;
    }
    if ('pricePer' == e.target.dataset.name) {
      this.pricePer = e.target.value;
      if (e.target.value.length > 0 && !e.target.value.includes('$')) {
        this.adsEnhancementsForm.patchValue({
          customAdvidTemplate: {
            pricePerFee: '$' + this.pricePer,
          },
        });
      }
    }
    this.display.aLineAmount5 = this.quantity * (this.pricePer || 0);
    this.adsEnhancementsForm.patchValue({
      customAdvidTemplate: {
        monthlyBudget: '$' + this.display.aLineAmount5,
      },
    });
  }
  TotalAdsEnhancements!: number;
  ngDoCheck() {
    this.TotalAdsEnhancements =
      (this.display.aLineAmount || 0) +
      (this.display.aLineAmount1 || 0) +
      (this.display.aLineAmount2 || 0) +
      (this.display.aLineAmount3 || 0) +
      (this.display.aLineAmount4 || 0) +
      (this.display.aLineAmount5 || 0);

    this._toggle.getAdsData(this.TotalAdsEnhancements);
  }
}
