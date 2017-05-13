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
var core_2 = require("@angular/core");
var FormatBlockComponent = (function () {
    function FormatBlockComponent() {
        this.update = new core_1.EventEmitter();
    }
    FormatBlockComponent.prototype.wrapSelected = function () {
        document.execCommand('formatBlock', false, this.formatBlock);
    };
    return FormatBlockComponent;
}());
__decorate([
    core_2.Output('contenteditableModelChange'),
    __metadata("design:type", Object)
], FormatBlockComponent.prototype, "update", void 0);
__decorate([
    core_2.Input('content'),
    __metadata("design:type", String)
], FormatBlockComponent.prototype, "content", void 0);
__decorate([
    core_2.Input('editorId'),
    __metadata("design:type", String)
], FormatBlockComponent.prototype, "editorId", void 0);
FormatBlockComponent = __decorate([
    core_1.Component({
        selector: 'format-block-editor-button',
        template: 'format-block.component.html'
    })
], FormatBlockComponent);
exports.FormatBlockComponent = FormatBlockComponent;

//# sourceMappingURL=foramt-block.component.js.map
