import { Injectable } from '@angular/core';

import { ROOT_URL } from '../app.config';
import { List } from '../models/list.model';
import { Task } from './../models/task.model';

declare const gapi: any;
const ENDPOINT = '/tasks/v1/lists/';

@Injectable()
export class TaskService {
    constructor() {}

    list(list: List): Promise<Task[]> {
        return new Promise<Task[]>((resolve, reject) => {
            const url = `${ENDPOINT}${list.id}/tasks`;
            gapi.client.request({'path': url}).then(function({result}) {
                const tasks = <Task[]>result.items;
                resolve(tasks);
            }, function(reason) {
                reject(reason);
            });
        });
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
            ).then(function(response) {
                resolve(response.result.items);
            }, function(reason) {
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
            ).then(function(response) {
                resolve(response);
            }, function(reason) {
                reject(reason);
            });
        });
    }
}