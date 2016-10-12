import {Injectable} from '@angular/core';

@Injectable()
export class CustomerService{
    constructor(){}

    getCustomers(){
        return [
            {id:1, name:'tom'},
            {id:2, name:'sue'},
            {id:3, name:'jill'}
        ];
    }
}