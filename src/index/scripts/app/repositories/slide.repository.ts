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

@Injectable()
export class SlideRepository implements IRepository {


    constructor(private http: Http) {
    }

    getList(parameters?: IQueryParameter[]): Observable<Slide[]> {

        let parametersString: string = '';

        if (parameters) {
            parametersString = UrlHelper.createQueryParamtersString(parameters);
        }

        return this.http.get('backend/web/v1/presentations' + parametersString)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getByKey(key: number): Observable<Slide> {
        return this.http.get('backend/web/v1/presentations/' + key)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    update(key: number, item: IEntity): Observable<Slide> {
        return this.http.put('backend/web/v1/presentations/' + key, {item})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(item: IEntity): Observable<Slide> {
        return this.http.post('backend/web/v1/presentations/', {item})
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteByKey(key: number): void {
        this.http.delete('backend/web/v1/presentations/' + key)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}