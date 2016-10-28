import { Component, Input } from '@angular/core';
import { Url } from '../reducers/index';

@Component({
  selector: 'url-detail',
  template: `
    <div>{{url.id}}</div>
  `
})
export class UrlItemComponent {

  @Input() url: Url;

  ngOnInit() {
        console.log('UrlItemComponent input: ' + JSON.stringify(this.url));
    }

}