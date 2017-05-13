"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var selectionData_1 = require("../models/selectionData");
var SelectionHelper = (function () {
    function SelectionHelper() {
    }
    SelectionHelper.getSelectionData = function () {
        var selectionData = new selectionData_1.SelectionData();
        var selection = window.getSelection();
        var offsetFrom = selection.focusOffset;
        var offsetTo = selection.anchorOffset;
        if (selection.focusOffset > selection.anchorOffset) {
            offsetFrom = selection.anchorOffset;
            offsetTo = selection.focusOffset;
        }
        var node = selection.focusNode;
        //console.log('node.nodeValue', node.nodeValue);
        console.log('node', { n: node });
        console.log('selection', selection);
        var startString = node.textContent.slice(0, offsetFrom);
        var middleString = node.textContent.slice(offsetFrom, offsetTo);
        var endString = node.textContent.slice(offsetTo, node.textContent.length);
        selectionData.offsetFrom = offsetFrom;
        selectionData.offsetTo = offsetTo;
        selectionData.startString = startString;
        selectionData.middleString = middleString;
        selectionData.endString = endString;
        return selectionData;
    };
    return SelectionHelper;
}());
exports.SelectionHelper = SelectionHelper;

//# sourceMappingURL=selection.helper.js.map
