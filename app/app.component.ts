import { Component } from '@angular/core';
import { CustomersComponent } from './customer/customers.component';
@Component({
    moduleId: module.id, //system js variable name for relative path
    selector: 'my-app',
    templateUrl: 'app.component.html'
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
