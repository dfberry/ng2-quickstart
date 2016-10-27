import { Injectable, Component, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { HttpModule  } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { INCREMENT, DECREMENT, RESET } from '../reducers/counter';

interface AppState {
  counter: number;
}


@Component({
    moduleId: module.id, //system js variable name for relative path
    selector: 'my-app',
    template: `
        <button (click)="increment()">Increment</button>
        <div>Current Count: {{ counter | async }}</div>
        <button (click)="decrement()">Decrement</button>

        <button (click)="reset()">Reset Counter</button>

    `
    ,
    providers: [] // app level providers
})
export class AppComponent {

    counter: Observable<number>;

    constructor(private store: Store<AppState>){
        this.counter = store.select<number>('counter');
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

}
