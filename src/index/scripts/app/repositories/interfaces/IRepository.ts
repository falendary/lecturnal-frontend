import {IEntity} from "../../models/interfaces/IEntity";
import {IQueryParameter} from "../../models/interfaces/IQueryParameter";
import {Observable} from "rxjs/Observable";
export interface IRepository {

    getList(parameters?: IQueryParameter[]): Observable<IEntity[]>;
    getByKey(key: number): Observable<IEntity>;
    update(key: number, item: IEntity): Observable<IEntity>;
    create(item: IEntity): Observable<IEntity>,
    deleteByKey(key: number): void

}