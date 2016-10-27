import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'rxjs/Rx';
import '@ngrx/core';
import { Store, StoreModule } from '@ngrx/store';

import { AppComponent  }  from './components/app.component';
import { counterReducer } from './reducers/counter';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule, 
    HttpModule,
    StoreModule.provideStore({counter: counterReducer}) 
    ],
  declarations: [ AppComponent],
  bootstrap: [ AppComponent]
})
export class AppModule { }
