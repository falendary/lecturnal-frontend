import { Component } from '@angular/core';
import { Router, NavigationStart, RouteConfigLoadEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service'

import 'rxjs/add/operator/filter';

@Component({
    selector: 'shell',
    templateUrl: 'shell.component.html',
    providers: [AuthService]
})

export class ShellComponent {

    private authService:AuthService;

    constructor(private router:Router, authService:AuthService) {
        console.log('ShellComponent init');

        this.authService = authService;

        this.router.events
            .filter((event:RouteConfigLoadEnd) => event instanceof NavigationStart)
            .subscribe((event:NavigationStart) => {

                if (!this.authService.isAuthorized()) {
                    if (event.url !== '/login') {
                        router.navigateByUrl('/login');
                    }
                }

                console.log('event', event);

            })

    }

}