import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Presentation} from '../../models/Presentation';

import {PresentationService} from '../../services/presentation.service';
import {SlideService} from '../../services/slide.service';
import {IQueryParameter} from "../../models/interfaces/IQueryParameter";
import {Slide} from "../../models/Slide";

@Component({
    selector: 'dashboard',
    template: require('./dashboard.component.html'),
    providers: [PresentationService, SlideService]
})

export class DashboardComponent {

    presentations: Presentation[];

    constructor(private router: Router, private presentationService: PresentationService, private slideService: SlideService) {

        console.log('DashboardComponent init');

        //this.presentations = [{id: 1, name: 'Компьютерная геометрия и графика', slides: []}, {id: 2, name: 'Веб-дизайн', slides: []}];

        this.getList();

    }

    public getList(): void {

        let queryParameters: IQueryParameter[] = [];

        this.presentationService.getList(queryParameters).subscribe(presentations => {
            this.presentations = presentations;
        })
    }

    public addPresentation(): void {

        console.log('add presentation');

        this.presentationService.create(new Presentation()).subscribe(presentation => {

            let slide = new Slide();

            slide.presentation_id = presentation.id;

            this.slideService.create(slide, presentation.id).subscribe(slide => {
                this.router.navigateByUrl('/presentation/' + presentation.id + '/slides/' + slide.id);
            })

        })

    }

}