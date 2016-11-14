// url.ts
import {Injectable} from '@angular/core';
import { ActionReducer, Action, Store } from '@ngrx/store';
import { Http, Response, URLSearchParams, Headers} from '@angular/http';
import { HttpDataService} from '../services/index';
import { Observable } from 'rxjs/Rx';
import { AppState } from './index';

export const ADD_URL = 'ADD_URL';
export const ADD_URLS = 'ADD_URLS';
export const DELETE_URL = 'DELETE_URL';

/** Url definition
 * id: currently next numeric value
 * url: string - currently no checking for valid url string
 */
export interface Url{
    id: number;
    url: string;
}
/** 

    Url NGRX reducer
    @constructor - initialized to empty array
    @param {array} Url - array of current Urls 
    @param {object} action - type of action to apply to current state

*/
export const urlReducer: ActionReducer<Url[]> = (state: Url[] = [], action: Action) => {

    console.log("urlReducer " + action.type);

     switch (action.type) {
        case ADD_URL:
          return [
              ...state,
              action.payload
          ];       
        case ADD_URLS:
          return action.payload;       
        default:
            return state;
    }
}
/**
 * Represents Url state
 * this should be the only entry/exit point for manipulating state
 */
@Injectable()
export class UrlService{

    items:Observable <Url[]>;
    public count: Observable<number>;
    public next: Observable<number>;

    constructor(private store:Store<AppState>, private _httpDataService: HttpDataService){
        this.items = store.select(state => state.urls);
    }

    // get list for json-server 
    loadItems(){
        const baseUrl = 'http://localhost:4200/url';
        let initialItems: Url[];

        this._httpDataService.getJsonPromise(baseUrl)
            .then(data => {
                let thisUrls = data;
                let len = thisUrls.length;
                let next = len + 1;
                this.store.dispatch({type: ADD_URLS, payload: thisUrls});
        });
    }
    // if response from post is equal to url
    // then it was successful
    insertItem(url:Url){
        const postUrl: string =  'http://localhost:4200/url';

        return this._httpDataService.postJsonData(postUrl, url, null)
            .then((data) => {
                JSON.stringify(data) == JSON.stringify(url) ? this.insertToStore(data) : false;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // tell store about change
    private insertToStore(url){
        this.store.dispatch({ type: ADD_URL, payload: url});
    }
}