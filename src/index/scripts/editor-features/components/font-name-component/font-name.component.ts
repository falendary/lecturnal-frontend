import {Component, EventEmitter} from '@angular/core';
import {Input, Output} from '@angular/core';
import {IEditorButton} from "../interfaces/IEditorButton";

@Component({
    selector: 'font-name-editor-button',
    template: require('./font-name.component.html')
})

export class FontNameComponent implements IEditorButton {

    @Output('contenteditableModelChange') update = new EventEmitter();

    @Input('content')
    public content:string;

    @Input('editorId')
    public editorId:string;

    wrapSelected():void {

        document.execCommand('fontName', false, 'Arial');

    }

}