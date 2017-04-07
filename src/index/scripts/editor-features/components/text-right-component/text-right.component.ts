import {Component, EventEmitter} from '@angular/core';
import {Input, Output} from '@angular/core';
import {IEditorButton} from '../interfaces/IEditorButton';
import {SelectionData} from '../../models/selectionData';
import {SelectionHelper} from '../../helpers/selectionHelper';

@Component({
    selector: 'text-right-editor-button',
    templateUrl: 'text-right.component.html'
})

export class TextRightComponent implements IEditorButton {

    @Output('contenteditableModelChange') update = new EventEmitter();

    @Input('content')
    public content:string;

    @Input('editorId')
    public editorId:string;

    wrapSelected():void {

        let selection = window.getSelection();
        let node:any = selection.focusNode;

        if (document.getElementById(this.editorId).contains(node)) {

            if (node.parentNode.classList.contains('e-style-text-right')) {
                node.parentNode.classList.remove('e-style-text-right');
            } else {
                node.parentNode.classList.remove('e-style-text-center');
                node.parentNode.classList.remove('e-style-text-left');
                node.parentNode.classList.add('e-style-text-right');
            }

        }

    }


}