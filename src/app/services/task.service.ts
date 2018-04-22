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

    list(list: List): Promise<TreeNode> {
        return new Promise<TreeNode>((resolve, reject) => {
            const url = `${ENDPOINT}${list.id}/tasks`;
            gapi.client.request({'path': url}).then(({result}) => {
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

        tasks.forEach(task => {
            const node = new TreeNode();
            node.item =  Object.assign(new Task(), task);

            tempReference[task.id] = node;

            if (task.parent) {
                tempReference[task.parent].addChild(node);
            } else {
                root.addChild(node);
            }
        });

        console.log(root);

        return root;
    }

    save(list: List, task: Task, method = 'POST'): Promise<Task> {
        return new Promise<Task>((resolve, reject) => {
            let url = `${ENDPOINT}${list.id}/tasks/`;
            if (task.id) {
                url += task.id;
            }

            gapi.client.request(
                {
                    'path': url,
                    'method': method,
                    'body': JSON.stringify(task)
                }
            ).then((response) => {
                resolve(response.result.items);
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
}