import { Component } from '@angular/core';

@Component({
    selector: 'shell',
    templateUrl: 'shell.component.html'
})

export class ShellComponent {

    constructor() {
        console.log('ShellComponent init');
    }

}