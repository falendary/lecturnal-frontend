var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("editor-features/components/interfaces/IEditorButton", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("editor-features/models/selectionData", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var SelectionData;
    return {
        setters: [],
        execute: function () {
            SelectionData = class SelectionData {
            };
            exports_2("SelectionData", SelectionData);
        }
    };
});
System.register("editor-features/helpers/selection.helper", ["editor-features/models/selectionData"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var selectionData_1, SelectionHelper;
    return {
        setters: [
            function (selectionData_1_1) {
                selectionData_1 = selectionData_1_1;
            }
        ],
        execute: function () {
            SelectionHelper = class SelectionHelper {
                static getSelectionData() {
                    let selectionData = new selectionData_1.SelectionData();
                    let selection = window.getSelection();
                    let offsetFrom = selection.focusOffset;
                    let offsetTo = selection.anchorOffset;
                    if (selection.focusOffset > selection.anchorOffset) {
                        offsetFrom = selection.anchorOffset;
                        offsetTo = selection.focusOffset;
                    }
                    let node = selection.focusNode;
                    console.log('node', { n: node });
                    console.log('selection', selection);
                    let startString = node.textContent.slice(0, offsetFrom);
                    let middleString = node.textContent.slice(offsetFrom, offsetTo);
                    let endString = node.textContent.slice(offsetTo, node.textContent.length);
                    selectionData.offsetFrom = offsetFrom;
                    selectionData.offsetTo = offsetTo;
                    selectionData.startString = startString;
                    selectionData.middleString = middleString;
                    selectionData.endString = endString;
                    return selectionData;
                }
            };
            exports_3("SelectionHelper", SelectionHelper);
        }
    };
});
System.register("editor-features/helpers/node.helper", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var NodeHelper;
    return {
        setters: [],
        execute: function () {
            NodeHelper = class NodeHelper {
                static getListOfBlockTags() {
                    return ['div', 'p', 'ul'];
                }
                static isInlineTag(tag) {
                    let blockTags = NodeHelper.getListOfBlockTags();
                    if (blockTags.indexOf(tag) == -1) {
                        return true;
                    }
                    return false;
                }
                static findParentByLocalName(node, tag) {
                    if (NodeHelper.isInlineTag(node.parentElement.localName)) {
                        if (node.parentElement.localName == tag) {
                            return node.parentElement;
                        }
                        else {
                            return NodeHelper.findParentByLocalName(node.parentElement, tag);
                        }
                    }
                    else {
                        return undefined;
                    }
                }
                static findParentByClassName(node, className) {
                    if (NodeHelper.isInlineTag(node.parentElement.localName)) {
                        if (node.parentElement.classList.contains(className)) {
                            return node.parentElement;
                        }
                        else {
                            return NodeHelper.findParentByClassName(node.parentElement, className);
                        }
                    }
                    else {
                        return undefined;
                    }
                }
                static findParentByLocalNameAndClassName(node, tag, className) {
                    if (NodeHelper.isInlineTag(node.parentElement.localName)) {
                        if (node.parentElement.classList.contains(className) && node.parentElement.localName == tag) {
                            return node.parentElement;
                        }
                        else {
                            return NodeHelper.findParentByClassName(node.parentElement, className);
                        }
                    }
                    else {
                        return undefined;
                    }
                }
                static haveParentWithLocalName(node, tag) {
                    let parentElement = NodeHelper.findParentByLocalName(node, tag);
                    return !!parentElement;
                }
                static haveParentWithClassName(node, className) {
                    let parentElement = NodeHelper.findParentByClassName(node, className);
                    return !!parentElement;
                }
                static haveParentWithLocalNameAndClassName(node, tag, className) {
                    let parentElement = NodeHelper.findParentByLocalNameAndClassName(node, tag, className);
                    return !!parentElement;
                }
                static findBlockParent(element) {
                    if (element.parentElement.localName == 'p' || element.parentElement.localName == 'div' || element.parentElement.localName == 'li') {
                        return element.parentElement;
                    }
                    else {
                        return NodeHelper.findBlockParent(element.parentElement);
                    }
                }
                static unwrapElements(elements, tag, startOffset, endOffset) {
                    let currentLength = 0;
                    console.log('Action: unwrapElements');
                    console.log('endOffset: ' + startOffset);
                    console.log('endOffset: ' + endOffset);
                    console.log('elements.length: ' + elements.length);
                    for (let i = 0; i < elements.length; i = i + 1) {
                        currentLength = currentLength + elements[i].textContent.length;
                        console.log('Index: ' + i);
                        console.log('Current length: ' + currentLength);
                        if (elements[i].hasOwnProperty('localName')) {
                            if (elements[i].localName == tag) {
                                if (currentLength >= startOffset) {
                                    if (currentLength - endOffset <= elements[i].textContent.length) {
                                        let inElementEndOffset = currentLength - endOffset;
                                        if (inElementEndOffset == elements[i].textContent.length) {
                                            elements[i].outerHTML = elements[i].innerHTML;
                                        }
                                        else {
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return elements;
                }
                ;
                static wrapElements(elements, tag, startOffset, endOffset) {
                    let element = document.createElement(tag);
                    let currentLength = 0;
                    let elementInnerHTML = '';
                    let insertionIndex;
                    console.log('Action: wrapElements');
                    console.log('endOffset: ' + startOffset);
                    console.log('endOffset: ' + endOffset);
                    console.log('elements.length: ' + elements.length);
                    for (let i = 0; i < elements.length; i = i + 1) {
                        currentLength = currentLength + elements[i].textContent.length;
                        console.log('Index: ' + i);
                        console.log('Current length: ' + currentLength);
                        if (currentLength - startOffset >= 0) {
                            console.log('Node at start offset have been found, index: ' + i);
                            if (currentLength - startOffset <= elements[i].textContent.length) {
                                elementInnerHTML = elementInnerHTML + elements[i].textContent.slice(startOffset, endOffset);
                                let secondPartText = elements[i].textContent.slice(endOffset, elements[i].textContent.length);
                                elements[i].textContent = elements[i].textContent.slice(0, startOffset);
                                if (secondPartText.length > 0) {
                                    insertionIndex = i;
                                    let secondPartNode = document.createTextNode(secondPartText);
                                    if (i == elements.length - 1) {
                                        elements[i].parentNode.appendChild(secondPartNode);
                                    }
                                    else {
                                        elements[i].parentNode.insertBefore(secondPartNode, elements[i + 1]);
                                    }
                                }
                            }
                        }
                        else {
                            console.log('Node at end offset have been found, index: ' + i);
                            if (currentLength > endOffset) {
                                if (endOffset - currentLength < elements[i].textContent.length) {
                                    let localElementOffset = endOffset - currentLength;
                                    insertionIndex = i;
                                    elementInnerHTML = elementInnerHTML + elements[i].textContent.slice(0, localElementOffset);
                                    elements[i].textContent = elements[i].textContent.slice(localElementOffset);
                                }
                            }
                            else {
                                console.log('Wrapping regular node at index: ' + i);
                                if (elements[i].hasOwnProperty('outerHTML')) {
                                    elementInnerHTML = elementInnerHTML + elements[i].outerHTML;
                                }
                                else {
                                    elementInnerHTML = elementInnerHTML + elements[i].textContent;
                                }
                            }
                        }
                    }
                    console.log('elementInnerHTML', elementInnerHTML);
                    element.innerHTML = elementInnerHTML;
                    if (insertionIndex == elements.length - 1) {
                        elements[0].parentNode.appendChild(element);
                    }
                    else {
                        elements[0].parentNode.insertBefore(element, elements[0].parentNode.childNodes[insertionIndex + 1]);
                    }
                }
            };
            exports_4("NodeHelper", NodeHelper);
        }
    };
});
System.register("editor-features/components/b-component/b.component", ["@angular/core"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_1, core_2, BComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            }
        ],
        execute: function () {
            BComponent = class BComponent {
                constructor() {
                    this.update = new core_1.EventEmitter();
                }
                wrapSelected() {
                    document.execCommand('bold', false, null);
                }
            };
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
                    template: `
      <a (click)="wrapSelected()" class="lc-editor-btn waves-effect waves-light btn"><i class="material-icons">format_bold</i></a>
    `
                })
            ], BComponent);
            exports_5("BComponent", BComponent);
        }
    };
});
System.register("editor-features/components/i-component/i.component", ["@angular/core"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_3, core_4, IComponent;
    return {
        setters: [
            function (core_3_1) {
                core_3 = core_3_1;
                core_4 = core_3_1;
            }
        ],
        execute: function () {
            IComponent = class IComponent {
                constructor() {
                    this.update = new core_3.EventEmitter();
                }
                wrapSelected() {
                    document.execCommand('italic', false, null);
                }
            };
            __decorate([
                core_4.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], IComponent.prototype, "update", void 0);
            __decorate([
                core_4.Input('content'),
                __metadata("design:type", String)
            ], IComponent.prototype, "content", void 0);
            __decorate([
                core_4.Input('editorId'),
                __metadata("design:type", String)
            ], IComponent.prototype, "editorId", void 0);
            IComponent = __decorate([
                core_3.Component({
                    selector: 'i-editor-button',
                    template: `
      <a (click)="wrapSelected()" class="lc-editor-btn waves-effect waves-light btn"><i class="material-icons">format_italic</i></a>
    `
                })
            ], IComponent);
            exports_6("IComponent", IComponent);
        }
    };
});
System.register("editor-features/components/u-component/u.component", ["@angular/core"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_5, core_6, UComponent;
    return {
        setters: [
            function (core_5_1) {
                core_5 = core_5_1;
                core_6 = core_5_1;
            }
        ],
        execute: function () {
            UComponent = class UComponent {
                constructor() {
                    this.update = new core_5.EventEmitter();
                }
                wrapSelected() {
                    document.execCommand('underline', false, null);
                }
            };
            __decorate([
                core_6.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], UComponent.prototype, "update", void 0);
            __decorate([
                core_6.Input('content'),
                __metadata("design:type", String)
            ], UComponent.prototype, "content", void 0);
            __decorate([
                core_6.Input('editorId'),
                __metadata("design:type", String)
            ], UComponent.prototype, "editorId", void 0);
            UComponent = __decorate([
                core_5.Component({
                    selector: 'u-editor-button',
                    template: `
      <a (click)="wrapSelected()" class="lc-editor-btn waves-effect waves-light btn"><i class="material-icons">format_underlined</i></a>
    `
                })
            ], UComponent);
            exports_7("UComponent", UComponent);
        }
    };
});
System.register("editor-features/components/text-center-component/text-center.component", ["@angular/core"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_7, core_8, TextCenterComponent;
    return {
        setters: [
            function (core_7_1) {
                core_7 = core_7_1;
                core_8 = core_7_1;
            }
        ],
        execute: function () {
            TextCenterComponent = class TextCenterComponent {
                constructor() {
                    this.update = new core_7.EventEmitter();
                }
                wrapSelected() {
                    document.execCommand('justifyCenter', false, null);
                }
            };
            __decorate([
                core_8.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], TextCenterComponent.prototype, "update", void 0);
            __decorate([
                core_8.Input('content'),
                __metadata("design:type", String)
            ], TextCenterComponent.prototype, "content", void 0);
            __decorate([
                core_8.Input('editorId'),
                __metadata("design:type", String)
            ], TextCenterComponent.prototype, "editorId", void 0);
            TextCenterComponent = __decorate([
                core_7.Component({
                    selector: 'text-center-editor-button',
                    template: `
      <a (click)="wrapSelected()" class="lc-editor-btn waves-effect waves-light btn"><i class="material-icons">format_align_center</i></a>
    `
                })
            ], TextCenterComponent);
            exports_8("TextCenterComponent", TextCenterComponent);
        }
    };
});
System.register("editor-features/components/text-right-component/text-right.component", ["@angular/core"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_9, core_10, TextRightComponent;
    return {
        setters: [
            function (core_9_1) {
                core_9 = core_9_1;
                core_10 = core_9_1;
            }
        ],
        execute: function () {
            TextRightComponent = class TextRightComponent {
                constructor() {
                    this.update = new core_9.EventEmitter();
                }
                wrapSelected() {
                    document.execCommand('justifyRight', false, null);
                }
            };
            __decorate([
                core_10.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], TextRightComponent.prototype, "update", void 0);
            __decorate([
                core_10.Input('content'),
                __metadata("design:type", String)
            ], TextRightComponent.prototype, "content", void 0);
            __decorate([
                core_10.Input('editorId'),
                __metadata("design:type", String)
            ], TextRightComponent.prototype, "editorId", void 0);
            TextRightComponent = __decorate([
                core_9.Component({
                    selector: 'text-right-editor-button',
                    template: `
      <a (click)="wrapSelected()" class="lc-editor-btn waves-effect waves-light btn"><i class="material-icons">format_align_right</i></a>
    `
                })
            ], TextRightComponent);
            exports_9("TextRightComponent", TextRightComponent);
        }
    };
});
System.register("editor-features/components/text-left-component/text-left.component", ["@angular/core"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var core_11, core_12, TextLeftComponent;
    return {
        setters: [
            function (core_11_1) {
                core_11 = core_11_1;
                core_12 = core_11_1;
            }
        ],
        execute: function () {
            TextLeftComponent = class TextLeftComponent {
                constructor() {
                    this.update = new core_11.EventEmitter();
                }
                wrapSelected() {
                    document.execCommand('justifyLeft', false, null);
                }
            };
            __decorate([
                core_12.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], TextLeftComponent.prototype, "update", void 0);
            __decorate([
                core_12.Input('content'),
                __metadata("design:type", String)
            ], TextLeftComponent.prototype, "content", void 0);
            __decorate([
                core_12.Input('editorId'),
                __metadata("design:type", String)
            ], TextLeftComponent.prototype, "editorId", void 0);
            TextLeftComponent = __decorate([
                core_11.Component({
                    selector: 'text-left-editor-button',
                    template: `
      <a (click)="wrapSelected()" class="lc-editor-btn waves-effect waves-light btn"><i class="material-icons">format_align_left</i></a>
    `
                })
            ], TextLeftComponent);
            exports_10("TextLeftComponent", TextLeftComponent);
        }
    };
});
System.register("editor-features/components/ul-component/ul.component", ["@angular/core"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_13, core_14, UlComponent;
    return {
        setters: [
            function (core_13_1) {
                core_13 = core_13_1;
                core_14 = core_13_1;
            }
        ],
        execute: function () {
            UlComponent = class UlComponent {
                constructor() {
                    this.update = new core_13.EventEmitter();
                }
                wrapSelected() {
                    document.execCommand('insertUnorderedList', false, null);
                }
            };
            __decorate([
                core_14.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], UlComponent.prototype, "update", void 0);
            __decorate([
                core_14.Input('content'),
                __metadata("design:type", String)
            ], UlComponent.prototype, "content", void 0);
            __decorate([
                core_14.Input('editorId'),
                __metadata("design:type", String)
            ], UlComponent.prototype, "editorId", void 0);
            UlComponent = __decorate([
                core_13.Component({
                    selector: 'ul-editor-button',
                    template: `
      <a (click)="wrapSelected()" class="lc-editor-btn waves-effect waves-light btn"><i class="material-icons">format_list_bulleted</i></a>
    `
                })
            ], UlComponent);
            exports_11("UlComponent", UlComponent);
        }
    };
});
System.register("editor-features/components/ol-component/ol.component", ["@angular/core"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var core_15, core_16, OlComponent;
    return {
        setters: [
            function (core_15_1) {
                core_15 = core_15_1;
                core_16 = core_15_1;
            }
        ],
        execute: function () {
            OlComponent = class OlComponent {
                constructor() {
                    this.update = new core_15.EventEmitter();
                }
                wrapSelected() {
                    document.execCommand('insertOrderedList', false, null);
                }
            };
            __decorate([
                core_16.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], OlComponent.prototype, "update", void 0);
            __decorate([
                core_16.Input('content'),
                __metadata("design:type", String)
            ], OlComponent.prototype, "content", void 0);
            __decorate([
                core_16.Input('editorId'),
                __metadata("design:type", String)
            ], OlComponent.prototype, "editorId", void 0);
            OlComponent = __decorate([
                core_15.Component({
                    selector: 'ol-editor-button',
                    template: `
      <a (click)="wrapSelected()" class="lc-editor-btn waves-effect waves-light btn"><i class="material-icons">format_list_numbered</i></a>
    `
                })
            ], OlComponent);
            exports_12("OlComponent", OlComponent);
        }
    };
});
System.register("editor-features/components/text-justify-component/text-justify.component", ["@angular/core"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var core_17, core_18, TextJustifyComponent;
    return {
        setters: [
            function (core_17_1) {
                core_17 = core_17_1;
                core_18 = core_17_1;
            }
        ],
        execute: function () {
            TextJustifyComponent = class TextJustifyComponent {
                constructor() {
                    this.update = new core_17.EventEmitter();
                }
                wrapSelected() {
                    document.execCommand('justifyFull', false, null);
                }
            };
            __decorate([
                core_18.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], TextJustifyComponent.prototype, "update", void 0);
            __decorate([
                core_18.Input('content'),
                __metadata("design:type", String)
            ], TextJustifyComponent.prototype, "content", void 0);
            __decorate([
                core_18.Input('editorId'),
                __metadata("design:type", String)
            ], TextJustifyComponent.prototype, "editorId", void 0);
            TextJustifyComponent = __decorate([
                core_17.Component({
                    selector: 'text-justify-editor-button',
                    template: `
      <a (click)="wrapSelected()" class="lc-editor-btn waves-effect waves-light btn"><i class="material-icons">format_align_justify</i></a>
    `
                })
            ], TextJustifyComponent);
            exports_13("TextJustifyComponent", TextJustifyComponent);
        }
    };
});
System.register("editor-features/components/indent-component/indent.component", ["@angular/core"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var core_19, core_20, IndentComponent;
    return {
        setters: [
            function (core_19_1) {
                core_19 = core_19_1;
                core_20 = core_19_1;
            }
        ],
        execute: function () {
            IndentComponent = class IndentComponent {
                constructor() {
                    this.update = new core_19.EventEmitter();
                }
                wrapSelected() {
                    document.execCommand('indent', false, null);
                }
            };
            __decorate([
                core_20.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], IndentComponent.prototype, "update", void 0);
            __decorate([
                core_20.Input('content'),
                __metadata("design:type", String)
            ], IndentComponent.prototype, "content", void 0);
            __decorate([
                core_20.Input('editorId'),
                __metadata("design:type", String)
            ], IndentComponent.prototype, "editorId", void 0);
            IndentComponent = __decorate([
                core_19.Component({
                    selector: 'indent-editor-button',
                    template: `
      <a (click)="wrapSelected()" class="lc-editor-btn waves-effect waves-light btn"><i class="material-icons">format_indent_increase</i></a>
    `
                })
            ], IndentComponent);
            exports_14("IndentComponent", IndentComponent);
        }
    };
});
System.register("editor-features/components/outdent-component/outdent.component", ["@angular/core"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var core_21, core_22, OutdentComponent;
    return {
        setters: [
            function (core_21_1) {
                core_21 = core_21_1;
                core_22 = core_21_1;
            }
        ],
        execute: function () {
            OutdentComponent = class OutdentComponent {
                constructor() {
                    this.update = new core_21.EventEmitter();
                }
                wrapSelected() {
                    document.execCommand('outdent', false, null);
                }
            };
            __decorate([
                core_22.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], OutdentComponent.prototype, "update", void 0);
            __decorate([
                core_22.Input('content'),
                __metadata("design:type", String)
            ], OutdentComponent.prototype, "content", void 0);
            __decorate([
                core_22.Input('editorId'),
                __metadata("design:type", String)
            ], OutdentComponent.prototype, "editorId", void 0);
            OutdentComponent = __decorate([
                core_21.Component({
                    selector: 'outdent-editor-button',
                    template: `
      <a (click)="wrapSelected()" class="lc-editor-btn waves-effect waves-light btn"><i class="material-icons">format_indent_decrease</i></a>
    `
                })
            ], OutdentComponent);
            exports_15("OutdentComponent", OutdentComponent);
        }
    };
});
System.register("editor-features/components/strike-component/strike.component", ["@angular/core"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var core_23, core_24, StrikeComponent;
    return {
        setters: [
            function (core_23_1) {
                core_23 = core_23_1;
                core_24 = core_23_1;
            }
        ],
        execute: function () {
            StrikeComponent = class StrikeComponent {
                constructor() {
                    this.update = new core_23.EventEmitter();
                }
                wrapSelected() {
                    document.execCommand('strikeThrough', false, null);
                }
            };
            __decorate([
                core_24.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], StrikeComponent.prototype, "update", void 0);
            __decorate([
                core_24.Input('content'),
                __metadata("design:type", String)
            ], StrikeComponent.prototype, "content", void 0);
            __decorate([
                core_24.Input('editorId'),
                __metadata("design:type", String)
            ], StrikeComponent.prototype, "editorId", void 0);
            StrikeComponent = __decorate([
                core_23.Component({
                    selector: 'strike-editor-button',
                    template: `
      <a (click)="wrapSelected()" class="lc-editor-btn waves-effect waves-light btn"><i class="material-icons">strikethrough_s</i></a>
    `
                })
            ], StrikeComponent);
            exports_16("StrikeComponent", StrikeComponent);
        }
    };
});
System.register("editor-features/components/subscript-component/subscript.component", ["@angular/core"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var core_25, core_26, SubscriptComponent;
    return {
        setters: [
            function (core_25_1) {
                core_25 = core_25_1;
                core_26 = core_25_1;
            }
        ],
        execute: function () {
            SubscriptComponent = class SubscriptComponent {
                constructor() {
                    this.update = new core_25.EventEmitter();
                }
                wrapSelected() {
                    document.execCommand('subscript', false, null);
                }
            };
            __decorate([
                core_26.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], SubscriptComponent.prototype, "update", void 0);
            __decorate([
                core_26.Input('content'),
                __metadata("design:type", String)
            ], SubscriptComponent.prototype, "content", void 0);
            __decorate([
                core_26.Input('editorId'),
                __metadata("design:type", String)
            ], SubscriptComponent.prototype, "editorId", void 0);
            SubscriptComponent = __decorate([
                core_25.Component({
                    selector: 'subscript-editor-button',
                    template: `
      <a (click)="wrapSelected()" class="lc-editor-btn waves-effect waves-light btn">x<sub>2</sub></a>
    `
                })
            ], SubscriptComponent);
            exports_17("SubscriptComponent", SubscriptComponent);
        }
    };
});
System.register("editor-features/components/superscript-component/superscript.component", ["@angular/core"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var core_27, core_28, SuperscriptComponent;
    return {
        setters: [
            function (core_27_1) {
                core_27 = core_27_1;
                core_28 = core_27_1;
            }
        ],
        execute: function () {
            SuperscriptComponent = class SuperscriptComponent {
                constructor() {
                    this.update = new core_27.EventEmitter();
                }
                wrapSelected() {
                    document.execCommand('superscript', false, null);
                }
            };
            __decorate([
                core_28.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], SuperscriptComponent.prototype, "update", void 0);
            __decorate([
                core_28.Input('content'),
                __metadata("design:type", String)
            ], SuperscriptComponent.prototype, "content", void 0);
            __decorate([
                core_28.Input('editorId'),
                __metadata("design:type", String)
            ], SuperscriptComponent.prototype, "editorId", void 0);
            SuperscriptComponent = __decorate([
                core_27.Component({
                    selector: 'superscript-editor-button',
                    template: `
      <a (click)="wrapSelected()" class="lc-editor-btn waves-effect waves-light btn">x<sup>2</sup></a>
    `
                })
            ], SuperscriptComponent);
            exports_18("SuperscriptComponent", SuperscriptComponent);
        }
    };
});
System.register("editor-features/components/hr-component/hr.component", ["@angular/core"], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var core_29, core_30, HrComponent;
    return {
        setters: [
            function (core_29_1) {
                core_29 = core_29_1;
                core_30 = core_29_1;
            }
        ],
        execute: function () {
            HrComponent = class HrComponent {
                constructor() {
                    this.update = new core_29.EventEmitter();
                }
                wrapSelected() {
                    document.execCommand('insertHorizontalRule', false, null);
                }
            };
            __decorate([
                core_30.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], HrComponent.prototype, "update", void 0);
            __decorate([
                core_30.Input('content'),
                __metadata("design:type", String)
            ], HrComponent.prototype, "content", void 0);
            __decorate([
                core_30.Input('editorId'),
                __metadata("design:type", String)
            ], HrComponent.prototype, "editorId", void 0);
            HrComponent = __decorate([
                core_29.Component({
                    selector: 'hr-editor-button',
                    template: `
      <a (click)="wrapSelected()" class="lc-editor-btn waves-effect waves-light btn">hr</a>
    `
                })
            ], HrComponent);
            exports_19("HrComponent", HrComponent);
        }
    };
});
System.register("editor-features/components/format-block-component/foramt-block.component", ["@angular/core"], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var core_31, core_32, FormatBlockComponent;
    return {
        setters: [
            function (core_31_1) {
                core_31 = core_31_1;
                core_32 = core_31_1;
            }
        ],
        execute: function () {
            FormatBlockComponent = class FormatBlockComponent {
                constructor() {
                    this.update = new core_31.EventEmitter();
                }
                wrapSelected() {
                    document.execCommand('formatBlock', false, this.formatBlock);
                }
            };
            __decorate([
                core_32.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], FormatBlockComponent.prototype, "update", void 0);
            __decorate([
                core_32.Input('content'),
                __metadata("design:type", String)
            ], FormatBlockComponent.prototype, "content", void 0);
            __decorate([
                core_32.Input('editorId'),
                __metadata("design:type", String)
            ], FormatBlockComponent.prototype, "editorId", void 0);
            FormatBlockComponent = __decorate([
                core_31.Component({
                    selector: 'format-block-editor-button',
                    template: `
      <select name="" id="" [(ngModel)]="formatBlock" (ngModelChange)="wrapSelected()">
          <option value="H1">Heading 1</option>
          <option value="H2">Heading 2</option>
          <option value="H3">Heading 3</option>
          <option value="H4">Heading 4</option>
          <option value="P" selected>Paragraph</option>
      </select>
    `
                })
            ], FormatBlockComponent);
            exports_20("FormatBlockComponent", FormatBlockComponent);
        }
    };
});
System.register("editor-features/components/rf-component/rf.component", ["@angular/core"], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var core_33, core_34, RemoveFormatComponent;
    return {
        setters: [
            function (core_33_1) {
                core_33 = core_33_1;
                core_34 = core_33_1;
            }
        ],
        execute: function () {
            RemoveFormatComponent = class RemoveFormatComponent {
                constructor() {
                    this.update = new core_33.EventEmitter();
                }
                wrapSelected() {
                    document.execCommand('removeFormat', false, null);
                }
            };
            __decorate([
                core_34.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], RemoveFormatComponent.prototype, "update", void 0);
            __decorate([
                core_34.Input('content'),
                __metadata("design:type", String)
            ], RemoveFormatComponent.prototype, "content", void 0);
            __decorate([
                core_34.Input('editorId'),
                __metadata("design:type", String)
            ], RemoveFormatComponent.prototype, "editorId", void 0);
            RemoveFormatComponent = __decorate([
                core_33.Component({
                    selector: 'rf-editor-button',
                    template: `
      <a (click)="wrapSelected()" class="lc-editor-btn waves-effect waves-light btn"><i class="material-icons">format_clear</i></a>
    `
                })
            ], RemoveFormatComponent);
            exports_21("RemoveFormatComponent", RemoveFormatComponent);
        }
    };
});
System.register("editor-features/components/font-size-component/font-size.component", ["@angular/core"], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var core_35, core_36, FontSizeComponent;
    return {
        setters: [
            function (core_35_1) {
                core_35 = core_35_1;
                core_36 = core_35_1;
            }
        ],
        execute: function () {
            FontSizeComponent = class FontSizeComponent {
                constructor() {
                    this.update = new core_35.EventEmitter();
                }
                wrapSelected() {
                    document.execCommand('fontSize', false, 14);
                }
            };
            __decorate([
                core_36.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], FontSizeComponent.prototype, "update", void 0);
            __decorate([
                core_36.Input('content'),
                __metadata("design:type", String)
            ], FontSizeComponent.prototype, "content", void 0);
            __decorate([
                core_36.Input('editorId'),
                __metadata("design:type", String)
            ], FontSizeComponent.prototype, "editorId", void 0);
            FontSizeComponent = __decorate([
                core_35.Component({
                    selector: 'font-size-editor-button',
                    template: `
      <a (click)="wrapSelected()" class="waves-effect waves-light btn">14</a>
    `
                })
            ], FontSizeComponent);
            exports_22("FontSizeComponent", FontSizeComponent);
        }
    };
});
System.register("editor-features/components/font-name-component/font-name.component", ["@angular/core"], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var core_37, core_38, FontNameComponent;
    return {
        setters: [
            function (core_37_1) {
                core_37 = core_37_1;
                core_38 = core_37_1;
            }
        ],
        execute: function () {
            FontNameComponent = class FontNameComponent {
                constructor() {
                    this.update = new core_37.EventEmitter();
                }
                wrapSelected() {
                    document.execCommand('fontName', false, 'Arial');
                }
            };
            __decorate([
                core_38.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], FontNameComponent.prototype, "update", void 0);
            __decorate([
                core_38.Input('content'),
                __metadata("design:type", String)
            ], FontNameComponent.prototype, "content", void 0);
            __decorate([
                core_38.Input('editorId'),
                __metadata("design:type", String)
            ], FontNameComponent.prototype, "editorId", void 0);
            FontNameComponent = __decorate([
                core_37.Component({
                    selector: 'font-name-editor-button',
                    template: `
      <a (click)="wrapSelected()" class="waves-effect waves-light btn">Arial</a>
    `
                })
            ], FontNameComponent);
            exports_23("FontNameComponent", FontNameComponent);
        }
    };
});
System.register("editor-features/components/create-link-component/create-link.component", ["@angular/core"], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var core_39, core_40, CreateLinkComponent;
    return {
        setters: [
            function (core_39_1) {
                core_39 = core_39_1;
                core_40 = core_39_1;
            }
        ],
        execute: function () {
            CreateLinkComponent = class CreateLinkComponent {
                constructor() {
                    this.update = new core_39.EventEmitter();
                }
                wrapSelected() {
                    let url = prompt('Enter the link here: ', 'http:\/\/');
                    document.execCommand('createlink', false, url);
                }
            };
            __decorate([
                core_40.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], CreateLinkComponent.prototype, "update", void 0);
            __decorate([
                core_40.Input('content'),
                __metadata("design:type", String)
            ], CreateLinkComponent.prototype, "content", void 0);
            __decorate([
                core_40.Input('editorId'),
                __metadata("design:type", String)
            ], CreateLinkComponent.prototype, "editorId", void 0);
            CreateLinkComponent = __decorate([
                core_39.Component({
                    selector: 'create-link-editor-button',
                    template: `
      <a (click)="wrapSelected()" class="lc-editor-btn waves-effect waves-light btn"><i class="material-icons">insert_link</i></a>
    `
                })
            ], CreateLinkComponent);
            exports_24("CreateLinkComponent", CreateLinkComponent);
        }
    };
});
System.register("editor-features/components/unlink-component/unlink.component", ["@angular/core"], function (exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var core_41, core_42, UnlinkComponent;
    return {
        setters: [
            function (core_41_1) {
                core_41 = core_41_1;
                core_42 = core_41_1;
            }
        ],
        execute: function () {
            UnlinkComponent = class UnlinkComponent {
                constructor() {
                    this.update = new core_41.EventEmitter();
                }
                wrapSelected() {
                    document.execCommand('unlink', false, null);
                }
            };
            __decorate([
                core_42.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], UnlinkComponent.prototype, "update", void 0);
            __decorate([
                core_42.Input('content'),
                __metadata("design:type", String)
            ], UnlinkComponent.prototype, "content", void 0);
            __decorate([
                core_42.Input('editorId'),
                __metadata("design:type", String)
            ], UnlinkComponent.prototype, "editorId", void 0);
            UnlinkComponent = __decorate([
                core_41.Component({
                    selector: 'unlink-editor-button',
                    template: `
      <a (click)="wrapSelected()" class="lc-editor-btn waves-effect waves-light btn">Unlink</a>
    `
                })
            ], UnlinkComponent);
            exports_25("UnlinkComponent", UnlinkComponent);
        }
    };
});
System.register("editor-features/components/insert-image-component/insert-image.component", ["@angular/core"], function (exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var core_43, core_44, InsertImageComponent;
    return {
        setters: [
            function (core_43_1) {
                core_43 = core_43_1;
                core_44 = core_43_1;
            }
        ],
        execute: function () {
            InsertImageComponent = class InsertImageComponent {
                constructor() {
                    this.update = new core_43.EventEmitter();
                }
                wrapSelected() {
                    let url = prompt('Enter the link here: ', 'http:\/\/');
                    document.execCommand('insertimage', false, url);
                }
            };
            __decorate([
                core_44.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], InsertImageComponent.prototype, "update", void 0);
            __decorate([
                core_44.Input('content'),
                __metadata("design:type", String)
            ], InsertImageComponent.prototype, "content", void 0);
            __decorate([
                core_44.Input('editorId'),
                __metadata("design:type", String)
            ], InsertImageComponent.prototype, "editorId", void 0);
            InsertImageComponent = __decorate([
                core_43.Component({
                    selector: 'insert-image-editor-button',
                    template: `
      <a (click)="wrapSelected()" class="lc-editor-btn waves-effect waves-light btn"><i class="material-icons">insert_photo</i></a>
    `
                })
            ], InsertImageComponent);
            exports_26("InsertImageComponent", InsertImageComponent);
        }
    };
});
System.register("editor-features/editor-featrues.module", ["@angular/core", "@angular/forms", "editor-features/components/b-component/b.component", "editor-features/components/i-component/i.component", "editor-features/components/u-component/u.component", "editor-features/components/text-center-component/text-center.component", "editor-features/components/text-right-component/text-right.component", "editor-features/components/text-left-component/text-left.component", "editor-features/components/ul-component/ul.component", "editor-features/components/ol-component/ol.component", "editor-features/components/text-justify-component/text-justify.component", "editor-features/components/indent-component/indent.component", "editor-features/components/outdent-component/outdent.component", "editor-features/components/strike-component/strike.component", "editor-features/components/subscript-component/subscript.component", "editor-features/components/superscript-component/superscript.component", "editor-features/components/hr-component/hr.component", "editor-features/components/format-block-component/foramt-block.component", "editor-features/components/rf-component/rf.component", "editor-features/components/font-size-component/font-size.component", "editor-features/components/font-name-component/font-name.component", "editor-features/components/create-link-component/create-link.component", "editor-features/components/unlink-component/unlink.component", "editor-features/components/insert-image-component/insert-image.component"], function (exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var core_45, forms_1, b_component_1, i_component_1, u_component_1, text_center_component_1, text_right_component_1, text_left_component_1, ul_component_1, ol_component_1, text_justify_component_1, indent_component_1, outdent_component_1, strike_component_1, subscript_component_1, superscript_component_1, hr_component_1, foramt_block_component_1, rf_component_1, font_size_component_1, font_name_component_1, create_link_component_1, unlink_component_1, insert_image_component_1, EditorFeaturesModule;
    return {
        setters: [
            function (core_45_1) {
                core_45 = core_45_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (b_component_1_1) {
                b_component_1 = b_component_1_1;
            },
            function (i_component_1_1) {
                i_component_1 = i_component_1_1;
            },
            function (u_component_1_1) {
                u_component_1 = u_component_1_1;
            },
            function (text_center_component_1_1) {
                text_center_component_1 = text_center_component_1_1;
            },
            function (text_right_component_1_1) {
                text_right_component_1 = text_right_component_1_1;
            },
            function (text_left_component_1_1) {
                text_left_component_1 = text_left_component_1_1;
            },
            function (ul_component_1_1) {
                ul_component_1 = ul_component_1_1;
            },
            function (ol_component_1_1) {
                ol_component_1 = ol_component_1_1;
            },
            function (text_justify_component_1_1) {
                text_justify_component_1 = text_justify_component_1_1;
            },
            function (indent_component_1_1) {
                indent_component_1 = indent_component_1_1;
            },
            function (outdent_component_1_1) {
                outdent_component_1 = outdent_component_1_1;
            },
            function (strike_component_1_1) {
                strike_component_1 = strike_component_1_1;
            },
            function (subscript_component_1_1) {
                subscript_component_1 = subscript_component_1_1;
            },
            function (superscript_component_1_1) {
                superscript_component_1 = superscript_component_1_1;
            },
            function (hr_component_1_1) {
                hr_component_1 = hr_component_1_1;
            },
            function (foramt_block_component_1_1) {
                foramt_block_component_1 = foramt_block_component_1_1;
            },
            function (rf_component_1_1) {
                rf_component_1 = rf_component_1_1;
            },
            function (font_size_component_1_1) {
                font_size_component_1 = font_size_component_1_1;
            },
            function (font_name_component_1_1) {
                font_name_component_1 = font_name_component_1_1;
            },
            function (create_link_component_1_1) {
                create_link_component_1 = create_link_component_1_1;
            },
            function (unlink_component_1_1) {
                unlink_component_1 = unlink_component_1_1;
            },
            function (insert_image_component_1_1) {
                insert_image_component_1 = insert_image_component_1_1;
            }
        ],
        execute: function () {
            EditorFeaturesModule = class EditorFeaturesModule {
                constructor() {
                    console.log('EditorFeaturesModule init');
                }
            };
            EditorFeaturesModule = __decorate([
                core_45.NgModule({
                    declarations: [
                        b_component_1.BComponent,
                        i_component_1.IComponent,
                        u_component_1.UComponent,
                        strike_component_1.StrikeComponent,
                        text_center_component_1.TextCenterComponent,
                        text_right_component_1.TextRightComponent,
                        text_left_component_1.TextLeftComponent,
                        text_justify_component_1.TextJustifyComponent,
                        indent_component_1.IndentComponent,
                        outdent_component_1.OutdentComponent,
                        ol_component_1.OlComponent,
                        ul_component_1.UlComponent,
                        subscript_component_1.SubscriptComponent,
                        superscript_component_1.SuperscriptComponent,
                        hr_component_1.HrComponent,
                        rf_component_1.RemoveFormatComponent,
                        foramt_block_component_1.FormatBlockComponent,
                        font_size_component_1.FontSizeComponent,
                        font_name_component_1.FontNameComponent,
                        create_link_component_1.CreateLinkComponent,
                        unlink_component_1.UnlinkComponent,
                        insert_image_component_1.InsertImageComponent
                    ],
                    imports: [forms_1.FormsModule],
                    exports: [
                        b_component_1.BComponent,
                        i_component_1.IComponent,
                        u_component_1.UComponent,
                        strike_component_1.StrikeComponent,
                        text_center_component_1.TextCenterComponent,
                        text_right_component_1.TextRightComponent,
                        text_left_component_1.TextLeftComponent,
                        text_justify_component_1.TextJustifyComponent,
                        indent_component_1.IndentComponent,
                        outdent_component_1.OutdentComponent,
                        ol_component_1.OlComponent,
                        ul_component_1.UlComponent,
                        subscript_component_1.SubscriptComponent,
                        superscript_component_1.SuperscriptComponent,
                        hr_component_1.HrComponent,
                        rf_component_1.RemoveFormatComponent,
                        foramt_block_component_1.FormatBlockComponent,
                        font_size_component_1.FontSizeComponent,
                        font_name_component_1.FontNameComponent,
                        create_link_component_1.CreateLinkComponent,
                        unlink_component_1.UnlinkComponent,
                        insert_image_component_1.InsertImageComponent
                    ],
                    bootstrap: []
                }),
                __metadata("design:paramtypes", [])
            ], EditorFeaturesModule);
            exports_27("EditorFeaturesModule", EditorFeaturesModule);
        }
    };
});
System.register("app/services/cookie.service", [], function (exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var CookieService;
    return {
        setters: [],
        execute: function () {
            CookieService = class CookieService {
                static getCookie(name) {
                    let cookieValue = null;
                    if (document.cookie && document.cookie != '') {
                        let cookies = document.cookie.split(';');
                        for (let i = 0; i < cookies.length; i++) {
                            let cookie = cookies[i].trim();
                            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                                break;
                            }
                        }
                    }
                    return cookieValue;
                }
                static setCookie(name, value, options) {
                    options = options || {};
                    let expires = options.expires;
                    if (typeof expires == "number" && expires) {
                        let d = new Date();
                        d.setTime(expires);
                        expires = options.expires = d;
                    }
                    if (expires && expires.toUTCString) {
                        options.expires = expires.toUTCString();
                    }
                    value = encodeURIComponent(value);
                    let updatedCookie = name + "=" + value;
                    for (let propName in options) {
                        updatedCookie += "; " + propName;
                        let propValue = options[propName];
                        if (propValue !== true) {
                            updatedCookie += "=" + propValue;
                        }
                    }
                    document.cookie = updatedCookie;
                }
                ;
                static deleteCookie(name) {
                    CookieService.setCookie(name, "", { expires: -1 });
                }
            };
            exports_28("CookieService", CookieService);
        }
    };
});
System.register("app/repositories/auth.repository", ["@angular/core", "rxjs/Rx", "@angular/http", "rxjs/add/operator/map", "rxjs/add/operator/catch"], function (exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var core_46, Rx_1, http_1, AuthRepository;
    return {
        setters: [
            function (core_46_1) {
                core_46 = core_46_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {
            },
            function (_2) {
            }
        ],
        execute: function () {
            AuthRepository = class AuthRepository {
                constructor(http) {
                    this.http = http;
                    console.log('repository', this.http);
                }
                login(username, password) {
                    return this.http.post('backend/web/v1/auth/login', JSON.stringify({ username, password }))
                        .map((res) => res.json())
                        .catch((error) => Rx_1.Observable.throw(error.json().error || 'Server error'));
                }
                signup(username, password, email) {
                    return this.http.post('backend/web/v1/auth/signup', JSON.stringify({ username, password, email }))
                        .map((res) => res.json())
                        .catch((error) => Rx_1.Observable.throw(error.json().error || 'Server error'));
                }
                logout() {
                    this.http.get('backend/web/v1/auth/logout');
                }
            };
            AuthRepository = __decorate([
                core_46.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], AuthRepository);
            exports_29("AuthRepository", AuthRepository);
        }
    };
});
System.register("app/services/auth.service", ["@angular/core", "app/services/cookie.service", "app/repositories/auth.repository"], function (exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var core_47, cookie_service_1, auth_repository_1, AuthService;
    return {
        setters: [
            function (core_47_1) {
                core_47 = core_47_1;
            },
            function (cookie_service_1_1) {
                cookie_service_1 = cookie_service_1_1;
            },
            function (auth_repository_1_1) {
                auth_repository_1 = auth_repository_1_1;
            }
        ],
        execute: function () {
            AuthService = class AuthService {
                constructor(authRepository) {
                    this.authRepository = authRepository;
                }
                isAuthorized() {
                    return !!cookie_service_1.CookieService.getCookie('token');
                }
                login(username, password) {
                    return this.authRepository.login(username, password);
                }
                signup(username, password, email) {
                    return this.authRepository.signup(username, password, email);
                }
                logout() {
                    cookie_service_1.CookieService.deleteCookie('token');
                    this.authRepository.logout();
                }
            };
            AuthService = __decorate([
                core_47.Injectable(),
                __metadata("design:paramtypes", [auth_repository_1.AuthRepository])
            ], AuthService);
            exports_30("AuthService", AuthService);
        }
    };
});
System.register("app/components/shell-component/shell.component", ["@angular/core", "@angular/router", "app/services/auth.service", "rxjs/add/operator/filter"], function (exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var core_48, router_1, auth_service_1, ShellComponent;
    return {
        setters: [
            function (core_48_1) {
                core_48 = core_48_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (_3) {
            }
        ],
        execute: function () {
            ShellComponent = class ShellComponent {
                constructor(router, authService) {
                    this.router = router;
                    console.log('ShellComponent init');
                    this.authService = authService;
                    this.router.events
                        .filter((event) => event instanceof router_1.NavigationStart)
                        .subscribe((event) => {
                        this.currentState = event.url;
                        if (!this.authService.isAuthorized()) {
                            if (event.url !== '/login' && event.url !== '/registration') {
                                this.router.navigateByUrl('/login');
                            }
                        }
                        else {
                            if (event.url == '/login' || event.url == '/registration') {
                                this.router.navigateByUrl('/');
                            }
                        }
                        console.log('event', event);
                    });
                }
                isAuth() {
                    let result = true;
                    if (this.currentState != '/login' && this.currentState != '/registration') {
                        result = false;
                    }
                    return result;
                }
                logout() {
                    this.authService.logout();
                    this.router.navigateByUrl('/login');
                }
            };
            ShellComponent = __decorate([
                core_48.Component({
                    selector: 'shell',
                    template: `
      <nav *ngIf="!isAuth()">
          <div class="nav-wrapper">
              <a href="/" class="brand-logo" style="padding-left: 24px">Lecturnal</a>
              <ul id="nav-mobile" class="right hide-on-med-and-down">
                  <li><a (click)="logout()">Выйти</a></li>
              </ul>
          </div>
      </nav>
      <router-outlet></router-outlet>
    `,
                    providers: [auth_service_1.AuthService]
                }),
                __metadata("design:paramtypes", [router_1.Router, auth_service_1.AuthService])
            ], ShellComponent);
            exports_31("ShellComponent", ShellComponent);
        }
    };
});
System.register("app/components/login-component/login.component", ["@angular/core", "@angular/router", "app/services/auth.service"], function (exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var core_49, router_2, auth_service_2, LoginComponent;
    return {
        setters: [
            function (core_49_1) {
                core_49 = core_49_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            },
            function (auth_service_2_1) {
                auth_service_2 = auth_service_2_1;
            }
        ],
        execute: function () {
            LoginComponent = class LoginComponent {
                constructor(router, authService) {
                    this.router = router;
                    this.authService = authService;
                }
                auth() {
                    this.authService.login(this.username, this.password).subscribe(response => {
                        this.router.navigateByUrl('/');
                    });
                }
            };
            LoginComponent = __decorate([
                core_49.Component({
                    selector: 'login-component',
                    template: `
      <div class="login-component">


          <div class="card">

              <div class="card-content">

                  <div class="card-title">Авторизация</div>

                  <div class="row">

                      <div class="input-field col s12">

                          <input [(ngModel)]="username" type="text" id="username" placeholder="Username">
                          <!--<label for="username">Username</label>-->

                          <input [(ngModel)]="password" type="password" id="password" placeholder="Password">

                      </div>

                  </div>

                  <div class="row card-footer">
                      <a class="waves-effect waves-light btn" (click)="auth()">Войти</a>
                  </div>

              </div>


          </div>


      </div>
    `,
                    providers: [auth_service_2.AuthService]
                }),
                __metadata("design:paramtypes", [router_2.Router, auth_service_2.AuthService])
            ], LoginComponent);
            exports_32("LoginComponent", LoginComponent);
        }
    };
});
System.register("app/components/registration-component/registration.component", ["@angular/core", "@angular/router", "app/services/auth.service"], function (exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var core_50, router_3, auth_service_3, RegistrationComponent;
    return {
        setters: [
            function (core_50_1) {
                core_50 = core_50_1;
            },
            function (router_3_1) {
                router_3 = router_3_1;
            },
            function (auth_service_3_1) {
                auth_service_3 = auth_service_3_1;
            }
        ],
        execute: function () {
            RegistrationComponent = class RegistrationComponent {
                constructor(router, authService) {
                    this.router = router;
                    this.authService = authService;
                }
                signup() {
                    this.authService.signup(this.username, this.password, this.email).subscribe(response => {
                        this.router.navigateByUrl('/');
                    });
                }
            };
            RegistrationComponent = __decorate([
                core_50.Component({
                    selector: 'registration-component',
                    template: `
      <div class="login-component">


          <div class="card">

              <div class="card-content">

                  <div class="card-title">Регистрация</div>

                  <div class="row">

                      <div class="input-field col s12">

                          <input [(ngModel)]="username" type="text" id="username" placeholder="Username">

                          <input [(ngModel)]="email" type="text" id="email" placeholder="Email">
                          <!--<label for="username">Username</label>-->

                          <input [(ngModel)]="password" type="password" id="password" placeholder="Password">

                      </div>

                  </div>

                  <div class="row card-footer">
                      <a class="waves-effect waves-light btn" (click)="signup()">Зарегистрироваться</a>
                  </div>

              </div>


          </div>


      </div>
    `,
                    providers: [auth_service_3.AuthService]
                }),
                __metadata("design:paramtypes", [router_3.Router, auth_service_3.AuthService])
            ], RegistrationComponent);
            exports_33("RegistrationComponent", RegistrationComponent);
        }
    };
});
System.register("app/models/interfaces/IEntity", [], function (exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("app/models/Slide", [], function (exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var Slide;
    return {
        setters: [],
        execute: function () {
            Slide = class Slide {
                constructor() {
                    this.content = '';
                }
            };
            exports_35("Slide", Slide);
        }
    };
});
System.register("app/models/Presentation", [], function (exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
    var Presentation;
    return {
        setters: [],
        execute: function () {
            Presentation = class Presentation {
                constructor() {
                    this.name = '';
                }
            };
            exports_36("Presentation", Presentation);
        }
    };
});
System.register("app/models/interfaces/IQueryParameter", [], function (exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("app/repositories/interfaces/IRepository", [], function (exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("app/helpers/url.helper", [], function (exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    var UrlHelper;
    return {
        setters: [],
        execute: function () {
            UrlHelper = class UrlHelper {
                static createQueryParamtersString(parameters) {
                    let parametersString = '?';
                    for (let i = 0; i < parameters.length; i = i + 1) {
                        if (i == parameters.length - 1) {
                            parametersString = parametersString + parameters[i].key + '=' + parameters[i].key;
                        }
                        else {
                            parametersString = parametersString + parameters[i].key + '=' + parameters[i].key + '&';
                        }
                    }
                    return parametersString;
                }
            };
            exports_39("UrlHelper", UrlHelper);
        }
    };
});
System.register("app/repositories/presentation.repository", ["@angular/core", "rxjs/Rx", "@angular/http", "rxjs/add/operator/map", "rxjs/add/operator/catch", "app/helpers/url.helper", "app/services/cookie.service"], function (exports_40, context_40) {
    "use strict";
    var __moduleName = context_40 && context_40.id;
    var core_51, Rx_2, http_2, url_helper_1, cookie_service_2, PresentationRepository;
    return {
        setters: [
            function (core_51_1) {
                core_51 = core_51_1;
            },
            function (Rx_2_1) {
                Rx_2 = Rx_2_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (_4) {
            },
            function (_5) {
            },
            function (url_helper_1_1) {
                url_helper_1 = url_helper_1_1;
            },
            function (cookie_service_2_1) {
                cookie_service_2 = cookie_service_2_1;
            }
        ],
        execute: function () {
            PresentationRepository = class PresentationRepository {
                constructor(http) {
                    this.http = http;
                }
                getList(parameters) {
                    let headers = new http_2.Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + cookie_service_2.CookieService.getCookie('token') });
                    let options = new http_2.RequestOptions({ headers: headers });
                    let parametersString = '';
                    if (parameters) {
                        parametersString = url_helper_1.UrlHelper.createQueryParamtersString(parameters);
                    }
                    return this.http.get('backend/web/v1/presentations' + parametersString, options)
                        .map((res) => res.json())
                        .catch((error) => Rx_2.Observable.throw(error.json().error || 'Server error'));
                }
                getByKey(presentationId) {
                    let headers = new http_2.Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + cookie_service_2.CookieService.getCookie('token') });
                    let options = new http_2.RequestOptions({ headers: headers });
                    return this.http.get('backend/web/v1/presentations/' + presentationId, options)
                        .map((res) => res.json())
                        .catch((error) => Rx_2.Observable.throw(error.json().error || 'Server error'));
                }
                update(item, presentationId) {
                    let headers = new http_2.Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + cookie_service_2.CookieService.getCookie('token') });
                    let options = new http_2.RequestOptions({ headers: headers });
                    return this.http.put('backend/web/v1/presentations/' + presentationId, JSON.stringify(item), options)
                        .map((res) => res.json())
                        .catch((error) => Rx_2.Observable.throw(error.json().error || 'Server error'));
                }
                create(item) {
                    let headers = new http_2.Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + cookie_service_2.CookieService.getCookie('token') });
                    let options = new http_2.RequestOptions({ headers: headers });
                    return this.http.post('backend/web/v1/presentations', JSON.stringify(item), options)
                        .map((res) => res.json())
                        .catch((error) => Rx_2.Observable.throw(error.json().error || 'Server error'));
                }
                deleteByKey(presentationId) {
                    let headers = new http_2.Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + cookie_service_2.CookieService.getCookie('token') });
                    let options = new http_2.RequestOptions({ headers: headers });
                    this.http.delete('backend/web/v1/presentations/' + presentationId, options)
                        .map((res) => res.json())
                        .catch((error) => Rx_2.Observable.throw(error.json().error || 'Server error'));
                }
            };
            PresentationRepository = __decorate([
                core_51.Injectable(),
                __metadata("design:paramtypes", [http_2.Http])
            ], PresentationRepository);
            exports_40("PresentationRepository", PresentationRepository);
        }
    };
});
System.register("app/services/presentation.service", ["@angular/core", "app/repositories/presentation.repository"], function (exports_41, context_41) {
    "use strict";
    var __moduleName = context_41 && context_41.id;
    var core_52, presentation_repository_1, PresentationService;
    return {
        setters: [
            function (core_52_1) {
                core_52 = core_52_1;
            },
            function (presentation_repository_1_1) {
                presentation_repository_1 = presentation_repository_1_1;
            }
        ],
        execute: function () {
            PresentationService = class PresentationService {
                constructor(presentationRepository) {
                    this.presentationRepository = presentationRepository;
                }
                getList(parameters) {
                    return this.presentationRepository.getList(parameters);
                }
                getByKey(presentationId) {
                    return this.presentationRepository.getByKey(presentationId);
                }
                update(item, presentationId) {
                    return this.presentationRepository.update(item, presentationId);
                }
                create(item) {
                    return this.presentationRepository.create(item);
                }
                deleteByKey(presentationId) {
                    this.presentationRepository.deleteByKey(presentationId);
                }
            };
            PresentationService = __decorate([
                core_52.Injectable(),
                __metadata("design:paramtypes", [presentation_repository_1.PresentationRepository])
            ], PresentationService);
            exports_41("PresentationService", PresentationService);
        }
    };
});
System.register("app/repositories/slide.repository", ["@angular/core", "rxjs/Rx", "@angular/http", "rxjs/add/operator/map", "rxjs/add/operator/catch", "app/helpers/url.helper", "app/services/cookie.service"], function (exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
    var core_53, Rx_3, http_3, url_helper_2, cookie_service_3, SlideRepository;
    return {
        setters: [
            function (core_53_1) {
                core_53 = core_53_1;
            },
            function (Rx_3_1) {
                Rx_3 = Rx_3_1;
            },
            function (http_3_1) {
                http_3 = http_3_1;
            },
            function (_6) {
            },
            function (_7) {
            },
            function (url_helper_2_1) {
                url_helper_2 = url_helper_2_1;
            },
            function (cookie_service_3_1) {
                cookie_service_3 = cookie_service_3_1;
            }
        ],
        execute: function () {
            SlideRepository = class SlideRepository {
                constructor(http) {
                    this.http = http;
                }
                getList(parameters, presentationId) {
                    let headers = new http_3.Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + cookie_service_3.CookieService.getCookie('token') });
                    let options = new http_3.RequestOptions({ headers: headers });
                    let parametersString = '';
                    if (parameters) {
                        parametersString = url_helper_2.UrlHelper.createQueryParamtersString(parameters);
                    }
                    return this.http.get('backend/web/v1/presentations/' + presentationId + '/slides' + parametersString, options)
                        .map((res) => res.json())
                        .catch((error) => Rx_3.Observable.throw(error.json().error || 'Server error'));
                }
                getByKey(presentationId, slideId) {
                    let headers = new http_3.Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + cookie_service_3.CookieService.getCookie('token') });
                    let options = new http_3.RequestOptions({ headers: headers });
                    return this.http.get('backend/web/v1/presentations/' + presentationId + '/slides/' + slideId, options)
                        .map((res) => res.json())
                        .catch((error) => Rx_3.Observable.throw(error.json().error || 'Server error'));
                }
                update(item, presentationId, slideId) {
                    let headers = new http_3.Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + cookie_service_3.CookieService.getCookie('token') });
                    let options = new http_3.RequestOptions({ headers: headers });
                    return this.http.put('backend/web/v1/presentations/' + presentationId + '/slides/' + slideId, JSON.stringify(item), options)
                        .map((res) => res.json())
                        .catch((error) => Rx_3.Observable.throw(error.json().error || 'Server error'));
                }
                create(item, presentationId) {
                    let headers = new http_3.Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + cookie_service_3.CookieService.getCookie('token') });
                    let options = new http_3.RequestOptions({ headers: headers });
                    return this.http.post('backend/web/v1/presentations/' + presentationId + '/slides', JSON.stringify(item), options)
                        .map((res) => res.json())
                        .catch((error) => Rx_3.Observable.throw(error.json().error || 'Server error'));
                }
                deleteByKey(presentationId, slidesId) {
                    let headers = new http_3.Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + cookie_service_3.CookieService.getCookie('token') });
                    let options = new http_3.RequestOptions({ headers: headers });
                    this.http.delete('backend/web/v1/presentations/' + presentationId + '/slides/' + slidesId, options)
                        .map((res) => res.json())
                        .catch((error) => Rx_3.Observable.throw(error.json().error || 'Server error'));
                }
            };
            SlideRepository = __decorate([
                core_53.Injectable(),
                __metadata("design:paramtypes", [http_3.Http])
            ], SlideRepository);
            exports_42("SlideRepository", SlideRepository);
        }
    };
});
System.register("app/services/slide.service", ["@angular/core", "app/repositories/slide.repository"], function (exports_43, context_43) {
    "use strict";
    var __moduleName = context_43 && context_43.id;
    var core_54, slide_repository_1, SlideService;
    return {
        setters: [
            function (core_54_1) {
                core_54 = core_54_1;
            },
            function (slide_repository_1_1) {
                slide_repository_1 = slide_repository_1_1;
            }
        ],
        execute: function () {
            SlideService = class SlideService {
                constructor(slideRepository) {
                    this.slideRepository = slideRepository;
                }
                getList(parameters, presentationId) {
                    return this.slideRepository.getList(parameters, presentationId);
                }
                getByKey(presentationId, slideId) {
                    return this.slideRepository.getByKey(presentationId, slideId);
                }
                update(item, presentationId, slideId) {
                    return this.slideRepository.update(item, presentationId, slideId);
                }
                create(item, presentationId) {
                    return this.slideRepository.create(item, presentationId);
                }
                deleteByKey(presentationId, slideId) {
                    this.slideRepository.deleteByKey(presentationId, slideId);
                }
            };
            SlideService = __decorate([
                core_54.Injectable(),
                __metadata("design:paramtypes", [slide_repository_1.SlideRepository])
            ], SlideService);
            exports_43("SlideService", SlideService);
        }
    };
});
System.register("app/components/dashboard-component/dashboard.component", ["@angular/core", "@angular/router", "app/models/Presentation", "app/services/presentation.service", "app/services/slide.service", "app/models/Slide"], function (exports_44, context_44) {
    "use strict";
    var __moduleName = context_44 && context_44.id;
    var core_55, router_4, Presentation_1, presentation_service_1, slide_service_1, Slide_1, DashboardComponent;
    return {
        setters: [
            function (core_55_1) {
                core_55 = core_55_1;
            },
            function (router_4_1) {
                router_4 = router_4_1;
            },
            function (Presentation_1_1) {
                Presentation_1 = Presentation_1_1;
            },
            function (presentation_service_1_1) {
                presentation_service_1 = presentation_service_1_1;
            },
            function (slide_service_1_1) {
                slide_service_1 = slide_service_1_1;
            },
            function (Slide_1_1) {
                Slide_1 = Slide_1_1;
            }
        ],
        execute: function () {
            DashboardComponent = class DashboardComponent {
                constructor(router, presentationService, slideService) {
                    this.router = router;
                    this.presentationService = presentationService;
                    this.slideService = slideService;
                    console.log('DashboardComponent init');
                    this.getList();
                }
                getList() {
                    let queryParameters = [];
                    this.presentationService.getList(queryParameters).subscribe(presentations => {
                        this.presentations = presentations;
                    });
                }
                addPresentation() {
                    console.log('add presentation');
                    this.presentationService.create(new Presentation_1.Presentation()).subscribe(presentation => {
                        let slide = new Slide_1.Slide();
                        slide.presentation_id = presentation.id;
                        this.slideService.create(slide, presentation.id).subscribe(slide => {
                            this.router.navigateByUrl('/presentation/' + presentation.id + '/slides/' + slide.id);
                        });
                    });
                }
            };
            DashboardComponent = __decorate([
                core_55.Component({
                    selector: 'dashboard',
                    template: `
      <div class="dashboard-component">

          <div class="container">

              Недавние файлы

              <div class="row">

                  <div class="col s3" *ngFor="let presentation of presentations"
                       [routerLink]="['/presentation', presentation.id]">
                      <div class="card">
                          <div class="card-content">
                              {{presentation.name}}
                          </div>
                      </div>
                  </div>

              </div>

          </div>

          <div class="fixed-action-btn">
              <a class="btn-floating btn-large red" (click)="addPresentation()">
                  <i class="large material-icons">add</i>
              </a>
          </div>

      </div>
    `,
                    providers: [presentation_service_1.PresentationService, slide_service_1.SlideService]
                }),
                __metadata("design:paramtypes", [router_4.Router, presentation_service_1.PresentationService, slide_service_1.SlideService])
            ], DashboardComponent);
            exports_44("DashboardComponent", DashboardComponent);
        }
    };
});
System.register("app/helpers/controller.helper", [], function (exports_45, context_45) {
    "use strict";
    var __moduleName = context_45 && context_45.id;
    var ControllerHelper, ReadyStatus;
    return {
        setters: [],
        execute: function () {
            ControllerHelper = class ControllerHelper {
                static check(readyStatus) {
                    for (status in readyStatus) {
                        if (readyStatus.hasOwnProperty(status)) {
                            if (readyStatus[status] == false) {
                                return false;
                            }
                        }
                    }
                    return true;
                }
            };
            exports_45("ControllerHelper", ControllerHelper);
            ReadyStatus = class ReadyStatus {
            };
        }
    };
});
System.register("app/components/presentation-component/presentation.component", ["@angular/core", "@angular/router", "app/services/presentation.service", "app/helpers/controller.helper"], function (exports_46, context_46) {
    "use strict";
    var __moduleName = context_46 && context_46.id;
    var core_56, router_5, presentation_service_2, controller_helper_1, PresentationComponent, ReadyStatus;
    return {
        setters: [
            function (core_56_1) {
                core_56 = core_56_1;
            },
            function (router_5_1) {
                router_5 = router_5_1;
            },
            function (presentation_service_2_1) {
                presentation_service_2 = presentation_service_2_1;
            },
            function (controller_helper_1_1) {
                controller_helper_1 = controller_helper_1_1;
            }
        ],
        execute: function () {
            PresentationComponent = class PresentationComponent {
                constructor(router, route, presentationService) {
                    this.router = router;
                    this.route = route;
                    this.presentationService = presentationService;
                    this.readyStatus = new ReadyStatus();
                    console.log('PresentationComponent init');
                }
                ngOnInit() {
                    this.sub = this.route
                        .params
                        .subscribe(params => {
                        console.log('params', params);
                        this.presentationId = +params['id'] || 0;
                        this.getPresentation();
                    });
                }
                ngOnDestroy() {
                    this.sub.unsubscribe();
                }
                checkReadyStatus() {
                    return controller_helper_1.ControllerHelper.check(this.readyStatus);
                }
                ;
                getPresentation() {
                    this.readyStatus.content = false;
                    this.presentationService.getByKey(this.presentationId).subscribe(presentation => {
                        this.presentation = presentation;
                        this.readyStatus.content = true;
                    });
                }
                updatePresentationName() {
                    this.presentationService.update(this.presentation, this.presentationId).subscribe(presentation => {
                        this.presentation = presentation;
                    });
                }
            };
            PresentationComponent = __decorate([
                core_56.Component({
                    selector: 'presentation',
                    template: `
      <div class="editor-component">
          <div class="row" *ngIf="checkReadyStatus()">
              <div class="input-field col s6 presentation-name-holder">
                  <input placeholder="Presentation name" [(ngModel)]="presentation.name" (blur)="updatePresentationName()"
                         id="presentation_name" type="text" class="validate">
              </div>

          </div>
          <div class="row" *ngIf="!checkReadyStatus()">
              Loading...
          </div>
          <div class="row">
              <div class="col s2">
                  <slides-list></slides-list>
              </div>
              <div class="col s10">
                  <slide-editor></slide-editor>
              </div>
          </div>
      </div>
    `,
                    providers: [presentation_service_2.PresentationService]
                }),
                __metadata("design:paramtypes", [router_5.Router, router_5.ActivatedRoute, presentation_service_2.PresentationService])
            ], PresentationComponent);
            exports_46("PresentationComponent", PresentationComponent);
            ReadyStatus = class ReadyStatus {
                constructor() {
                    this.content = false;
                }
            };
        }
    };
});
System.register("app/components/slide-editor-component/slide-editor.component", ["@angular/core", "@angular/router", "app/models/Slide", "app/services/slide.service", "app/helpers/controller.helper"], function (exports_47, context_47) {
    "use strict";
    var __moduleName = context_47 && context_47.id;
    var core_57, router_6, Slide_2, slide_service_2, controller_helper_2, SlideEditorComponent, ReadyStatus;
    return {
        setters: [
            function (core_57_1) {
                core_57 = core_57_1;
            },
            function (router_6_1) {
                router_6 = router_6_1;
            },
            function (Slide_2_1) {
                Slide_2 = Slide_2_1;
            },
            function (slide_service_2_1) {
                slide_service_2 = slide_service_2_1;
            },
            function (controller_helper_2_1) {
                controller_helper_2 = controller_helper_2_1;
            }
        ],
        execute: function () {
            SlideEditorComponent = class SlideEditorComponent {
                constructor(router, route, slideService) {
                    this.router = router;
                    this.route = route;
                    this.slideService = slideService;
                    this.slide = new Slide_2.Slide();
                    this.isVisualizer = true;
                    this.readyStatus = new ReadyStatus();
                    console.log('SlideEditorCompoennt init');
                    this.editorId = 'editor1';
                }
                checkReadyStatus() {
                    return controller_helper_2.ControllerHelper.check(this.readyStatus);
                }
                ;
                getSlide() {
                    this.readyStatus.content = false;
                    this.slideService.getByKey(this.presentationId, this.slideId).subscribe(slide => {
                        console.log('slide', slide);
                        this.readyStatus.content = true;
                        this.slide = slide;
                    });
                }
                saveSlide() {
                    console.log('update');
                    this.slideService.update(this.slide, this.presentationId, this.slideId).subscribe(slide => {
                        console.log('updated');
                    });
                }
                ngOnInit() {
                    this.sub = this.route
                        .params
                        .subscribe(params => {
                        console.log('params', params);
                        this.presentationId = +params['id'] || 0;
                        this.slideId = +params['slideId'] || 0;
                        if (this.slideId !== 0) {
                            this.getSlide();
                        }
                    });
                }
                ngOnDestroy() {
                    this.sub.unsubscribe();
                }
            };
            SlideEditorComponent = __decorate([
                core_57.Component({
                    selector: 'slide-editor',
                    template: `
      <div class="slide-editor-component">

          <div class="row editor-toolbar-holder">

              <div class="editor-toolbox">

                  <b-editor-button [content]="slide.content" [editorId]="editorId"></b-editor-button>
                  <i-editor-button [content]="slide.content" [editorId]="editorId"></i-editor-button>
                  <u-editor-button [content]="slide.content" [editorId]="editorId"></u-editor-button>
                  <strike-editor-button [content]="slide.content" [editorId]="editorId"></strike-editor-button>

                  <text-center-editor-button [content]="slide.content" [editorId]="editorId"></text-center-editor-button>
                  <text-right-editor-button [content]="slide.content" [editorId]="editorId"></text-right-editor-button>
                  <text-left-editor-button [content]="slide.content" [editorId]="editorId"></text-left-editor-button>
                  <text-justify-editor-button [content]="slide.content" [editorId]="editorId"></text-justify-editor-button>

                  <indent-editor-button [content]="slide.content" [editorId]="editorId"></indent-editor-button>
                  <outdent-editor-button [content]="slide.content" [editorId]="editorId"></outdent-editor-button>

                  <ul-editor-button [content]="slide.content" [editorId]="editorId"></ul-editor-button>
                  <ol-editor-button [content]="slide.content" [editorId]="editorId"></ol-editor-button>

                  <subscript-editor-button [content]="slide.content" [editorId]="editorId"></subscript-editor-button>
                  <superscript-editor-button [content]="slide.content" [editorId]="editorId"></superscript-editor-button>

                  <hr-editor-button [content]="slide.content" [editorId]="editorId"></hr-editor-button>
                  <!--<rf-editor-button [content]="slide.content" [editorId]="editorId"></rf-editor-button>-->

                  <!--<format-block-editor-button [content]="slide.content" [editorId]="editorId"></format-block-editor-button>-->
                  <!--<font-size-editor-button [content]="slide.content" [editorId]="editorId"></font-size-editor-button>-->
                  <!--<font-name-editor-button [content]="slide.content" [editorId]="editorId"></font-name-editor-button>-->

                  <create-link-editor-button [content]="slide.content" [editorId]="editorId"></create-link-editor-button>
                  <!--<unlink-editor-button [content]="slide.content" [editorId]="editorId"></unlink-editor-button>-->

                  <insert-image-editor-button [content]="slide.content" [editorId]="editorId"></insert-image-editor-button>
              </div>

              <div class="editor-switchers">
                  <a (click)="isVisualizer = true" class="{{ isVisualizer ? 'active' : '' }} waves-effect waves-light btn">Визуализатор</a>
                  <a (click)="isVisualizer = false" class="{{ isVisualizer ? '' : 'active' }} waves-effect waves-light btn">Исходный
                      текст</a>
              </div>

          </div>

          <div *ngIf="checkReadyStatus()">

              <div *ngIf="isVisualizer == true">

                  <div contentEditable="true"
                       id="{{editorId}}"
                       (blur)="saveSlide()"
                       [(contenteditableModel)]="slide.content"
                       class="slide-editor-wrapper" tabindex="1">
                  </div>
              </div>

              <div *ngIf="isVisualizer == false">

                  <textarea contentEditable="true" (blur)="saveSlide()" class="slide-editor-textarea" name="" id="" cols="30" rows="10"
                            [(ngModel)]="slide.content"></textarea>
              </div>

          </div>

          <div *ngIf="!checkReadyStatus()">
              Loading...
          </div>

      </div>
    `,
                    providers: [slide_service_2.SlideService]
                }),
                __metadata("design:paramtypes", [router_6.Router, router_6.ActivatedRoute, slide_service_2.SlideService])
            ], SlideEditorComponent);
            exports_47("SlideEditorComponent", SlideEditorComponent);
            ReadyStatus = class ReadyStatus {
                constructor() {
                    this.content = false;
                }
            };
        }
    };
});
System.register("app/models/SlideViewModel", [], function (exports_48, context_48) {
    "use strict";
    var __moduleName = context_48 && context_48.id;
    var SlideViewModel;
    return {
        setters: [],
        execute: function () {
            SlideViewModel = class SlideViewModel {
                constructor(slide) {
                    this.isActive = false;
                    this.id = slide.id;
                    this.created_at = slide.created_at;
                    this.updated_at = slide.updated_at;
                    this.presentation_id = slide.presentation_id;
                    this.content = slide.content;
                    this.isActive = false;
                }
            };
            exports_48("SlideViewModel", SlideViewModel);
        }
    };
});
System.register("app/components/slides-list-component/slides-list.component", ["@angular/core", "@angular/router", "app/models/Slide", "app/services/slide.service", "app/models/SlideViewModel", "app/helpers/controller.helper"], function (exports_49, context_49) {
    "use strict";
    var __moduleName = context_49 && context_49.id;
    var core_58, router_7, Slide_3, slide_service_3, SlideViewModel_1, controller_helper_3, SlidesListComponent, ReadyStatus;
    return {
        setters: [
            function (core_58_1) {
                core_58 = core_58_1;
            },
            function (router_7_1) {
                router_7 = router_7_1;
            },
            function (Slide_3_1) {
                Slide_3 = Slide_3_1;
            },
            function (slide_service_3_1) {
                slide_service_3 = slide_service_3_1;
            },
            function (SlideViewModel_1_1) {
                SlideViewModel_1 = SlideViewModel_1_1;
            },
            function (controller_helper_3_1) {
                controller_helper_3 = controller_helper_3_1;
            }
        ],
        execute: function () {
            SlidesListComponent = class SlidesListComponent {
                constructor(router, route, slideService) {
                    this.router = router;
                    this.route = route;
                    this.slideService = slideService;
                    this.readyStatus = new ReadyStatus();
                    console.log('Sliders tree');
                }
                ngOnInit() {
                    this.sub = this.route
                        .params
                        .subscribe(params => {
                        console.log('params', params);
                        this.presentationId = +params['id'] || 0;
                        this.slideId = +params['slideId'] || 0;
                        this.getList();
                    });
                }
                ngOnDestroy() {
                    this.sub.unsubscribe();
                }
                getList() {
                    let queryParameters = [];
                    this.readyStatus.content = false;
                    this.slideService.getList(queryParameters, this.presentationId).subscribe(slides => {
                        this.slides = slides.map(function (slide) {
                            return new SlideViewModel_1.SlideViewModel(slide);
                        });
                        this.findActiveSlide();
                        this.readyStatus.content = true;
                    });
                }
                findActiveSlide() {
                    this.slides.forEach(slide => {
                        if (slide.id == this.slideId) {
                            slide.isActive = true;
                        }
                    });
                }
                checkReadyStatus() {
                    return controller_helper_3.ControllerHelper.check(this.readyStatus);
                }
                ;
                addSlide() {
                    this.slideService.create(new Slide_3.Slide(), this.presentationId).subscribe(slide => {
                        console.log('updated');
                        this.getList();
                    });
                }
                selectSlide(slide) {
                    console.log('select slide');
                    this.router.navigateByUrl('/presentation/' + this.presentationId + '/slides/' + slide.id);
                }
            };
            SlidesListComponent = __decorate([
                core_58.Component({
                    selector: 'slides-list',
                    template: `
      <div class="slide-list-component">

          <a (click)="addSlide()" class="waves-effect waves-light btn">Добавить страницу</a>

          <div class="row slides-list-container" *ngIf="checkReadyStatus()">

              <div class="card stc-slide-card {{slide.isActive ? 'active' : ''}}" *ngFor="let slide of slides"
                   (click)="selectSlide(slide)">
                  <div class="card-content">
                      <div class="cc-body-content" [innerHTML]="slide.content">
                      </div>
                  </div>
              </div>

          </div>

          <div class="row" *ngIf="!checkReadyStatus()">
              Loading..
          </div>

      </div>
    `,
                    providers: [slide_service_3.SlideService]
                }),
                __metadata("design:paramtypes", [router_7.Router, router_7.ActivatedRoute, slide_service_3.SlideService])
            ], SlidesListComponent);
            exports_49("SlidesListComponent", SlidesListComponent);
            ReadyStatus = class ReadyStatus {
                constructor() {
                    this.content = false;
                }
            };
        }
    };
});
System.register("app/directives/content-editable.directive", ["@angular/core"], function (exports_50, context_50) {
    "use strict";
    var __moduleName = context_50 && context_50.id;
    var core_59, core_60, ContentEditableDirective;
    return {
        setters: [
            function (core_59_1) {
                core_59 = core_59_1;
                core_60 = core_59_1;
            }
        ],
        execute: function () {
            ContentEditableDirective = class ContentEditableDirective {
                constructor(elementRef) {
                    this.elementRef = elementRef;
                    this.update = new core_59.EventEmitter();
                }
                ngOnChanges(changes) {
                    if (changes.model.firstChange == true) {
                        this.refreshView();
                    }
                }
                onEdit() {
                    let value = this.elementRef.nativeElement.innerHTML;
                    this.update.emit(value);
                }
                refreshView() {
                    this.elementRef.nativeElement.innerHTML = this.model;
                }
            };
            __decorate([
                core_60.Input('contenteditableModel'),
                __metadata("design:type", Object)
            ], ContentEditableDirective.prototype, "model", void 0);
            __decorate([
                core_60.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], ContentEditableDirective.prototype, "update", void 0);
            ContentEditableDirective = __decorate([
                core_59.Directive({
                    selector: '[contenteditableModel]',
                    host: {
                        '(blur)': 'onEdit()',
                        '(keyup)': 'onEdit()'
                    }
                }),
                __metadata("design:paramtypes", [core_59.ElementRef])
            ], ContentEditableDirective);
            exports_50("ContentEditableDirective", ContentEditableDirective);
        }
    };
});
System.register("app/app.routing", ["@angular/router", "app/components/dashboard-component/dashboard.component", "app/components/login-component/login.component", "app/components/registration-component/registration.component", "app/components/presentation-component/presentation.component"], function (exports_51, context_51) {
    "use strict";
    var __moduleName = context_51 && context_51.id;
    var router_8, dashboard_component_1, login_component_1, registration_component_1, presentation_component_1, appRoutes, routing;
    return {
        setters: [
            function (router_8_1) {
                router_8 = router_8_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (registration_component_1_1) {
                registration_component_1 = registration_component_1_1;
            },
            function (presentation_component_1_1) {
                presentation_component_1 = presentation_component_1_1;
            }
        ],
        execute: function () {
            appRoutes = [
                {
                    path: '',
                    component: dashboard_component_1.DashboardComponent,
                },
                {
                    path: 'login',
                    component: login_component_1.LoginComponent,
                },
                {
                    path: 'registration',
                    component: registration_component_1.RegistrationComponent
                },
                {
                    path: 'presentation',
                    children: [
                        {
                            path: ':id',
                            component: presentation_component_1.PresentationComponent
                        },
                        {
                            path: ':id/slides/:slideId',
                            component: presentation_component_1.PresentationComponent
                        }
                    ]
                },
            ];
            exports_51("routing", routing = router_8.RouterModule.forRoot(appRoutes));
        }
    };
});
System.register("app/app.module", ["@angular/core", "@angular/http", "@angular/forms", "@angular/platform-browser", "editor-features/editor-featrues.module", "app/components/shell-component/shell.component", "app/components/login-component/login.component", "app/components/registration-component/registration.component", "app/components/dashboard-component/dashboard.component", "app/components/presentation-component/presentation.component", "app/components/slide-editor-component/slide-editor.component", "app/components/slides-list-component/slides-list.component", "app/directives/content-editable.directive", "app/app.routing", "app/repositories/auth.repository", "app/repositories/presentation.repository", "app/repositories/slide.repository"], function (exports_52, context_52) {
    "use strict";
    var __moduleName = context_52 && context_52.id;
    var core_61, http_4, forms_2, platform_browser_1, editor_featrues_module_1, shell_component_1, login_component_2, registration_component_2, dashboard_component_2, presentation_component_2, slide_editor_component_1, slides_list_component_1, content_editable_directive_1, app_routing_1, auth_repository_2, presentation_repository_2, slide_repository_2, AppModule;
    return {
        setters: [
            function (core_61_1) {
                core_61 = core_61_1;
            },
            function (http_4_1) {
                http_4 = http_4_1;
            },
            function (forms_2_1) {
                forms_2 = forms_2_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (editor_featrues_module_1_1) {
                editor_featrues_module_1 = editor_featrues_module_1_1;
            },
            function (shell_component_1_1) {
                shell_component_1 = shell_component_1_1;
            },
            function (login_component_2_1) {
                login_component_2 = login_component_2_1;
            },
            function (registration_component_2_1) {
                registration_component_2 = registration_component_2_1;
            },
            function (dashboard_component_2_1) {
                dashboard_component_2 = dashboard_component_2_1;
            },
            function (presentation_component_2_1) {
                presentation_component_2 = presentation_component_2_1;
            },
            function (slide_editor_component_1_1) {
                slide_editor_component_1 = slide_editor_component_1_1;
            },
            function (slides_list_component_1_1) {
                slides_list_component_1 = slides_list_component_1_1;
            },
            function (content_editable_directive_1_1) {
                content_editable_directive_1 = content_editable_directive_1_1;
            },
            function (app_routing_1_1) {
                app_routing_1 = app_routing_1_1;
            },
            function (auth_repository_2_1) {
                auth_repository_2 = auth_repository_2_1;
            },
            function (presentation_repository_2_1) {
                presentation_repository_2 = presentation_repository_2_1;
            },
            function (slide_repository_2_1) {
                slide_repository_2 = slide_repository_2_1;
            }
        ],
        execute: function () {
            AppModule = class AppModule {
                constructor() {
                    console.log('AppModule init');
                }
            };
            AppModule = __decorate([
                core_61.NgModule({
                    imports: [
                        platform_browser_1.BrowserModule,
                        http_4.HttpModule,
                        forms_2.FormsModule,
                        app_routing_1.routing,
                        editor_featrues_module_1.EditorFeaturesModule
                    ],
                    declarations: [
                        shell_component_1.ShellComponent,
                        login_component_2.LoginComponent,
                        registration_component_2.RegistrationComponent,
                        dashboard_component_2.DashboardComponent,
                        presentation_component_2.PresentationComponent,
                        slide_editor_component_1.SlideEditorComponent,
                        slides_list_component_1.SlidesListComponent,
                        content_editable_directive_1.ContentEditableDirective
                    ],
                    providers: [
                        auth_repository_2.AuthRepository,
                        presentation_repository_2.PresentationRepository,
                        slide_repository_2.SlideRepository
                    ],
                    bootstrap: [shell_component_1.ShellComponent, []]
                }),
                __metadata("design:paramtypes", [])
            ], AppModule);
            exports_52("AppModule", AppModule);
        }
    };
});
System.register("main", ["@angular/platform-browser-dynamic", "app/app.module"], function (exports_53, context_53) {
    "use strict";
    var __moduleName = context_53 && context_53.id;
    var platform_browser_dynamic_1, app_module_1;
    return {
        setters: [
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (app_module_1_1) {
                app_module_1 = app_module_1_1;
            }
        ],
        execute: function () {
            platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
        }
    };
});
System.register("editor-features/components/b-component/b.component-old", ["@angular/core", "editor-features/helpers/selection.helper", "editor-features/helpers/node.helper"], function (exports_54, context_54) {
    "use strict";
    var __moduleName = context_54 && context_54.id;
    var core_62, core_63, selection_helper_1, node_helper_1, BComponent;
    return {
        setters: [
            function (core_62_1) {
                core_62 = core_62_1;
                core_63 = core_62_1;
            },
            function (selection_helper_1_1) {
                selection_helper_1 = selection_helper_1_1;
            },
            function (node_helper_1_1) {
                node_helper_1 = node_helper_1_1;
            }
        ],
        execute: function () {
            BComponent = class BComponent {
                constructor() {
                    this.update = new core_62.EventEmitter();
                }
                wrapSelected() {
                    let selection = window.getSelection();
                    let node = selection.focusNode;
                    let selectionData = selection_helper_1.SelectionHelper.getSelectionData();
                    if (document.getElementById(this.editorId).contains(node)) {
                        console.log({ parentNode: node.parentNode });
                        console.log({ node: node });
                        if (node_helper_1.NodeHelper.haveParentWithLocalName(node, 'b')) {
                            let parent = node_helper_1.NodeHelper.findParentByLocalName(node, 'b');
                            parent.outerHTML = parent.innerHTML;
                        }
                        else {
                            let blockParent = node_helper_1.NodeHelper.findBlockParent(node);
                            if (blockParent.childNodes.length > 1) {
                                let currentLength = 0;
                                let nodesToWrap = [];
                                let startNodeIndex;
                                let endNodeIndex;
                                for (let i = 0; i < blockParent.childNodes.length; i = i + 1) {
                                    currentLength = currentLength + blockParent.childNodes[i].textContent.length;
                                    if (currentLength >= selectionData.offsetFrom) {
                                        if (!startNodeIndex) {
                                            startNodeIndex = i;
                                        }
                                        let lengthDiff = currentLength - selectionData.offsetTo;
                                        if (lengthDiff < blockParent.childNodes[i].textContent.length) {
                                            nodesToWrap.push(blockParent.childNodes[i]);
                                            endNodeIndex = i;
                                        }
                                    }
                                }
                                console.log('nodesToWrap', nodesToWrap);
                                let b = document.createElement('B');
                                for (let i = 0; i < nodesToWrap.length; i = i + 1) {
                                    b.appendChild(nodesToWrap[i]);
                                }
                                console.log('B ELEMENT', b);
                            }
                            else {
                                blockParent.innerHTML = selectionData.startString + '<b>' + selectionData.middleString + '</b>' + selectionData.endString;
                            }
                        }
                        this.update.emit();
                    }
                }
            };
            __decorate([
                core_63.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], BComponent.prototype, "update", void 0);
            __decorate([
                core_63.Input('content'),
                __metadata("design:type", String)
            ], BComponent.prototype, "content", void 0);
            __decorate([
                core_63.Input('editorId'),
                __metadata("design:type", String)
            ], BComponent.prototype, "editorId", void 0);
            BComponent = __decorate([
                core_62.Component({
                    selector: 'b-editor-button',
                    template: `
      <a (click)="wrapSelected()" class="lc-editor-btn waves-effect waves-light btn"><i class="material-icons">format_bold</i></a>
    `
                })
            ], BComponent);
            exports_54("BComponent", BComponent);
        }
    };
});

//# sourceMappingURL=main.js.map
