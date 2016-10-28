import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Url, AppState, INCREMENT, DECREMENT, RESET } from '../reducers/index';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

@Component({
  selector: 'url-detail',
  template: `
    <div>{{url.id}} . {{url.name}}</div>
  `
})
export class UrlItemComponent {

  @Input() url: Url;

  ngOnInit() {
        console.log('UrlItemComponent input: ' + JSON.stringify(this.url));
    }

}
@Component({
  selector: 'url-list',
  template: `
    <div class="styledurls">
    <br>
    <b>Urls</b>
    <div *ngFor="let item of urls">
        <url-detail [url]='item'></url-detail>
    </div>
    <div>
      <input #id type="text" >
      <label>id</label>
    </div>
    <div>
      <input #name type="text" >
      <label>name</label>
    </div>
    <button (click)='add(id.value,name.value)'>Add</button>
    <br>
    </div>
  `,
  styles:[`
    div { width: 100%; }
  .styledurls { background-color: #ffb3b3; }
  `]
})
export class UrlListComponent {
  @Input() urls: Url[];
  @Output() addUrl = new EventEmitter<Url>();

  title: string = 'url-list';
  constructor(private store: Store<AppState>){
  }
  add(id:number, name:string){
      console.log("id = " + id);
      console.log("name = " + name);
      //this.store.dispatch({ type: INCREMENT });
      this.addUrl.emit({id: id, name: name});
  }
  ngOnInit() {
        console.log('UrlListComponent input: ' + this.urls);
  }
}