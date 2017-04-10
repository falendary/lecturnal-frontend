import {Component,EventEmitter} from '@angular/core';
import {Input, Output} from '@angular/core';
import {IEditorButton} from '../interfaces/IEditorButton';
import {SelectionHelper} from '../../helpers/selection.helper';
import {SelectionData} from '../../models/selectionData';
import {NodeHelper} from '../../helpers/node.helper';

@Component({
    selector: 'b-editor-button',
    templateUrl: 'b.component.html'
})

export class BComponent implements IEditorButton {

    @Output('contenteditableModelChange') update = new EventEmitter();

    @Input('content')
    public content: string;

    @Input('editorId')
    public editorId: string;

    wrapSelected(): void {

        document.execCommand('bold', false, null);

        //let selection = window.getSelection();
        //let node: any = selection.focusNode;
        //let selectionData: SelectionData = SelectionHelper.getSelectionData();
        //
        //if (document.getElementById(this.editorId).contains(node)) {
        //
        //    if(NodeHelper.haveParentWithLocalName(node, 'b')) {
        //
        //        let parent = NodeHelper.findParentByLocalName(node, 'b');
        //        parent.outerHTML = parent.innerHTML;
        //
        //    }  else {
        //        node.parentNode.innerHTML = selectionData.startString + '<b>' + selectionData.middleString + '</b>' + selectionData.endString;
        //    }
        //
        //
        //    this.update.emit()
        //}


    }

}