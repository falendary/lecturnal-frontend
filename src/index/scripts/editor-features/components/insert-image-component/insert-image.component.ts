import {Component, EventEmitter} from '@angular/core';
import {Input, Output} from '@angular/core';
import {IEditorButton} from "../interfaces/IEditorButton";

@Component({
    selector: 'insert-image-editor-button',
    template: require('./insert-image.component.html')
})

export class InsertImageComponent implements IEditorButton {

    @Output('contenteditableModelChange') update = new EventEmitter();

    @Input('content')
    public content:string;

    @Input('editorId')
    public editorId:string;

    wrapSelected():void {


        let url:string = prompt('Enter the link here: ', 'http:\/\/');
        document.execCommand('insertimage', false, url);

    }

}