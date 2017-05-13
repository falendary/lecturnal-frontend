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
var controller_helper_1 = require("../../helpers/controller.helper");
var SlideEditorComponent = (function () {
    function SlideEditorComponent(router, route, slideService) {
        this.router = router;
        this.route = route;
        this.slideService = slideService;
        this.slide = new Slide_1.Slide();
        this.isVisualizer = true;
        this.readyStatus = new ReadyStatus();
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
    SlideEditorComponent.prototype.checkReadyStatus = function () {
        return controller_helper_1.ControllerHelper.check(this.readyStatus);
    };
    ;
    SlideEditorComponent.prototype.getSlide = function () {
        var _this = this;
        this.readyStatus.content = false;
        this.slideService.getByKey(this.presentationId, this.slideId).subscribe(function (slide) {
            console.log('slide', slide);
            _this.readyStatus.content = true;
            _this.slide = slide;
        });
    };
    SlideEditorComponent.prototype.saveSlide = function () {
        console.log('update');
        this.slideService.update(this.slide, this.presentationId, this.slideId).subscribe(function (slide) {
            console.log('updated');
        });
    };
    SlideEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route
            .params
            .subscribe(function (params) {
            // Defaults to 0 if no query param provided.
            console.log('params', params);
            _this.presentationId = +params['id'] || 0;
            _this.slideId = +params['slideId'] || 0;
            if (_this.slideId !== 0) {
                _this.getSlide();
            }
        });
    };
    SlideEditorComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    return SlideEditorComponent;
}());
SlideEditorComponent = __decorate([
    core_1.Component({
        selector: 'slide-editor',
        template: 'slide-editor.component.html',
        providers: [slide_service_1.SlideService]
    }),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, slide_service_1.SlideService])
], SlideEditorComponent);
exports.SlideEditorComponent = SlideEditorComponent;
var ReadyStatus = (function () {
    function ReadyStatus() {
        this.content = false;
    }
    return ReadyStatus;
}());

//# sourceMappingURL=slide-editor.component.js.map
