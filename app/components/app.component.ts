import { Injectable, Component, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { HttpModule  } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { INCREMENT, DECREMENT, RESET, Url } from '../reducers/index';
import { ListComponent, UrlListComponent} from './index'
interface AppState {
  counter: number;
  urls : Url[]
}

@Component({
    moduleId: module.id, //system js variable name for relative path
    selector: 'my-app',
    template: `
        <button (click)="increment()">Increment</button>
        <div>Current Count: {{ counter | async }}</div>
        <button (click)="decrement()">Decrement</button>

        <button (click)="reset()">Reset Counter</button>

        <url-list [urls]="urls"></url-list>
        <list [innerArray]="myarray"></list>
    `,
    providers: []
})
export class AppComponent {

    counter: Observable<number>;
    urls: Url[];
    myarray: number[] = [];

    constructor(private store: Store<AppState>){
        console.log('AppComponent constructor');
        this.counter = store.select<number>('counter');
        this.store.select(state => state.urls)
          .subscribe(data => this.onUrlsEmitted(data));

        this.myarray.push(1);
        this.myarray.push(2);
        this.myarray.push(3);

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
            console.log('AppComponent ngOnInit');
    }
    // executed once user data arrives from the store
    public onUrlsEmitted(data:Url[]){
        this.urls = data;
        if(!data || !data.length){ 
            console.log("no url data arrived");
        }
    }
}
