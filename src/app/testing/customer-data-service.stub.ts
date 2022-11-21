import { BehaviorSubject, Subject } from "rxjs";

export class CustomerDataServiceStub {
    customerUpdated$ = new Subject();

    getCustomerData(customerNumber: string, customerLastName: string): any {}

    update() {
        this.customerUpdated$.next({message: 'updated', status: 200});
    }
}