import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MmmToastModule } from 'mmm-toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerSummaryComponent } from './customer-summary/customer-summary.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerDataService } from './services/customer-data.service';

@NgModule({
  declarations: [
    AppComponent,
    CustomerSummaryComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MmmToastModule,
  ],
  providers: [CustomerDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
