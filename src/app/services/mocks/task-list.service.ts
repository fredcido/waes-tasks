import { Injectable } from '@angular/core';

import { TaskListService as BaseService } from './../task-list.service';
import { List } from '../../models/list.model';

@Injectable()
export class TaskListService extends BaseService {
    lists: List[];

    all(): Promise<List[]> {
        const lists = this.lists;
        return new Promise<List[]>((resolve, reject) => {
            resolve(lists);
        });
    }

    save(list: List): Promise<List> {
        return new Promise<List>((resolve, reject) => {
            resolve(list);
        });
    }

    clear(list: List): Promise<List> {
        return new Promise<List>((resolve, reject) => {
            resolve(list);
        });
    }

    delete(list: List): Promise<List> {
        return new Promise<List>((resolve, reject) => {
            resolve(list);
        });
    }
}
