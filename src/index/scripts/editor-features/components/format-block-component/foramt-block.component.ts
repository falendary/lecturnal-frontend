import {Component, EventEmitter} from '@angular/core';
import {Input, Output} from '@angular/core';
import {IEditorButton} from "../interfaces/IEditorButton";

@Component({
    selector: 'format-block-editor-button',
    templateUrl: 'format-block.component.html'
})

export class FormatBlockComponent implements IEditorButton {

    @Output('contenteditableModelChange') update = new EventEmitter();

    @Input('content')
    public content:string;

    @Input('editorId')
    public editorId:string;

    public formatBlock:string;

    wrapSelected():void {

        document.execCommand('formatBlock', false, this.formatBlock);

    }

}