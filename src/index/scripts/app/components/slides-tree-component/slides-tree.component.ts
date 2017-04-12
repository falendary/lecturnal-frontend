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
            {content: '<div style="border-bottom: 2px solid #ccc; padding-bottom: 10px"><div></div><ul style="padding-left: 40px"><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li></ul></div></div><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniamquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'},
            {content: '456'}
        ]

    }

    public addSlide() {

        this.slides.push({content: ''});

    }

    public selectSlide() {



    }

}