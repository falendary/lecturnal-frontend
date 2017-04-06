var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("app/components/shell-component/shell.component", ["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, ShellComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            ShellComponent = class ShellComponent {
                constructor() {
                    console.log('ShellComponent init');
                }
            };
            ShellComponent = __decorate([
                core_1.Component({
                    selector: 'shell',
                    template: `
      <router-outlet></router-outlet>
    `
                }),
                __metadata("design:paramtypes", [])
            ], ShellComponent);
            exports_1("ShellComponent", ShellComponent);
        }
    };
});
System.register("app/models/Slide", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Slide;
    return {
        setters: [],
        execute: function () {
            Slide = class Slide {
            };
            exports_2("Slide", Slide);
        }
    };
});
System.register("app/models/Presentation", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Presentation;
    return {
        setters: [],
        execute: function () {
            Presentation = class Presentation {
            };
            exports_3("Presentation", Presentation);
        }
    };
});
System.register("app/components/dashboard-component/dashboard.component", ["@angular/core"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_2, DashboardComponent;
    return {
        setters: [
            function (core_2_1) {
                core_2 = core_2_1;
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
                core_2.Component({
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
            exports_4("DashboardComponent", DashboardComponent);
        }
    };
});
System.register("app/components/presentation-component/presentation.component", ["@angular/core"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_3, PresentationComponent;
    return {
        setters: [
            function (core_3_1) {
                core_3 = core_3_1;
            }
        ],
        execute: function () {
            PresentationComponent = class PresentationComponent {
                constructor() {
                    console.log('PresentationComponent init');
                }
            };
            PresentationComponent = __decorate([
                core_3.Component({
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
            exports_5("PresentationComponent", PresentationComponent);
        }
    };
});
System.register("app/components/slide-editor-component/slide-editor.component", ["@angular/core"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_4, SlideEditorComponent;
    return {
        setters: [
            function (core_4_1) {
                core_4 = core_4_1;
            }
        ],
        execute: function () {
            SlideEditorComponent = class SlideEditorComponent {
                constructor() {
                    console.log('SlideEditorCompoennt init');
                    this.slide = {
                        content: '123'
                    };
                }
            };
            SlideEditorComponent = __decorate([
                core_4.Component({
                    selector: 'slide-editor',
                    template: `
      <div>

          <div>
              {{slide.content}}
          </div>

          <div>

              <textarea [(ngModel)]="slide.content" name="" id="" cols="30" rows="10"></textarea>

          </div>

      </div>
    `
                }),
                __metadata("design:paramtypes", [])
            ], SlideEditorComponent);
            exports_6("SlideEditorComponent", SlideEditorComponent);
        }
    };
});
System.register("app/components/slides-tree-component/slides-tree.component", ["@angular/core"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_5, SlidesTreeComponent;
    return {
        setters: [
            function (core_5_1) {
                core_5 = core_5_1;
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
                core_5.Component({
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
            exports_7("SlidesTreeComponent", SlidesTreeComponent);
        }
    };
});
System.register("app/app.routing", ["@angular/router", "app/components/dashboard-component/dashboard.component", "app/components/presentation-component/presentation.component"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
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
            exports_8("routing", routing = router_1.RouterModule.forRoot(appRoutes));
        }
    };
});
System.register("app/app.module", ["@angular/core", "@angular/http", "@angular/forms", "@angular/platform-browser", "app/components/shell-component/shell.component", "app/components/dashboard-component/dashboard.component", "app/components/presentation-component/presentation.component", "app/components/slide-editor-component/slide-editor.component", "app/components/slides-tree-component/slides-tree.component", "app/app.routing"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_6, http_1, forms_1, platform_browser_1, shell_component_1, dashboard_component_2, presentation_component_2, slide_editor_component_1, slides_tree_component_1, app_routing_1, AppModule;
    return {
        setters: [
            function (core_6_1) {
                core_6 = core_6_1;
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
                core_6.NgModule({
                    imports: [
                        platform_browser_1.BrowserModule,
                        http_1.HttpModule,
                        forms_1.FormsModule,
                        app_routing_1.routing
                    ],
                    declarations: [
                        shell_component_1.ShellComponent,
                        dashboard_component_2.DashboardComponent,
                        presentation_component_2.PresentationComponent,
                        slide_editor_component_1.SlideEditorComponent,
                        slides_tree_component_1.SlidesTreeComponent
                    ],
                    bootstrap: [shell_component_1.ShellComponent]
                }),
                __metadata("design:paramtypes", [])
            ], AppModule);
            exports_9("AppModule", AppModule);
        }
    };
});
System.register("main", ["@angular/platform-browser-dynamic", "app/app.module"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
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
