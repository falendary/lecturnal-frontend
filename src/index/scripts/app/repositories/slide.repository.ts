import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {IRepository} from './interfaces/IRepository';
import {IEntity} from '../models/interfaces/IEntity';
import {IQueryParameter} from '../models/interfaces/IQueryParameter';
import {UrlHelper} from '../helpers/url.helper';
import {Slide} from '../models/Slide';
import {CookieService} from '../services/cookie.service';

@Injectable()
export class SlideRepository implements IRepository {


    constructor(private http: Http) {
    }

    getList(parameters: IQueryParameter[], presentationId: number): Observable<Slide[]> {

        let headers = new Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + CookieService.getCookie('token') });
        let options = new RequestOptions({ headers: headers });

        let parametersString: string = '';

        if (parameters) {
            parametersString = UrlHelper.createQueryParamtersString(parameters);
        }

        return this.http.get('backend/web/v1/presentations/' + presentationId + '/slides' + parametersString, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getByKey(presentationId: number, slideId: number): Observable<Slide> {

        let headers = new Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + CookieService.getCookie('token') });
        let options = new RequestOptions({ headers: headers });

        return this.http.get('backend/web/v1/presentations/' + presentationId + '/slides/' + slideId, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    update(item: IEntity, presentationId: number, slideId: number): Observable<Slide> {

        let headers = new Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + CookieService.getCookie('token') });
        let options = new RequestOptions({ headers: headers });

        return this.http.put('backend/web/v1/presentations/' + presentationId + '/slides/' + slideId, JSON.stringify(item), options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(item: IEntity, presentationId: number): Observable<Slide> {

        let headers = new Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + CookieService.getCookie('token') });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('backend/web/v1/presentations/' + presentationId + '/slides', JSON.stringify(item), options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteByKey(presentationId: number, slidesId: number): void {

        let headers = new Headers({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + CookieService.getCookie('token') });
        let options = new RequestOptions({ headers: headers });

        this.http.delete('backend/web/v1/presentations/' + presentationId + '/slides/' + slidesId, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}