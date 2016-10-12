import { Component } from '@angular/core';
import { HttpModule  } from '@angular/http';

import { CustomersComponent } from './customer/customers.component';
import { CustomerService } from './customer/customer.service';

@Component({
    moduleId: module.id, //system js variable name for relative path
    selector: 'my-app',
    templateUrl: 'app.component.html',
    providers: [CustomerService, HttpModule] // app level providers
})
export class AppComponent { 
    title = 'Blog Log';
    name = 'test';
    wardsColor = 'green';

    //[] property binding
    //[()] - banana in a box - 2 way binding
    //()event binding

    changeColor(){
        this.wardsColor = this.wardsColor === 'green' ? 'red' : 'green';
    }
}
