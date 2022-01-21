import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccessComponent } from './components/access/access.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AdvertisingComponent } from './components/advertising/advertising.component';
import { BillingComponent } from './components/billing/billing.component';
import { BudgetComponent } from './components/budget/budget.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ExpectationsComponent } from './components/expectations/expectations.component';
import { GeoComponent } from './components/geo/geo.component';
import { HomeComponent } from './components/home/home.component';
import { HomeloginComponent } from './components/homelogin/homelogin.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { MeasurementComponent } from './components/measurement/measurement.component';
import { NaviconsHomeComponent } from './components/navicons-home/navicons-home.component';
import { ServicesComponent } from './components/services/services.component';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { UnsavedChangesGuard } from './guards/unsaved-changes.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeloginComponent,
  },
  
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'nav',
        component: NaviconsHomeComponent,
       
      },{ path:'billing',component:BillingComponent,canDeactivate:[UnsavedChangesGuard]},
      
      {
        path: 'sidenav',
        component: SidenavbarComponent,
        children: [
          { path: 'inventor', component: InventoryComponent },
          { path: 'accounts', component: AccountsComponent,canDeactivate:[UnsavedChangesGuard] },
          { path: 'contacts', component: ContactsComponent,canDeactivate:[UnsavedChangesGuard] },
          { path: 'budget', component: BudgetComponent },
          {path:'access',component:AccessComponent},
          {path:'expectations',component:ExpectationsComponent},
          {path:'geo',component:GeoComponent},
          {path:'measurement',component:MeasurementComponent},
          {path:'advertising',component:AdvertisingComponent,}
          
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
