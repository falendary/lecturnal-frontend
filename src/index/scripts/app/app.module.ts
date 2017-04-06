import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ShellComponent } from './components/shell-component/shell.component';
import { DashboardComponent } from './components/dashboard-component/dashboard.component';
import { PresentationComponent} from './components/presentation-component/presentation.component';
import { SlideEditorComponent } from './components/slide-editor-component/slide-editor.component';
import { SlidesTreeComponent } from './components/slides-tree-component/slides-tree.component';

import { routing } from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        routing
    ],
    declarations: [
        ShellComponent,
        DashboardComponent,
        PresentationComponent,
        SlideEditorComponent,
        SlidesTreeComponent
    ],
    bootstrap: [ShellComponent]
})

export class AppModule {

    constructor() {
        console.log('AppModule init');
    }

}