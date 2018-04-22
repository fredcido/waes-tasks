import { Task } from './task.model';

export class TreeNode {
    item: Task;
    previous: TreeNode = null;
    nextNode: TreeNode = null;
    children: TreeNode[] = [];
    parent: TreeNode = null;

    reorderChildren(parent: TreeNode) {
        const tempChildren = [];
        let node = parent.firstChild();

        while (node) {
            tempChildren.push(node);
            node = node.nextNode;
        }

        parent.children = tempChildren;
    }

    insertBefore(node: TreeNode) {
        node.nextNode = this;
        if (this.previous) {
            this.previous.nextNode = node;
        }

        this.previous = node;
        // if (this.parent) {
        //     this.reorderChildren(this.parent);
        // }
    }

    insertAfter(node: TreeNode) {
        node.previous = this;
        if (this.nextNode) {
            this.nextNode.previous = node;
        }

        this.nextNode = node;
        // if (this.parent) {
        //     this.reorderChildren(this.parent);
        // }
    }

    firstChild(): TreeNode {
        return this.children.find(node => !node.previous);
    }

    lastChild(): TreeNode {
        return this.children.find(node => !node.nextNode);
    }

    unshiftChild(node: TreeNode) {
        this.children.push(node);
        if (this.children.length) {
            this.firstChild().insertBefore(node);
        }

        node.parent = this;
    }

    addChild(node: TreeNode) {
        node.previous = null;
        node.nextNode = null;

        this.children.push(node);
        if (this.children.length) {
            this.lastChild().insertAfter(node);
        }

        node.parent = this;
    }

    removeChild(node: TreeNode) {
        if (node.previous) {
            node.previous.nextNode = node.nextNode;
        }

        if (node.nextNode) {
            node.nextNode.previous = node.previous;
        }

        this.children = this.children.filter(item => item !== node);
        node.parent = null;
    }
}
