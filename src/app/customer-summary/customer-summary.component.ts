import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { MmmToastService } from 'mmm-toast';

import { CustomerDataModel } from '../models/customer-data.model';
import { CustomerUpdateModel } from '../models/customer-update.model';
import { CustomerDataService } from '../services/customer-data.service';

@Component({
  selector: 'app-customer-summary',
  templateUrl: './customer-summary.component.html',
  styleUrls: ['./customer-summary.component.scss']
})
export class CustomerSummaryComponent implements OnInit, OnDestroy {
  updateListenerSub = new Subscription();
  customerData$: Observable<CustomerDataModel> = of();

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerDataService: CustomerDataService,
    private mmmToastService: MmmToastService,
  ) {}

  ngOnInit(): void {
    this.getCustomerData();
    this.listenForUpdates();
  }

  getCustomerData() {
    const customerNumber = this.activatedRoute.snapshot.params['customerNumber'];
    const customerLastName = this.activatedRoute.snapshot.params['customerLastName'];

    this.customerData$ = this.customerDataService.getCustomerData(customerNumber, customerLastName);
  }

  listenForUpdates() {
    this.updateListenerSub = this.customerDataService.customerUpdated$
      .subscribe({
        next: (response: CustomerUpdateModel) => this.showToastMessage(response),
        error: (error: any) => this.showToastMessage(error),
        complete: () => console.log('foo')
      });
  }

  showToastMessage(response: CustomerUpdateModel) {
    const type = response.status === 200 ? 'success' : 'error';

    this.mmmToastService.addToast({ type, message: response.message });
  }

  thing() {
    this.customerDataService.updated();
  }

  ngOnDestroy(): void {
    this.updateListenerSub.unsubscribe();
  }
}
