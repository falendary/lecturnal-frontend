import {IEntity} from "./interfaces/IEntity";
import {Slide} from "./Slide";

export class SlideViewModel implements IEntity{
    id: number;
    created_at: string;
    updated_at: string;
    presentation_id: number;
    content:string;

    isActive: boolean = false;

    constructor(slide: Slide){

        this.id = slide.id;
        this.created_at = slide.created_at;
        this.updated_at = slide.updated_at;
        this.presentation_id = slide.presentation_id;
        this.content = slide.content;

        this.isActive = false;

    }
}