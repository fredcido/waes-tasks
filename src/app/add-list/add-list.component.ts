import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TaskListService } from './../services/task-list.service';
import { List } from './../models/list.model';
import { AlertService } from '../services/alert.service';

@Component({
    moduleId: module.id,
    selector: 'app-add-list',
    templateUrl: 'add-list.component.html',
})
export class AddListComponent implements OnInit {
    list: List;

    constructor(
      public dialogRef: MatDialogRef<AddListComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private listService: TaskListService,
      private alertService: AlertService,
    ) { }

    ngOnInit() {
      if (this.data) {
        this.list = this.data;
      } else {
        this.list = new List();
      }
    }

    save(list: List) {
      this.listService.save(list)
                      .then(() => {
                        this.alertService.success('List saved successfully');
                        this.dialogRef.close();
                      });
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
}
