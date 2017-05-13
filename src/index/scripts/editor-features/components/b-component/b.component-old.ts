import {Component,EventEmitter} from '@angular/core';
import {Input, Output} from '@angular/core';
import {IEditorButton} from '../interfaces/IEditorButton';
import {SelectionHelper} from '../../helpers/selection.helper';
import {SelectionData} from '../../models/selectionData';
import {NodeHelper} from '../../helpers/node.helper';

@Component({
    selector: 'b-editor-button',
    template: 'b.component.html'
})

export class BComponent implements IEditorButton {

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

            console.log({parentNode: node.parentNode});
            console.log({node: node});

            if (NodeHelper.haveParentWithLocalName(node, 'b')) {

                let parent = NodeHelper.findParentByLocalName(node, 'b');
                parent.outerHTML = parent.innerHTML;

            } else {

                let blockParent = NodeHelper.findBlockParent(node);

                if (blockParent.childNodes.length > 1) {

                    let currentLength = 0;
                    let nodesToWrap: any[] = []; // Node or Element

                    let startNodeIndex: number;
                    let endNodeIndex: number;

                    for (let i: number = 0; i < blockParent.childNodes.length; i = i + 1) {

                        currentLength = currentLength + blockParent.childNodes[i].textContent.length;

                        if (currentLength >= selectionData.offsetFrom) {

                            if (!startNodeIndex) {
                                startNodeIndex = i;
                            }

                            let lengthDiff: number = currentLength - selectionData.offsetTo;

                            if (lengthDiff < blockParent.childNodes[i].textContent.length) {
                                nodesToWrap.push(blockParent.childNodes[i]);
                                //blockParent.removeChild(blockParent.childNodes[i]);
                                endNodeIndex = i;
                            }

                        }

                    }

                    console.log('nodesToWrap', nodesToWrap);

                    let b: Element = document.createElement('B');


                    for (let i: number = 0; i < nodesToWrap.length; i = i + 1) {
                        b.appendChild(nodesToWrap[i]);
                    }

                    console.log('B ELEMENT', b);

                    //blockParent.insertBefore(b, blockParent.children[startNodeIndex + 1]); // next to start


                } else {

                    blockParent.innerHTML = selectionData.startString + '<b>' + selectionData.middleString + '</b>' + selectionData.endString;
                }
            }


            this.update.emit()
        }


    }

}