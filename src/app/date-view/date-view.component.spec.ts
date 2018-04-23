import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { DateViewComponent } from './date-view.component';
import { TreeNode } from './../models/tree-node.model';
import { Task } from './../models/task.model';
import { CurrentTaskService } from '../services/current-task.service';

describe('Component: DateViewComponent', () => {

    let component: DateViewComponent;
    let fixture: ComponentFixture<DateViewComponent>;
    let root: TreeNode;
    let currentTaskService: CurrentTaskService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [DateViewComponent],
            imports: [FormsModule],
            providers: [CurrentTaskService]
        });

        fixture = TestBed.createComponent(DateViewComponent);
        currentTaskService = TestBed.get(CurrentTaskService);

        // get test component from the fixture
        component = fixture.componentInstance;

        root = new TreeNode();

        const task1 = new Task();
        const task2 = new Task();
        const task3 = new Task();

        task1.due = new Date();

        const child1 = new TreeNode();
        child1.item = task1;

        const child2 = new TreeNode();
        child2.item = task2;

        const child3 = new TreeNode();
        child3.item = task3;

        child2.addChild(child3);
        root.addChild(child1).addChild(child2);

        component.root = root;
        fixture.detectChanges();
    });

    it('should have 2 dates', () => {
        expect(component.dateItems.length).toBe(2);
    });

    it('should have 2 items', () => {
        expect(component.dateItems[1].items.length).toBe(2);
    });

    it('should have 1 item', () => {
        expect(component.dateItems[0].items.length).toBe(1);
    });

    it('should emit task Selected', (done) => {
        const node = root.children[0];

        component.taskSelected.subscribe(selected => {
           expect(selected).toEqual(node);
           expect(component.node).toEqual(node);
           done();
        });

        component.selectTask(node);
    });

    it('should emit task completed', (done) => {
        const node = root.children[0];

        component.taskCompleted.subscribe(completed => {
           expect(completed).toEqual(node);
           done();
        });

        component.completeTask(node);
    });

    it('should emit onChange', (done) => {
        const node = root.children[0];

        component.onChange.subscribe(changed => {
           expect(changed).toEqual(node);
           done();
        });

        component.changedTask(node);
    });

    it('should emit blurNode', (done) => {
        const node = root.children[0];

        component.blurNode.subscribe(blurred => {
           expect(blurred).toEqual(node);
           done();
        });

        component.triggerBlurNode(node);
    });

    it('should listen to task change', () => {
        const node = root.children[0];
        currentTaskService.setTask(node);

        expect(component.node).toEqual(node);
    });
});
