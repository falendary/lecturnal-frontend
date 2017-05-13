import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {EditorFeaturesModule} from '../editor-features/editor-featrues.module'

import {ShellComponent} from './components/shell-component/shell.component';

import {LoginComponent} from './components/login-component/login.component';
import {RegistrationComponent} from './components/registration-component/registration.component';

import {DashboardComponent} from './components/dashboard-component/dashboard.component';

import {PresentationComponent} from './components/presentation-component/presentation.component';
import {SlideEditorComponent} from './components/slide-editor-component/slide-editor.component';
import {SlidesListComponent} from './components/slides-list-component/slides-list.component';

import {ContentEditableDirective } from './directives/content-editable.directive';

import {routing} from './app.routing';
import {AuthRepository} from './repositories/auth.repository';
import {AuthService} from './services/auth.service';

import {PresentationRepository} from './repositories/presentation.repository';
import {PresentationService} from './services/presentation.service';

import {SlideRepository} from './repositories/slide.repository';
import {SlideService} from './services/slide.service';

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
        RegistrationComponent,

        DashboardComponent,
        PresentationComponent,
        SlideEditorComponent,
        SlidesListComponent,

        ContentEditableDirective
    ],
    providers: [
        AuthRepository,
        PresentationRepository,
        SlideRepository
    ],
    bootstrap: [ShellComponent]
})

export class AppModule {

    constructor() {
        console.log('AppModule init');
    }

}