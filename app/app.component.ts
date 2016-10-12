import { Component } from '@angular/core';
import { CustomerComponent } from './customer/customer.component';
@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'

})
export class AppComponent { 
    title = 'Blog Log';
    name = 'test';
    wardsColor = 'green';

    customers = [
        {id:1, name:'tom'},
        {id:2, name:'sue'},
        {id:3, name:'jill'}
    ];

    //[] property binding
    //[()] - banana in a box - 2 way binding
    //()event binding

    changeColor(){
        this.wardsColor = this.wardsColor === 'green' ? 'red' : 'green';
    }
}
