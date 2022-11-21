import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { CustomerDataModel } from "../models/customer-data.model";

@Injectable({
    providedIn: 'root',
})
export class CustomerDataService {
    customerUpdated$ = new BehaviorSubject({message: 'Yay!', status: 200});
    customerList = [
        {
            firstName: 'John',
            lastName: 'Doe',
            customerNumber: '12345',
            memberSince: new Date('11/11/2011'),
            email: 'johndoe@email.com',
            phone: '555-777-9999',
        }
    ];

    getCustomersList(): Observable<CustomerDataModel[]> {
        return of(this.customerList)
    }

    getCustomerData(customerNumber: string, customerLastName: string): Observable<CustomerDataModel> {
        const customerData = this.customerList.find(c => c.customerNumber === customerNumber && c.lastName === customerLastName);
        return customerData ? of(customerData) : throwError(() => new Error('customer not found'));
    }

    updated() {
        this.customerUpdated$.next({message: 'updated', status: 200});
    }
}
