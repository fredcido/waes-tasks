import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, inject, async, fakeAsync, tick } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';

import { CurrentListService } from './../services/current-list.service';
import { SidebarComponent } from './sidebar.component';
import { List } from './../models/list.model';
import { TaskListService } from '../services/mocks/task-list.service';
import { TaskListService as BaseTaskListService } from '../services/task-list.service';

describe('Component: Sidebar', () => {

    let component: SidebarComponent;
    let fixture: ComponentFixture<SidebarComponent>;
    let lists: List[] = [];
    let currentListService: CurrentListService;
    let taskListService: TaskListService;

    beforeEach(fakeAsync(() => {

        TestBed.configureTestingModule({
            declarations: [SidebarComponent],
            imports: [MatDialogModule],
            providers: [
                {provide: BaseTaskListService, useClass: TaskListService},
                CurrentListService
            ]
        });

        fixture = TestBed.createComponent(SidebarComponent);
        currentListService = TestBed.get(CurrentListService);
        taskListService = TestBed.get(BaseTaskListService);

        // get test component from the fixture
        component = fixture.componentInstance;

        lists = [];
        lists.push(new List());
        lists.push(new List());
        lists.push(new List());
        taskListService.lists = lists;

        fixture.detectChanges();

        component.loadItems();
        tick(1);
    }));

    it('should have 3 items', () => {
        expect(component.lists.length).toBe(3);
    });

    it('should select the first item', (done) => {
        const first = lists[0];
        currentListService.getObservable().subscribe(selected => {
           expect(selected).toEqual(first);
           done();
        });

        component.setFirstList();
    });

    it('should select null as first item', fakeAsync(() => {
        taskListService.lists = [];
        fixture.detectChanges();
        component.loadItems();
        tick(1);

        currentListService.getObservable().subscribe(selected => {
           expect(selected).toBeNull();
        });

        component.setFirstList();
    }));
});
