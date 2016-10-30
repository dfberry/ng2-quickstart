import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Url, AppState, ADD_URL } from '../reducers/index';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';


@Component({
  selector: 'url-new',
  template: `
    <div>
      <input type="text" #newurl placeholder="Add a url" />
      <button (click)="save(newurl)">Add</button>
    </div>
  `
})
export class UrlNewComponent {
  @Input() nextId:number ;
  @Output() create = new EventEmitter();
  itemtype:string = "Url";

  constructor(private store: Store<AppState>){
    console.log("UrlNewComponent constructor nextId = " + this.nextId);
  }

  save(newurl){


    let newUrl: Url = {id: this.nextId, name: newurl.value };
    console.log("newUrl = " + JSON.stringify(newUrl));

    this.store.dispatch({ type: ADD_URL, payload: newUrl});
  }
  ngOnInit() {
        console.log('UrlNewComponent ngOnInit nextId : ' + this.nextId);
  }
}
@Component({
  selector: 'url-detail',
  template: `
    <div>{{url.id}} . {{url.name}}</div>
  `
})
export class UrlItemComponent {

  @Input() url: Url;

  ngOnInit() {
        console.log('UrlItemComponent input: ' + this.url);
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
      <url-new [nextId]="nextId"></url-new>      
    </div>
  `,
  styles:[`
    div { width: 100%; }
  .styledurls { background-color: #ffb3b3; }

  .ng-valid[required], .ng-valid.required  {
    border-left: 5px solid #42A948; /* green */
  }

  .ng-invalid:not(form)  {
    border-left: 5px solid #a94442; /* red */
  }

  `]
})
export class UrlListComponent {
  @Input() urls: Url[];
  @Input() nextId: number;
  @Output() addUrl = new EventEmitter<Url>();

  newUrl: Url = {id:0, name:''};

  title: string = 'url-list';
  constructor(private store: Store<AppState>){
    console.log("UrlListComponent constructor");
  }

  ngOnInit() {
        console.log('UrlListComponent ngOnInit: ' + this.urls);
        console.log('UrlListComponent ngOnInit nextId : ' + this.nextId);
  }
}