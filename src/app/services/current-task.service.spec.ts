import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';

import { CurrentTaskService } from '../services/current-task.service';
import { TreeNode } from '../models/tree-node.model';

describe('Service: CurrentTaskService', () => {

    let currentTaskService: CurrentTaskService;
    let task: TreeNode;

    beforeEach(() => {
        currentTaskService = new CurrentTaskService();
        task = new TreeNode();
    });

    it('should listen to list change', (done) => {
        currentTaskService.getObservable().subscribe(selected => {
           expect(selected).toEqual(task);
           done();
        });

        currentTaskService.setTask(task);
    });

    it('should be null', (done) => {
        currentTaskService.getObservable().subscribe(selected => {
           expect(selected).toBeNull();
           done();
        });

        currentTaskService.setTask(null);
    });
});
