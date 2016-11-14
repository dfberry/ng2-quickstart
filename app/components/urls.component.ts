import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Url, AppState, ADD_URL, UrlService } from '../reducers/index';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
/**************************************************************************
 * 
 * Insert New Url
 * 
 * 
*/
@Component({
  selector: 'url-new',
  template: `
  <br><b>New Url with Id {{nextId}}</b>
    <div>
      <input type="text" [(ngModel)]='name' #newurl placeholder="Add a url" />
      <button (click)="save(newurl)">Add</button>
    </div>
  `,
  providers: []
})
export class UrlNewComponent {
  @Input() nextId:number ;
  name:string = '';
  itemtype:string = "Url";

  constructor(private urlService: UrlService){}

  save(newurl){
    // insert new Url via service
    this.urlService.insertItem({id: this.nextId, url: newurl.value });

    // clean up UX
    this.nextId ++;
    this.name = '';
  }
}
/**************************************************************************
 * 
 * Show Individual Url values
 * 
 * 
*/
@Component({
  selector: 'url-detail',
  template: `
    <span >{{url.id}}</span>
    <span >{{url.url}}</span>
  `
})
export class UrlItemComponent {
  @Input() url: Url;
}
/**************************************************************************
 * 
 * Show Url list
 * 
 * 
*/
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
  `]
})
export class UrlListComponent {
  @Input() urls: Url[];
  @Input() nextId: number;

  newUrl: Url = {id:0, url:''}; 

  constructor(private store: Store<AppState>){}
}