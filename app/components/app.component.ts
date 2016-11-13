import { Injectable, Component, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { HttpModule  } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Url, AppState, UrlService } from '../reducers/index';
import { ListComponent, UrlListComponent, CounterComponent} from './index'
import 'rxjs/add/operator/toArray';

@Component({
    moduleId: module.id, //system js variable name for relative path
    selector: 'my-app',
    template: `
        <counter-comp [counter]="counter" ></counter-comp><br>
        <url-list [urls]="urls" [nextId]="nextId"></url-list><br>
        <list [innerArray]="myarray"></list><br>
    `,
    providers: [UrlService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    counter: number;
    
    urls: Url[];
    nextId: number;
    
    myarray: number[] = [];

    constructor(private urlService: UrlService, private store: Store<AppState>){
        // get from http, put in state
        this.urlService.loadItems();

        // get out of state
        this.store.select(state => state.nextUrlId)
            .distinctUntilChanged()
            .subscribe(data => this.onNextUrlIdEmitted(data));
        this.store.select(state => state.counter)
            .distinctUntilChanged()
            .subscribe(data => this.onCounterEmitted(data));
        this.store.select(state => state.urls)
          .distinctUntilChanged()
          .subscribe(data => this.onUrlsEmitted(data));    }

    ngOnInit() {
        console.log('AppComponent constructor');

        this.myarray.push(1);
        this.myarray.push(2);
        this.myarray.push(3);
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
    public onNextUrlIdEmitted(data){
        console.log('AppComponent onNextUrlIdEmitted data = ' + data);
        this.nextId = data;
    }
    private printOutState(arrName:string, arr: any[]){
        for(let i =0; i < arr.length; i++){
            console.log(arrName + " " + i + " = " + JSON.stringify(arr[i]));
        }
    }
}
