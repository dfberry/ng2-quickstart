import { Component, Input } from '@angular/core';


@Component({
  selector: 'listitem',
  template: `
      {{mynumber}}
  `
})
export class ListItemComponent {
  @Input() mynumber: number;

  ngOnInit() {
          console.log('ListItemComponent: ' + this.mynumber);
      }
};

@Component({
  selector: 'list',
  template: `
  <div class="styledlist">
  <b>List</b>
    <div *ngFor="let item of innerArray">
        <listitem [mynumber]='item'></listitem>
    </div>
 </div>
  `,
    styles:[`
    div { width: 100%; }
  .styledlist { background-color: #ccffcc; }
  `]
})
export class ListComponent {
  @Input() innerArray: number[];

  ngOnInit() {
        console.log('ListComponent list length: ' + this.innerArray);
    }
};