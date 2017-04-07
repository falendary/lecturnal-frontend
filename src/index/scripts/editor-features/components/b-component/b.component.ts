import {Component,EventEmitter} from '@angular/core';
import {Input, Output} from '@angular/core';
import {IEditorButton} from '../interfaces/IEditorButton';
import {SelectionHelper} from '../../helpers/selectionHelper';
import {SelectionData} from '../../models/selectionData';

@Component({
    selector: 'b-editor-button',
    templateUrl: 'b.component.html'
})

export class BComponent implements IEditorButton {

    @Output('contenteditableModelChange') update = new EventEmitter();

    @Input('content')
    public content:string;

    @Input('editorId')
    public editorId:string;

    wrapSelected():void {

        let selection = window.getSelection();
        let node:any = selection.focusNode;
        let selectionData:SelectionData = SelectionHelper.getSelectionData();

        if (document.getElementById(this.editorId).contains(node)) {

            node.parentNode.innerHTML = selectionData.startString + '<b>' + selectionData.middleString + '</b>' + selectionData.endString;

            this.update.emit()
        }


    }

}