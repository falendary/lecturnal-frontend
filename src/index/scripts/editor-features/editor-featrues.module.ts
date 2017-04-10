import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { BComponent } from './components/b-component/b.component';
import { IComponent } from './components/i-component/i.component';
import { UComponent } from './components/u-component/u.component';
import {TextCenterComponent} from './components/text-center-component/text-center.component';
import {TextRightComponent} from './components/text-right-component/text-right.component';
import {TextLeftComponent} from './components/text-left-component/text-left.component';
import {UlComponent} from './components/ul-component/ul.component';
import {OlComponent} from './components/ol-component/ol.component';
import {TextJustifyComponent} from './components/text-justify-component/text-justify.component';
import {IndentComponent} from './components/indent-component/indent.component';
import {OutdentComponent} from './components/outdent-component/outdent.component';
import {StrikeComponent} from './components/strike-component/strike.component';
import {SubscriptComponent} from './components/subscript-component/subscript.component';
import {SuperscriptComponent} from './components/superscript-component/superscript.component';
import {HrComponent} from './components/hr-component/hr.component';
import {FormatBlockComponent} from './components/format-block-component/foramt-block.component';
import {RemoveFormatComponent} from './components/rf-component/rf.component';
import {FontSizeComponent} from './components/font-size-component/font-size.component';
import {FontNameComponent} from './components/font-name-component/font-name.component';
import {CreateLinkComponent} from './components/create-link-component/create-link.component';
import {UnlinkComponent} from './components/unlink-component/unlink.component';
import {InsertImageComponent} from './components/insert-image-component/insert-image.component';

@NgModule({
    declarations: [
        BComponent,
        IComponent,
        UComponent,
        StrikeComponent,

        TextCenterComponent,
        TextRightComponent,
        TextLeftComponent,
        TextJustifyComponent,

        IndentComponent,
        OutdentComponent,

        OlComponent,
        UlComponent,

        SubscriptComponent,
        SuperscriptComponent,

        HrComponent,
        RemoveFormatComponent,
        FormatBlockComponent,
        FontSizeComponent,
        FontNameComponent,

        CreateLinkComponent,
        UnlinkComponent,

        InsertImageComponent

    ],
    imports: [FormsModule],
    exports: [
        BComponent,
        IComponent,
        UComponent,
        StrikeComponent,

        TextCenterComponent,
        TextRightComponent,
        TextLeftComponent,
        TextJustifyComponent,

        IndentComponent,
        OutdentComponent,

        OlComponent,
        UlComponent,

        SubscriptComponent,
        SuperscriptComponent,

        HrComponent,
        RemoveFormatComponent,
        FormatBlockComponent,
        FontSizeComponent,
        FontNameComponent,

        CreateLinkComponent,
        UnlinkComponent,

        InsertImageComponent
    ],
    bootstrap: []
})

export class EditorFeaturesModule {

    constructor() {
        console.log('EditorFeaturesModule init');
    }

}