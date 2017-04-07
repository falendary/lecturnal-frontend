import { NgModule } from '@angular/core';

import { BComponent } from './components/b-component/b.component';
import { IComponent } from './components/i-component/i.component';
import { UComponent } from './components/u-component/u.component';
import {TextCenterComponent} from './components/text-center-component/text-center.component';
import {TextRightComponent} from './components/text-right-component/text-right.component';
import {TextLeftComponent} from './components/text-left-component/text-left.component';
import {UlComponent} from './components/ul-component/ul.component';
import {OlComponent} from './components/ol-component/ol.component';

@NgModule({
    declarations: [
        BComponent,
        IComponent,
        UComponent,

        TextCenterComponent,
        TextRightComponent,
        TextLeftComponent,

        OlComponent,
        UlComponent
    ],
    imports: [],
    exports: [
        BComponent,
        IComponent,
        UComponent,

        TextCenterComponent,
        TextRightComponent,
        TextLeftComponent,

        OlComponent,
        UlComponent
    ],
    bootstrap: []
})

export class EditorFeaturesModule {

    constructor() {
        console.log('EditorFeaturesModule init');
    }

}