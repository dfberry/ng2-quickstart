import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'customer-selector',
    templateUrl: 'app/customer/customer.component.html'
})
export class CustomerComponent implements OnInit {

    @Input() customer:{id:number,name:string};

    constructor(){}
    ngOnInit(){}

}
