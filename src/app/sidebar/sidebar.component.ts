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
    private currentList: List = null;
    closeResult: string;

    constructor(
        private listService: TaskListService,
        private currentListService: CurrentListService,
        private dialog: MatDialog) {
    }

    ngOnInit() {
        this.loadItems();

        this.currentListService.getObservable().subscribe(list => {
            this.currentList = list;
        });
    }

    loadItems() {
        this.listService.all().then(
            lists => {
                this.lists = lists;
                this.setFirstList();
            }
        );
    }

    setFirstList() {
        let first = null;
        if (this.lists.length && !this.currentListService.getList()) {
            first = this.lists[0];
        }

        this.currentListService.setList(first);
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

    editList(list: List) {
        const dialogRef = this.dialog.open(AddListComponent, {data: list});

        dialogRef.afterClosed().subscribe(result => {
            this.loadItems();
        });
    }

    removeList(list: List) {
        this.listService.delete(list).then(
            () => {
                this.loadItems();
                if (list === this.currentList) {
                    this.setFirstList();
                }
            }
        );
    }
}
