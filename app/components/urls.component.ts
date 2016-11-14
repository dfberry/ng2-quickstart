import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Url, AppState, ADD_URL, UrlService } from '../reducers/index';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { NG_TABLE_DIRECTIVES } from 'ng2-table/ng2-table';

/***************************************************************************/
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
  name:string = '';
  itemtype:string = "Url";

  constructor(private urlService: UrlService){}

  save(newurl){
    let newUrl: Url = {id: this.nextId, url: newurl.value };
    this.urlService.insertItem(newUrl);

    this.nextId ++;
    this.name = '';
  }
  ngOnInit() {
        console.log('UrlNewComponent ngOnInit nextId : ' + this.nextId);
  }
}
/***************************************************************************/
@Component({
  selector: 'url-detail',
  template: `
    <div >{{url.id}}</div>
    <div >{{url.url}}</div>
  `
})
export class UrlItemComponent {

  @Input() url: Url;

  ngOnInit() {
        console.log('UrlItemComponent input: ' + this.url);

    }

}
/***************************************************************************/
@Component({
  selector: 'url-list',
  template: `
    <div class="styledurls">
      <br>
      <b>Urls</b>
      <div *ngFor="let item of urls">
          <url-detail [url]='item'></url-detail>
      </div>
      <br><b>Url Table</b>
      
<ng-table [config]="config"
          [rows]="urls" [columns]="columns">
</ng-table>         
    <br><b>New Url</b>
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

  rows: Array<any>;
  newUrl: Url = {id:0, url:''};
  config = {};
  columns:Array<any> = [
    {title: 'id', name: 'id'},
    {title: 'url', name: 'url'}
  ];

  title: string = 'url-list';
  constructor(private store: Store<AppState>){
    console.log("UrlListComponent constructor");
  }

  ngOnInit() {
        console.log('UrlListComponent ngOnInit: ' + JSON.stringify(this.urls));
        console.log('UrlListComponent ngOnInit nextId : ' + this.nextId);
  }
}