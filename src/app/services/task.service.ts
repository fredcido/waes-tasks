import { Injectable } from '@angular/core';

import { ROOT_URL } from '../app.config';
import { List } from '../models/list.model';
import { Task } from './../models/task.model';
import { TreeNode } from '../models/tree-node.model';

declare const gapi: any;
const ENDPOINT = '/tasks/v1/lists/';

@Injectable()
export class TaskService {
    constructor() {}

    list(list: List, params = {}): Promise<TreeNode> {
        return new Promise<TreeNode>((resolve, reject) => {
            const url = `${ENDPOINT}${list.id}/tasks`;
            gapi.client.request(
                    {
                        'path': url,
                        params: params
                    }
                ).then(({result}) => {
                const tasks = <Task[]>result.items;
                resolve(this.arrangeTree(tasks));
            }, function(reason) {
                reject(reason);
            });
        });
    }

    arrangeTree(tasks: Task[]): TreeNode {
        const tempReference = {};
        const root = new TreeNode();

        if (tasks) {
            tasks.forEach(task => {
                const node = new TreeNode();
                node.item =  Object.assign(new Task(), task);

                tempReference[task.id] = node;

                if (task.parent && tempReference[task.parent]) {
                    tempReference[task.parent].addChild(node);
                } else {
                    task.parent = null;
                    root.addChild(node);
                }
            });
        }

        return root;
    }

    save(list: List, task: Task, method = 'POST'): Promise<Task> {
        return new Promise<Task>((resolve, reject) => {
            let url = `${ENDPOINT}${list.id}/tasks/`;
            if (task.id) {
                url += task.id;
            }

            delete task.id;

            gapi.client.request(
                {
                    'path': url,
                    'method': method,
                    'body': JSON.stringify(task)
                }
            ).then((response) => {
                const newTask = Object.assign(new Task(), response.result);
                resolve(newTask);
            }, (reason) => {
                reject(reason);
            });
        });
    }

    delete(list: List, task: Task): Promise<Task> {
        return new Promise<Task>((resolve, reject) => {
            const url = `${ENDPOINT}${list.id}/tasks/${task.id}`;
            gapi.client.request(
                {
                    'path': url,
                    'method': 'DELETE'
                }
            ).then((response) => {
                resolve(response);
            }, (reason) => {
                reject(reason);
            });
        });
    }

    move(list: List, task: Task, parent: Task = null, previous: Task = null): Promise<Task> {
        return new Promise<Task>((resolve, reject) => {
            const url = `${ENDPOINT}${list.id}/tasks/${task.id}/move`;
            let params = {};
            if (parent) {
                params = {...params, parent: parent.id};
            }

            if (previous) {
                params = {...params, previous: previous.id};
            }

            gapi.client.request(
                {
                    'path': url,
                    'method': 'POST',
                    'params': params
                }
            ).then((response) => {
                resolve(response);
            }, (reason) => {
                reject(reason);
            });
        });
    }
}
