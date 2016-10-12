import { Component } from '@angular/core';
import { CustomersComponent } from './customers/customers.component';
@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
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
