import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs/Rx';

import { CustomerComponent } from './customer.component';
import { CustomerService } from './customer.service';

@Component({
    moduleId: module.id,
    selector: 'customers-selector',
    templateUrl: 'customers.component.html',
    providers: [CustomerService]
})
export class CustomersComponent implements OnInit {
    customersObservable: Observable<any>[];
    customersPromise: Observable<any>[];
    errorMsg: string;

    constructor(private _customerService: CustomerService){}

    // not called automatically by testing
    // but is called by angular
    ngOnInit(){
        this.customersObservable = this._customerService.getCustomersObservable()
        .catch((err) => {
            console.log(err);
            return Observable.of(err); // eating error
        });

        this.customersPromise = this._customerService.getCustomersPromise()
        .catch((err) => {
            console.log(err);
            return Observable.of(err); // eating error
        });        

        console.log("observables & promise");
    }

}