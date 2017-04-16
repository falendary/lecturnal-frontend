import {IEntity} from "../../models/interfaces/IEntity";
import {IQueryParameter} from "../../models/interfaces/IQueryParameter";
import {Observable} from "rxjs/Observable";
export interface IRepository {

    //getList(parameters?: IQueryParameter[]): Observable<IEntity[]>;
    //getByKey(key: number): Observable<IEntity>;
    //update(key: number, item: IEntity): Observable<IEntity>;
    //create(item: IEntity): Observable<IEntity>,
    //deleteByKey(key: number): void

    getList(parameters: IQueryParameter[], key1?: number): Observable<IEntity[]>;
    getByKey(key1: number, key2?: number): Observable<IEntity>;
    update(item: IEntity, key: number, key2?: number): Observable<IEntity>;
    create(item: IEntity, key1?: number): Observable<IEntity>,
    deleteByKey(key1: number, key2?: number): void

}