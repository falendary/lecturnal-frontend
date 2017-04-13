import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html'
})

export class LoginComponent {

    public username:string;
    public password:string;

    constructor(private authService: AuthService){}

    public auth():void {

        this.authService.login(this.username, this.password).subscribe(response => {

        })

    }

}