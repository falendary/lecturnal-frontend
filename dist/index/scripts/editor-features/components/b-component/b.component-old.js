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
var selection_helper_1 = require("../../helpers/selection.helper");
var node_helper_1 = require("../../helpers/node.helper");
var BComponent = (function () {
    function BComponent() {
        this.update = new core_1.EventEmitter();
    }
    BComponent.prototype.wrapSelected = function () {
        var selection = window.getSelection();
        var node = selection.focusNode;
        var selectionData = selection_helper_1.SelectionHelper.getSelectionData();
        if (document.getElementById(this.editorId).contains(node)) {
            console.log({ parentNode: node.parentNode });
            console.log({ node: node });
            if (node_helper_1.NodeHelper.haveParentWithLocalName(node, 'b')) {
                var parent_1 = node_helper_1.NodeHelper.findParentByLocalName(node, 'b');
                parent_1.outerHTML = parent_1.innerHTML;
            }
            else {
                var blockParent = node_helper_1.NodeHelper.findBlockParent(node);
                if (blockParent.childNodes.length > 1) {
                    var currentLength = 0;
                    var nodesToWrap = []; // Node or Element
                    var startNodeIndex = void 0;
                    var endNodeIndex = void 0;
                    for (var i = 0; i < blockParent.childNodes.length; i = i + 1) {
                        currentLength = currentLength + blockParent.childNodes[i].textContent.length;
                        if (currentLength >= selectionData.offsetFrom) {
                            if (!startNodeIndex) {
                                startNodeIndex = i;
                            }
                            var lengthDiff = currentLength - selectionData.offsetTo;
                            if (lengthDiff < blockParent.childNodes[i].textContent.length) {
                                nodesToWrap.push(blockParent.childNodes[i]);
                                //blockParent.removeChild(blockParent.childNodes[i]);
                                endNodeIndex = i;
                            }
                        }
                    }
                    console.log('nodesToWrap', nodesToWrap);
                    var b = document.createElement('B');
                    for (var i = 0; i < nodesToWrap.length; i = i + 1) {
                        b.appendChild(nodesToWrap[i]);
                    }
                    console.log('B ELEMENT', b);
                    //blockParent.insertBefore(b, blockParent.children[startNodeIndex + 1]); // next to start
                }
                else {
                    blockParent.innerHTML = selectionData.startString + '<b>' + selectionData.middleString + '</b>' + selectionData.endString;
                }
            }
            this.update.emit();
        }
    };
    return BComponent;
}());
__decorate([
    core_2.Output('contenteditableModelChange'),
    __metadata("design:type", Object)
], BComponent.prototype, "update", void 0);
__decorate([
    core_2.Input('content'),
    __metadata("design:type", String)
], BComponent.prototype, "content", void 0);
__decorate([
    core_2.Input('editorId'),
    __metadata("design:type", String)
], BComponent.prototype, "editorId", void 0);
BComponent = __decorate([
    core_1.Component({
        selector: 'b-editor-button',
        template: 'b.component.html'
    })
], BComponent);
exports.BComponent = BComponent;

//# sourceMappingURL=b.component-old.js.map
