import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeloginComponent } from './components/homelogin/homelogin.component';
import { HomeComponent } from './components/home/home.component';
import { NaviconsHomeComponent } from './components/navicons-home/navicons-home.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { SidenavbarComponent } from './components/sidenavbar/sidenavbar.component';
import { ServicesComponent } from './components/services/services.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { UnsavedChangesGuard } from './guards/unsaved-changes.guard';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { PhoneFormatPipe } from './pipes/phone-format.pipe';
import { CurrencyPipe } from '@angular/common';
import { BudgetComponent } from './components/budget/budget.component';
import { NgxMaskModule } from 'ngx-mask';
import { AccessComponent } from './components/access/access.component';
import { ExpectationsComponent } from './components/expectations/expectations.component';
import { AdvertisingComponent } from './components/advertising/advertising.component';
import { GeoComponent } from './components/geo/geo.component';
import { MeasurementComponent } from './components/measurement/measurement.component';
import { BillingComponent } from './components/billing/billing.component';
import { ToastrModule } from 'ngx-toastr';
import { MatSliderModule } from '@angular/material/slider';
import { ChildSideNaveComponent } from './components/child-side-nave/child-side-nave.component';
import { MaterialModule } from './material/material.module';
import { AdsComponent } from './child/ads/ads.component';
import { VideoComponent } from './child/video/video.component';
import { AdsEnhancementsComponent } from './child/ads-enhancements/ads-enhancements.component';
import { ServiceComponent } from './child/service/service.component';
import { DigitalSeoComponent } from './child/digital-seo/digital-seo.component';
import { SocialMediaComponent } from './child/social-media/social-media.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeloginComponent,
    HomeComponent,
    NaviconsHomeComponent,
    ContactsComponent,
    SidenavbarComponent,
    ServicesComponent,
    AccountsComponent,
    InventoryComponent,
    PhoneFormatPipe,
    BudgetComponent,
    AccessComponent,
    ExpectationsComponent,
    AdvertisingComponent,
    GeoComponent,
    MeasurementComponent,
    BillingComponent,
    ChildSideNaveComponent,
    AdsComponent,
    VideoComponent,
    AdsEnhancementsComponent,
    ServiceComponent,
    DigitalSeoComponent,
    SocialMediaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    ToastrModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MaterialModule,
    ToastrModule.forRoot({
      timeOut:2000,
      positionClass:'toast-top-right',
      preventDuplicates:true,
    })
  ],
   providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},UnsavedChangesGuard,CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
