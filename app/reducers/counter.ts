// counter.ts
import { ActionReducer, Action } from '@ngrx/store';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
export const RESET_COUNTER = 'RESET_COUNTER';
export const CHANGE_COUNTER = 'CHANGECOUNTER';


export const counterReducer: ActionReducer<number> = (state: number = 0, action: Action) => {
    

    switch (action.type) {
        case INCREMENT_COUNTER:
            console.log("counterReducer INCREMENT_COUNTER ");
            return state + 1;

        case DECREMENT_COUNTER:
            console.log("counterReducer DECREMENT_COUNTER ");
            return state - 1;
        case CHANGE_COUNTER:
            console.log("counterReducer CHANGE_COUNTER ");
            return 10;

        case RESET_COUNTER:
            console.log("counterReducer RESET_COUNTER ");
            return 0;

        default:
            console.log("counterReducer default");
            return state;
    }
}