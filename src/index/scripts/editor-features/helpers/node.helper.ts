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

}