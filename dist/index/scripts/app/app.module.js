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
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var editor_featrues_module_1 = require("../editor-features/editor-featrues.module");
var shell_component_1 = require("./components/shell-component/shell.component");
var login_component_1 = require("./components/login-component/login.component");
var registration_component_1 = require("./components/registration-component/registration.component");
var dashboard_component_1 = require("./components/dashboard-component/dashboard.component");
var presentation_component_1 = require("./components/presentation-component/presentation.component");
var slide_editor_component_1 = require("./components/slide-editor-component/slide-editor.component");
var slides_list_component_1 = require("./components/slides-list-component/slides-list.component");
var content_editable_directive_1 = require("./directives/content-editable.directive");
var app_routing_1 = require("./app.routing");
var auth_repository_1 = require("./repositories/auth.repository");
var presentation_repository_1 = require("./repositories/presentation.repository");
var slide_repository_1 = require("./repositories/slide.repository");
var AppModule = (function () {
    function AppModule() {
        console.log('AppModule init');
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            app_routing_1.routing,
            editor_featrues_module_1.EditorFeaturesModule
        ],
        declarations: [
            shell_component_1.ShellComponent,
            login_component_1.LoginComponent,
            registration_component_1.RegistrationComponent,
            dashboard_component_1.DashboardComponent,
            presentation_component_1.PresentationComponent,
            slide_editor_component_1.SlideEditorComponent,
            slides_list_component_1.SlidesListComponent,
            content_editable_directive_1.ContentEditableDirective
        ],
        providers: [
            auth_repository_1.AuthRepository,
            presentation_repository_1.PresentationRepository,
            slide_repository_1.SlideRepository
        ],
        bootstrap: [shell_component_1.ShellComponent, []]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;

//# sourceMappingURL=app.module.js.map
