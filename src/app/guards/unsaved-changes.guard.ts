import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountsComponent } from '../components/accounts/accounts.component';

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<AccountsComponent> {
  canDeactivate(component: AccountsComponent): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   if(component.accountForm.dirty){
     return window.confirm('you have some unchanged chances')
   }
    return true;
  }
  
}
