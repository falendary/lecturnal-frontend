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

    private authService: AuthService;

    private currentState: string;

    constructor(private router: Router, authService: AuthService) {
        console.log('ShellComponent init');

        this.authService = authService;

        this.router.events
            .filter((event: RouteConfigLoadEnd) => event instanceof NavigationStart)
            .subscribe((event: NavigationStart) => {

                this.currentState = event.url;

                if (!this.authService.isAuthorized()) {
                    if (event.url !== '/login' && event.url !== '/registration') {
                        this.router.navigateByUrl('/login');
                    }
                } else {
                    if (event.url == '/login' || event.url == '/registration') {
                        this.router.navigateByUrl('/');
                    }
                }

                console.log('event', event);

            })

    }

    public isAuth(): boolean {

        let result = true;

        if (this.currentState != '/login' && this.currentState != '/registration') {
            result = false;
        }


        return result;

    }

    public logout(): void {
        this.authService.logout();
        setTimeout(function () {
            this.router.navigateByUrl('/login');
        }, 10)
    }

}