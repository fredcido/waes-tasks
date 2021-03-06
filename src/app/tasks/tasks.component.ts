import {
    Component,
    OnInit,
    NgZone,
    ViewChildren,
    QueryList,
    ElementRef,
    ChangeDetectorRef
} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Task } from '../models/task.model';
import { List } from '../models/list.model';
import { AlertService } from '../services/alert.service';
import { CurrentListService } from './../services/current-list.service';
import { CurrentTaskService } from './../services/current-task.service';
import { TaskService } from './../services/task.service';
import { TaskListService } from './../services/task-list.service';
import { TreeNode } from '../models/tree-node.model';
import { EditTaskComponent } from './../edit-task/edit-task.component';

@Component({
    selector: 'app-tasks',
    moduleId: module.id,
    templateUrl: 'tasks.component.html'
})

export class TasksComponent implements OnInit {

    @ViewChildren('taskItem') taskItem: QueryList<ElementRef>;

    tasks: TreeNode[] = [];
    rootNode: TreeNode;
    currentList: List;
    selectedNode: TreeNode;
    activeView = 'default';

    constructor(
        private currentListService: CurrentListService,
        private currentTaskService: CurrentTaskService,
        private listService: TaskListService,
        private taskService: TaskService,
        private alertService: AlertService,
        private zone: NgZone,
        private cdRef: ChangeDetectorRef,
        private dialog: MatDialog
    ) {
    }


    ngOnInit() {
        this.currentListService.getObservable().subscribe(list => {
            this.currentList = list;
            this.selectedNode = null;
            this.listTasks();
        });

        this.currentTaskService.getObservable().subscribe(task => {
            this.selectedNode = task;
        });
    }

    listTasks() {
        this.taskService.list(this.currentList).then(
            rootNode => this.zone.run(() => {
                this.rootNode = rootNode;
            })
        );
    }

    completeTask(node: TreeNode) {
        const task = <Task>node.item;

        const updateTask = new Task();
        updateTask.id = task.id;
        task.toggleStatus();
        updateTask.status = task.status;

        if (!updateTask.isCompleted()) {
            updateTask.completed = null;
        }

        node.children.map(child => this.completeTask(child));

        this.taskService.save(this.currentList, updateTask, 'PATCH').then(() => {
            this.alertService.success('Task updated successfully');
        }).catch(() => {
            task.toggleStatus();
            this.alertService.error('There was some error updating the task');
        });
    }

    clearCompleted() {
        this.listService.clear(this.currentList).then(() => {
            this.alertService.success('Completed tasks removed');
            this.listTasks();
        }).catch(() => {
            this.alertService.error('There was some error cleaing the completed the tasks');
        });
    }

    addNewTask() {
        const task = new Task();
        const node = new TreeNode();
        node.item = task;

        this.rootNode.unshiftChild(node);
        this.cdRef.detectChanges();
        // this.taskItem.first.nativeElement.focus();
    }

    saveTask(node: TreeNode) {
        const task = node.item;
        // We don't save the task when there is no title
        if (!task.title) {
            return;
        }

        let method = 'POST';
        if (task.id) {
            method = 'PATCH';
        }

        this.taskService.save(this.currentList, task, method).then((newTask) => {
            this.alertService.success('Task saved successfully');
            node.item = newTask;
            this.currentTaskService.setTask(node);
        });
    }

    editTask() {
        if (!this.selectedNode) {
            this.alertService.info('There is not task currently selected');
            return;
        }

        const dialogRef = this.dialog.open(
                                EditTaskComponent,
                                {
                                    data: {
                                        task: this.selectedNode.item,
                                        list: this.currentList
                                    }
                                }
                        );

        dialogRef.afterClosed().subscribe(result => {
            this.listTasks();
        });
    }

    removeEmptyTask(node: TreeNode) {
        const task = node.item;
        // We just remove the task when there is no title
        if (task.title || node.children.length) {
            return;
        }

        this.removeNode(node);
    }

    selectTask(node: TreeNode) {
        this.selectedNode = node;
    }

    removeNode(node: TreeNode) {
        const parent = node.parent;
        const task = node.item;

        if (!task.id) {
            parent.removeChild(node);
        } else {
            this.taskService.delete(this.currentList, task).then(() => {
                node.parent.removeChild(node);
                this.selectedNode = null;
                this.alertService.success('Task removed');
            });
        }
    }

    deleteTask() {
        if (!this.selectedNode) {
            this.alertService.info('There is not task currently selected');
            return;
        }

        this.removeNode(this.selectedNode);
    }

    moveNode(node: TreeNode) {
        const task = node.item;
        let parentTask = null;
        let previousTask = null;

        if (node.parent) {
            parentTask = node.parent.item;
        }

        if (node.previous()) {
            previousTask = node.previous().item;
        }

        this.taskService.move(this.currentList, task, parentTask, previousTask).then(() => {
            // this.selectedNode = null;
        });
    }

    moveRight() {
        if (!this.selectedNode) {
            return;
        }

        const node = this.selectedNode;
        if (!node.previous()) {
            return;
        }

        node.setParent(node.previous());
        this.moveNode(node);
    }

    moveLeft() {
        if (!this.selectedNode) {
            return;
        }

        const node = this.selectedNode;
        if (!node.parent || !node.parent.parent) {
            return;
        }

        const grandpa = node.parent.parent;
        node.parent.removeChild(node);
        grandpa.addChild(node);
        this.moveNode(node);
    }

    moveUp() {
        if (!this.selectedNode) {
            return;
        }

        const node = this.selectedNode;
        if (!node.previous()) {
            return;
        }

        node.previous().insertBefore(node);
        this.moveNode(node);
    }

    moveDown() {
        if (!this.selectedNode) {
            return;
        }

        const node = this.selectedNode;
        if (!node.next()) {
            return;
        }

        node.next().insertAfter(node);
        this.moveNode(node);
    }

    changeView(view) {
        this.activeView = view;
    }

    isViewActive(view) {
        return view === this.activeView;
    }
}
