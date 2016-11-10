// url.ts
import { ActionReducer, Action } from '@ngrx/store';

export const ADD_URL = 'ADD_URL';

export interface Url{
    id: number;
    url: string;
}

let initialState = function(){
    return [{id:1, url:"Dina"},{id:2, url:"Wayne"},{id:3,url:"kids"}];
}

export const urlReducer: ActionReducer<Url[]> = (state: Url[] = initialState(), action: Action) => {
     switch (action.type) {
        case ADD_URL:
            console.log("urlReducer ADD_URL ");
          return [
              ...state,
              action.payload
          ];       
        default:
            console.log("urlReducer select/default");
            return state;
    }
}