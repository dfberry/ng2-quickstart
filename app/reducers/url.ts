// url.ts
import { ActionReducer, Action } from '@ngrx/store';

export const ADD_URL = 'ADD_URL';

export interface Url{
    id: number;
    name: string;
}

let initialState = function(){
    return [{id:1, name:"Dina"},{id:2, name:"Wayne"},{id:3,name:"kids"}];
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