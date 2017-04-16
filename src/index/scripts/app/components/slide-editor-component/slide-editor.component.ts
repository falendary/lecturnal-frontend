import { Component } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Slide} from "../../models/Slide";
import {IQueryParameter} from "../../models/interfaces/IQueryParameter";
import {SlideService} from "../../services/slide.service";
import {ControllerHelper} from "../../helpers/controller.helper";

@Component({
    selector: 'slide-editor',
    templateUrl: 'slide-editor.component.html',
    providers: [SlideService]
})

export class SlideEditorComponent {

    slide: Slide = new Slide();

    isVisualizer: boolean = true;
    private sub: any;
    editorId: string;
    public presentationId: number;
    public slideId: number;

    public readyStatus: ReadyStatus = new ReadyStatus();

    constructor(private router: Router, private route: ActivatedRoute, private slideService: SlideService) {
        console.log('SlideEditorCompoennt init');

        this.editorId = 'editor1';

        //this.slide = new Slide();
        //this.slide.content = '<div style="border-bottom: 2px solid #ccc; padding-bottom: 10px"><div></div><ul style="padding-left: 40px"><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li></ul></div></div><p>'
        //    + 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod'
        //    + 'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
        //    + 'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo '
        //    + 'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse '
        //    + 'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non '
        //    + 'proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>';

    }

    public checkReadyStatus(): boolean {
        return ControllerHelper.check(this.readyStatus);
    };

    public getSlide(): void {

        this.readyStatus.content = false;

        this.slideService.getByKey(this.presentationId, this.slideId).subscribe(slide => {

            console.log('slide', slide);

            this.readyStatus.content = true;

            this.slide = slide;
        })

    }

    public saveSlide(): void {

        console.log('update');

        this.slideService.update(this.slide, this.presentationId, this.slideId).subscribe(slide => {

            console.log('updated');

        })

    }

    ngOnInit() {
        this.sub = this.route
            .params
            .subscribe(params => {
                // Defaults to 0 if no query param provided.
                console.log('params', params);
                this.presentationId = +params['id'] || 0;
                this.slideId = +params['slideId'] || 0;

                if (this.slideId !== 0) {
                    this.getSlide();
                }
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}

class ReadyStatus {
    content: boolean = false;
}
