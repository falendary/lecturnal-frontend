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
                    let startString = node.nodeValue.slice(0, offsetFrom);
                    let middleString = node.nodeValue.slice(offsetFrom, offsetTo);
                    let endString = node.nodeValue.slice(offsetTo, node.nodeValue.length);
                    selectionData.offsetFrom = offsetFrom;
                    selectionData.offsetTo = offsetTo;
                    selectionData.startString = startString;
                    selectionData.middleString = middleString;
                    selectionData.endString = endString;
                    return selectionData;
                }
                static findBlockParent(element) {
                    if (element.parentElement.localName == 'p' || element.parentElement.localName == 'div' || element.parentElement.localName == 'li') {
                        return element.parentElement;
                    }
                    else {
                        return SelectionHelper.findBlockParent(element.parentElement);
                    }
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
            };
            exports_4("NodeHelper", NodeHelper);
        }
    };
});
System.register("editor-features/components/b-component/b.component", ["@angular/core", "editor-features/helpers/selection.helper", "editor-features/helpers/node.helper"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_1, core_2, selection_helper_1, node_helper_1, BComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
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
                    this.update = new core_1.EventEmitter();
                }
                wrapSelected() {
                    let selection = window.getSelection();
                    let node = selection.focusNode;
                    let selectionData = selection_helper_1.SelectionHelper.getSelectionData();
                    if (document.getElementById(this.editorId).contains(node)) {
                        console.log({ parentNode: node.parentNode });
                        if (node_helper_1.NodeHelper.haveParentWithLocalName(node, 'b')) {
                            let parent = node_helper_1.NodeHelper.findParentByLocalName(node, 'b');
                            parent.outerHTML = parent.innerHTML;
                        }
                        else {
                            node.parentNode.innerHTML = selectionData.startString + '<b>' + selectionData.middleString + '</b>' + selectionData.endString;
                        }
                        this.update.emit();
                    }
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
      <a (click)="wrapSelected()" class="waves-effect waves-light btn"><b>B</b></a>
    `
                })
            ], BComponent);
            exports_5("BComponent", BComponent);
        }
    };
});
System.register("editor-features/components/i-component/i.component", ["@angular/core", "editor-features/helpers/selection.helper", "editor-features/helpers/node.helper"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_3, core_4, selection_helper_2, node_helper_2, IComponent;
    return {
        setters: [
            function (core_3_1) {
                core_3 = core_3_1;
                core_4 = core_3_1;
            },
            function (selection_helper_2_1) {
                selection_helper_2 = selection_helper_2_1;
            },
            function (node_helper_2_1) {
                node_helper_2 = node_helper_2_1;
            }
        ],
        execute: function () {
            IComponent = class IComponent {
                constructor() {
                    this.update = new core_3.EventEmitter();
                }
                wrapSelected() {
                    let selection = window.getSelection();
                    let node = selection.focusNode;
                    let selectionData = selection_helper_2.SelectionHelper.getSelectionData();
                    if (document.getElementById(this.editorId).contains(node)) {
                        if (node_helper_2.NodeHelper.haveParentWithLocalName(node, 'i')) {
                            let parent = node_helper_2.NodeHelper.findParentByLocalName(node, 'i');
                            parent.outerHTML = parent.innerHTML;
                        }
                        else {
                            node.parentNode.innerHTML = selectionData.startString + '<i>' + selectionData.middleString + '</i>' + selectionData.endString;
                        }
                        this.update.emit();
                    }
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
      <a (click)="wrapSelected()" class="waves-effect waves-light btn"><i>I</i></a>
    `
                })
            ], IComponent);
            exports_6("IComponent", IComponent);
        }
    };
});
System.register("editor-features/components/u-component/u.component", ["@angular/core", "editor-features/helpers/selection.helper", "editor-features/helpers/node.helper"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_5, core_6, selection_helper_3, node_helper_3, UComponent;
    return {
        setters: [
            function (core_5_1) {
                core_5 = core_5_1;
                core_6 = core_5_1;
            },
            function (selection_helper_3_1) {
                selection_helper_3 = selection_helper_3_1;
            },
            function (node_helper_3_1) {
                node_helper_3 = node_helper_3_1;
            }
        ],
        execute: function () {
            UComponent = class UComponent {
                constructor() {
                    this.update = new core_5.EventEmitter();
                }
                wrapSelected() {
                    let selection = window.getSelection();
                    let node = selection.focusNode;
                    let selectionData = selection_helper_3.SelectionHelper.getSelectionData();
                    if (document.getElementById(this.editorId).contains(node)) {
                        if (node_helper_3.NodeHelper.haveParentWithLocalName(node, 'span') && node_helper_3.NodeHelper.haveParentWithClassName(node, 'e-style-underline')) {
                            let parent = node_helper_3.NodeHelper.findParentByLocalNameAndClassName(node, 'span', 'e-style-underline');
                            parent.outerHTML = parent.innerHTML;
                        }
                        else {
                            node.parentNode.innerHTML = selectionData.startString + '<span class="e-style-underline">' + selectionData.middleString + '</span>' + selectionData.endString;
                        }
                        this.update.emit();
                    }
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
      <a (click)="wrapSelected()" class="waves-effect waves-light btn"><span class="e-style-underline">U</span></a>
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
                    let selection = window.getSelection();
                    let node = selection.focusNode;
                    if (document.getElementById(this.editorId).contains(node)) {
                        if (node.parentNode.classList.contains('e-style-text-center')) {
                            node.parentNode.classList.remove('e-style-text-center');
                        }
                        else {
                            node.parentNode.classList.remove('e-style-text-left');
                            node.parentNode.classList.remove('e-style-text-right');
                            node.parentNode.classList.add('e-style-text-center');
                        }
                    }
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
      <a (click)="wrapSelected()" class="waves-effect waves-light btn">C</a>
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
                    let selection = window.getSelection();
                    let node = selection.focusNode;
                    if (document.getElementById(this.editorId).contains(node)) {
                        if (node.parentNode.classList.contains('e-style-text-right')) {
                            node.parentNode.classList.remove('e-style-text-right');
                        }
                        else {
                            node.parentNode.classList.remove('e-style-text-center');
                            node.parentNode.classList.remove('e-style-text-left');
                            node.parentNode.classList.add('e-style-text-right');
                        }
                    }
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
      <a (click)="wrapSelected()" class="waves-effect waves-light btn">R</a>
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
                    let selection = window.getSelection();
                    let node = selection.focusNode;
                    if (document.getElementById(this.editorId).contains(node)) {
                        if (node.parentNode.classList.contains('e-style-text-left')) {
                            node.parentNode.classList.remove('e-style-text-left');
                        }
                        else {
                            node.parentNode.classList.remove('e-style-text-center');
                            node.parentNode.classList.remove('e-style-text-right');
                            node.parentNode.classList.add('e-style-text-left');
                        }
                    }
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
      <a (click)="wrapSelected()" class="waves-effect waiting-right btn">L</a>
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
      <a (click)="wrapSelected()" class="waves-effect waves-light btn">UL</a>
    `
                })
            ], UlComponent);
            exports_11("UlComponent", UlComponent);
        }
    };
});
System.register("editor-features/components/ol-component/ol.component", ["@angular/core", "editor-features/helpers/selection.helper"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var core_15, core_16, selection_helper_4, OlComponent;
    return {
        setters: [
            function (core_15_1) {
                core_15 = core_15_1;
                core_16 = core_15_1;
            },
            function (selection_helper_4_1) {
                selection_helper_4 = selection_helper_4_1;
            }
        ],
        execute: function () {
            OlComponent = class OlComponent {
                constructor() {
                    this.update = new core_15.EventEmitter();
                }
                getNodeIndex(elements, node) {
                    let index;
                    for (let i = 0; i < elements.length; i = i + 1) {
                        if (elements[i].contains(node)) {
                            index = i;
                        }
                    }
                    return index;
                }
                getElementsToWrap(elements, startIndex, endIndex) {
                    let result = [];
                    console.log('elements', elements);
                    for (let i = startIndex; i <= endIndex; i = i + 1) {
                        result.push(elements[i]);
                    }
                    return result;
                }
                wrapSelected() {
                    let selection = window.getSelection();
                    let node = selection.focusNode;
                    console.log('selection', selection);
                    console.log('selection.extentOffset', selection.extentOffset);
                    console.log('selection.anchorOffset', selection.anchorOffset);
                    console.log('node.parentNode.innerText.length', node.parentNode.innerText.length);
                    if (document.getElementById(this.editorId).contains(node)) {
                        let startNode = selection.extentNode;
                        let endNode = selection.anchorNode;
                        let startParent = selection_helper_4.SelectionHelper.findBlockParent(startNode.parentElement);
                        let endParent = selection_helper_4.SelectionHelper.findBlockParent(endNode.parentElement);
                        if (startParent == endParent) {
                            let startIndex = this.getNodeIndex(startParent.children, startNode);
                            let endIndex = this.getNodeIndex(startParent.children, startNode);
                            console.log('startIndex', startIndex);
                            console.log('endIndex', endIndex);
                            let elementsToWrap = this.getElementsToWrap(startParent.children, startIndex, endIndex);
                            let ol = document.createElement("OL");
                            for (let i = 0; i < elementsToWrap.length; i = i + 1) {
                                elementsToWrap[i].outerHTML = '<li>' + startParent.children[i].outerHTML + '</li>';
                                console.log('startParent.children[i].outerHTML', startParent.children[i].outerHTML);
                                ol.appendChild(elementsToWrap[i]);
                            }
                            for (let i = startIndex; i <= endIndex; i = i + 1) {
                                startParent.children[i].remove();
                            }
                            startParent.insertBefore(ol, startParent.children[startIndex + 1]);
                            console.log('startParent', startParent);
                            this.update.emit();
                        }
                    }
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
      <a (click)="wrapSelected()" class="waves-effect waves-light btn">OL</a>
    `
                })
            ], OlComponent);
            exports_12("OlComponent", OlComponent);
        }
    };
});
System.register("editor-features/editor-featrues.module", ["@angular/core", "editor-features/components/b-component/b.component", "editor-features/components/i-component/i.component", "editor-features/components/u-component/u.component", "editor-features/components/text-center-component/text-center.component", "editor-features/components/text-right-component/text-right.component", "editor-features/components/text-left-component/text-left.component", "editor-features/components/ul-component/ul.component", "editor-features/components/ol-component/ol.component"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var core_17, b_component_1, i_component_1, u_component_1, text_center_component_1, text_right_component_1, text_left_component_1, ul_component_1, ol_component_1, EditorFeaturesModule;
    return {
        setters: [
            function (core_17_1) {
                core_17 = core_17_1;
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
            }
        ],
        execute: function () {
            EditorFeaturesModule = class EditorFeaturesModule {
                constructor() {
                    console.log('EditorFeaturesModule init');
                }
            };
            EditorFeaturesModule = __decorate([
                core_17.NgModule({
                    declarations: [
                        b_component_1.BComponent,
                        i_component_1.IComponent,
                        u_component_1.UComponent,
                        text_center_component_1.TextCenterComponent,
                        text_right_component_1.TextRightComponent,
                        text_left_component_1.TextLeftComponent,
                        ol_component_1.OlComponent,
                        ul_component_1.UlComponent
                    ],
                    imports: [],
                    exports: [
                        b_component_1.BComponent,
                        i_component_1.IComponent,
                        u_component_1.UComponent,
                        text_center_component_1.TextCenterComponent,
                        text_right_component_1.TextRightComponent,
                        text_left_component_1.TextLeftComponent,
                        ol_component_1.OlComponent,
                        ul_component_1.UlComponent
                    ],
                    bootstrap: []
                }),
                __metadata("design:paramtypes", [])
            ], EditorFeaturesModule);
            exports_13("EditorFeaturesModule", EditorFeaturesModule);
        }
    };
});
System.register("app/components/shell-component/shell.component", ["@angular/core"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var core_18, ShellComponent;
    return {
        setters: [
            function (core_18_1) {
                core_18 = core_18_1;
            }
        ],
        execute: function () {
            ShellComponent = class ShellComponent {
                constructor() {
                    console.log('ShellComponent init');
                }
            };
            ShellComponent = __decorate([
                core_18.Component({
                    selector: 'shell',
                    template: `
      <router-outlet></router-outlet>
    `
                }),
                __metadata("design:paramtypes", [])
            ], ShellComponent);
            exports_14("ShellComponent", ShellComponent);
        }
    };
});
System.register("app/models/Slide", [], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var Slide;
    return {
        setters: [],
        execute: function () {
            Slide = class Slide {
            };
            exports_15("Slide", Slide);
        }
    };
});
System.register("app/models/Presentation", [], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var Presentation;
    return {
        setters: [],
        execute: function () {
            Presentation = class Presentation {
            };
            exports_16("Presentation", Presentation);
        }
    };
});
System.register("app/components/dashboard-component/dashboard.component", ["@angular/core"], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var core_19, DashboardComponent;
    return {
        setters: [
            function (core_19_1) {
                core_19 = core_19_1;
            }
        ],
        execute: function () {
            DashboardComponent = class DashboardComponent {
                constructor() {
                    console.log('DashboardComponent init');
                    this.presentations = [{ id: 1, name: 'Компьютерная геометрия и графика', slides: [] }, { id: 2, name: 'Веб-дизайн', slides: [] }];
                }
            };
            DashboardComponent = __decorate([
                core_19.Component({
                    selector: 'dashboard',
                    template: `
      <nav>
          <div class="nav-wrapper">
              <a href="#" class="brand-logo">Lecturnal</a>
              <ul id="nav-mobile" class="right hide-on-med-and-down">
                  <li><a href="sass.html">Sass</a></li>
                  <li><a href="badges.html">Components</a></li>
                  <li><a href="collapsible.html">JavaScript</a></li>
              </ul>
          </div>
      </nav>
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

      </div>
    `
                }),
                __metadata("design:paramtypes", [])
            ], DashboardComponent);
            exports_17("DashboardComponent", DashboardComponent);
        }
    };
});
System.register("app/components/presentation-component/presentation.component", ["@angular/core"], function (exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var core_20, PresentationComponent;
    return {
        setters: [
            function (core_20_1) {
                core_20 = core_20_1;
            }
        ],
        execute: function () {
            PresentationComponent = class PresentationComponent {
                constructor() {
                    console.log('PresentationComponent init');
                }
            };
            PresentationComponent = __decorate([
                core_20.Component({
                    selector: 'presentation',
                    template: `
      <nav>
          <div class="nav-wrapper">
              Toolbar here
          </div>
      </nav>
      <div class="editor-component">
          <div class="row">
              <div class="col s2">
                  <slides-tree></slides-tree>
              </div>
              <div class="col s10">
                  <slide-editor></slide-editor>
              </div>
          </div>
      </div>
    `
                }),
                __metadata("design:paramtypes", [])
            ], PresentationComponent);
            exports_18("PresentationComponent", PresentationComponent);
        }
    };
});
System.register("app/components/slide-editor-component/slide-editor.component", ["@angular/core"], function (exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var core_21, SlideEditorComponent;
    return {
        setters: [
            function (core_21_1) {
                core_21 = core_21_1;
            }
        ],
        execute: function () {
            SlideEditorComponent = class SlideEditorComponent {
                constructor() {
                    this.isVisualizer = true;
                    console.log('SlideEditorCompoennt init');
                    this.editorId = 'editor1';
                    this.slide = {
                        content: '<div style="border-bottom: 2px solid #ccc; padding-bottom: 10px"><div></div><ul style="padding-left: 40px"><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li></ul></div></div><p>'
                            + 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod'
                            + 'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
                            + 'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo '
                            + 'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse '
                            + 'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non '
                            + 'proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
                    };
                }
            };
            SlideEditorComponent = __decorate([
                core_21.Component({
                    selector: 'slide-editor',
                    template: `
      <div>

          <div class="row editor-switchers">

              <a (click)="isVisualizer = true" class="{{ isVisualizer ? 'active' : '' }} waves-effect waves-light btn">Визуализатор</a>
              <a (click)="isVisualizer = false" class="{{ isVisualizer ? '' : 'active' }} waves-effect waves-light btn">Исходный
                  текст</a>

          </div>

          <div class="editor-toolbox">

              <b-editor-button [content]="slide.content" [editorId]="editorId"></b-editor-button>
              <i-editor-button [content]="slide.content" [editorId]="editorId"></i-editor-button>
              <u-editor-button [content]="slide.content" [editorId]="editorId"></u-editor-button>

              <text-center-editor-button [content]="slide.content" [editorId]="editorId"></text-center-editor-button>
              <text-right-editor-button [content]="slide.content" [editorId]="editorId"></text-right-editor-button>
              <text-left-editor-button [content]="slide.content" [editorId]="editorId"></text-left-editor-button>

              <ul-editor-button [content]="slide.content" [editorId]="editorId"></ul-editor-button>
              <ol-editor-button [content]="slide.content" [editorId]="editorId"></ol-editor-button>

          </div>

          <div>

              <div *ngIf="isVisualizer == true">

                  <div contentEditable="true"
                       id="{{editorId}}"
                       [(contenteditableModel)]="slide.content"
                       class="slide-editor-wrapper" tabindex="1">
                  </div>
              </div>

              <div *ngIf="isVisualizer == false">
                  <textarea class="slide-editor-textarea" name="" id="" cols="30" rows="10"
                            [(ngModel)]="slide.content"></textarea>
              </div>

          </div>

      </div>
    `
                }),
                __metadata("design:paramtypes", [])
            ], SlideEditorComponent);
            exports_19("SlideEditorComponent", SlideEditorComponent);
        }
    };
});
System.register("app/components/slides-tree-component/slides-tree.component", ["@angular/core"], function (exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var core_22, SlidesTreeComponent;
    return {
        setters: [
            function (core_22_1) {
                core_22 = core_22_1;
            }
        ],
        execute: function () {
            SlidesTreeComponent = class SlidesTreeComponent {
                constructor() {
                    console.log('Sliders tree');
                    this.slides = [
                        { content: '123' },
                        { content: '456' }
                    ];
                }
                addSlide() {
                    this.slides.push({ content: '' });
                }
                selectSlide() {
                }
            };
            SlidesTreeComponent = __decorate([
                core_22.Component({
                    selector: 'slides-tree',
                    template: `
      <div>

          <a (click)="addSlide()" class="waves-effect waves-light btn">Добавить страницу</a>

          <div class="row">

              <div class="card" *ngFor="let slide of slides" (click)="selectSlide(slide)">
                  <div class="card-content">
                      1
                  </div>
              </div>

          </div>

      </div>
    `
                }),
                __metadata("design:paramtypes", [])
            ], SlidesTreeComponent);
            exports_20("SlidesTreeComponent", SlidesTreeComponent);
        }
    };
});
System.register("app/directives/content-editable.directive", ["@angular/core"], function (exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var core_23, core_24, ContentEditableDirective;
    return {
        setters: [
            function (core_23_1) {
                core_23 = core_23_1;
                core_24 = core_23_1;
            }
        ],
        execute: function () {
            ContentEditableDirective = class ContentEditableDirective {
                constructor(elementRef) {
                    this.elementRef = elementRef;
                    this.update = new core_23.EventEmitter();
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
                core_24.Input('contenteditableModel'),
                __metadata("design:type", Object)
            ], ContentEditableDirective.prototype, "model", void 0);
            __decorate([
                core_24.Output('contenteditableModelChange'),
                __metadata("design:type", Object)
            ], ContentEditableDirective.prototype, "update", void 0);
            ContentEditableDirective = __decorate([
                core_23.Directive({
                    selector: '[contenteditableModel]',
                    host: {
                        '(blur)': 'onEdit()',
                        '(keyup)': 'onEdit()'
                    }
                }),
                __metadata("design:paramtypes", [core_23.ElementRef])
            ], ContentEditableDirective);
            exports_21("ContentEditableDirective", ContentEditableDirective);
        }
    };
});
System.register("app/app.routing", ["@angular/router", "app/components/dashboard-component/dashboard.component", "app/components/presentation-component/presentation.component"], function (exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var router_1, dashboard_component_1, presentation_component_1, appRoutes, routing;
    return {
        setters: [
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
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
                    path: 'presentation',
                    children: [{
                            path: 'new',
                            component: presentation_component_1.PresentationComponent
                        }, {
                            path: ':id',
                            component: presentation_component_1.PresentationComponent
                        }]
                },
            ];
            exports_22("routing", routing = router_1.RouterModule.forRoot(appRoutes));
        }
    };
});
System.register("app/app.module", ["@angular/core", "@angular/http", "@angular/forms", "@angular/platform-browser", "editor-features/editor-featrues.module", "app/components/shell-component/shell.component", "app/components/dashboard-component/dashboard.component", "app/components/presentation-component/presentation.component", "app/components/slide-editor-component/slide-editor.component", "app/components/slides-tree-component/slides-tree.component", "app/directives/content-editable.directive", "app/app.routing"], function (exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var core_25, http_1, forms_1, platform_browser_1, editor_featrues_module_1, shell_component_1, dashboard_component_2, presentation_component_2, slide_editor_component_1, slides_tree_component_1, content_editable_directive_1, app_routing_1, AppModule;
    return {
        setters: [
            function (core_25_1) {
                core_25 = core_25_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
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
            function (dashboard_component_2_1) {
                dashboard_component_2 = dashboard_component_2_1;
            },
            function (presentation_component_2_1) {
                presentation_component_2 = presentation_component_2_1;
            },
            function (slide_editor_component_1_1) {
                slide_editor_component_1 = slide_editor_component_1_1;
            },
            function (slides_tree_component_1_1) {
                slides_tree_component_1 = slides_tree_component_1_1;
            },
            function (content_editable_directive_1_1) {
                content_editable_directive_1 = content_editable_directive_1_1;
            },
            function (app_routing_1_1) {
                app_routing_1 = app_routing_1_1;
            }
        ],
        execute: function () {
            AppModule = class AppModule {
                constructor() {
                    console.log('AppModule init');
                }
            };
            AppModule = __decorate([
                core_25.NgModule({
                    imports: [
                        platform_browser_1.BrowserModule,
                        http_1.HttpModule,
                        forms_1.FormsModule,
                        app_routing_1.routing,
                        editor_featrues_module_1.EditorFeaturesModule
                    ],
                    declarations: [
                        shell_component_1.ShellComponent,
                        dashboard_component_2.DashboardComponent,
                        presentation_component_2.PresentationComponent,
                        slide_editor_component_1.SlideEditorComponent,
                        slides_tree_component_1.SlidesTreeComponent,
                        content_editable_directive_1.ContentEditableDirective
                    ],
                    bootstrap: [shell_component_1.ShellComponent]
                }),
                __metadata("design:paramtypes", [])
            ], AppModule);
            exports_23("AppModule", AppModule);
        }
    };
});
System.register("main", ["@angular/platform-browser-dynamic", "app/app.module"], function (exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
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

//# sourceMappingURL=main.js.map
