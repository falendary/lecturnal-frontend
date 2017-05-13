"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodeHelper = (function () {
    function NodeHelper() {
    }
    NodeHelper.getListOfBlockTags = function () {
        return ['div', 'p', 'ul'];
    };
    NodeHelper.isInlineTag = function (tag) {
        var blockTags = NodeHelper.getListOfBlockTags();
        if (blockTags.indexOf(tag) == -1) {
            return true;
        }
        return false;
    };
    NodeHelper.findParentByLocalName = function (node, tag) {
        if (NodeHelper.isInlineTag(node.parentElement.localName)) {
            if (node.parentElement.localName == tag) {
                return node.parentElement;
            }
            else {
                return NodeHelper.findParentByLocalName(node.parentElement, tag);
            }
        }
        else {
            return undefined;
        }
    };
    NodeHelper.findParentByClassName = function (node, className) {
        if (NodeHelper.isInlineTag(node.parentElement.localName)) {
            if (node.parentElement.classList.contains(className)) {
                return node.parentElement;
            }
            else {
                return NodeHelper.findParentByClassName(node.parentElement, className);
            }
        }
        else {
            return undefined;
        }
    };
    NodeHelper.findParentByLocalNameAndClassName = function (node, tag, className) {
        if (NodeHelper.isInlineTag(node.parentElement.localName)) {
            if (node.parentElement.classList.contains(className) && node.parentElement.localName == tag) {
                return node.parentElement;
            }
            else {
                return NodeHelper.findParentByClassName(node.parentElement, className);
            }
        }
        else {
            return undefined;
        }
    };
    NodeHelper.haveParentWithLocalName = function (node, tag) {
        var parentElement = NodeHelper.findParentByLocalName(node, tag);
        return !!parentElement;
    };
    NodeHelper.haveParentWithClassName = function (node, className) {
        var parentElement = NodeHelper.findParentByClassName(node, className);
        return !!parentElement;
    };
    NodeHelper.haveParentWithLocalNameAndClassName = function (node, tag, className) {
        var parentElement = NodeHelper.findParentByLocalNameAndClassName(node, tag, className);
        return !!parentElement;
    };
    NodeHelper.findBlockParent = function (element) {
        if (element.parentElement.localName == 'p' || element.parentElement.localName == 'div' || element.parentElement.localName == 'li') {
            return element.parentElement;
        }
        else {
            return NodeHelper.findBlockParent(element.parentElement);
        }
    };
    NodeHelper.unwrapElements = function (elements, tag, startOffset, endOffset) {
        var currentLength = 0;
        console.log('Action: unwrapElements');
        console.log('endOffset: ' + startOffset);
        console.log('endOffset: ' + endOffset);
        console.log('elements.length: ' + elements.length);
        for (var i = 0; i < elements.length; i = i + 1) {
            currentLength = currentLength + elements[i].textContent.length;
            console.log('Index: ' + i);
            console.log('Current length: ' + currentLength);
            if (elements[i].hasOwnProperty('localName')) {
                if (elements[i].localName == tag) {
                    if (currentLength >= startOffset) {
                        if (currentLength - endOffset <= elements[i].textContent.length) {
                            var inElementEndOffset = currentLength - endOffset;
                            if (inElementEndOffset == elements[i].textContent.length) {
                                elements[i].outerHTML = elements[i].innerHTML;
                            }
                            else {
                            }
                        }
                    }
                }
            }
        }
        return elements;
    };
    ;
    NodeHelper.wrapElements = function (elements, tag, startOffset, endOffset) {
        var element = document.createElement(tag);
        var currentLength = 0;
        var elementInnerHTML = '';
        var insertionIndex;
        console.log('Action: wrapElements');
        console.log('endOffset: ' + startOffset);
        console.log('endOffset: ' + endOffset);
        console.log('elements.length: ' + elements.length);
        for (var i = 0; i < elements.length; i = i + 1) {
            currentLength = currentLength + elements[i].textContent.length;
            // if we find start element/node BLOCK START
            console.log('Index: ' + i);
            console.log('Current length: ' + currentLength);
            if (currentLength - startOffset >= 0) {
                console.log('Node at start offset have been found, index: ' + i);
                if (currentLength - startOffset <= elements[i].textContent.length) {
                    elementInnerHTML = elementInnerHTML + elements[i].textContent.slice(startOffset, endOffset);
                    var secondPartText = elements[i].textContent.slice(endOffset, elements[i].textContent.length);
                    elements[i].textContent = elements[i].textContent.slice(0, startOffset);
                    if (secondPartText.length > 0) {
                        insertionIndex = i;
                        var secondPartNode = document.createTextNode(secondPartText);
                        if (i == elements.length - 1) {
                            elements[i].parentNode.appendChild(secondPartNode);
                        }
                        else {
                            elements[i].parentNode.insertBefore(secondPartNode, elements[i + 1]);
                        }
                    }
                }
                // if we find start element/node BLOCK END
            }
            else {
                console.log('Node at end offset have been found, index: ' + i);
                // if we find end element/node BLOCK START
                if (currentLength > endOffset) {
                    if (endOffset - currentLength < elements[i].textContent.length) {
                        var localElementOffset = endOffset - currentLength;
                        insertionIndex = i;
                        elementInnerHTML = elementInnerHTML + elements[i].textContent.slice(0, localElementOffset);
                        elements[i].textContent = elements[i].textContent.slice(localElementOffset);
                    }
                }
                else {
                    console.log('Wrapping regular node at index: ' + i);
                    // add textContent or outerHTML to elementInnerHTML BLOCK START
                    if (elements[i].hasOwnProperty('outerHTML')) {
                        elementInnerHTML = elementInnerHTML + elements[i].outerHTML;
                    }
                    else {
                        elementInnerHTML = elementInnerHTML + elements[i].textContent;
                    }
                    // add textContent or innerHTML to elementInnerHTML BLOCK END
                }
            }
        }
        console.log('elementInnerHTML', elementInnerHTML);
        element.innerHTML = elementInnerHTML;
        if (insertionIndex == elements.length - 1) {
            elements[0].parentNode.appendChild(element);
        }
        else {
            elements[0].parentNode.insertBefore(element, elements[0].parentNode.childNodes[insertionIndex + 1]);
        }
    };
    return NodeHelper;
}());
exports.NodeHelper = NodeHelper;

//# sourceMappingURL=node.helper.js.map
