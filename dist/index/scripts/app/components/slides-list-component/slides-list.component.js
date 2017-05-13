"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Slide_1 = require("../../models/Slide");
var slide_service_1 = require("../../services/slide.service");
var SlideViewModel_1 = require("../../models/SlideViewModel");
var controller_helper_1 = require("../../helpers/controller.helper");
var SlidesListComponent = (function () {
    function SlidesListComponent(router, route, slideService) {
        this.router = router;
        this.route = route;
        this.slideService = slideService;
        this.readyStatus = new ReadyStatus();
        console.log('Sliders tree');
        //this.slides = [
        //    {content: '<div style="border-bottom: 2px solid #ccc; padding-bottom: 10px"><div></div><ul style="padding-left: 40px"><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li></ul></div></div><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmodtempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniamquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'},
        //    {content: '456'}
        //]
    }
    SlidesListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route
            .params
            .subscribe(function (params) {
            // Defaults to 0 if no query param provided.
            console.log('params', params);
            _this.presentationId = +params['id'] || 0;
            _this.slideId = +params['slideId'] || 0;
            _this.getList();
        });
    };
    SlidesListComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    SlidesListComponent.prototype.getList = function () {
        var _this = this;
        var queryParameters = [];
        this.readyStatus.content = false;
        this.slideService.getList(queryParameters, this.presentationId).subscribe(function (slides) {
            _this.slides = slides.map(function (slide) {
                return new SlideViewModel_1.SlideViewModel(slide);
            });
            _this.findActiveSlide();
            _this.readyStatus.content = true;
        });
    };
    SlidesListComponent.prototype.findActiveSlide = function () {
        var _this = this;
        this.slides.forEach(function (slide) {
            if (slide.id == _this.slideId) {
                slide.isActive = true;
            }
        });
    };
    SlidesListComponent.prototype.checkReadyStatus = function () {
        return controller_helper_1.ControllerHelper.check(this.readyStatus);
    };
    ;
    SlidesListComponent.prototype.addSlide = function () {
        var _this = this;
        this.slideService.create(new Slide_1.Slide(), this.presentationId).subscribe(function (slide) {
            console.log('updated');
            _this.getList();
        });
    };
    SlidesListComponent.prototype.selectSlide = function (slide) {
        console.log('select slide');
        this.router.navigateByUrl('/presentation/' + this.presentationId + '/slides/' + slide.id);
    };
    return SlidesListComponent;
}());
SlidesListComponent = __decorate([
    core_1.Component({
        selector: 'slides-list',
        template: 'slides-list.component.html',
        providers: [slide_service_1.SlideService]
    }),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, slide_service_1.SlideService])
], SlidesListComponent);
exports.SlidesListComponent = SlidesListComponent;
var ReadyStatus = (function () {
    function ReadyStatus() {
        this.content = false;
    }
    return ReadyStatus;
}());

//# sourceMappingURL=slides-list.component.js.map
