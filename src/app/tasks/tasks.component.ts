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
import { TreeNode } from '../models/tree-node.model';

@Component({
    selector: 'app-tasks',
    moduleId: module.id,
    templateUrl: 'tasks.component.html'
})

export class TasksComponent implements OnInit {

    @ViewChildren('taskItem') taskItem: QueryList<ElementRef>;

    private tasks: TreeNode[] = [];
    private rootNode: TreeNode;
    private currentList: List;
    private selectedNode: TreeNode;

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
            this.selectedNode = null;
            this.listTasks();
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

    saveTask(task: Task) {
        // We don't save the task when there is no title
        if (!task.title) {
            return;
        }

        this.taskService.save(this.currentList, task).then(() => {
            this.alertService.success('Task saved successfully');
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

    moveRight() {
        if (!this.selectedNode) {
            return;
        }

        const node = this.selectedNode;
        if (!node.previous) {
            return;
        }

        node.parent.removeChild(node);
        node.previous.addChild(node);
        node.previous = null;

        console.log(node);
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

        console.log(node);
    }

    moveUp() {
        if (!this.selectedNode) {
            return;
        }

        const node = this.selectedNode;
        if (!node.previous) {
            return;
        }

        node.previous.insertBefore(node);

        console.log(node);
    }

    moveDown() {
        if (!this.selectedNode) {
            return;
        }

        const node = this.selectedNode;
        if (!node.nextNode) {
            return;
        }

        node.nextNode.insertAfter(node);

        console.log(node);
    }
}
