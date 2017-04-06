import { Component } from '@angular/core';
import {Presentation} from "../../models/Presentation";

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent {

    presentations:Presentation[];

    constructor() {

        console.log('DashboardComponent init');

        this.presentations = [{id: 1, name: 'Компьютерная геометрия и графика', slides: []}, {id: 2, name: 'Веб-дизайн', slides: []}];

    }

}