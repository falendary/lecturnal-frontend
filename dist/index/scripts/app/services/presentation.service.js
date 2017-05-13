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
var presentation_repository_1 = require("../repositories/presentation.repository");
var PresentationService = (function () {
    function PresentationService(presentationRepository) {
        this.presentationRepository = presentationRepository;
    }
    PresentationService.prototype.getList = function (parameters) {
        return this.presentationRepository.getList(parameters);
    };
    PresentationService.prototype.getByKey = function (presentationId) {
        return this.presentationRepository.getByKey(presentationId);
    };
    PresentationService.prototype.update = function (item, presentationId) {
        return this.presentationRepository.update(item, presentationId);
    };
    PresentationService.prototype.create = function (item) {
        return this.presentationRepository.create(item);
    };
    PresentationService.prototype.deleteByKey = function (presentationId) {
        this.presentationRepository.deleteByKey(presentationId);
    };
    return PresentationService;
}());
PresentationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [presentation_repository_1.PresentationRepository])
], PresentationService);
exports.PresentationService = PresentationService;

//# sourceMappingURL=presentation.service.js.map
