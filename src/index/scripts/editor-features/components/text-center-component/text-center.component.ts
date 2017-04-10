import {Component, EventEmitter} from '@angular/core';
import {Input, Output} from '@angular/core';
import {IEditorButton} from '../interfaces/IEditorButton';
import {SelectionData} from '../../models/selectionData';
import {SelectionHelper} from '../../helpers/selection.helper';

@Component({
    selector: 'text-center-editor-button',
    templateUrl: 'text-center.component.html'
})

export class TextCenterComponent implements IEditorButton {

    @Output('contenteditableModelChange') update = new EventEmitter();

    @Input('content')
    public content:string;

    @Input('editorId')
    public editorId:string;

    wrapSelected():void {

        document.execCommand('justifyCenter', false, null);

        //let selection = window.getSelection();
        //let node:any = selection.focusNode;
        //
        //if (document.getElementById(this.editorId).contains(node)) {
        //    if (node.parentNode.classList.contains('e-style-text-center')) {
        //        node.parentNode.classList.remove('e-style-text-center');
        //    } else {
        //        node.parentNode.classList.remove('e-style-text-left');
        //        node.parentNode.classList.remove('e-style-text-right');
        //        node.parentNode.classList.add('e-style-text-center');
        //    }
        //}

    }


}