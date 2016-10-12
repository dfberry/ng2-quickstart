import { Component, OnInit } from '@angular/core';
import { CustomerComponent } from '../customer/customer.component';

@Component({
    moduleId: module.id,
    selector: 'customers-selector',
    templateUrl: 'customers.component.html'
})
export class CustomersComponent implements OnInit {
    customers = [
        {id:1, name:'tom'},
        {id:2, name:'sue'},
        {id:3, name:'jill'}
    ];
    constructor(){}
    ngOnInit(){}

}