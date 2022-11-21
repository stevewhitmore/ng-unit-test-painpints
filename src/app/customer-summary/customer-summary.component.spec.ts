import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { CustomerDataService } from '../services/customer-data.service';
import { ActivatedRouteStub } from '../testing/activated-route.stub';
import { CustomerDataServiceStub } from '../testing/customer-data-service.stub';
import { MmmToastServiceStub } from '../testing/mmm-toast-service.stub';

import { CustomerSummaryComponent } from './customer-summary.component';

const activatedRouteStub = new ActivatedRouteStub();
const customerDataServiceStub = new CustomerDataServiceStub();
const mmmToastServiceStub = new MmmToastServiceStub();

describe('CustomerSummaryComponent', () => {
  let component: CustomerSummaryComponent;
  let fixture: ComponentFixture<CustomerSummaryComponent>;
  let mockRoute: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSummaryComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: CustomerDataService, useValue: customerDataServiceStub },
        { provide: MmmToastServiceStub, useValue: mmmToastServiceStub },
      ],
    });

    fixture = TestBed.createComponent(CustomerSummaryComponent);
    component = fixture.componentInstance;

    mockRoute = { customerNumber: '1234', customerLastName: 'Smith' };
    activatedRouteStub.testParams = mockRoute;
  });


  describe('getCustomerData()', () => {
    it('should call "customerDataService.getCustomerData()" with the route params', () => {
      const spy = spyOn(customerDataServiceStub, 'getCustomerData');

      component.getCustomerData();

      expect(spy).toHaveBeenCalledOnceWith(mockRoute.customerNumber, mockRoute.customerLastName);
    });

    it('should put the returned value in an observable', fakeAsync(() => {
      spyOn(customerDataServiceStub, 'getCustomerData').and.returnValue(of('fart'));
      
      component.getCustomerData();
      
      component.customerData$
        .subscribe({
          next: (response: any) => {
            expect(response).toEqual('fart')
          }
        });
    
      flush();
    }));
  });

  describe('listenForUpdates()', () => {
    it('should call "showToastMessage()" with response', fakeAsync(() => {
      const spy = spyOn(component, 'showToastMessage');
      customerDataServiceStub.update();

      customerDataServiceStub.customerUpdated$
        .subscribe({
          next: () => expect(spy).toHaveBeenCalledTimes(1)
        });

      component.listenForUpdates();
    }));
  });
});
