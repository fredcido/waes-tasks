import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

import { TaskListService } from './../services/task-list.service';
import { List } from './../models/list.model';

@Component({
    moduleId: module.id,
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    private lists: List[];
    closeResult: string;

    constructor(
        private listService: TaskListService,
        private ngxSmartModalService: NgxSmartModalService) {
    }

    ngOnInit() {
        this.listService.all().then(lists => this.lists = lists);
    }
}
