import {Component, EventEmitter} from '@angular/core';
import {Input, Output} from '@angular/core';
import {IEditorButton} from '../interfaces/IEditorButton';
import {SelectionHelper} from "../../helpers/selection.helper";

@Component({
    selector: 'ol-editor-button',
    templateUrl: 'ol.component.html'
})

export class OlComponent implements IEditorButton {

    @Output('contenteditableModelChange') update = new EventEmitter();

    @Input('content')
    public content:string;

    @Input('editorId')
    public editorId:string;


    private getNodeIndex(elements:HTMLCollection, node:Node):number {

        let index:number;

        for (let i:number = 0; i < elements.length; i = i + 1) {
            if (elements[i].contains(node)) {
                index = i;
            }
        }

        return index;

    }

    private getElementsToWrap(elements:any, startIndex:number, endIndex:number):Element[] {

        let result:Element[] = [];

        console.log('elements', elements);

        for (let i:number = startIndex; i <= endIndex; i = i + 1) {

            result.push(elements[i]);

        }


        return result;

    }

    wrapSelected():void {

        let selection = window.getSelection();
        let node:any = selection.focusNode;

        console.log('selection', selection);

        console.log('selection.extentOffset', selection.extentOffset);
        console.log('selection.anchorOffset', selection.anchorOffset);
        console.log('node.parentNode.innerText.length', node.parentNode.innerText.length);

        if (document.getElementById(this.editorId).contains(node)) {

            //node.parentNode.innerHTML = '<ul><li>'+nod+'</li></ul>';


            let startNode = selection.extentNode;
            let endNode = selection.anchorNode;

            let startParent = SelectionHelper.findBlockParent(startNode.parentElement);
            let endParent = SelectionHelper.findBlockParent(endNode.parentElement);

            if (startParent == endParent) {

                let startIndex:number = this.getNodeIndex(startParent.children, startNode);
                let endIndex:number = this.getNodeIndex(startParent.children, startNode);

                console.log('startIndex', startIndex);
                console.log('endIndex', endIndex);

                let elementsToWrap:Element[] = this.getElementsToWrap(startParent.children, startIndex, endIndex);

                let ol:Element = document.createElement("OL");

                for (let i:number = 0; i < elementsToWrap.length; i = i + 1) {
                    elementsToWrap[i].outerHTML = '<li>' + startParent.children[i].outerHTML + '</li>';
                    console.log('startParent.children[i].outerHTML', startParent.children[i].outerHTML);
                    ol.appendChild(elementsToWrap[i]);
                }

                for(let i:number = startIndex; i <= endIndex; i = i + 1) {
                    startParent.children[i].remove();
                }

                startParent.insertBefore(ol,startParent.children[startIndex + 1]);

                console.log('startParent', startParent);

                this.update.emit();

            }
        }

    }

}