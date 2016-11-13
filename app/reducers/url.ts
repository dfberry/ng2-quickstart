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
export const SELECT_NEXT_ID = 'SELECT_NEXT_ID';

export interface Url{
    id: number;
    url: string;
}

let initialState = function(){
    return [{id:1, url:"Dina"},{id:2, url:"Wayne"},{id:3,url:"kids"}];
}

export const urlReducer: ActionReducer<Url[]> = (state: Url[] = initialState(), action: Action) => {
     switch (action.type) {
        case ADD_URL:console.log("urlReducer ADD_URL ");
          return [
              ...state,
              action.payload
          ];       
        case ADD_URLS:
            //console.log("urlReducer ADD_URLS action.payload = " + JSON.stringify(action.payload));
          return action.payload;       
        case DELETE_URL:
            //console.log("urlReducer delete");
            return state;
        default:
            //console.log("urlReducer select/default");
            return state;
    }
}

export const urlNextIdReducer = (state: any = 0, {type, payload}) => {
  switch (type) {
    case 'SELECT_NEXT_ID':
        console.log("nextId " + payload);
      return payload;
    default:
      return state;
  }
};

@Injectable()
export class UrlService{

    items:Observable <Url[]>;
    public count: Observable<number>;
    public next: Observable<number>;

    constructor(private store:Store<AppState>, private _httpDataService: HttpDataService){
        //console.log("UrlService::c'tor");
        this.items = store.select(state => state.urls);
        this.next = store.select(state => state.nextUrlId);
    }


    loadItems(){
        console.log("loadItems");
        const baseUrl = 'http://localhost:4200/db';
        let initialItems: Url[];

        this._httpDataService.getJsonPromise(baseUrl)
            .then(data => {
                let thisUrls = data.url;
                //console.log("UrlServiceLoadItems " + JSON.stringify(thisUrls));
                let len = thisUrls.length;
                let next = len + 1;
                //console.log("NextId = " + next);
                this.store.dispatch({type: ADD_URLS, payload: thisUrls});
                this.store.dispatch({type: SELECT_NEXT_ID, payload: next});
        });
    }
    // if response from post is equal to url
    // then it was successful
    insertItem(url:Url){
        let newUrl:Url;
        let postUrl: 'http://localhost:4200/url';
        //this._httpDataService.postJsonData(postUrl, JSON.stringify(url), null)

        return this._httpDataService.postJsonData(postUrl, JSON.stringify(url), null)
            .then((data) => {
                newUrl = data;
                JSON.stringify(newUrl) == JSON.stringify(url) ? this.insertToStore(newUrl) : false;
            })
            .catch((err) => {
                console.log(err);
            });
    }
    private insertToStore(url){
        this.store.dispatch({ type: ADD_URL, payload: url});
    }
}