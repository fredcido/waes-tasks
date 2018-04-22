import { Task } from './task.model';

export class TreeNode implements IterableIterator<TreeNode> {
    item: Task;
    previous: TreeNode = null;
    nextNode: TreeNode = null;
    children: TreeNode[] = [];
    parent: TreeNode = null;
    currentNode: TreeNode = null;

    insertBefore(node: TreeNode) {
        node.nextNode = this;
        if (this.previous) {
            this.previous.nextNode = node;
        }
        this.previous = node;
    }

    insertAfter(node: TreeNode) {
        node.previous = this;
        if (this.nextNode) {
            this.nextNode.previous = node;
        }
        this.nextNode = node;
    }

    firstChild(): TreeNode {
        return this.children.find(node => !node.previous);
    }

    lastChild(): TreeNode {
        return this.children.find(node => !node.nextNode);
    }

    unshiftChild(node: TreeNode) {
        if (this.children.length) {
            this.firstChild().insertBefore(node);
        }

        node.parent = this;
        this.children.unshift(node);
    }

    addChild(node: TreeNode) {
        if (this.children.length) {
            this.lastChild().insertAfter(node);
        }

        node.parent = this;
        this.children.push(node);
    }

    removeChild(node: TreeNode) {
        if (node.previous) {
            node.previous.nextNode = node.nextNode;
        }

        if (node.nextNode) {
            node.nextNode.previous = node.previous;
        }

        this.children = this.children.filter(item => item !== node);
    }

    public next(): IteratorResult<TreeNode> {
        if (!this.currentNode) {
            this.currentNode = this.firstChild();
        }

        if (this.currentNode && this.currentNode.nextNode) {
            const nextNode = this.currentNode.nextNode;
            this.currentNode = nextNode;
            return {
                done: false,
                value: nextNode
            };
        } else {
            this.currentNode = null;
            return {
                done: true,
                value: null
            };
        }
    }

    [Symbol.iterator](): IterableIterator<TreeNode> {
        return this;
    }
}
