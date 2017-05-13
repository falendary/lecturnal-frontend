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
var OlComponent = (function () {
    function OlComponent() {
        this.update = new core_1.EventEmitter();
    }
    //private getNodeIndex(elements:HTMLCollection, node:Node):number {
    //
    //    let index:number;
    //
    //    for (let i:number = 0; i < elements.length; i = i + 1) {
    //        if (elements[i].contains(node)) {
    //            index = i;
    //        }
    //    }
    //
    //    return index;
    //
    //}
    //
    //private getElementsToWrap(elements:any, startIndex:number, endIndex:number):Element[] {
    //
    //    let result:Element[] = [];
    //
    //    console.log('elements', elements);
    //
    //    for (let i:number = startIndex; i <= endIndex; i = i + 1) {
    //
    //        result.push(elements[i]);
    //
    //    }
    //
    //
    //    return result;
    //
    //}
    OlComponent.prototype.wrapSelected = function () {
        document.execCommand('insertOrderedList', false, null);
        //let selection = window.getSelection();
        //let node:any = selection.focusNode;
        //
        //console.log('selection', selection);
        //
        //console.log('selection.extentOffset', selection.extentOffset);
        //console.log('selection.anchorOffset', selection.anchorOffset);
        //console.log('node.parentNode.innerText.length', node.parentNode.innerText.length);
        //
        //if (document.getElementById(this.editorId).contains(node)) {
        //
        //    //node.parentNode.innerHTML = '<ul><li>'+nod+'</li></ul>';
        //
        //
        //    let startNode = selection.extentNode;
        //    let endNode = selection.anchorNode;
        //
        //    let startParent = NodeHelper.findBlockParent(startNode.parentElement);
        //    let endParent = NodeHelper.findBlockParent(endNode.parentElement);
        //
        //    if (startParent == endParent) {
        //
        //        let startIndex:number = this.getNodeIndex(startParent.children, startNode);
        //        let endIndex:number = this.getNodeIndex(startParent.children, startNode);
        //
        //        console.log('startIndex', startIndex);
        //        console.log('endIndex', endIndex);
        //
        //        let elementsToWrap:Element[] = this.getElementsToWrap(startParent.children, startIndex, endIndex);
        //
        //        let ol:Element = document.createElement('OL');
        //
        //        for (let i:number = 0; i < elementsToWrap.length; i = i + 1) {
        //            elementsToWrap[i].outerHTML = '<li>' + startParent.children[i].outerHTML + '</li>';
        //            console.log('startParent.children[i].outerHTML', startParent.children[i].outerHTML);
        //            ol.appendChild(elementsToWrap[i]);
        //        }
        //
        //        for(let i:number = startIndex; i <= endIndex; i = i + 1) {
        //            startParent.children[i].remove();
        //        }
        //
        //        startParent.insertBefore(ol,startParent.children[startIndex + 1]);
        //
        //        console.log('startParent', startParent);
        //
        //        this.update.emit();
        //
        //    }
        //}
    };
    return OlComponent;
}());
__decorate([
    core_2.Output('contenteditableModelChange'),
    __metadata("design:type", Object)
], OlComponent.prototype, "update", void 0);
__decorate([
    core_2.Input('content'),
    __metadata("design:type", String)
], OlComponent.prototype, "content", void 0);
__decorate([
    core_2.Input('editorId'),
    __metadata("design:type", String)
], OlComponent.prototype, "editorId", void 0);
OlComponent = __decorate([
    core_1.Component({
        selector: 'ol-editor-button',
        template: 'ol.component.html'
    })
], OlComponent);
exports.OlComponent = OlComponent;

//# sourceMappingURL=ol.component.js.map
