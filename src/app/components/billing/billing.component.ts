import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnChanges,
  DoCheck,
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
export class BillingComponent implements OnInit, OnChanges, DoCheck {
  @ViewChild(MatAccordion)
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

  ngOnInit() {
    this.billingForm = this.fb.group({
      apollo: [''],
      apolloText: [''],
      apolloTransact: [''],
    });

    this.productsForm = this.fb.group({
      quantity: [''],
      pricePerFree: [''],
      monthlyBudget: [''],
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
      allInDriveOff:this.fb.group({
        quantity: [''],
        pricePerFree: [''],
        monthlyBudget4: [''],
      })
    });

    this.billingForm.get('apollo')?.disable();
    this.billingForm.get('apolloText')?.disable();
    this.billingForm.get('apolloTransact')?.disable();
  }
  ngOnChanges() {}
  sai: any;
  ngDoCheck() {
    this._toggleServ.getParetData(this.total);

    // let s=this.totalProduct.toString()
    // let doller="$"+s
  }
  toggle() {
    this.isValid = !this.isValid;
    this._toggleServ.toggle(this.isValid);
  }

  money(e: Event) {
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

    // templateDynamic
    this.datas[0].input = this.billingForm.value.apollo;
    this.datas[1].input = this.billingForm.value.apolloText;
    this.datas[2].input = this.billingForm.value.apolloTransact;
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
    if ('apollo' == (e.target as HTMLInputElement).name) {
      let string: string = this.datas[0].input.toString();
      let num = string.substring(1, string.length);
      this.number1 = parseInt(num);
    }

    if ('apolloText' == (e.target as HTMLInputElement).name) {
      let string: string = this.datas[1].input.toString();
      let num = string.substring(1, string.length);
      this.number2 = parseInt(num);
    }
    if ('apolloTransact' == (e.target as HTMLInputElement).name) {
      let string: string = this.datas[2].input.toString();
      let num = string.substring(1, string.length);
      this.number3 = parseInt(num);
    }
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

  //  quantity(e:any){
  // // console.log(this.productsForm.value.quantity)
  // if("loastQuantity"==e.target.id){
  //   let data=e.target.value
  //   this.product1=parseFloat(data)

  // //   let s=(this.product1*(this.product2||0)).toString()
  // //   let doller='$'+s

  // //  this.totalProduct=doller
  //  this.productsForm.patchValue({
  //   lostCustomer:{
  //     monthlyBudget:this.totalProduct
  //   }

  // })

  // }
  // if("activeQuantity"==e.target.id){
  //   let data=e.target.value
  //   this.product1=parseFloat(data)

  //   // let s=(this.product1*(this.product2||0)).toString()
  //   // let doller='$'+s
  //   // this.totalProduct=doller
  //   this.productsForm.patchValue({

  //       monthlyBudget:this.totalProduct

  //   })

  // }

  //  }
  //    addDoller(e:any){
  //     if("loastPrice"==e.target.id){
  //       let data = (e.target as HTMLInputElement).value;
  //       let controlName = (e.target as HTMLInputElement).name;
  //     console.log(data)
  //       this.productsForm.patchValue({
  //         lostCustomer:{
  //           [controlName]: this.currencyPipe.transform(
  //             data,
  //                 'USD',
  //                 'symbol',

  //               ),
  //         }

  //       });
  //       this.product2=parseFloat(data)
  //       let s=(this.product1*this.product2).toString()
  //       let doller='$'+s

  //      this.totalProduct=doller
  //      this.productsForm.patchValue({
  //       lostCustomer:{
  //         monthlyBudget:this.totalProduct
  //       }

  //     })

  //     }

  //    if("activePrice"==e.target.id){
  //    let data = (e.target as HTMLInputElement).value;
  //    let controlName = (e.target as HTMLInputElement).name;
  //  console.log(data)
  //    this.productsForm.patchValue({

  //        [controlName]: this.currencyPipe.transform(
  //          data,
  //              'USD',
  //              'symbol',

  //            ),

  //    });
  //    this.product2=parseFloat(data)
  //    let s=(this.product1*this.product2).toString()
  //    let doller='$'+s

  //   this.totalProduct=doller

  //   this.productsForm.patchValue({

  //     monthlyBudget:this.totalProduct

  // })
  //   }
  //    }

  finaltotal!: number;
  total1!: number;
  total2!: number;
  value1!: number;
  value2!: number;

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
    }
  ];

  saiobj = [
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
    }
  ];
  arr: number[] = [];
  storeDatas!: any;
  TotalPrecisionMail!:string
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
  this.arr.push(this.storeDatas.multipleTotal)
        this.productsForm.patchValue({
          [fromGropName]: {
            [id]: '$' + this.storeDatas.multipleTotal,
          },
        });
      }
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
    let unique=[...new Set(this.arr)]

    let one=this.productsForm.value.lostCustomer.monthlyBudget1
    let s1=one.substring(1,one.length)
    // console.log(s1)
    let n1=parseFloat(s1)
    let two=this.productsForm.value.sameBrands.monthlyBudget2
    let s2=two.substring(1,two.length)
    let n2=parseFloat(s2)
    // console.log(s2)
    let three=this.productsForm.value.tradeValue.monthlyBudget3
    let s3=three.substring(1,three.length)
    let n3=parseFloat(s3)
    let four=this.productsForm.value.allInDriveOff.monthlyBudget4
    let s4=three.substring(1,four.length)
    let n4=parseFloat(s4)
    // console.log(s3)
    // console.log(this.productsForm.value.lostCustomer.monthlyBudget1 + this.productsForm.value.sameBrands.monthlyBudget12 + this.productsForm.value.tradeValue.monthlyBudget3)
         let sum= (n1||0)+(n2||0)+(n3||0)+(n4||0)+(this.total2||0)

    this.TotalPrecisionMail="$"+sum
  }

  
}
