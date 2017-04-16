import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {PresentationRepository} from '../repositories/presentation.repository';
import {IQueryParameter} from '../models/interfaces/IQueryParameter';
import {IEntity} from '../models/interfaces/IEntity';
import {Presentation} from '../models/Presentation';

@Injectable()
export class PresentationService {

    constructor(private presentationRepository: PresentationRepository) {}

    getList(parameters: IQueryParameter[]): Observable<Presentation[]> {

        return this.presentationRepository.getList(parameters);
    }

    getByKey(presentationId: number): Observable<Presentation> {
        return this.presentationRepository.getByKey(presentationId);
    }

    update(item: Presentation, presentationId: number): Observable<Presentation> {
        return this.presentationRepository.update(item , presentationId);
    }

    create(item: IEntity): Observable<Presentation> {
        return this.presentationRepository.create(item);
    }

    deleteByKey(presentationId: number): void {
        this.presentationRepository.deleteByKey(presentationId);
    }

}