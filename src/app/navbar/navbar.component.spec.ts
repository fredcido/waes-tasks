import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, inject, async, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';
import { AuthService } from '../services/mocks/auth.service';
import { AuthService as BaseAuthService } from '../services/auth.service';
import { CurrentListService } from '../services/current-list.service';
import { List } from '../models/list.model';

describe('Component: NavBarComponent', () => {

    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let currentListService: CurrentListService;
    let list: List;

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [NavbarComponent],
            imports: [RouterTestingModule.withRoutes([])],
            providers: [
                {provide: BaseAuthService, useClass: AuthService},
                CurrentListService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(NavbarComponent);
        currentListService = TestBed.get(CurrentListService);

        // get test component from the fixture
        component = fixture.componentInstance;
        list = new List();

        fixture.detectChanges();
    });

    it('should listen to listen change', () => {
        currentListService.setList(list);

        expect(component.currentList).toBe(list);
    });

    it('should emit clear completed', fakeAsync(() => {
        spyOn(component.clearCompleted, 'emit');
        component.triggerClearCompleted();
        tick(1);
        expect(component.clearCompleted.emit).toHaveBeenCalled();
    }));

    it('should emit new task', fakeAsync(() => {
        spyOn(component.newTask, 'emit');
        component.triggerNewTask();
        tick(1);
        expect(component.newTask.emit).toHaveBeenCalled();
    }));

    it('should emit delete task', fakeAsync(() => {
        spyOn(component.deleteTask, 'emit');
        component.triggerDeleteTask();
        tick(1);
        expect(component.deleteTask.emit).toHaveBeenCalled();
    }));

    it('should emit refresh', fakeAsync(() => {
        spyOn(component.refresh, 'emit');
        component.triggerRefresh();
        tick(1);
        expect(component.refresh.emit).toHaveBeenCalled();
    }));

    it('should emit move right', fakeAsync(() => {
        spyOn(component.moveRight, 'emit');
        component.triggerMoveRight();
        tick(1);
        expect(component.moveRight.emit).toHaveBeenCalled();
    }));

    it('should emit move left', fakeAsync(() => {
        spyOn(component.moveLeft, 'emit');
        component.triggerMoveLeft();
        tick(1);
        expect(component.moveLeft.emit).toHaveBeenCalled();
    }));

    it('should emit move up', fakeAsync(() => {
        spyOn(component.moveUp, 'emit');
        component.triggerMoveUp();
        tick(1);
        expect(component.moveUp.emit).toHaveBeenCalled();
    }));

    it('should emit move down', fakeAsync(() => {
        spyOn(component.moveDown, 'emit');
        component.triggerMoveDown();
        tick(1);
        expect(component.moveDown.emit).toHaveBeenCalled();
    }));

    it('should emit edit task', fakeAsync(() => {
        spyOn(component.onEdit, 'emit');
        component.triggerEditTask();
        tick(1);
        expect(component.onEdit.emit).toHaveBeenCalled();
    }));
});
