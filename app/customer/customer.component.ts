import { Component, Input, OnInit } from '@angular/core';
import { CustomerService } from './customer.service'; // using CustomerService from customers

@Component({
    moduleId: module.id,
    selector: 'customer-selector',
    templateUrl: 'customer.component.html'
})
export class CustomerComponent implements OnInit {

    @Input() customer:{id:number,name:string};

    myColor = "gray";

    constructor(){}
    ngOnInit(){}

}
