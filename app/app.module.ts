import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent, items, selectedItem}  from './app.component';
import { CustomerComponent } from './customer/customer.component'
import { CustomersComponent } from './customer/customers.component'
import { HttpModule } from '@angular/http';
import 'rxjs/Rx';
import '@ngrx/core';
import { Store, StoreModule } from '@ngrx/store';



@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule, 
    HttpModule, 
    StoreModule.provideStore({items, selectedItem})],
  declarations: [ AppComponent, CustomerComponent, CustomersComponent],
  bootstrap: [ AppComponent]
})
export class AppModule { }
