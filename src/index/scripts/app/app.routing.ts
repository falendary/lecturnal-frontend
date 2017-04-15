import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from "./components/dashboard-component/dashboard.component";
import {LoginComponent} from "./components/login-component/login.component";
import {RegistrationComponent} from "./components/registration-component/registration.component";
import {PresentationComponent} from "./components/presentation-component/presentation.component";

const appRoutes:Routes = <Routes>[
    {
        path: '',
        component: DashboardComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'registration',
        component: RegistrationComponent
    },
    {
        path: 'presentation',
        children: [{
            path: 'new',
            component: PresentationComponent
        }, {
            path: ':id',
            component: PresentationComponent
        }]
    },
];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);


