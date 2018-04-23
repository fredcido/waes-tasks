import { Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';

import { CurrentListService } from './current-list.service';
import { List } from '../models/list.model';

describe('Service: CurrentListService', () => {

    let currentListService: CurrentListService;
    let list: List;

    beforeEach(() => {
        currentListService = new CurrentListService();
        list = new List();
    });

    it('should listen to list change', (done) => {
        currentListService.getObservable().subscribe(selected => {
           expect(selected).toEqual(list);
           done();
        });

        currentListService.setList(list);
    });

    it('should be null', (done) => {
        currentListService.getObservable().subscribe(selected => {
           expect(selected).toBeNull();
           done();
        });

        currentListService.setList(null);
    });
});
