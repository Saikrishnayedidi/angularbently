import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType} from '@angular/common/http';
import { Observable, of } from 'rxjs';
// import { BillingComponent } from '../components/billing/billing.component';


@Injectable({
  providedIn: 'root'
})
export class UploadService {
// product1!:number
// product2!:number
  

  constructor(private http: HttpClient,) { }

 
// quality(data:any){
//   this.component.product1=parseFloat(data) 
//   let s=(this.component.product1*(this.component.product2||0)).toString()
//   let doller='$'+s
 
//  this.component.totalProduct=doller
//  this.component.productsForm.patchValue({
//   lostCustomer:{
//     monthlyBudget:this.component.totalProduct
//   }
 
// })
// }
 value!:number
removeDoller(data:any):Observable<any>{
 
  let m=data.substring(1,data.length)
 this.value=parseFloat(m)
   
 return of(this.value)
  
}
  
}
