import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Url, AppState, ADD_URL } from '../reducers/index';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { NG_TABLE_DIRECTIVES } from 'ng2-table/ng2-table';

@Component({
  selector: 'url-new',
  template: `
    <div>
      <input type="text" [(ngModel)]='name' #newurl placeholder="Add a url" />
      <button (click)="save(newurl)">Add</button>{{nextId}}
    </div>
  `,
  providers: [NG_TABLE_DIRECTIVES]
})
export class UrlNewComponent {
  @Input() nextId:number ;
  @Output() create = new EventEmitter();

  name:string = '';
  itemtype:string = "Url";

  constructor(private store: Store<AppState>){
    console.log("UrlNewComponent constructor nextId = " + this.nextId);
  }

  save(newurl){


    let newUrl: Url = {id: this.nextId, name: newurl.value };
    console.log("newUrl = " + JSON.stringify(newUrl));

    this.store.dispatch({ type: ADD_URL, payload: newUrl});

    this.nextId ++;
    this.name = '';
  }
  ngOnInit() {
        console.log('UrlNewComponent ngOnInit nextId : ' + this.nextId);
  }
}
@Component({
  selector: 'url-detail',
  template: `
    <div >{{url.id}}</div>
    <div >{{url.name}}</div>
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
<ng-table [config]="config"
          [rows]="rows" [columns]="columns">
</ng-table>         

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


  // ng2-table
  rows: Array<any> = [
  {
    'name': 'Victoria Cantrell',
    'position': 'Integer Corporation',
    'office': 'Croatia',
    'ext': '0839',
    'startDate': '2015/08/19',
    'salary': 208.178
  }, {
    'name': 'Pearl Crosby',
    'position': 'In PC',
    'office': 'Cambodia',
    'ext': '8262',
    'startDate': '2014/10/08',
    'salary': 114.367
  }];

  config = {};

  columns:Array<any> = [
    {title: 'Name', name: 'name'},
    {title: 'Position', name: 'position', sort: false},
    {title: 'Office', name: 'office', sort: 'asc'},
    {title: 'Extn.', name: 'ext', sort: ''},
    {title: 'Start date', name: 'startDate'},
    {title: 'Salary ($)', name: 'salary'}
  ];

  title: string = 'url-list';
  constructor(private store: Store<AppState>){
    console.log("UrlListComponent constructor");
  }

  ngOnInit() {
        console.log('UrlListComponent ngOnInit: ' + this.urls);
        console.log('UrlListComponent ngOnInit nextId : ' + this.nextId);
  }
}