import { BehaviorSubject } from "rxjs";

export class ActivatedRouteStub {
    private subject = new BehaviorSubject(this.testParams);
    private _testParams: any;
  
    get testParams() {
        return this._testParams;
    }

    set testParams(queryParams: any) {
        this._testParams = queryParams;
        this.subject.next(queryParams);
    }
 
    get snapshot() {
        return {
          queryParams: this.testParams,
          params: this.testParams,
        };
      }    
}