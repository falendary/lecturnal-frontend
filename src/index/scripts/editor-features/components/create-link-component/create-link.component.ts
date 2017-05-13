import {Component, EventEmitter} from '@angular/core';
import {Input, Output} from '@angular/core';
import {IEditorButton} from "../interfaces/IEditorButton";

@Component({
    selector: 'create-link-editor-button',
    template: require('./create-link.component.html')
})

export class CreateLinkComponent implements IEditorButton {

    @Output('contenteditableModelChange') update = new EventEmitter();

    @Input('content')
    public content:string;

    @Input('editorId')
    public editorId:string;

    wrapSelected():void {


        let url:string = prompt('Enter the link here: ', 'http:\/\/');
        document.execCommand('createlink', false, url);

    }

}