import {Injectable} from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';
const URL_CUSTOMER = 'app/customers.json';

@Injectable()
export class CustomerService{
    
    constructor(private _http: Http){}

    getCustomersObservable(){
        return this._http.get(URL_CUSTOMER)
        .map((response: Response) => response.json())
        .catch(this._handleErrorObservable);
    }
    _handleErrorObservable(err:any){
        console.log(err); //log this
        //throw(err);
        return Observable.of(err); // pass back for ux
    }

    getCustomersPromise(){
        return this._http.get(URL_CUSTOMER)
            .map((response:Response) => response.json())
            .toPromise()
            .catch((err: any) => {
                console.log(err);
                return Promise.reject(err.message)
            });
    }

    
}