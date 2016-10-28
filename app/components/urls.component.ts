import { Component, Input } from '@angular/core';
import { Url } from '../reducers/index';
import { Observable } from 'rxjs/Rx';
import { UrlItemComponent } from './index';

@Component({
  selector: 'url-list',
  template: `
    <div class="styledurls">
    <b>Urls</b>
    <div *ngFor="let item of urls">
        <url-detail [url]='item'></url-detail>
    </div>
    </div>
  `,
  styles:[`
    div { width: 100%; }
  .styledurls { background-color: #ffb3b3; }
  `]
})
export class UrlListComponent {
  @Input() urls: Url[];
  title: string = 'url-list';

  ngOnInit() {
        console.log('UrlListComponent input: ' + this.urls);
  }
}