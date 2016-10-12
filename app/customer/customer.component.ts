import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from './customer.service'; // using CustomerService from customers

@Component({
    moduleId: module.id,
    selector: 'customer-selector',
    templateUrl: 'customer.component.html',
    providers: [CustomerService] // now 3rd level down has its own service
})
export class CustomerComponent implements OnInit {

    @Input() customer:{id:number,name:string};

    myColor = "gray";

    constructor(){}
    ngOnInit(){}

}
