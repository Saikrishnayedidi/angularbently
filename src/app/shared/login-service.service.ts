import { Injectable } from '@angular/core';
import  {HttpClient} from "@angular/common/http";
import{map} from "rxjs/operators"
import { Observable } from 'rxjs';
import { BillingComponent } from '../components/billing/billing.component';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
contacts="http://localhost:3000/contacts"
  constructor(private api:HttpClient ) { }

  getLogin(){
    return this.api.get<any>("http://localhost:3000/user")
}

getContacts(){
  return this.api.get<any>("http://localhost:3000/contacts")
}

postInventry(post:any){
  return this.api.post<any>('http://localhost:3000/invetary',post)
}

postAccounts(post:any){
 return this.api.post("http://localhost:3000/accounts",post)
}
postContacts(post:any){
  return this.api.post<any>(this.contacts,post)
}
postBilling(post:any){
  return this.api.post<any>("http://localhost:3000/billing",post)
}
getBilliing(){
  return this.api.get<any>("http://localhost:3000/billing")
}
getAccounts(){
  return this.api.get<any>("http://localhost:3000/accounts")
}
postAccess(post:any){
  return this.api.post<any>("http://localhost:3000/access",post)
}
getAccess(){
  return this.api.get<any>("http://localhost:3000/access")
}
postGeo(post:any){
  return this.api.post<any>("http://localhost:3000/geo",post)
}

postModel(post:any){
  return this.api.post<any>("http://localhost:3000/model",post)
}
getModel(){
  return this.api.get<any>('http://localhost:3000/model')
}

}


