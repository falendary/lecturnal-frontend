import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'login-component',
    template: require('./login.component.html'),
    providers: [AuthService]
})

export class LoginComponent {

    public username:string;
    public password:string;

    constructor(private router: Router, private authService: AuthService){}

    public auth():void {

        this.authService.login(this.username, this.password).subscribe(response => {
            this.router.navigateByUrl('/')
        })

    }

}