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
var forms_1 = require("@angular/forms");
var b_component_1 = require("./components/b-component/b.component");
var i_component_1 = require("./components/i-component/i.component");
var u_component_1 = require("./components/u-component/u.component");
var text_center_component_1 = require("./components/text-center-component/text-center.component");
var text_right_component_1 = require("./components/text-right-component/text-right.component");
var text_left_component_1 = require("./components/text-left-component/text-left.component");
var ul_component_1 = require("./components/ul-component/ul.component");
var ol_component_1 = require("./components/ol-component/ol.component");
var text_justify_component_1 = require("./components/text-justify-component/text-justify.component");
var indent_component_1 = require("./components/indent-component/indent.component");
var outdent_component_1 = require("./components/outdent-component/outdent.component");
var strike_component_1 = require("./components/strike-component/strike.component");
var subscript_component_1 = require("./components/subscript-component/subscript.component");
var superscript_component_1 = require("./components/superscript-component/superscript.component");
var hr_component_1 = require("./components/hr-component/hr.component");
var foramt_block_component_1 = require("./components/format-block-component/foramt-block.component");
var rf_component_1 = require("./components/rf-component/rf.component");
var font_size_component_1 = require("./components/font-size-component/font-size.component");
var font_name_component_1 = require("./components/font-name-component/font-name.component");
var create_link_component_1 = require("./components/create-link-component/create-link.component");
var unlink_component_1 = require("./components/unlink-component/unlink.component");
var insert_image_component_1 = require("./components/insert-image-component/insert-image.component");
var EditorFeaturesModule = (function () {
    function EditorFeaturesModule() {
        console.log('EditorFeaturesModule init');
    }
    return EditorFeaturesModule;
}());
EditorFeaturesModule = __decorate([
    core_1.NgModule({
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
exports.EditorFeaturesModule = EditorFeaturesModule;

//# sourceMappingURL=editor-featrues.module.js.map
