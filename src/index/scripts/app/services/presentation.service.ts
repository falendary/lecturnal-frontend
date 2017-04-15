import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {PresentationRepository} from '../repositories/presentation.repository';
import {IQueryParameter} from '../models/interfaces/IQueryParameter';
import {IEntity} from '../models/interfaces/IEntity';
import {Presentation} from '../models/Presentation';

@Injectable()
export class PresentationService {

    constructor(private presentationRepository: PresentationRepository) {}

    getList(parameters?: IQueryParameter[]): Observable<Presentation[]> {

        return this.presentationRepository.getList(parameters);
    }

    getByKey(key: number): Observable<Presentation> {
        return this.presentationRepository.getByKey(key);
    }

    update(key: number, item: Presentation): Observable<Presentation> {
        return this.presentationRepository.update(key, item);
    }

    create(item: IEntity): Observable<Presentation> {
        return this.presentationRepository.create(item);
    }

    deleteByKey(key: number): void {
        this.presentationRepository.deleteByKey(key);
    }

}