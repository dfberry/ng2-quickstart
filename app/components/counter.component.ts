import { Component, Input } from '@angular/core';
import { Url, AppState, INCREMENT, DECREMENT, RESET } from '../reducers/index';
import { Store } from '@ngrx/store';

@Component({
  selector: 'counter-comp',
  template: `
        <div class='counter'>
        <div>Current Count: {{ counter }}</div>
        <button (click)="increment()">Increment</button>       
        <button (click)="decrement()">Decrement</button>
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

    constructor(private store: Store<AppState>){
    }

    increment(){
        console.log("counter.component.ts increment");
        this.store.dispatch({ type: INCREMENT });
    }

    decrement(){
        console.log("counter.component.ts decrement");
        this.store.dispatch({ type: DECREMENT });
    }

    reset(){
        console.log("counter.component.ts reset");
        this.store.dispatch({ type: RESET });
    }
    ngOnInit() {
        console.log('CounterComponent input: ' + this.counter);
    }
}