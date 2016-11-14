import { Component, Input } from '@angular/core';
import { Url, AppState, INCREMENT_COUNTER, DECREMENT_COUNTER, RESET_COUNTER, CHANGE_COUNTER } from '../reducers/index';
import { Store } from '@ngrx/store';

@Component({
  selector: 'counter-comp',
  template: `
        <div class='counter'>
        <div>Current Count: {{ counter }}</div>
        <button (click)="increment()">Increment</button>       
        <button (click)="decrement()">Decrement</button>
        <button (click)="change()">Change to 10</button>
        <button (click)="reset()">Reset Counter</button>
        </div>
        
  `
  ,
    styles:[`
        div { width: 100%; }
        .counter { background-color: #99bbff; }
    `]
})
export class CounterComponent {
  @Input() counter: number;

    constructor(private store: Store<AppState>){}

    change(){ this.store.dispatch({ type: CHANGE_COUNTER, payload: 10 });}

    increment(){this.store.dispatch({ type: INCREMENT_COUNTER,  });}

    decrement(){this.store.dispatch({ type: DECREMENT_COUNTER });}

    reset(){this.store.dispatch({ type: RESET_COUNTER });}
}