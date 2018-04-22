import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TaskService } from './../services/task.service';
import { List } from './../models/list.model';
import { AlertService } from '../services/alert.service';

@Component({
    moduleId: module.id,
    selector: 'app-edit-task',
    templateUrl: 'edit-task.component.html',
})
export class EditTaskComponent implements OnInit {
    private list: List;

    constructor(
      public dialogRef: MatDialogRef<EditTaskComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private taskService: TaskService,
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
      this.taskService.save(list)
                      .then(() => {
                        this.alertService.success('List saved successfully');
                        this.dialogRef.close();
                      });
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
}
