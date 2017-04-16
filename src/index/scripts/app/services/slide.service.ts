import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {SlideRepository} from '../repositories/slide.repository';
import {IQueryParameter} from '../models/interfaces/IQueryParameter';
import {IEntity} from '../models/interfaces/IEntity';
import {Slide} from '../models/Slide';

@Injectable()
export class SlideService {

    constructor(private slideRepository: SlideRepository) {}

    getList(parameters: IQueryParameter[], presentationId: number): Observable<Slide[]> {

        return this.slideRepository.getList(parameters, presentationId);
    }

    getByKey(presentationId: number, slideId: number): Observable<Slide> {
        return this.slideRepository.getByKey(presentationId, slideId);
    }

    update(item: Slide, presentationId: number, slideId: number): Observable<Slide> {
        return this.slideRepository.update(item, presentationId, slideId);
    }

    create(item: IEntity, presentationId: number): Observable<Slide> {
        return this.slideRepository.create(item, presentationId);
    }

    deleteByKey(presentationId: number, slideId: number): void {
        this.slideRepository.deleteByKey(presentationId, slideId);
    }

}