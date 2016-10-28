// url.ts
import { ActionReducer, Action } from '@ngrx/store';
//export const INCREMENT = 'INCREMENT';
//export const DECREMENT = 'DECREMENT';
//export const RESET = 'RESET';

export interface Url{
    id: number;
}

let initialState = function(){
    return [{id:1},{id:2},{id:3}];
}

export const urlReducer: ActionReducer<Url[]> = (state: Url[] = initialState(), action: Action) => {
    switch (action.type) {
        default:
            console.log("urlReducer default");
            console.log(state);
            return state;
    }
}