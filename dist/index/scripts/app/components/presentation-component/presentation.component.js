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
var presentation_service_1 = require("../../services/presentation.service");
var controller_helper_1 = require("../../helpers/controller.helper");
var PresentationComponent = (function () {
    function PresentationComponent(router, route, presentationService) {
        this.router = router;
        this.route = route;
        this.presentationService = presentationService;
        this.readyStatus = new ReadyStatus();
        console.log('PresentationComponent init');
    }
    PresentationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route
            .params
            .subscribe(function (params) {
            // Defaults to 0 if no query param provided.
            console.log('params', params);
            _this.presentationId = +params['id'] || 0;
            _this.getPresentation();
        });
    };
    PresentationComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    PresentationComponent.prototype.checkReadyStatus = function () {
        return controller_helper_1.ControllerHelper.check(this.readyStatus);
    };
    ;
    PresentationComponent.prototype.getPresentation = function () {
        var _this = this;
        this.readyStatus.content = false;
        this.presentationService.getByKey(this.presentationId).subscribe(function (presentation) {
            _this.presentation = presentation;
            _this.readyStatus.content = true;
        });
    };
    PresentationComponent.prototype.updatePresentationName = function () {
        var _this = this;
        this.presentationService.update(this.presentation, this.presentationId).subscribe(function (presentation) {
            _this.presentation = presentation;
        });
    };
    return PresentationComponent;
}());
PresentationComponent = __decorate([
    core_1.Component({
        selector: 'presentation',
        template: 'presentation.component.html',
        providers: [presentation_service_1.PresentationService]
    }),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, presentation_service_1.PresentationService])
], PresentationComponent);
exports.PresentationComponent = PresentationComponent;
var ReadyStatus = (function () {
    function ReadyStatus() {
        this.content = false;
    }
    return ReadyStatus;
}());

//# sourceMappingURL=presentation.component.js.map
