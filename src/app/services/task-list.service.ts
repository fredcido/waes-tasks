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
}