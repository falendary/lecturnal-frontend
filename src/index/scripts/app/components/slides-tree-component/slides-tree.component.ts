import { Component } from '@angular/core';
import {Slide} from "../../models/Slide";

@Component({
    selector: 'slides-tree',
    templateUrl: 'slides-tree.component.html'
})

export class SlidesTreeComponent {

    slides:Slide[];

    constructor() {

        console.log('Sliders tree')

        this.slides = [
            {content: '123'},
            {content: '456'}
        ]

    }

    public addSlide() {

        this.slides.push({content: ''});

    }

    public selectSlide() {



    }

}