import { Component } from '@angular/core';
import {Slide} from "../../models/Slide";

@Component({
    selector: 'slide-editor',
    templateUrl: 'slide-editor.component.html'
})

export class SlideEditorComponent {

    slide:Slide;

    constructor() {
        console.log('SlideEditorCompoennt init');

        this.slide = {
            content: '123'
        };

    }

}