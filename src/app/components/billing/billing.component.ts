import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnChanges,
  DoCheck,
  AfterViewInit,
} from '@angular/core';
import { ToggleServiceService } from 'src/app/shared/toggle-service.service';
import { MatAccordion } from '@angular/material/expansion';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent
  implements OnInit, OnChanges, DoCheck, AfterViewInit
{
  @ViewChild(MatAccordion)
  isAllowed=false
  storeData!: string;
  disabled: { [x: string]: any } = {};
  apollo: boolean = true;
  apolloText: boolean = true;
  apolloTransact: boolean = true;
  slideToggleValid: boolean = true;
  accordion!: MatAccordion;
  isValid = true;
  billingForm!: FormGroup;
  productsForm!: FormGroup;
  data!: number;
  totalProduct!: string;
  number1!: number;
  number2!: number;
  number3!: number;
  doller: any = 0;
  constructor(
    private _toggleServ: ToggleServiceService,
    private fb: FormBuilder,
    private currencyPipe: CurrencyPipe
  ) {}
  total: number = 0;
  data1!: number;
  data2!: number;
  data3!: number;
  datas = [
    {
      product: 'Apollo',
      fControlName: 'apollo',
      name: 'apollo',
      input: 0,
    },
    {
      product: 'Apollo Text',
      fControlName: 'apolloText',
      name: 'apolloText',
      input: 0,
    },
    {
      product: 'Apollo Transact',
      fControlName: 'apolloTransact',
      name: 'apolloTransact',
      input: 0,
    },
  ];
  servicesForm!: FormGroup;
  ngOnInit() {
    this.billingForm = this.fb.group({
      apollo: [''],
      apolloText: [''],
      apolloTransact: [''],
    });

    this.productsForm = this.fb.group({
      activeCustomer: this.fb.group({
        quantity: [''],
        pricePerFree: [''],
        monthlyBudget: [''],
      }),
      lostCustomer: this.fb.group({
        quantity: [''],
        pricePerFree: [''],
        monthlyBudget1: [''],
      }),
      sameBrands: this.fb.group({
        quantity: [''],
        pricePerFree: [''],
        monthlyBudget2: [''],
      }),
      tradeValue: this.fb.group({
        quantity: [''],
        pricePerFree: [''],
        monthlyBudget3: [''],
      }),
      allInDriveOff: this.fb.group({
        quantity: [''],
        pricePerFree: [''],
        monthlyBudget4: [''],
      }),
    });
    this.servicesForm = this.fb.group({
      ThankYouforPurchase: this.fb.group({
        quantity: [''],
        pricePerFree: [''],
        monthlyBudgets: [''],
      }),
      introToService: this.fb.group({
        quantity: [''],
        pricePerFree: [''],
        monthlyBudgets1: [''],
      }),
    });

    this.billingForm.get('apollo')?.disable();
    this.billingForm.get('apolloText')?.disable();
    this.billingForm.get('apolloTransact')?.disable();
  }
  ngOnChanges() {
  console.log('p',this.RententionTotal)
  this._toggleServ.getParetData(this.total);
  }
  sai: any;
  totalRetentionChild!:number
  serviceTotal!:number
  isToggle=true
  isExpand!:boolean
  totalRention!:any
  toggleALL(e:any){
  debugger
 if('expand'==e.target.id)
 {
  this.isExpand=true
 }

 if('collapse'==e.target.id)
 {
   this.isExpand=false
 }
   this.isToggle=!this.isToggle
 
  }
  ngDoCheck() {
  this._toggleServ.getParetData(this.total);
//     // console.log((this.RententionTotalNum||0)+(this.totalPrecisionMail1Num||0)+(this.totalPrecisionMailNum||0)) 
//      this.totalRetentionChild=(this.RententionTotalNum||0)+(this.totalPrecisionMail1Num||0)+(this.totalPrecisionMailNum||0)
// this.serviceTotal=( this.RententionTotal||0)+(this.RententionTotal2||0)
   this._toggleServ.serviceData.subscribe((res)=>{
      this.serviceTotal=res
   })
   this.totalRention=(this.serviceTotal||0)+(this.TotalPrecisionMail1||0)+(this.TotalPrecisionMail||0)
   this._toggleServ.getRetencation(this.totalRention)
  }
  toggle() {
    this.isValid = !this.isValid;
    this._toggleServ.toggle(this.isValid);
  }

  money(e: Event) {
    debugger
    let data = (e.target as HTMLInputElement).value;
    let controlName = (e.target as HTMLInputElement).name;

    this.billingForm.patchValue({
      [controlName]: this.currencyPipe.transform(
        data.replace(/\D/g, '').replace(/\,/g, ''),
        'USD',
        'symbol',
        '1.0-0'
      ),
    });
    data = data.split(',').join('');

    // // templateDynamic
    // this.datas[0].input = this.billingForm.value.apollo;
    // this.datas[1].input = this.billingForm.value.apolloText;
    // this.datas[2].input = this.billingForm.value.apolloTransact;
    //tend
    // withoutngfor

    let data1 = this.billingForm.value.apollo;
    let data2 = this.billingForm.value.apolloText;
    let data3 = this.billingForm.value.apolloTransact;
    this.data1 = data1.split(',').join('');
    this.data2 = data2.split(',').join('');
    this.data3 = data3.split(',').join('');
    // this.data2=this.billingForm.value.apolloText
    // this.data3=this.billingForm.value.apolloTransact
    // wend

    // this.total=this.datas.reduce((acc:any , curr)=>{
    //   let str=curr.input.toString()
    //  let num= str.substr(1,)
    // templateDYnamic
    // if ('apollo' == (e.target as HTMLInputElement).name) {
    //   let string: string = this.datas[0].input.toString();
    //   let num = string.substring(1, string.length);
    //   this.number1 = parseInt(num);
    // }

    // if ('apolloText' == (e.target as HTMLInputElement).name) {
    //   let string: string = this.datas[1].input.toString();
    //   let num = string.substring(1, string.length);
    //   this.number2 = parseInt(num);
    // }
    // if ('apolloTransact' == (e.target as HTMLInputElement).name) {
    //   let string: string = this.datas[2].input.toString();
    //   let num = string.substring(1, string.length);
    //   this.number3 = parseInt(num);
    // }
    //  tendthi[]thi[]

    // withoutngfor
    if ('apollo' == (e.target as HTMLInputElement).name) {
      let string: string = this.data1.toString();
      let num = string.substring(1, string.length);
      this.number1 = parseInt(num);
    }

    if ('apolloText' == (e.target as HTMLInputElement).name) {
      let string: string = this.data2.toString();
      let num = string.substring(1, string.length);
      this.number2 = parseInt(num);
    }
    if ('apolloTransact' == (e.target as HTMLInputElement).name) {
      let string: string = this.data3.toString();
      let num = string.substring(1, string.length);
      this.number3 = parseInt(num);
    }
    //  wend
    this.total =
      (this.number1 || 0) + (this.number2 || 0) + (this.number3 || 0);

    console.log(this.doller);
    //  let num1= parseInt(num)
    //   return  acc + num1

    // },0)
    this.doller = '$' + this.total;
    console.log('price' + this.doller);
  }
  //  add(e:any){

  //  }

  toggleDisBtn(e: any) {
    debugger
    if (e.checked) {
      // this.disabled['is' + type + 'error']

      if ('apolloText' == e.source.name) {
        this.apolloText = false;
        this.billingForm.get('apolloText')?.enable();
        let string: string = this.data2.toString();
        let num = string.substring(1, string.length);
        this.number2 = parseInt(num);
        this.total =
          (this.number1 || 0) + (this.number2 || 0) + (this.number3 || 0);

        this.doller = '$' + this.total;
      }
      if ('apollo' == e.source.name) {
        this.apollo = false;
        this.billingForm.get('apollo')?.enable();
        let string: string = this.data1.toString();
        let num = string.substring(1, string.length);
        this.number1 = parseInt(num);
        this.total =
          (this.number1 || 0) + (this.number2 || 0) + (this.number3 || 0);
        this.doller = '$' + this.total;
      }
      if ('apolloTransact' == e.source.name) {
        this.apolloTransact = false;
        this.billingForm.get('apolloTransact')?.enable();
        let string: string = this.data3.toString();
        let num = string.substring(1, string.length);
        this.number3 = parseInt(num);
        this.total =
          (this.number1 || 0) + (this.number2 || 0) + (this.number3 || 0);
        this.doller = '$' + this.total;
      }
    } else {
      if ('apollo' == e.source.name) {
        this.apollo = true;
        this.billingForm.get('apollo')?.disable();
        //   let string:string=this.data1.toString()
        // let num=string.substring(1,string.length)
        // this.number1=parseInt(num)
        //   let sub= this.total - this.number1
        //   this.doller="$" + sub
        this.number1 = 0;
        this.total =
          (this.number1 || 0) + (this.number2 || 0) + (this.number3 || 0);

        this.doller = '$' + this.total;
      }
      if ('apolloText' == e.source.name) {
        this.apolloText = true;
        this.billingForm.get('apolloText')?.disable();
        //   let string:string=this.data2.toString()
        // let num=string.substring(1,string.length)
        // this.number2=parseInt(num)
        //   let sub= this.total - this.number2
        //   this.doller="$" + sub
        this.number2 = 0;
        this.total =
          (this.number1 || 0) + (this.number2 || 0) + (this.number3 || 0);

        this.doller = '$' + this.total;
      }
      if ('apolloTransact' == e.source.name) {
        this.apolloTransact = true;
        this.billingForm.get('apolloTransact')?.disable();
        //   let string:string=this.data3.toString()
        // let num=string.substring(1,string.length)
        // this.number3=parseInt(num)
        //   let sub= this.total - this.number3
        //   this.doller="$" + sub
        this.number3 = 0;
        this.total =
          (this.number1 || 0) + (this.number2 || 0) + (this.number3 || 0);

        this.doller = '$' + this.total;
      }
    }
  }
  product1!: number;
  product2!: number;

 

  finaltotal!: number;
  total1!: number;
  total2!: number;
  value1!: number;
  value2!: number;

  storeDatas2: any;

  addDoller1(e: any, id: string, fromGropName: string) {
    console.log(e.target.dataset.name);
    if ('Lost' == e.target.dataset.name) {
      if ('loastQuantity' == e.target.id) {
        this.value1 = e.target.value;
      }
      if ('loastPrice' == e.target.id) {
        this.value2 = e.target.value;
        let data = (e.target as HTMLInputElement).value;
        let controlName = (e.target as HTMLInputElement).name;

        this.productsForm.patchValue({
          [fromGropName]: {
            [controlName]: this.currencyPipe.transform(data, 'USD', 'symbol'),
          },
        });
      }
      let total = this.value1 * (this.value2 || 0);
      this.total1 = total;
      this.productsForm.patchValue({
        [fromGropName]: {
          monthlyBudget: '$' + total,
        },
      });
    }

    if ('Active' == e.target.dataset.name) {
      if ('activeQuantity' == e.target.id) {
        this.value1 = e.target.value;
      }
      if ('activePrice' == e.target.id) {
        this.value2 = e.target.value;
        let data = (e.target as HTMLInputElement).value;
        let controlName = (e.target as HTMLInputElement).name;

        this.productsForm.patchValue({
          [controlName]: this.currencyPipe.transform(data, 'USD', 'symbol'),
        });
      }
      let total1 = this.value1 * (this.value2 || 0);
      this.total2 = total1;
      this.productsForm.patchValue({
        monthlyBudget: '$' + total1,
      });
    }

    this.finaltotal = this.total2 + this.total1;

    //  console.log('total',this.finaltotal)
  }
  obj = [
    {
      eventname: 'Lost',
      fInput: 'activeQuantity',
      lInput: 'activePrice',
      multipleTotal: 'mTotal',
      sumTotal: 'sTotal',
    },
    {
      eventname: 'Lost',
      fInput: 'loastQuantity',
      lInput: 'loastPrice',
      multipleTotal: 'mTotal1',
      sumTotal: 'sTotal1',
    },
    {
      eventname: 'Lost',
      fInput: 'sameBrandsQuantity',
      lInput: 'sameBrandsPrice',
      multipleTotal: 'mTotal2',
      sumTotal: 'sTotal2',
    },
    {
      eventname: 'Lost',
      fInput: 'tradeValueQuantity',
      lInput: 'tradeValuePrice',
      multipleTotal: 'mTotal3',
      sumTotal: 'sTotal3',
    },
    {
      eventname: 'Lost',
      fInput: 'allInDriveOffQuantity',
      lInput: 'allInDriveOffPrice',
      multipleTotal: 'mTotal4',
      sumTotal: 'sTotal4',
    },
  ];

  saiobj = [
    {
      title: 'In-Market(Active Customers)',
      fGroupName: 'activeCustomer',
      formFId: 'activeQuantity',
      formLId: 'activePrice',
      fControlName: 'monthlyBudget',
      multipleTotal: 0,
    },
    {
      title: 'In-Market(Lost Customers)',
      fGroupName: 'lostCustomer',
      formFId: 'loastQuantity',
      formLId: 'loastPrice',
      fControlName: 'monthlyBudget1',
      multipleTotal: 0,
    },
    {
      title: 'Same Brands (Conquest)',
      fGroupName: 'sameBrands',
      formFId: 'sameBrandsQuantity',
      formLId: 'sameBrandsPrice',
      fControlName: 'monthlyBudget2',
      multipleTotal: 0,
    },
    {
      title: 'Trade Value (Customers and Conquests)',
      fGroupName: 'tradeValue',
      formFId: 'tradeValueQuantity',
      formLId: 'tradeValuePrice',
      fControlName: 'monthlyBudget3',
      multipleTotal: 0,
    },
    {
      title: 'All In Drive Off (Customers)',
      fGroupName: 'allInDriveOff',
      formFId: 'allInDriveOffQuantity',
      formLId: 'allInDriveOffPrice',
      fControlName: 'monthlyBudget4',
      multipleTotal: 0,
    },
  ];
  arr: number[] = [];
  storeDatas!: any;
  TotalPrecisionMail!: number;
  addDoller(e: any, id: string, fromGropName: string) {
    for (let i = 0; i < this.obj.length; i++) {
      this.storeDatas = this.obj[i];

      if (this.storeDatas.eventname === e.target.dataset.name) {
        if (this.storeDatas.fInput == e.target.id) {
          this.value1 = e.target.value;
        }
        if (this.storeDatas.lInput == e.target.id) {
          this.value2 = e.target.value;
          let data = (e.target as HTMLInputElement).value;
          let controlName = (e.target as HTMLInputElement).name;

          this.productsForm.patchValue({
            [fromGropName]: {
              [controlName]: this.currencyPipe.transform(data, 'USD', 'symbol'),
            },
          });
        }

        this.storeDatas.multipleTotal = this.value1 * (this.value2 || 0);
        this.arr.push(this.storeDatas.multipleTotal);
        this.productsForm.patchValue({
          [fromGropName]: {
            [id]: '$' + this.storeDatas.multipleTotal,
          },
        });
      }
    }

    let unique = [...new Set(this.arr)];
    let zero = this.productsForm.value.activeCustomer.monthlyBudget;
    let s0 = zero.substring(1, zero.length);
    let n0 = parseFloat(s0);
    let one = this.productsForm.value.lostCustomer.monthlyBudget1;
    let s1 = one.substring(1, one.length);
    // console.log(s1)
    let n1 = parseFloat(s1);
    let two = this.productsForm.value.sameBrands.monthlyBudget2;
    let s2 = two.substring(1, two.length);
    let n2 = parseFloat(s2);
    // console.log(s2)
    let three = this.productsForm.value.tradeValue.monthlyBudget3;
    let s3 = three.substring(1, three.length);
    let n3 = parseFloat(s3);
    let four = this.productsForm.value.allInDriveOff.monthlyBudget4;
    let s4 = four.substring(1, four.length);
    let n4 = parseFloat(s4);
    // console.log(s3)
    //  console.log('all',this.productsForm.value.activeCustomer.monthlyBudget+this.productsForm.value.lostCustomer.monthlyBudget1+this.productsForm.value.sameBrands.monthlyBudget2 + this.productsForm.value.tradeValue.monthlyBudget3+this.productsForm.value.allInDriveOff.monthlyBudget4)
    //  console.log('4',this.productsForm.value.allInDriveOff.monthlyBudget4)
    //  console.log("sum",(s0||0)+(s1||0)+(s2||0)+(s3||0)+(s4||0))
    this.totalPrecisionMailNum=(n0 || 0) + (n1 || 0) + (n2 || 0) + (n3 || 0) + (n4 || 0);
    let sum = (n0 || 0) + (n1 || 0) + (n2 || 0) + (n3 || 0) + (n4 || 0);

    this.TotalPrecisionMail =  sum;
  }

  saiObj1 = [
    {
      title: 'Thank You for Purchase (Customers)',
      fGroupName: 'ThankYouforPurchase',
      formFId: 'customersPurchase',
      formLId: 'customersPrice',
      fControlName: 'monthlyBudgets',
      multipleTotal: 0,
    },
    {
      title: 'Intro to Service (Customers)',
      fGroupName: 'introToService',
      formFId: 'customersintroToService',
      formLId: 'customersintroToS',
      fControlName: 'monthlyBudgets1',
      multipleTotal: 0,
    },
  ];
  obj1 = [
    {
      eventname: 'customer',
      fInput: 'customersPurchase',
      lInput: 'customersPrice',
      multipleTotal: 'mTotal1',
      sumTotal: 'sTotal1',
    },
    {
      eventname: 'customer',
      fInput: 'customersintroToService',
      lInput: 'customersintroToS',
      multipleTotal: 'mTotal2',
      sumTotal: 'sTotal2',
    },
  ];
  TotalPrecisionMail1!: number;
  addDoller2(e: any, id: string, fromGropName: string) {
    for (let i = 0; i < this.obj1.length; i++) {
      this.storeDatas2 = this.obj1[i];

      if (this.storeDatas2.eventname === e.target.dataset.name) {
        if (this.storeDatas2.fInput == e.target.id) {
          this.value1 = e.target.value;
        }
        if (this.storeDatas2.lInput == e.target.id) {
          this.value2 = e.target.value;
          let data = (e.target as HTMLInputElement).value;
          let controlName = (e.target as HTMLInputElement).name;

          this.servicesForm.patchValue({
            [fromGropName]: {
              [controlName]: this.currencyPipe.transform(data, 'USD', 'symbol'),
            },
          });
        }

        this.storeDatas2.multipleTotal = this.value1 * (this.value2 || 0);
        this.arr.push(this.storeDatas2.multipleTotal);
        this.servicesForm.patchValue({
          [fromGropName]: {
            [id]: '$' + this.storeDatas2.multipleTotal,
          },
        });
      }
    }
    let one = this.servicesForm.value.ThankYouforPurchase.monthlyBudgets;
    let s1 = one.substring(1, one.length);
    // // console.log(s1)
    let n1 = parseFloat(s1);
    let two = this.servicesForm.value.introToService.monthlyBudgets1;
    let s2 = two.substring(1, two.length);
    let n2 = parseFloat(s2);
    // // console.log(s2)
    // // let three=this.productsForm.value.tradeValue.monthlyBudget3
    // // let s3=three.substring(1,three.length)
    // // let n3=parseFloat(s3)
    // // let four=this.productsForm.value.allInDriveOff.monthlyBudget4
    // // let s4=three.substring(1,four.length)
    // // let n4=parseFloat(s4)
    // // console.log(s3)
    // // console.log(this.productsForm.value.lostCustomer.monthlyBudget1 + this.productsForm.value.sameBrands.monthlyBudget12 + this.productsForm.value.tradeValue.monthlyBudget3)
    this.totalPrecisionMail1Num=(n1 || 0) + (n2 || 0);
    let sum = (n1 || 0) + (n2 || 0);
    // console.log(sum)
    this.TotalPrecisionMail1 =  sum;
    // console.log(this.servicesForm.value.introToService.monthlyBudgets1)
  }
  totalPrecisionMailNum!:number
  totalPrecisionMail1Num!:number

  @ViewChild('check2')
  check2!: ElementRef;
  @ViewChild('check1')
  check1!: ElementRef;
 @ViewChild('parent2')
 parent2!:ElementRef
  ngAfterViewInit() {}
 
  formGroupName!: string;
  lineAmount!: number;
  valus1!: number;
  valus2!:number
  display: { [y: string]: any } = {};
 
 

  
  RententionTotalNum!:number
  RententionTotal!: number;
  RententionTotal2!: number;
 
 

  @ViewChild('disables') disable!:ElementRef


}
