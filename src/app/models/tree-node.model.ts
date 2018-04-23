import { Task } from './task.model';

export class TreeNode {
    item: Task;
    children: TreeNode[] = [];
    parent: TreeNode = null;

    insertBefore(node: TreeNode) {
        this.parent.children = this.parent.children.filter(item => item !== node);
        node.setParent(this.parent);
        const index = this.parent.children.indexOf(this);
        this.parent.children.splice(index, 0, node);
        return this;
    }

    insertAfter(node: TreeNode) {
        this.parent.children = this.parent.children.filter(item => item !== node);
        node.setParent(this.parent);
        const index = this.parent.children.indexOf(this);
        this.parent.children.splice(index + 1, 0, node);
        return this;
    }

    unshiftChild(node: TreeNode) {
        this.children.unshift(node);
        node.parent = this;
        return this;
    }

    addChild(node: TreeNode) {
        node.parent = this;
        this.children.push(node);
        return this;
    }

    removeChild(node: TreeNode) {
        this.children = this.children.filter(item => item !== node);
        node.parent = null;
    }

    previous(): TreeNode {
        const collection = this.parent.children;
        const index = collection.indexOf(this);

        return index > 0 ? collection[index - 1] : null;
    }

    next(): TreeNode {
        const collection = this.parent.children;
        const index = collection.indexOf(this);
        const last = collection.length - 1;

        return index >= last ? null : collection[index + 1];
    }

    setParent(parent: TreeNode) {
        if (this.parent) {
            this.parent.removeChild(this);
        }

        parent.addChild(this);
        return this;
    }
}
