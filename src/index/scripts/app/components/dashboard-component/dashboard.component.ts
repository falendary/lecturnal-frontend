import { Component } from '@angular/core';
import {Presentation} from '../../models/Presentation';

import {PresentationService} from '../../services/presentation.service';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    providers: [PresentationService]
})

export class DashboardComponent {

    presentations:Presentation[];

    constructor(private presentationService: PresentationService) {

        console.log('DashboardComponent init');

        //this.presentations = [{id: 1, name: 'Компьютерная геометрия и графика', slides: []}, {id: 2, name: 'Веб-дизайн', slides: []}];

        this.getList();

    }

    public getList(): void {
        this.presentationService.getList().subscribe(presentations => {
            this.presentations = presentations;
        })
    }

}