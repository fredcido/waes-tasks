import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { List } from './../models/list.model';
import { AddListComponent } from './../add-list/add-list.component';
import { TaskListService } from './../services/task-list.service';
import { CurrentListService } from './../services/current-list.service';

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
        private currentListService: CurrentListService,
        private dialog: MatDialog) {
    }

    ngOnInit() {
        this.loadItems();
    }

    loadItems() {
        this.listService.all().then(
            lists => {
                this.lists = lists;
                if (lists.length && !this.currentListService.getList()) {
                    this.currentListService.setList(lists[0]);
                }
            }
        );
    }

    newList(): void {
        const dialogRef = this.dialog.open(AddListComponent);

        dialogRef.afterClosed().subscribe(result => {
            this.loadItems();
        });
    }

    changeCurrentList(list: List) {
        this.currentListService.setList(list);
    }
}
