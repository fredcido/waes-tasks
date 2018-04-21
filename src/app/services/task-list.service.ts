import { Injectable } from '@angular/core';

import { ROOT_URL } from '../app.config';
import { List } from '../models/list.model';

declare const gapi: any;
const ENDPOINT = '/tasks/v1/users/@me/lists';

@Injectable()
export class TaskListService {
    constructor() {}

    all(): Promise<List[]> {
        return new Promise<List[]>((resolve, reject) => {
            gapi.client.request({'path': ENDPOINT}).then(function(response) {
                resolve(response.result.items);
            }, function(reason) {
                reject(reason);
            });
        });
    }

    save(list: List): Promise<List> {
        return new Promise<List>((resolve, reject) => {
            gapi.client.request(
                {
                    'path': ENDPOINT,
                    'method': 'POST',
                    'body': JSON.stringify(list)
                }
            ).then(function(response) {
                resolve(response.result.items);
            }, function(reason) {
                reject(reason);
            });
        });
    }

    clear(list: List): Promise<List> {
        return new Promise<List>((resolve, reject) => {
            const url = `tasks/v1/lists/${list.id}/clear`;
            gapi.client.request(
                {
                    'path': url,
                    'method': 'POST'
                }
            ).then(function(response) {
                resolve();
            }, function(reason) {
                reject(reason);
            });
        });
    }
}
