import {Component, EventEmitter} from '@angular/core';
import {Input, Output} from '@angular/core';
import {IEditorButton} from "../interfaces/IEditorButton";

@Component({
    selector: 'unlink-editor-button',
    templateUrl: 'unlink.component.html'
})

export class UnlinkComponent implements IEditorButton {

    @Output('contenteditableModelChange') update = new EventEmitter();

    @Input('content')
    public content:string;

    @Input('editorId')
    public editorId:string;

    wrapSelected():void {

        document.execCommand('unlink', false, null);

    }

}