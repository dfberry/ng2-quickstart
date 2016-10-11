import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
})
export class AppComponent { 
    title = 'Blog Log';
    name = 'test';
    wardsColor = 'blue';

    //[] property binding
    //()event binding

    changeColor(){
        this.wardsColor = this.wardsColor === 'blue' ? 'red' : 'blue';
    }
}
