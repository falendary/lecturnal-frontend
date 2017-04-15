import {IEntity} from "./interfaces/IEntity";

export class Slide implements IEntity{
    id: number;
    created_at: string;
    updated_at: string;
    presentation_id: number;
    content:string
}