import {Slide} from "./Slide";
import {IEntity} from "./interfaces/IEntity";

export class Presentation implements IEntity {

    id:number;
    name:string;
    slides:Slide[]

}