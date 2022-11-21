import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { CustomerDataModel } from '../models/customer-data.model';
import { CustomerDataService } from '../services/customer-data.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customersList$: Observable<CustomerDataModel[]> | undefined;

  constructor(private customerDataService: CustomerDataService) {}

  ngOnInit(): void {
    this.getCustomerList();
  }

  getCustomerList() {
    this.customersList$ = this.customerDataService.getCustomersList().pipe(tap(console.log));
  }

}
