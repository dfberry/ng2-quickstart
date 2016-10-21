import { Injectable, Component, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { HttpModule  } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { CustomersComponent, CustomerService } from './customer/index';

interface AppState {
  counter: number;
}

export interface Item {
  id: string;
  name: string;
  description: string;
}

export interface AppStore {
  items: Item[];
  selectedItem: Item;
}

// The "items" reducer performs actions on our list of items
export const items = (state: any = [], {type, payload}) => {
  switch (type) {
    default:
      return state;
  }
};
// The "selectedItem" reducer handles the currently selected item
export const selectedItem = (state: any = null, {type, payload}) => {
  switch (type) {
    default:
      return state;
  }
};
//-------------------------------------------------------------------
// ITEMS SERVICE
//-------------------------------------------------------------------
@Injectable()
export class ItemsService {
  items: Observable<Array<Item>>;

  constructor(private store: Store<AppStore>) {
    //this.items = store.select('items');
  }

  loadItems() {
    // NOTE: Hard coding data for now... will replace with http calls
    let initialItems: Item[] = [
      {'id': '1', 'name': 'Item 1', 'description': 'This is a description'},
      {'id': '2', 'name': 'Item 2', 'description': 'This is a description'},
      {'id': '3', 'name': 'Item 3', 'description': 'This is a lovely item'}
    ];

    this.store.dispatch({ type: 'ADD_ITEMS', payload: initialItems });
  }

  saveItem(item: Item) {
    (item.id) ? this.updateItem(item) : this.createItem(item);
  }

  createItem(item: Item) {
    this.store.dispatch({ type: 'CREATE_ITEM', payload: this.addUUID(item) });
  }

  updateItem(item: Item) {
    this.store.dispatch({ type: 'UPDATE_ITEM', payload: item });
  }

  deleteItem(item: Item) {
    this.store.dispatch({ type: 'DELETE_ITEM', payload: item });
  }

  // NOTE: Utility functions to simulate server generated IDs
  private addUUID(item: Item): Item {
    return Object.assign({}, item, {id: this.generateUUID()}); // Avoiding state mutation FTW!
  }

  private generateUUID(): string {
    return ('' + 1e7 + -1e3 + -4e3 + -8e3 + -1e11)
      .replace(/1|0/g, function() {
        return (0 | Math.random() * 16).toString(16);
      });
  };
}
export class App {
  items: Observable<Array<Item>>;
  selectedItem: Observable<Item>;
  constructor(private itemsService: ItemsService, private store: Store<AppStore>) {
    this.items = itemsService.items; // Bind to the "items" observable on the "ItemsService"
    //this.selectedItem = store.select('selectedItem'); // Bind the "selectedItem" observable from the store
  }
}



//-------------------------------------------------------------------
// ITEMS-LIST
//-------------------------------------------------------------------
@Component({
  selector: 'items-list',
  template: `
  <div *ngFor="#item of items" (click)="selected.emit(item)"
    class="item-card mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text">{{item.name}}</h2>
    </div>
    <div class="mdl-card__supporting-text">
      {{item.description}}
    </div>
    <div class="mdl-card__menu">
      <button (click)="deleted.emit(item); $event.stopPropagation();"
        class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
        <i class="material-icons">close</i>
      </button>
    </div>
  </div>
  `
})
export class ItemList {
  @Input() items: Item[];
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}

//-------------------------------------------------------------------
// ITEM DETAIL
//-------------------------------------------------------------------
@Component({
  selector: 'item-detail',
  template: `
  <div class="item-card mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text" *ngIf="selectedItem.id">Editing {{originalName}}</h2>
      <h2 class="mdl-card__title-text" *ngIf="!selectedItem.id">Create New Item</h2>
    </div>
    <div class="mdl-card__supporting-text">
      <form novalidate>
          <div class="mdl-textfield mdl-js-textfield">
            <label>Item Name</label>
            <input [(ngModel)]="selectedItem.name"
              placeholder="Enter a name"
              class="mdl-textfield__input" type="text">
          </div>

          <div class="mdl-textfield mdl-js-textfield">
            <label>Item Description</label>
            <input [(ngModel)]="selectedItem.description"
              placeholder="Enter a description"
              class="mdl-textfield__input" type="text">
          </div>
      </form>
    </div>
    <div class="mdl-card__actions">
        <button type="submit" (click)="cancelled.emit(selectedItem)"
          class="mdl-button mdl-js-button mdl-js-ripple-effect">Cancel</button>
        <button type="submit" (click)="saved.emit(selectedItem)"
          class="mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect">Save</button>
    </div>
  </div>
  `
})
export class ItemDetail {
  @Input('item') _item: Item;
  originalName: string;
  selectedItem: Item;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  set item(value: Item){
    if (value) this.originalName = value.name;
	  this.selectedItem = Object.assign({}, value);
  }
}
@Component({
    moduleId: module.id, //system js variable name for relative path
    selector: 'my-app',
    templateUrl: 'app.component.html',
    providers: [CustomerService, HttpModule], // app level providers
    directives: [ItemList, ItemDetail]
})
export class AppComponent {
    counter: Observable<{}>; 
    title = 'Blog Log';
    name = 'test';
    wardsColor = 'green';

    //[] property binding
    //[()] - banana in a box - 2 way binding
    //()event binding

    changeColor(){
        this.wardsColor = this.wardsColor === 'green' ? 'red' : 'green';
    }
}
