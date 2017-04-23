import {Injectable} from '@angular/core';
import {CookieService} from './cookie.service';
import {AuthRepository} from '../repositories/auth.repository';

@Injectable()
export class AuthService {

    constructor(private authRepository: AuthRepository) {

    }

    public isAuthorized(): boolean {

        return !!CookieService.getCookie('token');

    }

    public login(username: string, password: string) {

        return this.authRepository.login(username, password);

    }

    public signup(username: string, password: string, email: string){
        return this.authRepository.signup(username, password, email);
    }

    public logout() {

        CookieService.deleteCookie('token');

        this.authRepository.logout();
    }

}