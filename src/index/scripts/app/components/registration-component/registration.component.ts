import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'registration-component',
    template: require('./registration.component.html'),
    providers: [AuthService]
})

export class RegistrationComponent {

    public username:string;
    public password:string;
    public email:string;

    constructor(private router: Router, private authService: AuthService){}

    public signup():void {

        this.authService.signup(this.username, this.password, this.email).subscribe(response => {
            this.router.navigateByUrl('/');
        })

    }

}