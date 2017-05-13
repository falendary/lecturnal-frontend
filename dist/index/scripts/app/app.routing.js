"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var dashboard_component_1 = require("./components/dashboard-component/dashboard.component");
var login_component_1 = require("./components/login-component/login.component");
var registration_component_1 = require("./components/registration-component/registration.component");
var presentation_component_1 = require("./components/presentation-component/presentation.component");
var appRoutes = [
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
exports.routing = router_1.RouterModule.forRoot(appRoutes);

//# sourceMappingURL=app.routing.js.map
