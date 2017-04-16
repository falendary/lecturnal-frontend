import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Slide} from "../../models/Slide";
import {IQueryParameter} from "../../models/interfaces/IQueryParameter";
import {SlideService} from "../../services/slide.service";
import {SlideViewModel} from "../../models/SlideViewModel";
import {ControllerHelper} from "../../helpers/controller.helper";

@Component({
    selector: 'slides-list',
    templateUrl: 'slides-list.component.html',
    providers: [SlideService]
})

export class SlidesListComponent {

    slides: SlideViewModel[];
    private sub: any;
    presentationId: number;
    slideId: number;

    readyStatus = new ReadyStatus();

    constructor(private router: Router, private route: ActivatedRoute, private slideService: SlideService) {

        console.log('Sliders tree');

        //this.slides = [
        //    {content: '<div style="border-bottom: 2px solid #ccc; padding-bottom: 10px"><div></div><ul style="padding-left: 40px"><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li></ul></div></div><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniamquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'},
        //    {content: '456'}
        //]

    }

    ngOnInit() {
        this.sub = this.route
            .params
            .subscribe(params => {
                // Defaults to 0 if no query param provided.
                console.log('params', params);
                this.presentationId = +params['id'] || 0;
                this.slideId = +params['slideId'] || 0;

                this.getList();
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public getList(): void {

        let queryParameters: IQueryParameter[] = [];

        this.readyStatus.content = false;

        this.slideService.getList(queryParameters, this.presentationId).subscribe(slides => {
            this.slides = slides.map(function (slide) {
                return new SlideViewModel(slide);
            });

            this.findActiveSlide();

            this.readyStatus.content = true;
        })
    }

    private findActiveSlide() {
        this.slides.forEach( slide => {

            if (slide.id == this.slideId) {
                slide.isActive = true;
            }

        });
    }

    public checkReadyStatus(): boolean {
        return ControllerHelper.check(this.readyStatus);
    };

    public addSlide(): void {

        this.slideService.create(new Slide(), this.presentationId).subscribe(slide => {

            console.log('updated');

            this.getList();

        });

    }

    public selectSlide(slide: SlideViewModel) {

        console.log('select slide');

        this.router.navigateByUrl('/presentation/' + this.presentationId + '/slides/' + slide.id);

    }

}

class ReadyStatus {
    content: boolean = false;
}
