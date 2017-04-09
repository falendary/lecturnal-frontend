import {SelectionData} from "../models/selectionData";
export class SelectionHelper {

    public static getSelectionData():SelectionData {

        let selectionData:SelectionData = new SelectionData();

        let selection = window.getSelection();

        let offsetFrom:number = selection.focusOffset;
        let offsetTo:number = selection.anchorOffset;

        if (selection.focusOffset > selection.anchorOffset) {
            offsetFrom = selection.anchorOffset;
            offsetTo = selection.focusOffset;
        }

        let node:any = selection.focusNode;

        //console.log('node.nodeValue', node.nodeValue);

        console.log('node', {n: node});
        console.log('selection', selection);

        let startString = node.textContent.slice(0, offsetFrom);
        let middleString = node.textContent.slice(offsetFrom, offsetTo);
        let endString = node.textContent.slice(offsetTo, node.textContent.length);

        selectionData.offsetFrom = offsetFrom;
        selectionData.offsetTo = offsetTo;

        selectionData.startString = startString;
        selectionData.middleString = middleString;
        selectionData.endString = endString;

        return selectionData
    }



}