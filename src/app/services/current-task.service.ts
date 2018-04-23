import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { TreeNode } from './../models/tree-node.model';

@Injectable()
export class CurrentTaskService {
    private subject = new Subject<Object>();
    private task: TreeNode;

    constructor() {
    }

    getObservable(): Observable<any> {
        return this.subject.asObservable();
    }

    setTask(task: TreeNode) {
        this.task = task;
        this.subject.next(task);
        return this;
    }

    getTask() {
        return this.task;
    }
}
