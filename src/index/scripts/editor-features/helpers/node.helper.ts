export class NodeHelper {

    public static getListOfBlockTags(): string[] {
        return ['div', 'p', 'ul'];
    }

    public static isInlineTag(tag: string): boolean {

        let blockTags = NodeHelper.getListOfBlockTags();

        if (blockTags.indexOf(tag) == -1) {
            return true;
        }

        return false;

    }

    public static findParentByLocalName(node: Node, tag: string): Element {

        if (NodeHelper.isInlineTag(node.parentElement.localName)) {

            if (node.parentElement.localName == tag) {
                return node.parentElement;
            } else {
                return NodeHelper.findParentByLocalName(node.parentElement, tag);
            }

        } else {
            return undefined;
        }

    }

    public static findParentByClassName(node: Node, className: string): Element {

        if (NodeHelper.isInlineTag(node.parentElement.localName)) {

            if (node.parentElement.classList.contains(className)) {
                return node.parentElement;
            } else {
                return NodeHelper.findParentByClassName(node.parentElement, className);
            }

        } else {
            return undefined;
        }

    }

    public static findParentByLocalNameAndClassName(node: Node, tag: string, className: string): Element {

        if (NodeHelper.isInlineTag(node.parentElement.localName)) {

            if (node.parentElement.classList.contains(className) && node.parentElement.localName == tag) {
                return node.parentElement;
            } else {
                return NodeHelper.findParentByClassName(node.parentElement, className);
            }

        } else {
            return undefined;
        }

    }

    public static haveParentWithLocalName(node: Node, tag: string): boolean {

        let parentElement: Element = NodeHelper.findParentByLocalName(node, tag);

        return !!parentElement;

    }

    public static haveParentWithClassName(node: Node, className: string): boolean {

        let parentElement: Element = NodeHelper.findParentByClassName(node, className);

        return !!parentElement;

    }

    public static haveParentWithLocalNameAndClassName(node: Node, tag: string, className: string): boolean {

        let parentElement: Element = NodeHelper.findParentByLocalNameAndClassName(node, tag, className);

        return !!parentElement;

    }

    public static findBlockParent(element: Element): Element {

        if (element.parentElement.localName == 'p' || element.parentElement.localName == 'div' || element.parentElement.localName == 'li') {
            return element.parentElement;
        } else {
            return NodeHelper.findBlockParent(element.parentElement);
        }

    }

    public static unwrapElements(elements: any, tag: string, startOffset: number, endOffset: number): Element[] {

        let currentLength: number = 0;

        console.log('Action: unwrapElements');

        console.log('endOffset: ' + startOffset);
        console.log('endOffset: ' + endOffset);
        console.log('elements.length: ' + elements.length);

        for (let i: number = 0; i < elements.length; i = i + 1) {

            currentLength = currentLength + elements[i].textContent.length;

            console.log('Index: ' + i);
            console.log('Current length: ' + currentLength);

            if (elements[i].hasOwnProperty('localName')) {

                if (elements[i].localName == tag) {

                    if (currentLength >= startOffset) {

                        if (currentLength - endOffset <= elements[i].textContent.length) {

                            let inElementEndOffset = currentLength - endOffset;

                            if (inElementEndOffset == elements[i].textContent.length) {
                                elements[i].outerHTML = elements[i].innerHTML;
                            } else {

                            }


                        }

                    }


                }

            }


        }

        return elements;

    };


    public static wrapElements(elements: any, tag: string, startOffset: number, endOffset: number): void {

        let element: Element = document.createElement(tag);

        let currentLength: number = 0;
        let elementInnerHTML: string = '';

        let insertionIndex: number;

        console.log('Action: wrapElements');

        console.log('endOffset: ' + startOffset);
        console.log('endOffset: ' + endOffset);
        console.log('elements.length: ' + elements.length);


        for (let i: number = 0; i < elements.length; i = i + 1) {

            currentLength = currentLength + elements[i].textContent.length;

            // if we find start element/node BLOCK START

            console.log('Index: ' + i);
            console.log('Current length: ' + currentLength);

            if (currentLength - startOffset >= 0) {

                console.log('Node at start offset have been found, index: ' + i);

                if (currentLength - startOffset <= elements[i].textContent.length) {

                    elementInnerHTML = elementInnerHTML + elements[i].textContent.slice(startOffset, endOffset);
                    let secondPartText: string = elements[i].textContent.slice(endOffset, elements[i].textContent.length);
                    elements[i].textContent = elements[i].textContent.slice(0, startOffset);


                    if (secondPartText.length > 0) {
                        insertionIndex = i;

                        let secondPartNode: Node = document.createTextNode(secondPartText);

                        if (i == elements.length - 1) {
                            elements[i].parentNode.appendChild(secondPartNode)
                        } else {
                            elements[i].parentNode.insertBefore(secondPartNode, elements[i + 1]);
                        }
                    }

                }

                // if we find start element/node BLOCK END

            } else {

                console.log('Node at end offset have been found, index: ' + i);

                // if we find end element/node BLOCK START

                if (currentLength > endOffset) {

                    if (endOffset - currentLength < elements[i].textContent.length) {

                        let localElementOffset: number = endOffset - currentLength;

                        insertionIndex = i;

                        elementInnerHTML = elementInnerHTML + elements[i].textContent.slice(0, localElementOffset);
                        elements[i].textContent = elements[i].textContent.slice(localElementOffset);

                    }
                }

                // if we find end element/node BLOCK END

                else {

                    console.log('Wrapping regular node at index: ' + i);

                    // add textContent or outerHTML to elementInnerHTML BLOCK START

                    if (elements[i].hasOwnProperty('outerHTML')) {
                        elementInnerHTML = elementInnerHTML + elements[i].outerHTML;
                    } else {
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
        } else {
            elements[0].parentNode.insertBefore(element, elements[0].parentNode.childNodes[insertionIndex + 1]);
        }


    }

}