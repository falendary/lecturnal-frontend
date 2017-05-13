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
var Presentation_1 = require("../../models/Presentation");
var presentation_service_1 = require("../../services/presentation.service");
var slide_service_1 = require("../../services/slide.service");
var Slide_1 = require("../../models/Slide");
var DashboardComponent = (function () {
    function DashboardComponent(router, presentationService, slideService) {
        this.router = router;
        this.presentationService = presentationService;
        this.slideService = slideService;
        console.log('DashboardComponent init');
        //this.presentations = [{id: 1, name: 'Компьютерная геометрия и графика', slides: []}, {id: 2, name: 'Веб-дизайн', slides: []}];
        this.getList();
    }
    DashboardComponent.prototype.getList = function () {
        var _this = this;
        var queryParameters = [];
        this.presentationService.getList(queryParameters).subscribe(function (presentations) {
            _this.presentations = presentations;
        });
    };
    DashboardComponent.prototype.addPresentation = function () {
        var _this = this;
        console.log('add presentation');
        this.presentationService.create(new Presentation_1.Presentation()).subscribe(function (presentation) {
            var slide = new Slide_1.Slide();
            slide.presentation_id = presentation.id;
            _this.slideService.create(slide, presentation.id).subscribe(function (slide) {
                _this.router.navigateByUrl('/presentation/' + presentation.id + '/slides/' + slide.id);
            });
        });
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'dashboard',
        template: 'dashboard.component.html',
        providers: [presentation_service_1.PresentationService, slide_service_1.SlideService]
    }),
    __metadata("design:paramtypes", [router_1.Router, presentation_service_1.PresentationService, slide_service_1.SlideService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;

//# sourceMappingURL=dashboard.component.js.map
