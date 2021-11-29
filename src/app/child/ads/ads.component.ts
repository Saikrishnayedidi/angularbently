import { CurrencyPipe } from '@angular/common';
import {
  Component,
  OnInit,
  DoCheck,
  ViewChild,
  ElementRef,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToggleServiceService } from 'src/app/shared/toggle-service.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
})
export class AdsComponent implements OnInit, DoCheck {
  constructor(public fb: FormBuilder, public currencyPipe: CurrencyPipe,public _toggle:ToggleServiceService) {}
  adsForm!: FormGroup;
  adsForms!: FormGroup;
  totalAds!:any
  totalVideos!:any
  totalAd!:any
  ngOnInit(): void {
    this.baseAdvertisingPackage = this.fb.group({
      searchNew: this.fb.group({
        percentage: ['25%'],
        monthlyBudget: [''],
      }),

      searchPreOwned: this.fb.group({
        percentage: [''],
        monthlyBudget: [''],
      }),
      advidNew: this.fb.group({
        percentage: [''],
        monthlyfree: [''],
        monthlyBudget: [''],
      }),
      customAdvid: this.fb.group({
        quantity: [''],
        pricePerFee: [''],
        monthlyBudget: [''],
      }),
      socialSales: this.fb.group({
        percentage: [''],
        monthlyBudget: [''],
      }),

      plusSearchNew: this.fb.group({
        percentage: [''],
        monthlyBudget: [''],
      }),
      plusSearchPreOwned: this.fb.group({
        percentage: [''],
        monthlyBudget: [''],
      }),
      plusAdvidNew: this.fb.group({
        percentage: [''],
        monthlyfree: [''],
        monthlyBudget: [''],
      }),
      plusCustomAdvid: this.fb.group({
        quantity: [''],
        pricePerFee: [''],
        monthlyBudget: [''],
      }),
    });

    this.adsForm = this.fb.group({
      adsForm1: this.fb.group({
        monthleyFee: [''],
      }),
      adsForm2: this.fb.group({
        monthleyFee: [''],
      }),
    });

  
  }
  percentageNum!: number;
  monthlyBudgetNum!: number;
  PercentageFeeNum!: number;
  lineAmountNum!: number;
  data!: string;
  baseAdvertisingPackage!: FormGroup;
  display: { [x: string]: any } = {};

  percentage(
    e: any,
    formGroupName: string,
    PercentageFeeNum: string,
    lineAmountNum: string,
    percentageNum: string,
    monthlyBudgetNum: string,
    monthlyfee: string
  ) {
    if ('parent' == e.target.dataset.name) {
      let data = parseFloat(e.target.value);

      this.display[lineAmountNum] = data;
      if (e.target.value.length > 0) {
        this.adsForm.patchValue({
          [formGroupName]: {
            monthleyFee: '$' + e.target.value,
          },
        });
      }
    }
    if ('percentage' == e.target.dataset.name) {
      this.display[percentageNum] = e.target.value / 100;
      if (e.target.value.length > 0) {
        this.baseAdvertisingPackage.patchValue({
          [formGroupName]: {
            percentage: e.target.value + '%',
          },
        });
      }
    }
    if ('doller' == e.target.dataset.name) {
      if ('monthleyFree' == e.target.name) {
        this.display[monthlyBudgetNum] = e.target.value;
        if (e.target.value.length > 0) {
          this.baseAdvertisingPackage.patchValue({
            [formGroupName]: {
              monthlyBudget: '$' + e.target.value + '.00',
            },
          });
        }
      }
      if ('newColumn' == e.target.id) {
        this.display[monthlyfee] = e.target.value;
        if (e.target.value.length > 0) {
          this.baseAdvertisingPackage.patchValue({
            [formGroupName]: {
              monthlyfree: '$' + e.target.value + '.00',
            },
          });
        }
      }
    }

    this.display[PercentageFeeNum] =
      this.display[percentageNum] * this.display[monthlyBudgetNum];
    //  let PercentageFeeNum1=this.display[PercentageFeeNum]
    let s = parseFloat(this.display[PercentageFeeNum].toString());

    let s1 = parseFloat(this.display[monthlyBudgetNum].toString());
    let s2;
    if ('newColumn' == e.target.id) {
      s2 = parseFloat(this.display[monthlyfee].toString());
    }

    this.defalut = this.baseAdvertisingPackage.value.searchNew.percentage;
    let t = this.defalut.toString();
    let n = parseInt(t.substring(0, this.defalut.length));
    let x = n / 100;
    this.display[PercentageFeeNum] = x * this.display[monthlyBudgetNum];
    let p = x * this.display[monthlyBudgetNum];
    this.display[lineAmountNum] = (s || p) + (s1||0) + (s2 || 0);

    // this.totalBaseAdvertisingPackage=(this.display.lineAmountNum||0)+(this.display.lineAmountNum1||0)(this.display.lineAmountNum2||0)+(this.display.lineAmountNum3||0)(this.display.lineAmountCustom||0)
    //  console.log(this.totalBaseAdvertisingPackage)
  }
  totalBaseAdvertisingPackage!: number;
  defalut!: string;
  customs: { [x: string]: any } = {};
  custom(
    e: any,
    formGroupName: string,
    quantityNum: string,
    pricePerFee: string,
    lineAmount: string
  ) {
    if ('quantity' == e.target.dataset.name) {
      this.customs[quantityNum] = e.target.value;
    }

    if ('doller' == e.target.dataset.name) {
      this.customs[pricePerFee] = e.target.value;

      this.baseAdvertisingPackage.patchValue({
        [formGroupName]: {
          pricePerFee: '$' + this.customs[pricePerFee],
        },
      });
    }
    console.log();
    let s = parseFloat(this.customs[quantityNum].toString());
    let s2 = parseFloat(this.customs[pricePerFee].toString());

    this.display[lineAmount] = s * s2;
  }
  totalPlusAdvertisingPackage!: number;
  ngDoCheck() {
    this.totalBaseAdvertisingPackage =
      (this.display.lineAmountNum0 || 0) +
      (this.display.lineAmountNum1 || 0) +
      (this.display.lineAmountNum || 0) +
      (this.display.lineAmountNum2 || 0) +
      (this.display.lineAmountCustom || 0);

    this.totalPlusAdvertisingPackage =
      (this.display.pluslineAmountNum0 || 0) +
      (this.display.pluslineAmountNum1 || 0) +
      (this.display.pluslineAmountNum || 0) +
      (this.display.pluslineAmountNum2 || 0) +
      (this.display.pluslineAmountCustom || 0);
      
      this._toggle.adsdata.subscribe((res:any)=>{
        this.totalAds=res
      })
  
      this._toggle.videoData.subscribe((res:any)=>{
        this.totalVideos=res
      })

      this.totalAd=(this.totalAds||0)+(this.totalVideos||0)+(this.totalBaseAdvertisingPackage||0)+(this.totalPlusAdvertisingPackage||0)
      this._toggle.getParentAdsData(this.totalAd)
  }
  isNotAllowed = true;
  @ViewChild('line') line!: ElementRef;
  @ViewChild('data1') data1!: ElementRef;
  @ViewChild('checkBox2')
  check2!: ElementRef;
  @ViewChild('checkBox1') check1!: ElementRef;
  isExpand1!: boolean;
  isExpand2!: boolean;

