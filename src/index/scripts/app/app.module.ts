import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { EditorFeaturesModule } from '../editor-features/editor-featrues.module'

import { ShellComponent } from './components/shell-component/shell.component';
import { LoginComponent } from './components/login-component/login.component';
import { DashboardComponent } from './components/dashboard-component/dashboard.component';
import { PresentationComponent} from './components/presentation-component/presentation.component';
import { SlideEditorComponent } from './components/slide-editor-component/slide-editor.component';
import { SlidesTreeComponent } from './components/slides-tree-component/slides-tree.component';

import { ContentEditableDirective } from './directives/content-editable.directive';

import { routing } from './app.routing';
import {AuthRepository} from './repositories/auth.repository';
import {AuthService} from './services/auth.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        routing,
        EditorFeaturesModule
    ],
    declarations: [

        ShellComponent,

        LoginComponent,

        DashboardComponent,
        PresentationComponent,
        SlideEditorComponent,
        SlidesTreeComponent,

        ContentEditableDirective
    ],
    providers: [
        AuthRepository
    ],
    bootstrap: [ShellComponent, []]
})

export class AppModule {

    constructor() {
        console.log('AppModule init');
    }

}