import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {SlideRepository} from '../repositories/slide.repository';
import {IQueryParameter} from '../models/interfaces/IQueryParameter';
import {IEntity} from '../models/interfaces/IEntity';
import {Slide} from '../models/Slide';

@Injectable()
export class SlideService {

    constructor(private slideRepository: SlideRepository) {}

    getList(parameters?: IQueryParameter[]): Observable<Slide[]> {

        return this.slideRepository.getList(parameters);
    }

    getByKey(key: number): Observable<Slide> {
        return this.slideRepository.getByKey(key);
    }

    update(key: number, item: Slide): Observable<Slide> {
        return this.slideRepository.update(key, item);
    }

    create(item: IEntity): Observable<Slide> {
        return this.slideRepository.create(item);
    }

    deleteByKey(key: number): void {
        this.slideRepository.deleteByKey(key);
    }

}