  @Input('isexpand') isexpand!:boolean

  checkbox(e: any) {
    if ('defaultCheck2' == e.target.id) {
      if (e.target.checked) {
        this.check1.nativeElement.checked = false;
        this.isExpand1 = false;
        this.isExpand2 = true;
      
        this.display.PercentageFeeNum = 0;
        this.display.PercentageFeeNum1 = 0;
        this.display.PercentageFeeNum2 = 0;
        this.display.lineAmountNum0 = 0;
        this.display.lineAmountNum = 0;
        this.display.lineAmountNum1 = 0;
        this.display.lineAmountNum3 = 0;
        this.display.lineAmountNum2 = 0;
        this.display.lineAmountCustom = 0;
        // this.data1.nativeElement.disable()
        
      }
      if (e.target.checked) {
        this.adsForm.get(['adsForm2', 'monthleyFee'])?.enable();
        let data = this.adsForm.value.adsForm2.monthleyFee;
        let m = data.substring(1, data.length);
        let s = parseFloat(m);
        this.display.pluslineAmountNum0 = s;
        this.isNotAllowed = true;
      }
      else {
        this.adsForm.get(['adsForm2', 'monthleyFee'])?.disable();
  
        this.display.plusPercentageFeeNum = 0;
        this.display.plusPercentageFeeNum1 = 0;
        this.display.plusPercentageFeeNum2 = 0;
        this.display.pluslineAmountNum0 = 0;
        this.display.pluslineAmountNum = 0;
        this.display.pluslineAmountNum1 = 0;
        this.display.pluslineAmountNum3 = 0;
        this.display.pluslineAmountNum2 = 0;
        this.display.pluslineAmountCustom = 0;
        this.baseAdvertisingPackage.reset();
        this.isNotAllowed = false;
      }


      // this.line.nativeElement.innerText=0
    }
    
    if ('defaultCheck1' == e.target.id) {
      if (e.target.checked) {
        this.check2.nativeElement.checked = false;
        this.isExpand2 = false;
        this.isExpand1 = true;
        this.display.pluslineAmountNum0  =0;
      this.display.pluslineAmountNum1 =0;
      this.display.pluslineAmountNum =0;
      this.display.pluslineAmountNum2 =0;
      this.display.pluslineAmountCustom =0;
       
       
      }

      if (e.target.checked) {
        this.adsForm.get(['adsForm1', 'monthleyFee'])?.enable();
        let data = this.adsForm.value.adsForm1.monthleyFee;
        let m = data.substring(1, data.length);
        let s = parseFloat(m);
        this.display.lineAmountNum0 = s;
        this.isNotAllowed = true;
      }
      else {
        this.adsForm.get(['adsForm1', 'monthleyFee'])?.disable();
  
        this.display.PercentageFeeNum = 0;
        this.display.PercentageFeeNum1 = 0;
        this.display.PercentageFeeNum2 = 0;
        this.display.lineAmountNum0 = 0;
        this.display.lineAmountNum = 0;
        this.display.lineAmountNum1 = 0;
        this.display.lineAmountNum3 = 0;
        this.display.lineAmountNum2 = 0;
        this.display.lineAmountCustom = 0;
        this.baseAdvertisingPackage.reset();
        this.isNotAllowed = false;
      }

     
    }

    
  }
 
}
