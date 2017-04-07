import {Component, EventEmitter} from '@angular/core';
import {Input, Output} from '@angular/core';
import {IEditorButton} from '../interfaces/IEditorButton';

@Component({
    selector: 'ul-editor-button',
    templateUrl: 'ul.component.html'
})

export class UlComponent implements IEditorButton {

    @Output('contenteditableModelChange') update = new EventEmitter();

    @Input('content')
    public content:string;

    @Input('editorId')
    public editorId:string;

    wrapSelected():void {
    }

}