import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {PresentationService} from "../../services/presentation.service";
import {Presentation} from "../../models/Presentation";
import {ControllerHelper} from "../../helpers/controller.helper";

@Component({
    selector: 'presentation',
    templateUrl: 'presentation.component.html',
    providers: [PresentationService]
})

export class PresentationComponent {

    private sub: any;
    public presentationId: number;
    public presentation: Presentation;
    public readyStatus: ReadyStatus = new ReadyStatus();

    constructor(private router: Router, private route: ActivatedRoute, private presentationService: PresentationService) {

        console.log('PresentationComponent init');

    }

    ngOnInit() {
        this.sub = this.route
            .params
            .subscribe(params => {
                // Defaults to 0 if no query param provided.
                console.log('params', params);
                this.presentationId = +params['id'] || 0;

                this.getPresentation();
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public checkReadyStatus(): boolean {
        return ControllerHelper.check(this.readyStatus);
    };

    public getPresentation(): void {

        this.readyStatus.content = false;

        this.presentationService.getByKey(this.presentationId).subscribe(presentation => {

            this.presentation = presentation;

            this.readyStatus.content = true;
        })

    }

    public updatePresentationName(): void {

        this.presentationService.update(this.presentation, this.presentationId).subscribe(presentation => {
            this.presentation = presentation;
        })

    }

}


class ReadyStatus {
    content: boolean = false;
}
