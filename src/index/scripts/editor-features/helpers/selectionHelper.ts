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

        let startString = node.nodeValue.slice(0, offsetFrom);
        let middleString = node.nodeValue.slice(offsetFrom, offsetTo);
        let endString = node.nodeValue.slice(offsetTo, node.nodeValue.length);

        selectionData.offsetFrom = offsetFrom;
        selectionData.offsetTo = offsetTo;

        selectionData.startString = startString;
        selectionData.middleString = middleString;
        selectionData.endString = endString;

        return selectionData
    }

    public static findBlockParent(element:Element):Element {

        if (element.parentElement.localName == 'p' || element.parentElement.localName == 'div' || element.parentElement.localName == 'li') {
            return element.parentElement;
        } else {
            return SelectionHelper.findBlockParent(element.parentElement);
        }

    }

}