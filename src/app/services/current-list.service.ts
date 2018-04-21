import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { List } from './../models/list.model';

@Injectable()
export class CurrentListService {
    private subject = new Subject<Object>();
    private list: List;

    constructor() {
    }

    getObservable(): Observable<any> {
        return this.subject.asObservable();
    }

    setList(list: List) {
        this.list = list;
        this.subject.next(list);
        return this;
    }

    getList() {
        return this.list;
    }
}
