import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {IRepository} from './interfaces/IRepository';
import {IEntity} from '../models/interfaces/IEntity';
import {UrlHelper} from '../helpers/url.helper';
import {IQueryParameter} from '../models/interfaces/IQueryParameter';
import {Presentation} from '../models/Presentation';
import {CookieService} from '../services/cookie.service';

@Injectable()
export class PresentationRepository implements IRepository {


    constructor(private http: Http) {
    }

    getList(parameters: IQueryParameter[]): Observable<Presentation[]> {

        let headers = new Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + CookieService.getCookie('token') });
        let options = new RequestOptions({ headers: headers });

        let parametersString: string = '';

        if (parameters) {
            parametersString = UrlHelper.createQueryParamtersString(parameters);
        }

        return this.http.get('backend/web/v1/presentations' + parametersString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getByKey(presentationId: number): Observable<Presentation> {

        let headers = new Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + CookieService.getCookie('token') });
        let options = new RequestOptions({ headers: headers });

        return this.http.get('backend/web/v1/presentations/' + presentationId, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    update(item: IEntity, presentationId: number): Observable<Presentation> {

        let headers = new Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + CookieService.getCookie('token') });
        let options = new RequestOptions({ headers: headers });

        return this.http.put('backend/web/v1/presentations/' + presentationId, JSON.stringify(item), options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(item: IEntity): Observable<Presentation> {

        let headers = new Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + CookieService.getCookie('token') });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('backend/web/v1/presentations', JSON.stringify(item), options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteByKey(presentationId: number): void {

        let headers = new Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + CookieService.getCookie('token') });
        let options = new RequestOptions({ headers: headers });

        this.http.delete('backend/web/v1/presentations/' + presentationId, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}