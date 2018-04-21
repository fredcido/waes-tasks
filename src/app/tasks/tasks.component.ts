import {
    Component,
    OnInit,
    NgZone,
    ViewChildren,
    QueryList,
    ElementRef,
    ChangeDetectorRef
} from '@angular/core';

import { Task } from '../models/task.model';
import { List } from '../models/list.model';
import { AlertService } from '../services/alert.service';
import { CurrentListService } from './../services/current-list.service';
import { TaskService } from './../services/task.service';
import { TaskListService } from './../services/task-list.service';

@Component({
    selector: 'app-tasks',
    moduleId: module.id,
    templateUrl: 'tasks.component.html'
})

export class TasksComponent implements OnInit {

    @ViewChildren('taskItem') taskItem: QueryList<ElementRef>;
    private tasks: Task[] = [];
    private currentList: List;
    private selectedTask: Task;

    constructor(
        private currentListService: CurrentListService,
        private listService: TaskListService,
        private taskService: TaskService,
        private alertService: AlertService,
        private zone: NgZone,
        private cdRef: ChangeDetectorRef,
    ) {
    }


    ngOnInit() {
        this.currentListService.getObservable().subscribe(list => {
            this.currentList = list;
            this.listTasks();
        });
    }

    listTasks() {
        this.taskService.list(this.currentList).then(tasks => this.zone.run(() => this.tasks = tasks));
    }

    completeTask(task: Task, status: string) {
        const updateTask = new Task();
        updateTask.id = task.id;
        updateTask.status = status;

        this.taskService.save(this.currentList, updateTask, 'PATCH').then(() => {
            //this.alertService.success('Task updated successfully');
            this.listTasks();
        });
    }

    clearCompleted() {
        this.listService.clear(this.currentList).then(() => {
            this.alertService.success('Completed tasks removed');
            this.listTasks();
        });
    }

    addNewTask() {
        const task = new Task();
        this.tasks.unshift(task);
        this.cdRef.detectChanges();
        this.taskItem.first.nativeElement.focus();
    }

    saveTask(task: Task) {
        // We don't save the task when there is no title
        if (!task.title) {
            return;
        }

        this.taskService.save(this.currentList, task).then(() => {
            //this.alertService.success('Task updated successfully');
            this.listTasks();
        });
    }

    removeEmptyTask(task: Task) {
        // We just remove the task when there is no title
        if (task.title) {
            return;
        }

        if (!task.id) {
            this.tasks = this.tasks.filter(t => t !== task);
            return;
        } else {
            this.taskService.delete(this.currentList, task).then(() => {
                this.tasks = this.tasks.filter(t => t !== task);
            });
        }
    }

    selectTask(task: Task) {
        this.selectedTask = task;
    }

    deleteTask() {
        if (!this.selectedTask) {
            this.alertService.success('There is not task currently selected');
            return;
        }

        this.taskService.delete(this.currentList, this.selectedTask).then(() => {
            this.tasks = this.tasks.filter(t => t !== this.selectedTask);
            this.selectedTask = null;
        });
    }
}
