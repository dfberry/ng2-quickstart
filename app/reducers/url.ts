// url.ts
import { ActionReducer, Action } from '@ngrx/store';
//export const INCREMENT = 'INCREMENT';
//export const DECREMENT = 'DECREMENT';
//export const RESET = 'RESET';

export interface Url{
    id: number;
    name: string;
}

let initialState = function(){
    return [{id:1, name:"Dina"},{id:2, name:"Wayne"},{id:3,name:"kids"}];
}

export const urlReducer: ActionReducer<Url[]> = (state: Url[] = initialState(), action: Action) => {
     console.log("urlReducer action.type " + action.type);
     console.log(JSON.stringify(state));
     switch (action.type) {
        default:
            console.log("urlReducer default");
            console.log(state);
            return state;
    }
}