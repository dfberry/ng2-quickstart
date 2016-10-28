import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'rxjs/Rx';
import '@ngrx/core';
import { Store, StoreModule } from '@ngrx/store';

import { AppComponent  }  from './components/app.component';
import { UrlListComponent, UrlItemComponent, ListComponent, ListItemComponent } from './components/index'
import {  counterReducer, urlReducer} from './reducers/index';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule, 
    HttpModule,
    StoreModule.provideStore({counter: counterReducer, urls: urlReducer}) 
    ],
  declarations: [ AppComponent, UrlItemComponent, UrlListComponent, ListComponent, ListItemComponent],
  bootstrap: [ AppComponent]
})
export class AppModule { 
  constructor(){console.log("AppModule");}
}
