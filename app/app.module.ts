import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'rxjs/Rx';
import '@ngrx/core';
import { Store, StoreModule } from '@ngrx/store';
import { Ng2TableModule } from 'ng2-table/ng2-table';

import { AppComponent, UrlListComponent, UrlItemComponent, CounterComponent, UrlNewComponent } from './components/index'
import {  counterReducer, urlReducer, UrlService} from './reducers/index';
import { HttpDataService } from './services/index';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule, 
    HttpModule,
    Ng2TableModule,
    StoreModule.provideStore({counter: counterReducer, urls: urlReducer}) 
    ],
  declarations: [ 
    AppComponent, UrlItemComponent, UrlListComponent, 
    CounterComponent, UrlNewComponent ],
  providers: [
    UrlService, HttpDataService
  ],
  bootstrap: [ AppComponent]
})
export class AppModule { 
  constructor(){console.log("AppModule");}
}
