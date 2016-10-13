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
    customersPromise: Promise<any>[];
    customersNoPromise: any[];
    customersSubscribe: Observable<any>[];

    errorMsg: string;

    constructor(private _customerService: CustomerService){}

    // not called automatically by testing
    // but is called by angular
    ngOnInit(){

        this._customerService.getCustomersObservable()
            .subscribe(
                (customers ) => this.customersSubscribe = customers,
                (err) => {console.log(err);}
            );


        this.customersObservable = this._customerService.getCustomersObservable()
        .catch((err) => {
            console.log(err);
            return Observable.of(err); // eating error
        });

        this.customersPromise = this._customerService.getCustomersPromise()
        .catch((err) => {
            console.log(err);
        }); 

        this._customerService.getCustomersPromise()
            .then((customers) => this.customersNoPromise = customers)
            .catch((err) => {
                console.log(err);
            });       

        console.log("observables & promise - 4");
    }

}