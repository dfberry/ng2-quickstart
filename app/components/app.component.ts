import { Injectable, Component, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { HttpModule  } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Url, AppState, UrlService } from '../reducers/index';
import { UrlListComponent, CounterComponent} from './index'
import 'rxjs/add/operator/toArray';

@Component({
    moduleId: module.id, //system js variable name for relative path
    selector: 'my-app',
    template: `
        <counter-comp [counter]="counter" ></counter-comp><br>
        <url-list [urls]="urls" [nextId]="nextId"></url-list><br>
    `,
    providers: [UrlService],
    changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent {
    counter: number;
    
    urls: Url[];
    nextId: number;

    constructor(private urlService: UrlService, private store: Store<AppState>){}

    ngOnInit() {
        // get from http, put in state
        this.urlService.loadItems();

        // get out of state
        this.store.select(state => state.counter)
            .distinctUntilChanged()
            .subscribe(data => this.onCounterEmitted(data));
        this.store.select(state => state.urls)
          .distinctUntilChanged()
          .subscribe(data => this.onUrlsEmitted(data));    
     }

    // executed once user data arrives from the store
    public onUrlsEmitted(data:Url[]){
        this.urls = data;
        this.nextId = this.urls.length + 1;
        this.printOutState("urls", this.urls);
    }
    public onCounterEmitted(data){
        this.counter = data;
    }

    // DEBUG
    private printOutState(arrName:string, arr: any[]){
        for(let i =0; i < arr.length; i++){
            console.log(arrName + " " + i + " = " + JSON.stringify(arr[i]));
        }
    }
}
