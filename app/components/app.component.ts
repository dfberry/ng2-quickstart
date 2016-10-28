import { Injectable, Component, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { HttpModule  } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { INCREMENT, DECREMENT, RESET, Url } from '../reducers/index';
import { ListComponent, UrlListComponent, CounterComponent} from './index'

export interface AppState {
  counter: number;
  urls : Url[]
}

@Component({
    moduleId: module.id, //system js variable name for relative path
    selector: 'my-app',
    template: `
        <counter-comp [counter]="counter" ></counter-comp>
        <url-list [urls]="urls"></url-list>
        <list [innerArray]="myarray"></list>
    `,
    providers: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    counter: number;
    urls: Url[];
    myarray: number[] = [];

    constructor(private store: Store<AppState>){
        console.log('AppComponent constructor');

        this.store.select(state => state.counter)
            .subscribe(data => this.counter = data);
        this.store.select(state => state.urls)
          .subscribe(data => this.onUrlsEmitted(data));

        this.myarray.push(1);
        this.myarray.push(2);
        this.myarray.push(3);
    }

    ngOnInit() {
            console.log('AppComponent ngOnInit');
    }
    // executed once user data arrives from the store
    public onUrlsEmitted(data:Url[]){
        console.log('AppComponent onUrlsEmitted');
        this.urls = data;
        if(!data || !data.length){ 
            console.log("no url data arrived");
        }
    }
}
