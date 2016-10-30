import { Injectable, Component, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { HttpModule  } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Url } from '../reducers/index';
import { ListComponent, UrlListComponent, CounterComponent} from './index'
import 'rxjs/add/operator/toArray';

export interface AppState {
  counter: number;
  urls : Url[]
}

@Component({
    moduleId: module.id, //system js variable name for relative path
    selector: 'my-app',
    template: `
        <counter-comp [counter]="counter" ></counter-comp>
        <url-list [urls]="urls" [nextId]="nextUrlId"></url-list>
        <list [innerArray]="myarray"></list>
    `,
    providers: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    counter: number;
    urls: Url[];
    myarray: number[] = [];
    nextUrlId: number;

    constructor(private store: Store<AppState>){
        console.log('AppComponent constructor');

        // both of these depend on the reducer's switch default 
        this.store.select(state => state.counter)
            .distinctUntilChanged()
            .subscribe(data => this.onCounterEmitted(data));
        this.store.select(state => state.urls)
          .distinctUntilChanged()
          .subscribe(data => this.onUrlsEmitted(data));

        this.myarray.push(1);
        this.myarray.push(2);
        this.myarray.push(3);
    }

    ngOnInit() {
            console.log('AppComponent ngOnInit');
            this.nextUrlId = this.urls.length + 1;
            console.log("this.nextUrlId = " + this.nextUrlId);
    }
    // executed once user data arrives from the store
    public onUrlsEmitted(data:Url[]){
        console.log('AppComponent onUrlsEmitted ' + data);
        this.urls = data;
        this.printOutState("urls", this.urls);
    }
    public onCounterEmitted(data){
        console.log('AppComponent onCounterEmitted data = ' + data);
        this.counter = data;
    }
    private printOutState(arrName:string, arr: any[]){
        for(let i =0; i < arr.length; i++){
            console.log(arrName + " " + i + " = " + JSON.stringify(arr[i]));
        }
    }
}
