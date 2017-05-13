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
var UComponent = (function () {
    function UComponent() {
        this.update = new core_1.EventEmitter();
    }
    UComponent.prototype.wrapSelected = function () {
        document.execCommand('underline', false, null);
        //let selection = window.getSelection();
        //let node: any = selection.focusNode;
        //let selectionData: SelectionData = SelectionHelper.getSelectionData();
        //
        //if (document.getElementById(this.editorId).contains(node)) {
        //
        //    if(NodeHelper.haveParentWithLocalNameAndClassName(node, 'span', 'e-style-underline')) {
        //
        //        let parent = NodeHelper.findParentByLocalNameAndClassName(node, 'span', 'e-style-underline');
        //        parent.outerHTML = parent.innerHTML;
        //
        //    } else {
        //        node.parentNode.innerHTML = selectionData.startString + '<span class="e-style-underline">' + selectionData.middleString + '</span>' + selectionData.endString;
        //    }
        //    this.update.emit();
        //}
    };
    return UComponent;
}());
__decorate([
    core_2.Output('contenteditableModelChange'),
    __metadata("design:type", Object)
], UComponent.prototype, "update", void 0);
__decorate([
    core_2.Input('content'),
    __metadata("design:type", String)
], UComponent.prototype, "content", void 0);
__decorate([
    core_2.Input('editorId'),
    __metadata("design:type", String)
], UComponent.prototype, "editorId", void 0);
UComponent = __decorate([
    core_1.Component({
        selector: 'u-editor-button',
        template: 'u.component.html'
    })
], UComponent);
exports.UComponent = UComponent;

//# sourceMappingURL=u.component.js.map
