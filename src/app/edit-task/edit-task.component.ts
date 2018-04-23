import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TaskService } from './../services/task.service';
import { AlertService } from '../services/alert.service';
import { Task } from '../models/task.model';
import { TaskListService } from '../services/task-list.service';
import { List } from '../models/list.model';

@Component({
    moduleId: module.id,
    selector: 'app-edit-task',
    templateUrl: 'edit-task.component.html',
})
export class EditTaskComponent implements OnInit {
    task: Task;
    list: List;
    lists: List[];

    constructor(
      public dialogRef: MatDialogRef<EditTaskComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private taskService: TaskService,
      private alertService: AlertService,
      private listService: TaskListService,
    ) { }

    ngOnInit() {
        this.task = this.data.task;
        this.list = this.data.list;
        this.listService.all().then(lists => this.lists = lists);
    }

    save(task: Task) {
      this.taskService.save(this.list, task, 'PUT')
                      .then(() => {
                        this.alertService.success('List saved successfully');
                        this.dialogRef.close();
                      });
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
}
