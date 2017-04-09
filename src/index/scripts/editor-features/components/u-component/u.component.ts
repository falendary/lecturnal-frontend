import {Component, EventEmitter} from '@angular/core';
import {Input, Output} from '@angular/core';

import {IEditorButton} from '../interfaces/IEditorButton';

import {SelectionData} from '../../models/selectionData';
import {SelectionHelper} from '../../helpers/selection.helper';
import {NodeHelper} from "../../helpers/node.helper";

@Component({
    selector: 'u-editor-button',
    templateUrl: 'u.component.html'
})

export class UComponent implements IEditorButton {

    @Output('contenteditableModelChange') update = new EventEmitter();

    @Input('content')
    public content: string;

    @Input('editorId')
    public editorId: string;

    wrapSelected(): void {

        let selection = window.getSelection();
        let node: any = selection.focusNode;
        let selectionData: SelectionData = SelectionHelper.getSelectionData();

        if (document.getElementById(this.editorId).contains(node)) {

            if(NodeHelper.haveParentWithLocalNameAndClassName(node, 'span', 'e-style-underline')) {

                let parent = NodeHelper.findParentByLocalNameAndClassName(node, 'span', 'e-style-underline');
                parent.outerHTML = parent.innerHTML;

            } else {
                node.parentNode.innerHTML = selectionData.startString + '<span class="e-style-underline">' + selectionData.middleString + '</span>' + selectionData.endString;
            }
            this.update.emit();
        }

    }

}