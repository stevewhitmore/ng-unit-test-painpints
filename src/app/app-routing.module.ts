import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerSummaryComponent } from './customer-summary/customer-summary.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  { path: '',   redirectTo: '/customers', pathMatch: 'full' }, // redirect to
  { path: 'customers', component: CustomersComponent },
  { path: 'customers/:customerNumber/:customerLastName', component: CustomerSummaryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
