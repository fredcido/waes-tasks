import { TreeNode } from './tree-node.model';

describe('Model: TreeNode', () => {
    it('should add child', () => {
        const root = new TreeNode();
        const child = new TreeNode();

        root.addChild(child);

        expect(root.children.length).toBeGreaterThan(0);
    });

    it('should be previous', () => {
        const root = new TreeNode();
        const child1 = new TreeNode();
        const child2 = new TreeNode();

        root.addChild(child1).addChild(child2);

        expect(root.children.length).toBeGreaterThanOrEqual(2);
        expect(child2.previous()).toBe(child1);
    });

    it('should be next', () => {
        const root = new TreeNode();
        const child1 = new TreeNode();
        const child2 = new TreeNode();

        root.addChild(child1).addChild(child2);

        expect(root.children.length).toBeGreaterThanOrEqual(2);
        expect(child1.next()).toBe(child2);
    });

    it('should be null the previous', () => {
        const root = new TreeNode();
        const child = new TreeNode();

        root.addChild(child)

        expect(root.children.length).toBeGreaterThanOrEqual(1);
        expect(child.previous()).toBeNull();
    });

    it('should be null the next', () => {
        const root = new TreeNode();
        const child = new TreeNode();

        root.addChild(child)

        expect(root.children.length).toBeGreaterThanOrEqual(1);
        expect(child.next()).toBeNull();
    });

    it('should insert before', () => {
        const root = new TreeNode();
        const child1 = new TreeNode();
        const child2 = new TreeNode();

        root.addChild(child1);
        child1.insertBefore(child2);

        expect(root.children.length).toBeGreaterThanOrEqual(2);
        expect(child1.previous()).toBe(child2);
        expect(child2.next()).toBe(child1);
    });

    it('should insert after', () => {
        const root = new TreeNode();
        const child1 = new TreeNode();
        const child2 = new TreeNode();

        root.addChild(child1);
        child1.insertAfter(child2);

        expect(root.children.length).toBeGreaterThanOrEqual(2);
        expect(child1.next()).toBe(child2);
        expect(child2.previous()).toBe(child1);
    });

    it('should unshift child', () => {
        const root = new TreeNode();
        const child1 = new TreeNode();
        const child2 = new TreeNode();

        root.addChild(child1);
        root.unshiftChild(child2);

        expect(root.children.length).toBeGreaterThanOrEqual(2);
        expect(child1.previous()).toBe(child2);
        expect(child2.next()).toBe(child1);
    });

    it('should set parent', () => {
        const root1 = new TreeNode();
        const root2 = new TreeNode();
        const child = new TreeNode();

        root1.addChild(child);
        child.setParent(root2);

        expect(root1.children.length).toBe(0);
        expect(root2.children.length).toBe(1);
        expect(child.parent).toBe(root2);
    });

});
