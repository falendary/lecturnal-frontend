import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthRepository {

    constructor(private http: Http) {

        console.log('repository', this.http);

    }

    public login(username: string, password: string): Observable<Response> {

        return this.http.post('backend/web/v1/auth/login', JSON.stringify({username, password}))
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }

    public signup(username: string, password: string, email: string): Observable<Response> {
        return this.http.post('backend/web/v1/auth/signup', JSON.stringify({username, password, email}))
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public logout(): void {

        this.http.get('backend/web/v1/auth/logout');

    }

}