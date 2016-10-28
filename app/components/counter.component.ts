import { Component, Input } from '@angular/core';
import { Url, AppState, INCREMENT, DECREMENT, RESET } from '../reducers/index';
import { Store } from '@ngrx/store';

@Component({
  selector: 'counter-comp',
  template: `
        <div>Current Count: {{ counterval | async }}</div>
        <button (click)="increment()">Increment</button>       
        <button (click)="decrement()">Decrement</button>
        <button (click)="reset()">Reset Counter</button>
  `
})
export class CounterComponent {
  @Input() counterval: number;

    constructor(private store: Store<AppState>){
    }

    increment(){
        this.store.dispatch({ type: INCREMENT });
    }

    decrement(){
        this.store.dispatch({ type: DECREMENT });
    }

    reset(){
        this.store.dispatch({ type: RESET });
    }
    ngOnInit() {
            console.log('CounterComponent input: ' + this.counterval);
    }
}